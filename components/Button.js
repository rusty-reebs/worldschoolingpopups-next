import { IconContext } from "react-icons";
import { FaMap } from "react-icons/fa";

export default function Button({ name, mapIcon, type, disabled }) {
  return (
    <button
      className="bg-darkblue text-white py-1 px-3 border rounded-lg disabled:bg-opacity-60 disabled:text-gray-200 disabled:hover:cursor-not-allowed"
      type={type}
      disabled={disabled}
    >
      {mapIcon ? (
        <IconContext.Provider value={{ style: { verticalAlign: "middle" } }}>
          <FaMap className="inline-block" />
          &nbsp;&nbsp;
        </IconContext.Provider>
      ) : null}
      {name}
    </button>
  );
}
