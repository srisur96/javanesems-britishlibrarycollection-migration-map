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
```

## Credit

- Metadata Source: British Library’s digitized manuscript catalogue
- Visualization Inspiration: Mapping Manuscript Migrations Project
- Technology Stack: React, Leaflet, Deck.gl, Mapbox

## Author
- Sri Suryani (sayasrisuryani@gmail.com)
- This project is part of the MA Digital Humanities dissertation at Lancaster University (Academic Year 2024/2025).

