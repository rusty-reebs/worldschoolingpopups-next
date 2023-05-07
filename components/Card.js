import React, { useState } from "react";
import Image from "next/image";
import TextBlock from "./TextBlock";
import ReactCountryFlag from "react-country-flag";

export default function Card({
  event: {
    imageUrl,
    name,
    country,
    countryCode,
    isGlobal,
    start,
    end,
    eventType,
    isArchived,
    isUnavailable,
  },
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
        <div className="relative aspect-4/3 rounded-md mb-3">
          <Image
            src={imageUrl}
            className={`rounded-md ${
              isLoading
                ? "grayscale blur-2xl scale-110"
                : "grayscale-0 blur-0 scale-100"
            }`}
            alt="eventimage"
            fill
            style={{ objectFit: "fill" }}
            sizes="(max-width: 768px) 100vw"
            priority
            onLoadingComplete={() => setIsLoading(false)}
          />
          {isArchived ? (
            <TextBlock isArchived />
          ) : isUnavailable ? (
            <TextBlock isUnavailable />
          ) : today > endDate && start != null ? (
            <TextBlock isCompleted />
          ) : null}
        </div>
      </div>
      <h4 className="text-lg">{name}</h4>
      <div className="flex justify-between">
        <div className="flex text-sm italic">
          {isGlobal ? (
            <div className="self-center not-italic mr-1">🌎</div>
          ) : countryCode ? (
            <div className="self-center mr-1">
              <ReactCountryFlag
                countryCode={countryCode}
                svg
                style={{
                  width: "1.5em",
                  height: "1.5em",
                }}
              />
            </div>
          ) : null}
          <div className="self-center">{isGlobal ? "Global" : country}</div>
        </div>
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
