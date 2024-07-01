import mongoose from "mongoose";

export const connectDB = async () => {
     await mongoose.connect('mongodb+srv://vitorlucasdev:132207@cluster0.bvc4t33.mongodb.net/restaurante').then(() => console.log("DB Connected"));
}