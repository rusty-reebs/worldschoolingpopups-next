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
      } flex absolute top-3 right-0 font-bold text-sm m-3 p-3 rounded-full lg:relative lg:top-0 lg:py-1 lg:px-2 lg:m-0 lg:place-items-center`}
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
