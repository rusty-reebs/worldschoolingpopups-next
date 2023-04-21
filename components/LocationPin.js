import Link from "next/link";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function LocationPin({ noRedirect, id, name, isCompleted }) {
  return (
    <div>
      {noRedirect ? (
        <div className="text-darkblue">
          <FaMapMarkerAlt className="inline text-2xl" />
        </div>
      ) : (
        <Link href={"/events/" + id}>
          <div
            className={`flex flex-row ${
              isCompleted ? "text-red" : "text-darkblue"
            } w-fit whitespace-nowrap`}
          >
            <FaMapMarkerAlt className="inline text-2xl" />
            <p className="bg-orange block my-auto text-black text-md px-2 py-1 rounded-md">
              {name}
            </p>
          </div>
        </Link>
      )}
    </div>
  );
}
