import { MongoClient } from "mongodb";

export const getConnected = async () => {
  const client = new MongoClient(process.env.MONGO_URL);
  console.log(client);
  await client.connect();
  return client.db("car-diary");
};
