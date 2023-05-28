import React, { useEffect, useState } from "react";
import Map from "./Map";
import Nav from "./Nav";
import { supabaseClient } from "../lib/supabaseClient";

const tableName = process.env.NEXT_PUBLIC_TABLE_NAME;

export default function EventsMap() {
  const [eventLocations, setEventLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const today = new Date();

  const defaultLocation = {
    address: "",
    lat: 25.116,
    lon: -101.3,
  };

  useEffect(() => {
    try {
      const loadEvents = async () => {
        const { data } = await supabaseClient
          .from(tableName)
          .select("name, id, lat, lon, end");
        const filtered = data
          .filter((event) => event.lat && event.lon)
          .map((event) => ({
            ...event,
            isCompleted:
              today > new Date(event.end) && event.end !== null ? true : false,
          }));
        setEventLocations(filtered);
        setIsLoading(false);
      };
      loadEvents();
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  }, []);

  if (isLoading) {
    return (
      <div className="bg-yellow min-h-screen">
        <Nav />
        <div className="bg-yellow flex h-screen w-full align-middle">
          <div className="flex justify-center flex-col mx-auto">
            <div className="flex items-center justify-center space-x-2 animate-pulse">
              <div className="w-8 h-8 bg-orange rounded-full"></div>
              <div className="w-8 h-8 bg-orange rounded-full"></div>
              <div className="w-8 h-8 bg-orange rounded-full"></div>
            </div>
            <div className="text-center text-sm text-black mt-4">
              Loading...
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="bg-yellow min-h-screen text-black">
        <Nav />
        <div className="lg:flex lg:justify-center lg:min-h-screen">
          <div className="lg:w-3/4">
            <h3 className="text-base lg:text-2xl text-center mb-4 mx-3">
              Events - All
            </h3>
            <div className="h-screen border border-orange lg:h-4/5">
              <Map
                locations={eventLocations}
                defaultLocation={defaultLocation}
                zoomLevel={1}
                mapHeight={"100%"}
                showPin={false}
              />
            </div>
            <div className="h-4"></div>
          </div>
        </div>
      </div>
    );
  }
}
