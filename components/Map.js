import React from "react";
import GoogleMapReact from "google-map-react";
import LocationPin from "./LocationPin";

const googleApi = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

export default function Map({
  locations,
  defaultLocation,
  zoomLevel,
  mapHeight,
}) {
  const eventPin = {
    address: "",
    lat: defaultLocation.lat,
    lng: defaultLocation.lon,
  };
  return (
    <div style={{ height: mapHeight, width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: googleApi }}
        defaultCenter={eventPin}
        defaultZoom={zoomLevel}
      >
        {locations
          ? locations.map((event) => (
              <LocationPin
                key={event.id}
                lat={event.lat}
                lng={event.lon}
                name={event.name}
                id={event.id}
                isCompleted={event.isCompleted}
              />
            ))
          : null}
      </GoogleMapReact>
    </div>
  );
}
