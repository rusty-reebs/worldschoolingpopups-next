import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../../components/Nav";
import { myApi } from "../../App";
// import { exportArray } from "../../_helpers/exportArray";
import { FaArchive, FaEdit, FaEye, FaHourglass, FaTrash } from "react-icons/fa";

export default function Admin() {
  const [isLoading, setIsLoading] = useState(true);
  const [isWorking, setIsWorking] = useState("");
  const [events, setEvents] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetch(myApi + "/admin", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        if (data.ok) {
          const result = await data.json();
          console.log("👉 result", result);
          setEvents(result.events);
          setIsLoading(false);
        } else navigate("/login");
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const eventIds = events.map((event) => {
    return { pathname: "/admin/" + event._id, event: event };
  });

  const handleArchive = async (id) => {
    setIsWorking(id);
    try {
      const response = await fetch(`${myApi}/events/${id}/archive`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (response.ok) {
        setEvents((prev) =>
          prev.map((event) => {
            return event._id === id ? { ...event, isArchived: true } : event;
          })
        );
      }
      setIsWorking("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    setIsWorking(id);
    try {
      const response = await fetch(`${myApi}/events/${id}/delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (response.ok) {
        setEvents((prev) => prev.filter((event) => event._id !== id));
      }
      setIsWorking("");
    } catch (error) {
      console.log(error);
    }
    // TODO delete images from Cloudinary
  };

  const handleLogout = async () => {
    try {
      const res = await fetch(myApi + "/logout", {
        method: "GET",
        credentials: "include",
        headers: {
          // Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      });
      const result = await res.json();
      console.log("👉 result", result);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-yellow h-screen w-full">
      <Nav />
      {isLoading ? (
        <div className="bg-yellow flex h-screen w-full align-middle">
          <div className="flex justify-center flex-col mx-auto">
            <div className="flex items-center justify-center space-x-2 animate-pulse">
              <div className="w-8 h-8 bg-orange rounded-full"></div>
              <div className="w-8 h-8 bg-orange rounded-full"></div>
              <div className="w-8 h-8 bg-orange rounded-full"></div>
            </div>
            <div className="text-center text-sm text-black mt-4">
              Loading...
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col w-full">
          <div className="text-xl py-8 mx-auto">Manage Listings</div>
          <div className="flex gap-5 pb-8 mx-auto">
            <button
              className="bg-darkblue text-white py-1 px-3 border rounded-lg mx-auto"
              onClick={() => handleLogout()}
            >
              Logout
            </button>
            <button
              className="bg-darkblue text-white py-1 px-3 border rounded-lg mx-auto"
              // onClick={() => exportArray("ws-export.json", eventData)}
            >
              Backup Data
            </button>
          </div>
          <div className="flex flex-col gap-5 mx-auto w-1/2">
            {events?.map((event) => (
              <div key={event._id} className="flex w-full ml-6">
                <div className="flex flex-row p-2 border border-darkblue border-opacity-40  bg-white rounded-md shadow-lg w-full">
                  <div className="">{event.name}</div>
                  <div className="flex gap-4 ml-auto">
                    {event.isArchived && (
                      <div className="py-1 px-2 bg-red text-white text-xs font-medium rounded-xl">
                        Archived
                      </div>
                    )}
                    <div className="flex flex-row gap-4 ml-auto">
                      <button onClick={() => navigate(`/events/${event._id}`)}>
                        <FaEye size={16} />
                      </button>
                      <button onClick={() => navigate(`/admin/${event._id}`)}>
                        <FaEdit size={16} />
                      </button>
                      <button onClick={() => handleArchive(event._id)}>
                        <FaArchive
                          size={16}
                          className={`${
                            event.isArchived ? "text-grey" : "text-black"
                          }`}
                        />
                      </button>
                      <button className="">
                        <FaTrash
                          size={16}
                          onClick={() => handleDelete(event._id)}
                        />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex w-12 self-center justify-center">
                  {isWorking === event._id && (
                    <FaHourglass className="animate-spin" size={16} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
