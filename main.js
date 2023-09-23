import mongoose from "mongoose";

const MONGO_URL = "mongodb+srv://dawid:dawid123@cluster0.j8lhl.mongodb.net/?retryWrites=true&w=majority"
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
