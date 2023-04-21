import React, { useState } from "react";
import Image from "next/image";

export default function Card({
  event: { imageUrl, name, country, start, end, eventType },
}) {
  const [isLoading, setIsLoading] = useState(true);
  let today = new Date();
  let startDate = new Date(start);
  startDate.setMinutes(startDate.getMinutes() + startDate.getTimezoneOffset());
  let formattedDate = startDate.toLocaleDateString("en-us", {
    year: "numeric",
    month: "long",
  });
  let endDate = new Date(end);
  endDate.setMinutes(endDate.getMinutes() + endDate.getTimezoneOffset());

  return (
    <div className="">
      <div className="h-full w-full">
        <div className="relative aspect-4/3 rounded-md mb-3 w-full">
          <Image
            src={imageUrl}
            className={`rounded-md ${
              isLoading
                ? "grayscale blur-2xl scale-110"
                : "grayscale-0 blur-0 scale-100"
            }`}
            alt="eventimage"
            fill
            style={{ objectFit: "cover" }}
            onLoadingComplete={() => setIsLoading(false)}
          />
          {today > endDate && start != null ? (
            <div className="bg-red absolute font-bold top-0 right-0 text-white text-sm m-3 p-3 rounded-md">
              COMPLETED
            </div>
          ) : null}
        </div>
      </div>
      <h4 className="text-lg">{name}</h4>
      <div className="flex justify-between">
        <h5 className="text-sm italic">{country}</h5>
        {eventType === "Fixed Session" ? (
          <h5 className="text-sm italic">
            {start ? formattedDate : "Date TBA"}
          </h5>
        ) : (
          <h5 className="text-sm italic">{eventType}</h5>
        )}
      </div>
    </div>
  );
}
