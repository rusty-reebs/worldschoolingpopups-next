import Nav from "../../components/Nav";
import Card from "../../components/Card";
import { transformImages } from "../../_helpers/cloudinary";
import { format } from "date-fns";
import { addData } from "../../_helpers/addData";
import Link from "next/link";
import Button from "@/components/components/Button";
import Badge from "@/components/components/Badge";
import { useEffect, useState } from "react";
import { useFilterContext } from "@/components/contexts/context";
import { supabaseClient } from "@/components/lib/supabaseClient";

// TODO reset supabase keys
// TODO About component in react-modern-drawer?
// TODO production / dev environments, including Cloudinary test
// TODO ✅ fix EventType save on new (not saving default?)
// TODO check mobile views
// TODO ✅ fade div on state change
// TODO ✅ admin auth
// TODO ✅ Global Map component with no lat/lon
// TODO retain last scroll position
// * green comments

const tableName = process.env.NEXT_PUBLIC_TABLE_NAME;

export async function getStaticProps() {
  try {
    const { data: lastUpdatedArray } = await supabaseClient
      .from(tableName)
      .select("updated")
      .order("updated", { ascending: false })
      .limit(1);
    const [lastUpdatedObj] = lastUpdatedArray;

    const { data } = await supabaseClient.from(tableName).select("*");
    // console.log("supabase data", data);
    // get url for transformed cover images
    const result = data.map((event) => {
      const transformedImage = transformImages([event.images[0]]);
      const newUrl = transformedImage.toURL();
      const { images, ...rest } = event;
      return { ...rest, imageUrl: newUrl };
    });
    return {
      props: {
        lastUpdated: lastUpdatedObj.updated,
        events: result,
      },
    };
  } catch (err) {
    console.log(err);
  }
}

export default function Events({ events, lastUpdated }) {
  const [filteredEvents, setFilteredEvents] = useState(events);
  const today = new Date();
  const filters = ["All", "Current", "Completed", "Archived", "Unavailable"];
  const { filter, setFilter } = useFilterContext();

  useEffect(() => {
    setTimeout(() => {
      document.getElementById("fade-div").classList.remove("opacity-0");
      document.getElementById("fade-div").classList.add("opacity-100");
    }, 200);
  }, []);

  useEffect(() => {
    if (filter === "All") setFilteredEvents(events);
    if (filter === "Archived")
      setFilteredEvents(events.filter((event) => event.isArchived));
    if (filter === "Unavailable")
      setFilteredEvents(events.filter((event) => event.isUnavailable));
    if (filter === "Current")
      setFilteredEvents(
        events.filter((event) =>
          event.isArchived ||
          event.isUnavailable ||
          (today > new Date(event.end) && event.end !== null)
            ? null
            : event
        )
      );
    if (filter === "Completed")
      setFilteredEvents(
        events.filter((event) =>
          today > new Date(event.end) && event.end !== null ? event : null
        )
      );
  }, [filter]);

  return (
    <>
      <Nav />
      <div className="flex flex-col mx-4 lg:flex lg:flex-col lg:justify-center lg:mx-10">
        <div className="flex mb-10">
          <div className="flex gap-2 text-sm place-items-center">
            {filters.map((fltr) => (
              <div
                key={fltr}
                className={`px-2 py-1 w-fit rounded-full shadow-lg hover:border-2 hover:border-orange hover:-m-[2px] hover:cursor-pointer ${
                  filter === fltr
                    ? "bg-darkblue/90 text-white hover:border-none hover:m-0"
                    : "bg-lightblue"
                }`}
                onClick={() => {
                  document
                    .getElementById("fade-div")
                    .classList.remove("opacity-100");
                  document
                    .getElementById("fade-div")
                    .classList.add("opacity-0");
                  setFilter(fltr);
                  setTimeout(() => {
                    document
                      .getElementById("fade-div")
                      .classList.remove("opacity-0");
                    document
                      .getElementById("fade-div")
                      .classList.add("opacity-100");
                  }, 200);
                }}
              >
                {fltr}
              </div>
            ))}
          </div>
          <div className="flex mx-auto text-lg lg:text-2xl">
            Events -{" "}
            {filter === "Current"
              ? "Current and Upcoming"
              : filter === "Unavailable"
              ? "Currently Unavailable"
              : filter === "Completed"
              ? "Completed"
              : filter === "Archived"
              ? "Archived"
              : "All"}{" "}
            <Badge number={filteredEvents.length} />
          </div>
          <div className="flex items-center ml-auto italic text-sm lg:text-base">
            Last updated: {format(new Date(lastUpdated), "MMM d, yyyy")}
          </div>
        </div>
        <div
          id="fade-div"
          className={`transition-all duration-150 ease-out opacity-0 grid grid-cols-1 gap-y-6 mb-2 md:grid md:grid-cols-2 md:auto-rows-max md:gap-x-10 lg:grid lg:grid-cols-3 lg:auto-rows-max lg:gap-x-12 lg:gap-y-16 2xl:grid-cols-4`}
        >
          {filteredEvents?.map((event) => (
            <div key={event.id} className="last:pb-20">
              <Link
                href={{
                  pathname: "/events/[event]",
                  query: { event: event.id },
                }}
              >
                <Card key={event.id} event={event} />
              </Link>
            </div>
          ))}
        </div>
        <Link
          href="/events/map"
          className="fixed inset-x-0 bottom-8 z-10 text-center lg:text-lg"
        >
          <Button name="Map" mapIcon="true" />
        </Link>
      </div>
    </>
  );
}
