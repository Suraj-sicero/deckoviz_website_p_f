import mongoose from 'mongoose';

const uri = "mongodb+srv://vmscare747:8Qaxa6tEKvxR7kuW@cluster0.ydj7lh1.mongodb.net/deckoviz";

mongoose.connect(uri)
  .then(() => {
    console.log("Connected to MongoDB successfully!");
    process.exit(0);
  })
  .catch(err => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });
