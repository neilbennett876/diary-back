import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { addARecord, getAllRecords } from "./services/actions.js";

config();

const app = express();
app.use(express.json());
app.use(cors());

app.post("/", async (req, res) => {
  try {
    await addARecord(req.body);
    res.status(200).send("Entry added!");
  } catch (error) {
    res.status(400).send("Message couldn't be added");
  }
});

app.get("/", async (req, res) => {
  try {
    const all = await getAllRecords();
    res.status(200).send(all);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(3000, () => {
  console.log("Listening on http://localhost:3000");
});
