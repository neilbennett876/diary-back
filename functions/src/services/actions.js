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
  };
  const col = await getDiaryCollection();
  const { newRecord } = await col.insertOne(record);
  return newRecord;
};

export const makeARecord = async (req, res) => {
  try {
    await addARecord(req.body);
    res.status(200).send("Message added");
  } catch (error) {
    res.status(400).send("Message couldn't be added");
  }
};

export const getAllRecords = async (req, res) => {
  try {
    const col = await getDiaryCollection();
    const all = await col.find({}).toArray();
    res.status(200).send(all);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getOneRecord = async (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    const db = await getConnected();
    const one = await db
      .collection("diary")
      .findOne({ _id: ObjectId(req.params.id) });
    res.status(200).send(one);
  } else {
    res.status(400).send("Not updated");
  }
};

export const updateRecord = async (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    const db = await getConnected();
    db.collection("diary").updateOne(
      { _id: ObjectId(req.params.id) },
      { $push: { mpg: parseFloat(req.body.mpg) } }
    );
    db.collection("diary").updateOne(
      { _id: ObjectId(req.params.id) },
      { $set: { mileage: req.body.mileage } }
    );
    res.status(200).send({ success: "Record updated" });
  } else {
    res.status(400).send("Not updated");
  }
};
