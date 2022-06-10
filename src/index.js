import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { addARecord, getAllRecords, getOneRecord } from "./services/actions.js";
import { ObjectId } from "mongodb";
import { getConnected } from "./gateway/connectDb.js";

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
      { $push: { mpg: [89] } }
      // { $push: { scores: 89 } }
    );
    res.status(200).send({ success: "Record updated" });
  } else {
    res.status(500).send("Not updated");
  }
});

app.listen(3000, () => {
  console.log("Listening on http://localhost:3000");
});
