import { ID } from "node-appwrite";
import { createAdminClient } from "../appwrite";
import { parseStringify } from "../utils";


const {
  APPWRITE_DATABASE_ID,
  APPWRITE_USER_COLLECTION_ID,
  APPWRITE_BANK_COLLECTION_ID,
  APPWRITE_TRANSACTION_COLLECTION_ID,

} = process.env;

export const createTransaction = async ( transaction: CreateTransactionProps ) => {
  try {
    const {database} = await createAdminClient();

    const newTransaction = await database.createDocument(
      APPWRITE_DATABASE_ID!,
      APPWRITE_TRANSACTION_COLLECTION_ID!,
      ID.unique(),
      {
        channel: 'online',
        category: 'Transfer',
        ...transaction
      }

    )

    return parseStringify(newTransaction)

  } catch (error) {
    console.log(`Error creating transactions ${error}`)
    throw new Error(`Unable to create transactions ${error}`);
    
    
  }
}