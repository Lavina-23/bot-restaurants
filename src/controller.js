import express, { urlencoded } from "express";
import { createServer } from "http";
import { Twilio } from "twilio";
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const app = express();
app.use(urlencoded({ extended: true }));
app.use(express.json());

const client = new Twilio();

const Service = require("./service");
const service = new Service();

app.get("/", (req, res) => {
	res.send(service.test());
});

app.post("/incoming", async (req, res) => {
	console.log("request received", req.body);
	const { Longitude, Latitude, Body, ProfileName } = req.body;

	if (Body !== "") {
		const resp = service.reply(
			`Hello ${ProfileName} Please share your location with us to recommend chinese restaurants around you :)`,
		);
		res.type("text/xml").send(resp.toString());
	} else {
		try {
			const restaurants = await service.fetchRestaurants(Longitude, Latitude);
			const resp = service.send(restaurants);
			res.type("text/xml").send(resp.toString());
		} catch (error) {
			const resp = service.reply("No chinese restaurants found around you");
			res.type("text/xml").send(resp.toString());
		}
	}
});

createServer(app).listen(80, () => {
	console.log("Server listening on port 80");
});
