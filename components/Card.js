import React, { useState } from "react";
import Image from "next/image";
import CardTextBlock from "./CardTextBlock";
import ReactCountryFlag from "react-country-flag";

export default function Card({
  // event: {
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
  isOnline,
  // },
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
          <CardTextBlock
            isArchived={isArchived}
            isUnavailable={isUnavailable}
            isCompleted={today > new Date(end) && start !== null}
          />
        </div>
      </div>
      <h4 className="text-lg">{name}</h4>
      <div className="flex justify-between flex-wrap">
        <div className="flex text-md italic">
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
        {isOnline && (
          <div className="flex grow-0 bg-emerald-500 text-white not-italic font-bold text-xs ml-2 py-0.5 px-2 rounded-full place-items-center">
            ONLINE
          </div>
        )}
        {eventType === "Fixed Session" ? (
          <h5 className="text-md italic ml-auto">
            {start ? formattedDate : "Date TBA"}
          </h5>
        ) : (
          <h5 className="text-md italic ml-auto">{eventType}</h5>
        )}
      </div>
    </div>
  );
}
