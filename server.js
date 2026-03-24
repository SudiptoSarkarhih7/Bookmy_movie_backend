import app from "./app.js";
import connectDB from "./src/config/db.js";
import colors from "colors";
colors.enable();
const PORT = process.env.PORT || 3000;

await connectDB();

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`.blue);
});
