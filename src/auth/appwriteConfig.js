import { Client, Account, Databases, Storage } from 'appwrite';

const client = new Client();
const projectID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const endpoint = import.meta.env.VITE_APPWRITE_ENDPOINT;

client
    .setEndpoint(endpoint) // Your Appwrite endpoint
    .setProject(projectID); // Your project ID from the Appwrite console

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);

export { client, account, databases, storage };

