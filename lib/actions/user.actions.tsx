'use server'

import { ID } from "node-appwrite"
import { createAdminClient, createSessionClient } from "../appwrite"
import { cookies } from "next/headers"
import { parseStringify } from "../utils"


export const SignIn = async () => {
  try {
    
  } catch (error) {
    console.log('Error', error)
  }
}

export const SignUp = async (userData: SignUpParams) => {
  try {

    const { email, password, lastName, firstName } = userData;
    const { account } = await createAdminClient();

    const newUserAcct = await account.create(
      ID.unique(), 
      email, // email, 
      password, //password, 
      `${firstName} ${lastName}` //name
    );
    const session = await account.createEmailPasswordSession(email, password);

    cookies().set(process.env.APPWRITE_SESSION_NAME!, 
      session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    parseStringify(newUserAcct);

    
  } catch (error) {
    console.log('Error', error)
  }
}


export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    return await account.get();
  } catch (error) {
    return null;
  }
}
