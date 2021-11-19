import express, {json} from "express";
import cors from "cors";
import "dotenv/config";

const app = express();
app.use(cors())
app.use(json())
app.use(express.urlencoded({ extended: true }));

app.listen(process.env.PORT, ()=>{
    console.log(`Listening on port ${process.env.PORT}`)
})

