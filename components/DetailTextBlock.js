export default function DetailTextBlock({
  isCompleted,
  isArchived,
  isUnavailable,
}) {
  return (
    <div
      className={`${
        isArchived
          ? "bg-indigo-500 text-white"
          : isUnavailable
          ? "bg-amber-200 text-black"
          : isCompleted
          ? "bg-red text-white"
          : ""
      } flex absolute top-3 right-0 font-bold text-sm m-3 p-3 rounded-full md:relative md:top-0 md:py-1 md:px-2 md:m-0 md:place-items-center`}
    >
      {isArchived
        ? "ARCHIVED"
        : isUnavailable
        ? "CURRENTLY UNAVAILABLE"
        : isCompleted
        ? "COMPLETED"
        : ""}
    </div>
  );
}
