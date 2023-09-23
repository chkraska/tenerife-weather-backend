import mongoose from "mongoose";
import dotenv from "dotenv";
import { getWeather } from "./utils/getWeather.js";
import { convertFahrenheitToCelsius } from "./utils/convertToCelsius.js";
import { Weather } from "./models/Weather.js";
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
  const weather = await getWeather();

  const weatherData = {
    temp: convertFahrenheitToCelsius(weather.main.temp),
    min_temp: convertFahrenheitToCelsius(weather.main.temp_min),
    max_temp: convertFahrenheitToCelsius(weather.main.temp_max),
    humidity: weather.main.humidity,
    clouds: weather.clouds.all,
    desc: weather.weather[0].description,
    timestamp: new Date(),
    // temp,min,max,humidity,clouds,desc,timestamp
  };

  await new Weather(weatherData).save()
});
