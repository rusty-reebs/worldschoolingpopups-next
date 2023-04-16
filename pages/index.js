import { createClient } from "@supabase/supabase-js";
import Nav from "../components/Nav";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import { transformImages } from "../_helpers/cloudinary";
import { format } from "date-fns";
import { addData } from "../_helpers/addData";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY
);

export async function getStaticProps() {
  const { data: lastUpdatedArray } = await supabaseAdmin
    .from("testEvents")
    .select("updated")
    .order("updated", { ascending: false })
    .limit(1);
  const lastUpdatedObj = lastUpdatedArray[0];

  try {
    const { data } = await supabaseAdmin.from("testEvents").select("*");
    console.log("supabase data", data);
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

export default function Home({ events, lastUpdated }) {
  return (
    <main className="bg-yellow text-black min-h-screen w-full">
      <Nav />
      <div className="flex flex-col mx-4 lg:flex lg:flex-col lg:justify-center lg:mx-10">
        <div className="text-center mb-4 lg:grid lg:grid-cols-3 lg:justify-items-center 2xl:grid 2xl:grid-cols-5 2xl:justify-items-center">
          <h3 className="text-lg lg:text-2xl lg:col-start-2 2xl:col-start-3">
            Events - Current and Upcoming{" "}
            <p className="inline-block text-base">({events.length})</p>
          </h3>
          {/* <button className="bg-red text-white" onClick={() => addData()}>
            BOOM
          </button> */}
          <h3 className="italic text-sm lg:mt-auto lg:ml-auto lg:text-base 2xl:col-start-5 2xl:ml-0">
            Last updated: {format(new Date(lastUpdated), "MMM d, yyyy")}
          </h3>
        </div>
        <div className="grid grid-cols-1 gap-y-6 mb-2 md:grid md:grid-cols-2 md:auto-rows-max md:gap-x-10 lg:grid lg:grid-cols-3 lg:auto-rows-max lg:gap-x-12 lg:gap-y-16 2xl:grid-cols-4">
          {events?.map((event) => {
            return (
              <div key={event.id}>
                {/* <Link to={`${event._id}`} key={event._id}> */}
                <Card
                  key={event.id}
                  imageUrl={event.imageUrl}
                  title={event.name}
                  country={event.country}
                />
                {/* </Link> */}
                {/* <Outlet /> */}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
