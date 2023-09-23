import mongoose from "mongoose";

const weatherSchema = new mongoose.Schema({
    temp: Number,
    min_temp: Number,
    max_temp:Number,
    humidity: Number,
    clouds:Number,
    desc: String,
    timestamp: String
})

export const Weather = mongoose.model("Weather",weatherSchema)