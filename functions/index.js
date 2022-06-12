import express from "express";
import functions from "firebase-functions";
import cors from "cors";
import { config } from "dotenv";
import {
  addARecord,
  getAllRecords,
  getOneRecord,
  updateRecord,
  makeARecord,
} from "./src/services/actions.js";

config();

const app = express();
app.use(express.json());
app.use(cors());

app.post("/diary", makeARecord);

app.get("/diary", getAllRecords);

app.get("/diary/:id", getOneRecord);

app.patch("/diary/:id", updateRecord);

export const api = functions.https.onRequest(app);
