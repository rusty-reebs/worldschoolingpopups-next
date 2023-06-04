import Link from "next/link";
import usePagination from "../hooks/usePagination";
export const dotts = "...";

export default function Pagination({
  total,
  currentPage,
  perPage = 12,
  renderPageLink,
}) {
  console.log("👉 total", total);
  console.log("👉 currentPage", currentPage);

  const pages = usePagination(total, currentPage, perPage);
  console.log("👉 pages", pages);
  return (
    <div className="flex items-center justify-center my-8 bg-blue-200">
      {pages?.map((pageNumber, i) =>
        pageNumber === dotts ? (
          <span
            key={i}
            className="px-4 py-2 rounded-full text-sm font-semibold text-black"
          >
            {pageNumber}
          </span>
        ) : (
          <Link
            key={i}
            href={renderPageLink(pageNumber)}
            className={`${
              pageNumber === currentPage ? "text-success-dark" : "text-black"
            } px-4 py-2 mx-1 rounded-full text-sm font-semibold no-underline`}
          >
            {pageNumber}
          </Link>
        )
      )}
    </div>
  );
}
