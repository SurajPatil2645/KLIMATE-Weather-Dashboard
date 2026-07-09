# KLIMATE - Weather App

KLIMATE is a weather dashboard built with React + TypeScript. It uses the OpenWeather API to show:

- Weather for your current location (via browser geolocation)
- Hourly temperature and weather forecast
- City search (by name)
- Favorite cities (saved in local storage)
- A separate city details page for each searched/saved city

## Features

- Detects your location and fetches weather + forecast automatically
- Search cities and open a details page for any result
- Save up to 10 favorite cities
- Shows current conditions, temperature, and forecast details
- Built with TanStack Query for data fetching and caching
- Clean UI using Tailwind + shadcn/ui components

## Tech Stack

- React + TypeScript + Vite
- react-router-dom
- @tanstack/react-query (+ devtools)
- Tailwind CSS (via @tailwindcss/vite)
- Recharts
- OpenWeather API

## Setup

1. Install dependencies
   ```bash
   npm install
   ```

2. Create a `.env` file in the project root and add your OpenWeather API key:

   ```bash
   VITE_OPENWEATHER_API_KEY=your_api_key_here
   ```

3. Run the app
   ```bash
   npm run dev
   ```

4. Open the app in your browser (the port shown in the terminal)

## How it works

- **Main dashboard (`/`)**
  - Uses browser geolocation to get latitude/longitude
  - Fetches reverse geocoding to show your location name
  - Fetches:
    - Current weather
    - Forecast (hourly)

- **City details page (`/city/:cityName?lat=...&lon=...`)**
  - Loads weather and forecast using the provided `lat` and `lon`
  - Lets you add/remove that city from favorites

- **Favorites**
  - Stored in local storage
  - Favorites show small weather snapshots and navigate to the city page on click
  - You can remove a favorite directly from the favorites row

## Scripts

- `npm run dev` - start development server
- `npm run build` - build for production
- `npm run lint` - lint the code
- `npm run preview` - preview the production build

## Notes

- Location-based weather requires browser location permission.
- If you disable location access, the dashboard will show a location error message and ask you to enable it.

