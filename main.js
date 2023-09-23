import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const URL =
  "https://api.openweathermap.org/data/2.5/weather?q=Warsaw&appid=912c622485ebcccfe6e75ebb3dc2de10";

const MONGO_URL = process.env.ATLAS_CONNECTION;
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (err) => {
  console.error("Błąd połączenia z bazą danych", err);
});

db.once("open", () => {
  console.log("Połączono z bazą danych");
  async function getData() {
    try {
      const response = await fetch(URL);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log("błąd", error);
    } finally {
      console.log("Operacja zakończona");
    }
  }
  getData();
});
