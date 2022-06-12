import { ObjectId } from "mongodb";
import { getConnected } from "../gateway/connectDb.js";

export const getDiaryCollection = async () => {
  const db = await getConnected();
  return db.collection("diary");
};

export const addARecord = async (rec) => {
  const record = {
    alias: rec.alias,
    year: parseInt(rec.year),
    make: rec.make,
    model: rec.model,
    mileage: parseInt(rec.mileage),
    // time: new Date(),
  };
  const col = await getDiaryCollection();
  const { newRecord } = await col.insertOne(record);
  return newRecord;
};

export const getAllRecords = async () => {
  const col = await getDiaryCollection();
  const all = await col.find({}).toArray();
  return all;
};

export const getOneRecord = async () => {
  if (ObjectId.isValid(req.params.id)) {
    const db = await getConnected();
    const one = await db
      .collection("diary")
      .findOne({ _id: ObjectId(req.params.id) });
    return one;
  }
};
