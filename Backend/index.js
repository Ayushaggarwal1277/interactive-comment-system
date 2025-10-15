import app from "./app.js";
import connectDB from "./utils/db.js";



const PORT = process.env.PORT || 3000;


connectDB().then(() => {
  console.log("Database connected successfully");
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((error) => {
  console.error("Database connection failed:", error);
  process.exit(1);
});

