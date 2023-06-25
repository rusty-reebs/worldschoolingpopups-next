import Pagination from "./Pagination";
import Card from "./Card";
import Nav from "./Nav";
import Filters from "./Filters";
import Link from "next/link";
import { useEffect } from "react";
import Badge from "@/components/components/Badge";
import { useRouter } from "next/router";
import { format } from "date-fns";

export default function PaginationPage({
  filter,
  currentPage,
  lastUpdated,
  total,
  perPage,
  events,
}) {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      document.getElementById("fade-div").classList.remove("opacity-0");
      document.getElementById("fade-div").classList.add("opacity-100");
    }, 200);
  }, []);

  return (
    <>
      <Nav />
      <div className="flex flex-col mx-3 md:mx-8 lg:justify-center xl:mx-10 pb-4 md:pb-10">
        <div className="flex flex-col mb-6 xl:flex-row xl:mb-10">
          <Filters />
          <div className="flex text-lg justify-center lg:justify-normal lg:mx-auto lg:text-2xl">
            Events -{" "}
            {router.pathname.includes("/current")
              ? "Current and Upcoming"
              : router.pathname.includes("/unavailable")
              ? "Currently Unavailable"
              : router.pathname.includes("/completed")
              ? "Completed"
              : router.pathname.includes("/archived")
              ? "Archived"
              : "All"}{" "}
            <Badge number={total} />
          </div>
          <div className="flex justify-center xl:justify-normal items-center xl:ml-auto italic text-sm lg:text-base">
            Last updated: {format(new Date(lastUpdated), "MMM d, yyyy")}
          </div>
        </div>
        {!events.length ? (
          <div id="fade-div" className="mx-auto mt-10">
            No events meet this filter criteria.
          </div>
        ) : (
          <div
            id="fade-div"
            className={`transition-all duration-150 ease-out opacity-0 grid grid-cols-1 gap-y-6 mb-2 md:grid md:grid-cols-2 md:auto-rows-max md:gap-x-10 lg:grid lg:grid-cols-3 lg:auto-rows-max lg:gap-x-12 lg:gap-y-16 2xl:grid-cols-4`}
          >
            {events?.map((event) => (
              <div key={event.id} className="last:pb-8">
                <Link
                  href={{
                    pathname: "/events/[event]",
                    query: { event: event.id },
                  }}
                >
                  <Card key={event.id} {...event} />
                </Link>
              </div>
            ))}
          </div>
        )}
        <Pagination
          total={total}
          currentPage={currentPage}
          perPage={perPage}
          renderPageLink={(page) => `/${filter}/${page}`}
        />
      </div>
    </>
  );
}
