import Link from "next/link";
import { useRouter } from "next/router";

export default function Filters({}) {
  const router = useRouter();
  const filters = ["All", "Current", "Completed", "Archived", "Unavailable"];

  return (
    <div className="flex gap-1 text-xs mb-4 place-self-center md:gap-3 xl:mb-0 lg:text-sm place-items-center">
      {filters.map((fltr) => (
        <Link
          key={fltr}
          href={`/${fltr.toLowerCase()}`}
          className={`px-2 py-1 w-fit rounded-full shadow-lg hover:border-2 hover:border-orange hover:-m-[2px] hover:cursor-pointer ${
            router.pathname.includes(`/${fltr.toLowerCase()}`)
              ? "bg-darkblue/90 text-white hover:border-none hover:m-0"
              : "bg-lightblue"
          }`}
        >
          {fltr}
        </Link>
      ))}
    </div>
  );
}
