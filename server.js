import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./src/config/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

// ⬇️ THIS LINE IS VERY IMPORTANT
connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} successfully`);
});
