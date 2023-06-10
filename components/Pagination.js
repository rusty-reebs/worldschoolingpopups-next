import Link from "next/link";
import usePagination from "../hooks/usePagination";
export const dotts = "...";

export default function Pagination({
  total,
  currentPage,
  perPage = 12,
  renderPageLink,
}) {
  const pages = usePagination(total, currentPage, perPage);

  return (
    <div className="flex items-center justify-center gap-3 my-8">
      {pages?.map((pageNumber, i) =>
        pageNumber === dotts ? (
          <span
            key={i}
            className="px-4 pt-2 rounded-full text-sm font-semibold text-black"
          >
            {pageNumber}
          </span>
        ) : (
          <Link
            key={i}
            href={renderPageLink(pageNumber)}
            className={`${
              pageNumber === currentPage
                ? "bg-darkblue/90 text-white hover:border-none hover:m-0"
                : "bg-lightblue"
            } px-4 py-2 rounded-full text-sm font-semibold no-underline hover:border-2 hover:border-orange hover:-m-[2px] hover:cursor-pointer`}
          >
            {pageNumber}
          </Link>
        )
      )}
    </div>
  );
}
