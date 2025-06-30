// src/lib/server/appwrite.js
"use server";
import { Client, Account, Databases, Users } from "node-appwrite";
import { cookies } from "next/headers";

export async function createSessionClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

    console.log('process.env.APPWRITE_SESSION_NAME', process.env.APPWRITE_SESSION_NAME, cookies().get(process.env.APPWRITE_SESSION_NAME!))
  const session = await cookies().get(process.env.APPWRITE_SESSION_NAME!);
  if (!session || !session.value) {
    throw new Error("No session");
  }

  client.setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },
  };
}

export async function createAdminClient() {

  console.log('process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!', process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  console.log('process.env.NEXT_PUBLIC_APPWRITE_PROJECT!', process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
  console.log('process.env.NEXT_APPWRITE_KEY!', process.env.NEXT_APPWRITE_KEY!)

  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
    .setKey(process.env.NEXT_APPWRITE_KEY!);

  return {
    get account() {
      return new Account(client);
    },
    get database() {
      return new Databases(client);
    },
    get users() {
      return new Users(client);
    }
  };
}
