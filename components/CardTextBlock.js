export default function CardTextBlock({
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
      } absolute font-bold top-0 right-0 text-sm m-3 py-2 px-3 rounded-full`}
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
