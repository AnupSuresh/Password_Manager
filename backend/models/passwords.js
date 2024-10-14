import mongoose from "mongoose";
const passSchema = new mongoose.Schema({
  siteName: String,
  username: String,
  password: String,
  id: String,
});

const Password = mongoose.model("passwords", passSchema);

export default Password;
