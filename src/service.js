require("axios");
const { twiml } = require("twilio");
const MessagingResponse = twiml.MessagingResponse;
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

class Service {
	reply(message) {
		const response = new MessagingResponse();
		response.message(message);
		return response.toString();
	}

	test() {
		return "Hello World!";
	}

	async fetchRestaurants(long, lat) {
		try {
			const response = await axios.get(
				"https://maps.googleapis.com/maps/api/place/nearbysearch/json",
				{
					params: {
						location: `${lat}, ${long}`,
						radius: 3000,
						type: "restaurant",
						keyword: "chinese",
						key: process.env.MAPS_API_KEY,
					},
				},
			);
			const restaurants = response.data.results.map((place) => ({
				// results adalah array yang dihasilkan dari API
				name: place.name,
				rating: place.rating,
				location: place.geometry.location,
			}));
			return restaurants;
		} catch (err) {
			throw new Error("No restaurants found!");
		}
	}

	send(restaurants) {
		const response = new MessagingResponse();
		if (restaurants.length === 0) {
			response.message("No chinese restaurants found around you");
			return response.toString();
		}
		// biome-ignore lint/complexity/noForEach: <explanation>
		restaurants.forEach((restaurant) => {
			const mapUrl = `https://www.google.com/maps/@?api=1&map_action=map&center=${restaurant.location.lat},${restaurant.location.lng}`;
			response.message(
				`${restaurant.name}, ${restaurant.rating} rating \n${mapUrl}`,
			);
		});
		return response.toString();
	}
}

module.exports = Service;
