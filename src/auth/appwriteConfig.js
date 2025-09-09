import { Client, Account, Databases, Storage } from "appwrite";


const endpoint = import.meta.env.VITE_APPWRITE_ENDPOINT;
const projectid = import.meta.env.VITE_APPWRITE_PROJECT_ID;

const client = new Client()
  .setEndpoint(endpoint) // 👈 Replace with your Appwrite endpoint
  .setProject(projectid); // 👈 Replace with your project ID

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);

export { client, account, databases, storage };
