import mongoose from "mongoose";

export const connectDB = () => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => {
      console.log(
        `MongoDB connected: ${conn.connection.host}`.magenta.underline
      );
    })
    .catch((error) => {
      console.log(`Error: ${error.message}`.red.bold);
      process.exit();
    });
};
