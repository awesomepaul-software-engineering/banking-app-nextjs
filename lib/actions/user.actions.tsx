'use server'

import { ID } from "node-appwrite"
import { createAdminClient, createSessionClient } from "../appwrite"
import { cookies } from "next/headers"
import { encryptId, extractCustomerIdFromUrl, parseStringify } from "../utils"
import { CountryCode, ProcessorTokenCreateRequest, ProcessorTokenCreateRequestProcessorEnum, Products } from "plaid"
import { plaidClient } from "@/lib/plaid"
import { revalidatePath } from "next/cache"
import { createDwollaCustomer } from "../dwolla"

const {
  APPWRITE_DATABASE_ID,
  APPWRITE_USER_COLLECTION_ID,
  APPWRITE_BANK_COLLECTION_ID
} = process.env;

export const SignIn = async ({email, password}: signInProps) => {
  try {
    const { account } = await createAdminClient();
    const session = await account.createEmailPasswordSession(email, password);

    cookies().set(process.env.APPWRITE_SESSION_NAME!, session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify(session);    
  } catch (error) {
    console.log('Error occurred during sign in', error)
    return null
  }
}

// ATOMIC signUp action!
export const SignUp = async ({password, ...userData }: SignUpParams) => {
  try {

    const { email, lastName, firstName } = userData;
    const { account, database } = await createAdminClient();

    const newUserAccount = await account.create(
      ID.unique(), 
      email,
      password,
      `${firstName} ${lastName}`
    );

    if(!newUserAccount) throw new Error('Error creating user')

    const dwollaCustomerUrl = await createDwollaCustomer({
      ...userData, 
      type: 'personal'
    });

    if(!dwollaCustomerUrl) throw new Error('Error creating dwolla url')

    const dwollaCustomerId = extractCustomerIdFromUrl(dwollaCustomerUrl)

    const newUser = await database.createDocument(
      APPWRITE_DATABASE_ID!, 
      APPWRITE_USER_COLLECTION_ID!,
      ID.unique(),
      {
        ...userData,
        userId: newUserAccount.$id,
        dwollaCustomerId,
        dwollaCustomerUrl
      }
    )

    const session = await account.createEmailPasswordSession(email, password);

    cookies().set(process.env.APPWRITE_SESSION_NAME!, 
      session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify(newUser);
  } catch (error) {
    console.log('Error during sign', error)
  }
}


export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    return await account.get();
  } catch (error) {
    console.log('Unable to getLoggedInUser', error);
    return null;
  }
}


export async function logoutAccount(){
  try {
    const { account } = await createSessionClient();
    cookies().delete(process.env.APPWRITE_SESSION_NAME!);
    
    await account.deleteSession('current');
    return true;
    
  } catch (error) {
    console.log('Unable to logoutAccount', error);
    return null
  }

}


export const createLinkToken = async (user: User) => {
  try {
    const tokenParams = {
      user: {
        client_user_id: user.$id
      },
      client_name: `${user.firstName} ${user.lastName}`,
      products: ['auth'] as Products[],
      language: 'en',
      country_codes: ['US'] as CountryCode[]
    }
    const response = await plaidClient.linkTokenCreate(tokenParams);
    return parseStringify({linkToken: response.data.link_token});
  } catch (error) {
    throw new Error(`Error with PlainLinkTOken => ${error}`)
  }
}

export const createBankAccount = async ({
  userId, bankId, accountId, accessToken, 
  fundingSourceUrl, sharableId}: createBankAccountProps) => {

  try {
    const { database } = await createAdminClient();
    const bankAccount = await database.createDocument(
      APPWRITE_DATABASE_ID!, 
      APPWRITE_BANK_COLLECTION_ID!,
      ID.unique(),
      {
        userId, bankId, accountId, 
        accessToken, fundingSourceUrl, sharableId
      }
    )

    return parseStringify({
      bankAccount
    })

  } catch (error) {
    console.log(`Error creating appwrite bank details ${error}`);
    throw new Error(`Error creating appwrite bank details ${error}`);
  }
  
}

export const exchangePublicToken = async ({user, publicToken}: exchangePublicTokenProps) => {
  try {
    // First, exchnage public token for access token and item ID
    const response = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken
    });

    const accessToken = response.data.access_token;
    const itemID = response.data.item_id;

    // Now, use the access token to get account information from plaid
    const accountResponse = await plaidClient.accountsGet({
      access_token: accessToken
    });
    const accountData = accountResponse.data.accounts[0];

    // Next, create a processor token for dwolla using the access token and accound ID
    const request: ProcessorTokenCreateRequest = {
      access_token: accessToken,
      account_id: accountData.account_id,
      processor: "dwolla" as ProcessorTokenCreateRequestProcessorEnum
    };

    const processorTokenResponse = await plaidClient.processorTokenCreate(request);
    const processorToken = processorTokenResponse.data.processor_token;

    // Next, create a funding source URL for the account using the Dwolla customerID processor toke and bank name
    const fundingSourceUrl = await addFundingSource({
      dwollaCustomerId: user.dwollaCustomerId,
      processorToken,
      bankName: accountData.name 
    });

    if (!fundingSourceUrl) throw new Error(`Error getting fundingSourceUrl ${fundingSourceUrl}`)

    // Next, create a bank account with userId,itemId, accountId, accessToken, fundingSourceUrl, and shareableId
    await createBankAccount({
      userId: user.$id,
      bankId: itemID,
      accountId: accountData.account_id,
      accessToken,
      fundingSourceUrl,
      sharableId: encryptId(accountData.account_id)
    });

    // revalidate path to relect changes immediately 
    revalidatePath('/');

    return parseStringify({
      publicTokenExchange: 'complete'
    });
    
  } catch (error) {
    console.log('Error with exchange public token', exchangePublicToken);
    throw new Error(`Error @exchangePublicToken ${error}`);
  }

}