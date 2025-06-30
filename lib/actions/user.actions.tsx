'use server'

import { ID } from "node-appwrite"
import { createAdminClient, createSessionClient } from "../appwrite"
import { cookies } from "next/headers"
import { parseStringify } from "../utils"


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

export const SignUp = async (userData: SignUpParams) => {
  try {

    const { email, password, lastName, firstName } = userData;
    const { account } = await createAdminClient();

    const newUserAcct = await account.create(
      ID.unique(), 
      email,
      password,
      `${firstName} ${lastName}`
    );

    if(!newUserAcct) throw new Error('Error creating user')

    const session = await account.createEmailPasswordSession(email, password);

    cookies().set(process.env.APPWRITE_SESSION_NAME!, 
      session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify(newUserAcct);

    
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
