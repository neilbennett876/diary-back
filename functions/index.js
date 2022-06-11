import express from "express";
import functions from "firebase-functions";
import cors from "cors";
import { config } from "dotenv";
import {
  addARecord,
  getAllRecords,
  getOneRecord,
} from "./src/services/actions.js";
import { ObjectId } from "mongodb";
import { getConnected } from "./src/gateway/connectDb.js";

config();

const app = express();
app.use(express.json());
app.use(cors());

app.post("/diary", async (req, res) => {
  try {
    await addARecord(req.body);
    res.status(200).send("Entry added!");
  } catch (error) {
    res.status(400).send("Message couldn't be added");
  }
});

app.get("/diary", async (req, res) => {
  try {
    const all = await getAllRecords();
    res.status(200).send(all);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.patch("/diary/:id", async (req, res) => {
  const updates = req.body;

  if (ObjectId.isValid(req.params.id)) {
    const db = await getConnected();
    db.collection("diary").updateOne(
      { _id: ObjectId(req.params.id) },
      { $set: updates }
    );
    res.status(200).send({ success: "Record updated" });
  } else {
    res.status(500).send("Not updated");
  }
});
app.patch("/diary/patch/:id", async (req, res) => {
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
    res.status(500).send("Not updated");
  }
});

app.listen(3030, () => {
  console.log("Api running");
});

export const api = functions.https.onRequest(app);
