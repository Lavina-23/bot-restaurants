
# Whatsapp Bot: Chinese Restaurant Finder

This project is an application that integrates Twilio with Google Places API to search and recommend chinese restaurants via WhatsApp. Users can send their location, and the application will provide a list of nearby chinese restaurants based on their search preferences.


## Tech Stack

- Node.js and bun (if you prefer to use npm, use it)
- Twilio account - [Sign up here](https://www.twilio.com/try-twilio)
- Google Maps API key - [Get API key here](https://developers.google.com/maps/documentation/places/web-service/get-api-key)
- ngrok (for local development)


## Manual
#### 0. Clone project and install dependencies

```bash
git clone https://github.com/Lavina-23/bot-restaurants.git
cd bot-restaurants
bun install
```

#### 1. Configure environment variables:

Create a .env file in the root directory of the project and add the following variables:
* `MAPS_API_KEY=your_google_maps_api_key`
* `TWILIO_ACCOUNT_SID=your_twilio_account_sid`
* `TWILIO_AUTH_TOKEN=your_twilio_auth_token`
* `PORT` - Optional. By default it will run on port `3000`

#### 2. Run ngrok
To expose your local webhook to Twilio:
```bash
ngrok http 80
```
I use port 80, for default port, use 3000

#### 3. Twilio Configuration
##### a) Log in to [Twilio Console](https://console.twilio.com)
##### b) Navigate to Messaging > Sandbox (or your WhatsApp number).
##### c) Set the webhook URL for the /incoming endpoint with the active ngrok URL.

#### 4. Start the application
```bash
bun start
```
    
## Project Structure

* **controller.js** : Handles incoming messages from Twilio.
* **service.js** : Contains the logic for communicating with Google Places API and sending responses to users.
* **.env** : Configuration file for storing API keys and tokens.


## Troubleshooting

* **API Key Issues :** Ensure that your Google Maps API key is valid and enabled.
* **Billing Errors :** Enable billing in Google Cloud Console if you encounter authorization issues.
* **Webhook Not Responding :** Check the ngrok URL and ensure your server is running.
## Documentation

* [Google Places API](https://developers.google.com/maps/documentation/places/web-service)
* [Twilio API Documentation](https://www.twilio.com/docs)
* [ngrok Documentation](https://ngrok.com/docs/)
* [Learning Source](https://www.twilio.com/en-us/blog/whatsapp-bot-discover-restaurants-twilio-node-js)
