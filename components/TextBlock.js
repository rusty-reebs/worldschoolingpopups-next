export default function TextBlock({ isCompleted, isArchived, isUnavailable }) {
  return (
    <div
      className={`${
        isCompleted
          ? "bg-red text-white"
          : isArchived
          ? "bg-indigo-500 text-white"
          : isUnavailable
          ? "bg-amber-200 text-black"
          : ""
      } absolute font-bold top-0 right-0 text-sm m-3 py-2 px-3 rounded-full`}
    >
      {isCompleted
        ? "COMPLETED"
        : isArchived
        ? "ARCHIVED"
        : "CURRENTLY UNAVAILABLE"}
    </div>
  );
}
