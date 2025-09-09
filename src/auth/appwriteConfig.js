import { Client, Account, Databases, Storage } from "appwrite";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1") // 👈 Replace with your Appwrite endpoint
  .setProject("YOUR_PROJECT_ID"); // 👈 Replace with your project ID

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);

export { client, account, databases, storage };
