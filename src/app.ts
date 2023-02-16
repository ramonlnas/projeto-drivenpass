import express, { application } from "express";
import dotenv from "dotenv";

dotenv.config()
const app = express();
app.use(express.json())


const port = +process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is up and running on port: ${port}`);
})

export default app;