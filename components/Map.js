import React from "react";
import GoogleMapReact from "google-map-react";
import LocationPin from "./LocationPin";

const googleApi = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

export default function Map({
  locations,
  defaultLocation,
  lat,
  lon,
  zoomLevel,
  mapHeight,
  showPin,
}) {
  const eventPin = {
    address: "",
    // lat: defaultLocation.lat,
    lat: lat,
    // lng: defaultLocation.lon,
    lon: lon,
  };
  return (
    <div style={{ height: mapHeight, width: "100%" }}>
      <GoogleMapReact
        //! move API key to backend and fetch it. More secure.
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
        {showPin ? (
          <LocationPin
            lat={defaultLocation.lat}
            lng={defaultLocation.lon}
            noRedirect={showPin}
          />
        ) : null}
      </GoogleMapReact>
    </div>
  );
}
