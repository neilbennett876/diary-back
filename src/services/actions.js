import { getConnected } from "../gateway/connectDb.js";

export const getDiaryCollection = async () => {
  const db = await getConnected();
  return db.collection("diary");
};

export const addARecord = async (rec) => {
  const col = await getDiaryCollection();
  const { insertedId } = await col.insertOne(rec);
  return insertedId.toString();
};

export const getAllRecords = async () => {
  const col = await getDiaryCollection();
  const single = await col.find({}).toArray();
  return single;
};
