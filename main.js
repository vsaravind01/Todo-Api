import express from "express";
import bodyParser from "body-parser";
import Router from "./routes/index.js";
const app = express();

// port - 5000
const port = 5000;

app.use(bodyParser.json());
app.use("/api", Router);

// listen on localhost
app.listen(port, () => {
	console.log(`Connected to http:\\\\localhost:${port}\\`);
});
