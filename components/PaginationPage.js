import Pagination from "./Pagination";
import Card from "./Card";
import Link from "next/link";
import { useEffect } from "react";
export default function PaginationPage({
  currentPage,
  total,
  perPage,
  events,
}) {
  useEffect(() => {
    setTimeout(() => {
      document.getElementById("fade-div").classList.remove("opacity-0");
      document.getElementById("fade-div").classList.add("opacity-100");
    }, 200);
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div>Page {currentPage}</div>
      <Pagination
        total={total}
        currentPage={currentPage}
        perPage={perPage}
        renderPageLink={(page) => `/current/${page}`}
      />
      <div
        id="fade-div"
        className={`transition-all duration-150 ease-out opacity-0 grid grid-cols-1 gap-y-6 mb-2 md:grid md:grid-cols-2 md:auto-rows-max md:gap-x-10 lg:grid lg:grid-cols-3 lg:auto-rows-max lg:gap-x-12 lg:gap-y-16 2xl:grid-cols-4`}
      >
        {events?.map((event) => (
          <div key={event.id} className="last:pb-20">
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
    </div>
  );
}
