import { useRouter } from "next/router";
import Nav from "../../components/Nav";
import Card from "../../components/Card";
import { transformImages } from "../../_helpers/cloudinary";
import { format } from "date-fns";
import Link from "next/link";
import Button from "@/components/components/Button";
import Badge from "@/components/components/Badge";
import { useEffect, useState } from "react";
import { useFilterContext } from "@/components/contexts/context";
import { supabaseClient } from "@/components/lib/supabaseClient";

// TODO About component in react-modern-drawer?
// TODO pagination and remove filter context
// TODO ✅ check for correct totals on filters/table views
// TODO remove lastUpdated call from all pages, call once and pass
// TODO ✅ remove pagination when only one page
// TODO check console 404 error in local production for /archived and /unavailable
// TODO ✅ /events redirects to /current
// TODO ✅ completed events reverse order
// TODO ✅ try tailwind 'truncate' for text overflow
// TODO ✅ date sorting - soonest should be at top
// TODO update to react-icons
// TODO ✅ production / dev environments, including Cloudinary test
// TODO clean Cloudinary media library
// TODO ✅ update Full School Year to Follows School Year
// TODO ✅ fix Card bottom line on small screens
// TODO ✅ fix filter buttons spacing/alignment on small screens
// TODO ✅ tablet size styling
// TODO ✅ default sorting on index page
// TODO ✅ fix EventType save on new (not saving default?)
// TODO ✅ check mobile views
// TODO ✅ fade div on state change
// TODO ✅ admin auth
// TODO ✅ Global Map component with no lat/lon
// TODO retain last scroll position
// * green comments

// const tableName = process.env.NEXT_PUBLIC_TABLE_NAME;

// export async function getStaticProps() {
//   try {
//     const { data: lastUpdated } = await supabaseClient
//       .from(tableName)
//       .select("updated")
//       .order("updated", { ascending: false, nullsFirst: false })
//       .limit(1)
//       .single();

//     const { data } = await supabaseClient
//       .from(tableName)
//       .select("*")
//       .order("eventType", { ascending: true })
//       .order("start", { ascending: true });
//     // console.log("supabase data", data);
//     // get url for transformed cover images
//     const result = data.map((event) => {
//       const transformedImage = transformImages([event.images[0]]);
//       const newUrl = transformedImage.toURL();
//       const { images, ...rest } = event;
//       return { ...rest, imageUrl: newUrl };
//     });
//     return {
//       props: {
//         lastUpdated: lastUpdated.updated,
//         events: result,
//       },
//       revalidate: 60,
//     };
//   } catch (err) {
//     console.log(err);
//   }
// }

// export default function Events({ events, lastUpdated }) {
export default function Events() {
  const router = useRouter();
  useEffect(() => {
    router.push("/current");
  }, [router]);
}

// const [filteredEvents, setFilteredEvents] = useState(events);
// const today = new Date();
// const filters = ["All", "Current", "Completed", "Archived", "Unavailable"];
// const { filter, setFilter } = useFilterContext();

// useEffect(() => {
//   setTimeout(() => {
//     document.getElementById("fade-div").classList.remove("opacity-0");
//     document.getElementById("fade-div").classList.add("opacity-100");
//   }, 200);
// }, []);

// useEffect(() => {
//   if (filter === "All") setFilteredEvents(events);
//   if (filter === "Archived")
//     setFilteredEvents(events.filter((event) => event.isArchived));
//   if (filter === "Unavailable")
//     setFilteredEvents(events.filter((event) => event.isUnavailable));
//   if (filter === "Current")
//     setFilteredEvents(
//       events.filter((event) =>
//         event.isArchived ||
//         event.isUnavailable ||
//         (today > new Date(event.end) && event.end !== null)
//           ? null
//           : event
//       )
//     );
//   if (filter === "Completed")
//     setFilteredEvents(
//       events.filter((event) =>
//         today > new Date(event.end) && event.end !== null ? event : null
//       )
//     );
// }, [filter]);

// return (
//   <>
//     <Nav />
//     <div className="flex flex-col mx-3 md:mx-8 lg:justify-center xl:mx-10">
//       <div className="flex flex-col mb-6 xl:flex-row xl:mb-10">
//         <div className="flex gap-1 text-xs mb-4 place-self-center md:gap-3 xl:mb-0 lg:text-sm place-items-center">
//           {filters.map((fltr) => (
//             <div
//               key={fltr}
//               className={`px-2 py-1 w-fit rounded-full shadow-lg hover:border-2 hover:border-orange hover:-m-[2px] hover:cursor-pointer ${
//                 filter === fltr
//                   ? "bg-darkblue/90 text-white hover:border-none hover:m-0"
//                   : "bg-lightblue"
//               }`}
//               onClick={() => {
//                 document
//                   .getElementById("fade-div")
//                   .classList.remove("opacity-100");
//                 document
//                   .getElementById("fade-div")
//                   .classList.add("opacity-0");
//                 setFilter(fltr);
//                 setTimeout(() => {
//                   document
//                     .getElementById("fade-div")
//                     .classList.remove("opacity-0");
//                   document
//                     .getElementById("fade-div")
//                     .classList.add("opacity-100");
//                 }, 200);
//               }}
//             >
//               {fltr}
//             </div>
//           ))}
//         </div>
//         <div className="flex text-lg justify-center lg:justify-normal lg:mx-auto lg:text-2xl">
//           Events -{" "}
//           {filter === "Current"
//             ? "Current and Upcoming"
//             : filter === "Unavailable"
//             ? "Currently Unavailable"
//             : filter === "Completed"
//             ? "Completed"
//             : filter === "Archived"
//             ? "Archived"
//             : "All"}{" "}
//           <Badge number={filteredEvents.length} />
//         </div>
//         <div className="flex justify-center xl:justify-normal items-center xl:ml-auto italic text-sm lg:text-base">
//           Last updated: {format(new Date(lastUpdated), "MMM d, yyyy")}
//         </div>
//       </div>
//       {!filteredEvents.length ? (
//         <div id="fade-div" className="mx-auto mt-10">
//           No events meet this filter criteria.
//         </div>
//       ) : (
//         <div
//           id="fade-div"
//           className={`transition-all duration-150 ease-out opacity-0 grid grid-cols-1 gap-y-6 mb-2 md:grid md:grid-cols-2 md:auto-rows-max md:gap-x-10 lg:grid lg:grid-cols-3 lg:auto-rows-max lg:gap-x-12 lg:gap-y-16 2xl:grid-cols-4`}
//         >
//           {filteredEvents?.map((event) => (
//             <div key={event.id} className="last:pb-20">
//               <Link
//                 href={{
//                   pathname: "/events/[event]",
//                   query: { event: event.id },
//                 }}
//               >
//                 <Card key={event.id} event={event} />
//               </Link>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   </>
// );
// }
