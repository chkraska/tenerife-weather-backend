import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import { getWeather } from "./utils/getWeather.js";
import { convertFahrenheitToCelsius } from "./utils/convertToCelsius.js";
import { Weather } from "./models/Weather.js";
import cors from "cors"
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

db.once("open", () => {
  console.log("Połączono z bazą danych");

  async function timeout() {
    const weather = await getWeather();
    const weatherData = {
      temp: convertFahrenheitToCelsius(weather.main.temp),
      min_temp: convertFahrenheitToCelsius(weather.main.temp_min),
      max_temp: convertFahrenheitToCelsius(weather.main.temp_max),
      humidity: weather.main.humidity,
      clouds: weather.clouds.all,
      desc: weather.weather[0].description,
      timestamp: new Date(),
    };

    await new Weather(weatherData).save();
  }
  setTimeout(timeout, 900000);
});


// utwórz apkę w express
const app = express()
app.use(cors())

app.get("/api/pogoda", async function(req,res){
  try {
    const items = await Weather.find()
    res.json({
      message:"Udało się pobrać dane",
      data:items,
      ok:true,
      code:200
    })
  } catch (error) {
    res.json({
      message:"Nie udało się pobrać danych",
      ok:false,
      code:500
    })
  }
})


app.listen(5000, function(){
  console.log("Serwer działa")
})


