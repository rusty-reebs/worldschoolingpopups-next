import CarouselComp from "@/components/components/Carousel";
import Nav from "@/components/components/Nav";
import { transformImages } from "@/components/_helpers/cloudinary";
import { FaCalendar } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaChild } from "react-icons/fa";
import { FaAddressCard } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaGlobe } from "react-icons/fa";
import Image from "next/image";
import EmbeddedMap from "@/components/components/EmbeddedMap";
import DetailTextBlock from "@/components/components/DetailTextBlock";
import { useState } from "react";
import { supabaseClient } from "@/components/lib/supabaseClient";

//! getStaticPaths not working?

const tableName = process.env.NEXT_PUBLIC_TABLE_NAME;

export async function getStaticPaths() {
  try {
    const { data } = await supabaseClient.from(tableName).select("id");
    const paths = data?.map((event) => ({
      params: {
        event: `${event.id}`,
      },
    }));
    return {
      paths,
      fallback: "blocking",
    };
  } catch (err) {
    console.log(err);
  }
}

export async function getStaticProps({ params }) {
  try {
    const { data: eventData } = await supabaseClient.from(tableName).select("*").eq("id", params.event);

    const [eventObj] = eventData;

    const transformedImages = transformImages(eventObj.images);
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
        eventData: eventObj,
        newImageUrls,
      },
    };
  } catch (err) {
    console.log(err);
  }
}

export default function Detail({ eventData, newImageUrls }) {
  const [isLoading, setIsLoading] = useState(true);

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
    <>
      <div className="hidden md:block">
        <Nav />
      </div>
      <div className="md:hidden">
        <CarouselComp images={eventData.images} />
      </div>
      <div className="hidden md:flex md:justify-center md:gap-4 md:mb-6 md:w-full">
        {newImageUrls.map((image, index) => {
          return (
            <div key={index} className="relative aspect-4/3 md:h-44 lg:h-56 xl:h-72">
              <Image
                src={image}
                className={`rounded-md 
                ${isLoading ? "grayscale blur-2xl scale-110" : "grayscale-0 blur-0 scale-100"}`}
                alt={"eventimage" + index}
                fill
                priority
                style={{ objectFit: "fill" }}
                onLoadingComplete={() => setIsLoading(false)}
              />
            </div>
          );
        })}
      </div>
      <div className="flex flex-col md:mx-auto md:w-11/12 xl:w-10/12">
        <div className="mb-2 bg-darkblue md:rounded-md">
          <div className="mx-5 py-3  text-white">
            <div className="flex md:flex-row md:gap-x-2">
              <h2 className="text-2xl">{eventData.name}</h2>
              <DetailTextBlock
                isArchived={eventData.isArchived}
                isUnavailable={eventData.isUnavailable}
                isCompleted={today > new Date(eventData.end) && eventData.start !== null}
              />
            </div>
            <div className="flex items-center">
              <FaMapMarkerAlt className="inline text-white" />
              &nbsp;&nbsp;
              {eventData.city ? `${eventData.city}, ` : eventData.isMultipleLocations && "Multiple Locations, "}
              {eventData.country ? eventData.country : eventData.isGlobal && "Global"}
              {eventData.isOnline && (
                <div className="flex bg-emerald-500 font-bold text-sm ml-2 py-0.5 px-2 rounded-full">ONLINE</div>
              )}
            </div>
            <p>
              <FaCalendar className="inline text-white" />
              &nbsp;&nbsp;
              {eventData.eventType === "Fixed Session" && eventData.start
                ? formattedStart + " - " + formattedEnd
                : eventData.eventType}
              {eventData.eventType === "Open / Continuous" ? <span> Dates</span> : null}
            </p>
          </div>
        </div>
        <div className="mx-5 md:mx-0 lg:mx-5">
          <div className="md:flex md:flex-row md:justify-between md:gap-3">
            <div className="md:basis-3/5 lg:order-1">
              {eventData.min && eventData.max ? (
                <div className="border-b border-orange py-4">
                  <p className="font-bold">
                    <FaChild className="inline text-darkblue" />
                    &nbsp; For ages {eventData.min} - {eventData.max} years.
                  </p>
                </div>
              ) : null}
              <div className="border-b border-orange py-4">
                <p className="text-base whitespace-pre-line">{eventData.description}</p>
              </div>
              <div className="border-b border-orange mb-2 py-4">
                <h4 className="mb-2 font-bold">
                  <FaAddressCard className="inline text-darkblue" />
                  &nbsp; Contact
                </h4>
                <div>
                  {eventData.email ? (
                    <p className="text-sm lg:text-base">
                      <FaEnvelope className="inline text-darkblue" />
                      &nbsp;&nbsp;
                      <a href={"mailto:" + eventData.email} className="hover:underline">
                        {eventData.email}
                      </a>
                    </p>
                  ) : null}
                  {eventData.fbPage ? (
                    <p className="break-words">
                      <FaFacebook className="inline text-darkblue" />
                      &nbsp;&nbsp;
                      <a href={`https://${eventData.fbPage}`} className="hover:underline text-xs lg:text-base">
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
            {eventData.lat && eventData.lon && (
              <div className="lg:order-2 lg:w-5/12">
                <div className="border-b border-orange mb-2 py-2 md:border-none lg:mb-0 h-96 lg:pl-4">
                  <EmbeddedMap lat={eventData.lat} lon={eventData.lon} />
                </div>
                <p className="text-right text-xs italic">* Location may not be exact.</p>
              </div>
            )}
          </div>
          <div className="h-4 lg:h-10"></div>
        </div>
      </div>
    </>
  );
}
