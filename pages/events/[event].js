import { useEffect, useState } from "react";
import CarouselComp from "@/components/components/Carousel";
import Nav from "@/components/components/Nav";
import Map from "@/components/components/Map";
import { transformImages } from "@/components/_helpers/cloudinary";
import { FaCalendar } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaChild } from "react-icons/fa";
import { FaAddressCard } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaGlobe } from "react-icons/fa";
import { supabaseAdmin } from "../events/index";
import Image from "next/image";

//TODO Map default location lat/lon

export default function Detail({ eventData, newImageUrls }) {
  const today = new Date();
  let startDate = new Date(eventData.start);
  let endDate = new Date(eventData.end);
  startDate.setMinutes(startDate.getMinutes() + startDate.getTimezoneOffset());
  endDate.setMinutes(endDate.getMinutes() + endDate.getTimezoneOffset());
  let formattedStart = startDate.toLocaleDateString("en-us", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  let formattedEnd = endDate.toLocaleDateString("en-us", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="bg-yellow min-h-screen w-full">
      <div className="hidden lg:block">
        <Nav />
      </div>
      <div className="lg:hidden">
        <CarouselComp images={eventData.images} />
      </div>

      <div className="hidden lg:flex lg:w-4/5 lg:mx-auto lg:justify-start lg:gap-x-5">
        {newImageUrls.map((image, index) => {
          return (
            <div key={index} className="lg:h-72 lg:mb-6">
              <Image
                src={image}
                className="block rounded-md h-full"
                alt={"eventimage" + index}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          );
        })}
      </div>
      <div className="lg:w-4/5 lg:mx-auto">
        <div className="mb-2 bg-darkblue lg:rounded-md">
          <div className="mx-5 py-3  text-white">
            <div className="flex lg:flex-row lg:gap-x-2">
              <h2 className="text-2xl">{eventData.name}</h2>
              {today > new Date(eventData.end) && eventData.end !== null && (
                <div className="flex bg-red absolute font-bold top-3 right-0 text-white text-sm m-3 p-3 rounded-md lg:relative lg:top-0 lg:p-0 lg:m-0 lg:place-items-center">
                  <p className="lg:mx-2">COMPLETED</p>
                </div>
              )}
            </div>
            <p>
              <FaMapMarkerAlt className="inline text-white" />
              &nbsp;&nbsp;
              {eventData.city}, {eventData.country}
            </p>
            <p>
              <FaCalendar className="inline text-white" />
              &nbsp;&nbsp;
              {eventData.eventType === "Fixed Session" && eventData.start
                ? formattedStart + " - " + formattedEnd
                : eventData.eventType}
              {eventData.eventType === "Open / Continuous" ? (
                <span> Dates</span>
              ) : null}
            </p>
          </div>
        </div>
        <div className="mx-5">
          <div className="lg:flex lg:flex-row lg:justify-between lg:gap-3">
            <div className="lg:basis-3/5 lg:order-1">
              {eventData.min && eventData.max ? (
                <div className="border-b border-orange py-2">
                  <p className="font-bold">
                    <FaChild className="inline text-darkblue" />
                    &nbsp; For ages {eventData.min} - {eventData.max} years.
                  </p>
                </div>
              ) : null}
              <div className="border-b border-orange py-2">
                <p className="text-base whitespace-pre-line">
                  {eventData.description}
                </p>
              </div>
              <div className="border-b border-orange mb-2 py-2">
                <h4 className="mb-2 font-bold">
                  <FaAddressCard className="inline text-darkblue" />
                  &nbsp; Contact
                </h4>
                <div className="mx-2">
                  {eventData.email ? (
                    <p className="text-sm lg:text-base">
                      <FaEnvelope className="inline text-darkblue" />
                      &nbsp;&nbsp;
                      <a
                        href={"mailto:" + eventData.email}
                        className="hover:underline"
                      >
                        {eventData.email}
                      </a>
                    </p>
                  ) : null}
                  {eventData.fbPage ? (
                    <p className="break-words">
                      <FaFacebook className="inline text-darkblue" />
                      &nbsp;&nbsp;
                      <a
                        href={`https://${eventData.fbPage}`}
                        className="hover:underline text-xs lg:text-base"
                      >
                        {eventData.fbPage}
                      </a>
                    </p>
                  ) : null}
                  {eventData.website ? (
                    <p>
                      <FaGlobe className="inline text-darkblue" />
                      &nbsp;&nbsp;
                      <a
                        href={`https://${eventData.website}`}
                        // target="_blank"
                        className="hover:underline text-sm lg:text-base"
                      >
                        {eventData.website}
                      </a>
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="lg:order-2 lg:w-5/12">
              <div className="border-b border-orange mb-2 py-2 lg:border-none lg:mb-0">
                <Map
                  // defaultLocation={eventData.location}
                  lat={eventData.lat}
                  lon={eventData.lon}
                  zoomLevel={13}
                  mapHeight={"40vh"}
                  showPin={true}
                />
              </div>
              <p className="text-right text-xs italic">
                * Location may not be exact.
              </p>
            </div>
          </div>
          <div className="h-4 lg:h-10"></div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  try {
    const { data } = await supabaseAdmin.from("testEvents").select("id");
    console.log("👉 data", data);
    const paths = data.map((event) => ({
      params: {
        event: `${event.id}`,
      },
    }));
    return {
      paths,
      fallback: false,
    };
  } catch (err) {
    console.log(err);
  }
}

export async function getStaticProps({ params }) {
  try {
    const { data: eventData } = await supabaseAdmin
      .from("testEvents")
      .select("*")
      .eq("id", params.event);

    console.log("👉 eventData", eventData);

    const transformedImages = transformImages(eventData[0].images);
    let newImageUrls = [];
    if (transformedImages.length > 1) {
      newImageUrls = transformedImages.map((image) => {
        return image.toURL();
      });
    } else {
      newImageUrls = [transformedImages.toURL()];
    }

    return {
      props: {
        eventData: eventData[0],
        newImageUrls,
      },
    };
  } catch (err) {
    console.log(err);
  }
}