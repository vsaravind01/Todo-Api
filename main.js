import "./config.js";
import express from "express";
import bodyParser from "body-parser";
import Router from "./routes/index.js";
const app = express();

const port = 3000;

app.use(bodyParser.json());
app.use("/api", Router);

// listen on localhost
app.listen(process.env.PORT || port, () => {
	console.log(`Connected to http:\\\\localhost:${process.env.PORT}\\`);
});
