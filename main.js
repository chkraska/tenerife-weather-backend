import mongoose from "mongoose";
import dotenv from "dotenv";
import { getWeather } from "./utils/getWeather.js";
dotenv.config();

const MONGO_URL = process.env.ATLAS_CONNECTION;
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (err) => {
  console.error("Błąd połączenia z bazą danych", err);
});

db.once("open", async () => {
  console.log("Połączono z bazą danych");
  const weather = await getWeather()

  const weatherData = {
    temp: weather.main.temp,
    min: weather.main.temp_min,
    max: weather.main.temp_max,
    humidity: weather.main.humidity,
    clouds: weather.clouds,
    desc: weather.weather[0].description,
    timestamp: weather.timezone
    // temp,min,max,humidity,clouds,desc,timestamp
  }
  console.log(weatherData)
});
