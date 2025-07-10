# Javanese Manuscript Migration Map

This project visualizes the migration history of Javanese manuscripts in the British Library collection. It is developed as part of a Digital Humanities dissertation project at Lancaster University.

## Features
- Interactive map using React + Leaflet + deck.gl
- Curved migration lines to indicate multiple transfer orders
- Color-coded transfers (e.g. red for first, blue for second)
- GeoJSON and JSON metadata loaded from British Library records

## Folder Structure
- `public/` — Contains metadata files and static assets
- `src/` — React components (`MapView.jsx`, `App.js`, etc.)

## How to Run Locally
```bash
npm install
npm start

## Credits

- Manuscript metadata: [British Library](https://www.bl.uk/)
- Visualization model inspired by: [Mapping Manuscript Migrations](https://mappingmanuscriptmigrations.org/)
- Built with: React, Leaflet, Deck.gl, Mapbox
- Developed by: Sri Suryani (MA Digital Humanities, Lancaster University)
