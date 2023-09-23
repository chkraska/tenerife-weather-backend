import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

const MONGO_URL = process.env.ATLAS_CONNECTION

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (err) => {
  console.error("Błąd połączenia z bazą danych", err);
});

db.once("open", () => {
    console.log("Połączono z bazą danych")
});
