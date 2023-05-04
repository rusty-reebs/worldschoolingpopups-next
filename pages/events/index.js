import Nav from "../../components/Nav";
import Card from "../../components/Card";
import { transformImages } from "../../_helpers/cloudinary";
import { format } from "date-fns";
import { addData } from "../../_helpers/addData";
import Link from "next/link";
import Button from "@/components/components/Button";
import Badge from "@/components/components/Badge";
import { supabaseAdmin } from "@/components/supabase";

// TODO About component in react-modern-drawer?
// TODO Image placeholders blur on [event].js
// * green comments

export async function getStaticProps() {
  try {
    const { data: lastUpdatedArray } = await supabaseAdmin
      .from("testEvents")
      .select("updated")
      .order("updated", { ascending: false })
      .limit(1);
    const [lastUpdatedObj] = lastUpdatedArray;

    const { data } = await supabaseAdmin.from("testEvents").select("*");
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
  return (
    <>
      <Nav />
      <div className="flex flex-col mx-4 lg:flex lg:flex-col lg:justify-center lg:mx-10">
        <div className="text-center mb-10 lg:grid lg:grid-cols-3 lg:justify-items-center 2xl:grid 2xl:grid-cols-5 2xl:justify-items-center">
          <div className="flex text-lg lg:text-2xl lg:col-start-2 2xl:col-start-3">
            Events - Current and Upcoming <Badge number={events.length} />
          </div>
          {/* <button className="bg-red text-white" onClick={() => addData()}>
            BOOM
          </button> */}
          <h3 className="italic text-sm lg:mt-auto lg:ml-auto lg:text-base 2xl:col-start-5 2xl:ml-0">
            Last updated: {format(new Date(lastUpdated), "MMM d, yyyy")}
          </h3>
        </div>
        <Link
          href="/events/map"
          className="fixed inset-x-0 bottom-8 z-10 text-center lg:text-lg"
        >
          <Button name="Map" mapIcon="true" />
        </Link>
        <div className="grid grid-cols-1 gap-y-6 mb-2 md:grid md:grid-cols-2 md:auto-rows-max md:gap-x-10 lg:grid lg:grid-cols-3 lg:auto-rows-max lg:gap-x-12 lg:gap-y-16 2xl:grid-cols-4">
          {events?.map((event) => (
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
      </div>
    </>
  );
}
