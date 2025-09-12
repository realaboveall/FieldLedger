import { Client, Account, Databases, Storage, Functions } from "appwrite";
import { useEffect } from "react";

const endpoint = import.meta.env.VITE_APPWRITE_ENDPOINT;
const projectid = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const devkey = import.meta.env.VITE_APPWRITE_DEV_KEY;

const client = new Client()
  .setEndpoint(endpoint) // 👈 Replace with your Appwrite endpoint
  .setProject(projectid) // 👈 Replace with your project ID
  .setDevKey(devkey);

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);
const functions = new Functions(client);

export { client, account, databases, storage,functions };
