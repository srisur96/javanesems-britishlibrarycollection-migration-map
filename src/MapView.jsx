import React, { useEffect, useState } from "react";
import { DeckGL } from "@deck.gl/react";
import { ArcLayer } from "@deck.gl/layers";
import { Map } from "react-map-gl";

const MAPBOX_TOKEN = "pk.eyJ1IjoieXNyaTk2IiwiYSI6ImNtYnd2bDM5bzBweWEycXNkNTRqcjQwZHkifQ.-aTr0OhEQdQapkoOJq8gSA";

const INITIAL_VIEW_STATE = {
  longitude: 80,
  latitude: 10,
  zoom: 2.5,
  pitch: 30,
  bearing: 0,
};

function MapView() {
  const [data, setData] = useState([]);
  const [dataset, setDataset] = useState("bl");
  const [metadata, setMetadata] = useState({});
  const [selectedObject, setSelectedObject] = useState(null);

  useEffect(() => {
    const file =
      dataset === "bl"
        ? "/javanese_arc_native_396_geo_completed.json"
        : "/javanese_arc_nonbl.json";

    fetch(file)
      .then((res) => res.json())
      .then((json) => {
        console.log(`✅ Loaded ${dataset.toUpperCase()} arcs:`, json.length);
        setData(json);
        setSelectedObject(null);
      })
      .catch((err) => console.error("❌ Failed to load data:", err));
  }, [dataset]);

  useEffect(() => {
    if (dataset === "bl") {
      fetch("/bl_metadata_full_extended.json")
        .then((res) => res.json())
        .then(setMetadata)
        .catch((err) => console.error("❌ Failed to load metadata:", err));
    } else {
      setMetadata({});
    }
  }, [dataset]);

  const getColor = (order) => {
    if (order === 1) return [255, 0, 0];
    if (order === 2) return [0, 0, 255];
    if (order === 3) return [0, 150, 0];
    return [120, 120, 120];
  };

  const layers = [
    new ArcLayer({
      id: "arc-layer",
      data,
      getSourcePosition: (d) => d.sourcePosition,
      getTargetPosition: (d) => d.targetPosition,
      getSourceColor: (d) => getColor(d.properties.order),
      getTargetColor: (d) => getColor(d.properties.order),
      getWidth: 2,
      pickable: true,
      onClick: ({ object }) => setSelectedObject(object),
    }),
  ];

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      {/* Dropdown */}
      <div style={{
        position: "absolute",
        zIndex: 10,
        top: 10,
        left: 10,
        backgroundColor: "white",
        padding: "6px 10px",
        borderRadius: "8px",
        boxShadow: "0 0 8px rgba(0,0,0,0.2)",
        fontFamily: "sans-serif"
      }}>
        <label htmlFor="dataset" style={{ marginRight: "8px" }}>
          Select Collection:
        </label>
        <select
          id="dataset"
          value={dataset}
          onChange={(e) => setDataset(e.target.value)}
        >
          <option value="bl">British Library</option>
          <option value="nonbl">Other UK Collections</option>
        </select>
      </div>

      {/* Sticky Info Panel */}
      {selectedObject && selectedObject.properties && (
        <div style={{
          position: "absolute",
          zIndex: 10,
          bottom: 20,
          left: 20,
          backgroundColor: "white",
          padding: "12px",
          borderRadius: "8px",
          boxShadow: "0 0 8px rgba(0,0,0,0.3)",
          maxWidth: "360px",
          fontSize: "12px",
          fontFamily: "sans-serif",
          overflowY: "auto",
          maxHeight: "60vh"
        }}>
          <div>
            <b>{selectedObject.properties.manuscriptID}</b><br />
            From: {selectedObject.properties.fromPlace}<br />
            To: {selectedObject.properties.toPlace}<br />
            Year: {selectedObject.properties.year || "-"}<br />
            Order: {selectedObject.properties.order}<br />
            Agent: {selectedObject.properties.agent || "-"}<br />
            Note: {selectedObject.properties.note || "-"}<br /><br />
            {/* Metadata if available */}
            {metadata[selectedObject.properties.manuscriptID]?.title &&
              <><b>Title:</b> {metadata[selectedObject.properties.manuscriptID]?.title}<br /></>
            }
            {metadata[selectedObject.properties.manuscriptID]?.language &&
              <><b>Language:</b> {metadata[selectedObject.properties.manuscriptID]?.language}<br /></>
            }
            {metadata[selectedObject.properties.manuscriptID]?.scope &&
              <><b>Scope & Content:</b><br />{metadata[selectedObject.properties.manuscriptID]?.scope}<br /><br /></>
            }
            {metadata[selectedObject.properties.manuscriptID]?.physical &&
              <><b>Physical Characteristics:</b><br />{metadata[selectedObject.properties.manuscriptID]?.physical}<br /><br /></>
            }
            {metadata[selectedObject.properties.manuscriptID]?.link &&
              <a href={metadata[selectedObject.properties.manuscriptID]?.link} target="_blank" rel="noreferrer">
                📖 View in British Library
              </a>
            }
          </div>
          <div style={{ textAlign: "right", marginTop: "8px" }}>
            <button onClick={() => setSelectedObject(null)}>Close</button>
          </div>
        </div>
      )}

      {/* Map */}
      <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        layers={layers}
        getTooltip={({ object }) => {
          if (!object || !object.properties) return null;
          return {
            html: `<b>${object.properties.manuscriptID}</b><br/>
                   From: ${object.properties.fromPlace}<br/>
                   To: ${object.properties.toPlace}`,
            style: {
              backgroundColor: "white",
              color: "black",
              fontSize: "12px",
            }
          };
        }}
        style={{ width: "100%", height: "100%" }}
      >
        <Map
          mapStyle="mapbox://styles/mapbox/light-v10"
          mapboxAccessToken={MAPBOX_TOKEN}
        />
      </DeckGL>
    </div>
  );
}

export default MapView;
