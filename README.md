# London Underground App
## This is a React app that allows users to view the London Underground train lines and plan journeys between stations.

# Features
* View list of all stations
* View train lines each station is on
* Select departure and arrival stations
* Display journey details between two stations
* Display zones travelled through

## Install Dependencies
```
npm install
```

## Run App
```
npm start
```

App will be available at http://localhost:3000

Components
The main React components are:

StationList - displays all stations
StationCard - displays name, lines and zones for a station
SelectStations - departure and arrival selection dropdowns
JourneyDetails - displays journey info between two stations



## Deployment

The app is deployed to GitHub Pages at:

[London Underground App](https://movi1.github.io/london-underground-app/)



To deploy updates:

1. Add a "homepage" URL in `package.json` if not already there

2. Build the React app:
```
npm run build
```

3. Commit changes and push to `main` branch

4. Deploy `build/` folder to `gh-pages` branch:
```
npm run deploy
```

5. GitHub Pages site will update after a few minutes

6. Repeat steps 2-5 whenever you want to ship an update
