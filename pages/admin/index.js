import { useEffect, useMemo, useState } from "react";
import Nav from "@/components/components/Nav"; // import { exportArray } from "../../_helpers/exportArray";
import { FaArchive, FaEdit, FaEye, FaHourglass, FaTrash } from "react-icons/fa";
import { CgUnavailable } from "react-icons/cg";
import { supabaseAdmin } from "@/components/supabase";
import { useRouter } from "next/router";

export default function Admin() {
  const [isLoading, setIsLoading] = useState(true);
  const [isWorking, setIsWorking] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [masterEvents, setMasterEvents] = useState([]); //TODO useMemo
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");

  const router = useRouter();

  useEffect(() => {
    const getEvents = async () => {
      try {
        const { data } = await supabaseAdmin
          .from("testEvents")
          .select("id, name, end, isArchived, isUnavailable, images")
          .order("eventType", { ascending: false })
          .order("start", { ascending: false });
        setMasterEvents(data);
        setEvents(data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getEvents();
  }, []);

  useEffect(() => {
    const handleStart = (url) => {
      const id = parseInt(url.split("/")[2]);
      setIsWorking(id);
    };
    const handleStop = (url) => {};

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
    };
  }, [router]);

  const handleSearch = (e) => {
    const result = masterEvents.filter((event) => {
      if (e.currentTarget.value === "") return masterEvents;
      return event.name
        .toLowerCase()
        .includes(e.currentTarget.value.toLowerCase());
    });
    setSearch(e.currentTarget.value);
    setEvents(result);
  };

  const isCompleted = (id) => {
    const event = events.find((event) => event.id === id);
    const today = new Date();
    if (today > new Date(event.end) && event.end !== null) {
      return (
        <div className="px-2 py-1 h-fit w-fit bg-red text-white text-xs rounded-full">
          COMPLETED
        </div>
      );
    }
  };

  const handleUnavailable = async (id) => {
    setIsWorking(id);
    const currentStatus = events.find((event) => event.id === id);
    if (currentStatus.isArchived && !currentStatus.isUnavailable) {
      return setErrorMessage("Oh no! That event is already archived. 🤔");
    }
    try {
      const { error } = await supabaseAdmin
        .from("testEvents")
        .update({ isUnavailable: currentStatus.isUnavailable ? false : true })
        .eq("id", id);
      if (!error) {
        setEvents((prev) =>
          prev.map((event) => {
            return event.id === id
              ? {
                  ...event,
                  isUnavailable: currentStatus.isUnavailable ? false : true,
                }
              : event;
          })
        );
        setIsWorking("");
      } else {
        setErrorMessage("Oops! Something broke! 😪");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleArchive = async (id) => {
    setIsWorking(id);
    const currentStatus = events.find((event) => event.id === id);
    if (currentStatus.isUnavailable && !currentStatus.isArchived) {
      return setErrorMessage("Oh no! That event is already unavailable. 🤔");
    }
    try {
      const { error } = await supabaseAdmin
        .from("testEvents")
        .update({ isArchived: currentStatus.isArchived ? false : true })
        .eq("id", id);
      if (!error) {
        setEvents((prev) =>
          prev.map((event) => {
            return event.id === id
              ? {
                  ...event,
                  isArchived: currentStatus.isArchived ? false : true,
                }
              : event;
          })
        );
        setIsWorking("");
      } else {
        setErrorMessage("Oops! Something broke! 😪");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleTest = async () => {
    const strings = ["abcdef"];
    const response = await fetch("/api/cloudinary-delete", {
      method: "POST",
      body: JSON.stringify(strings),
    });
    console.log("👉 response", response);
  };

  const handleDelete = async (id, imagesArray) => {
    const public_ids = imagesArray.map((image) => image.cloudinary_id);
    setIsWorking(id);
    let response = null;
    let supabaseError = null;
    try {
      response = await fetch("/api/cloudinary-delete", {
        method: "POST",
        body: JSON.stringify(public_ids),
      });
      if (!response.ok) {
        return () => {
          setErrorMessage("Oops! Something broke! 😪");
          setIsWorking("");
        };
      } else {
        try {
          const { error } = await supabaseAdmin
            .from("testEvents")
            .delete()
            .eq("id", id);
          supabaseError = error;
        } catch (err) {
          console.log(err);
        }
        if (!supabaseError) {
          setEvents((prev) => prev.filter((event) => event.id !== id));
        } else setErrorMessage("Oops! Something broke! 😪");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // const handleLogout = async () => {
  //   try {
  //     const res = await fetch(myApi + "/logout", {
  //       method: "GET",
  //       credentials: "include",
  //       headers: {
  //         // Accept: "application/json, text/plain, */*",
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     const result = await res.json();
  //     console.log("👉 result", result);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <>
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
        <div className="flex flex-col w-1/2 mx-auto">
          <div className="text-xl py-8 mx-auto">Manage Listings</div>
          <div className="flex pb-8">
            <div className="self-center">
              <input
                type="text"
                className="px-3 py-1 border border-darkblue border-opacity-40 shadow-md rounded-lg w-72"
                placeholder="Search events..."
                value={search}
                onChange={handleSearch}
              />
            </div>
            <div className="ml-auto mr-11">
              <button
                className="bg-darkblue text-white py-1 px-3 border rounded-lg mr-4"
                onClick={() => router.push("/admin/new")}
              >
                Add New
              </button>
              <button
                className="bg-darkblue text-white py-1 px-3 border rounded-lg mr-4"
                // onClick={() => exportArray("ws-export.json", eventData)}
              >
                Backup Data
              </button>
              <button
                className="bg-darkblue text-white py-1 px-3 border rounded-lg"
                // onClick={() => handleLogout()}
                // onClick={() => handleTest()}
              >
                Logout
                {/* TEST */}
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            {events?.map((event) => (
              <div key={event.id} className="flex flex-col gap-2 last:pb-20">
                <div className="flex w-full">
                  <div className="flex flex-row p-2 border border-darkblue border-opacity-40 bg-white rounded-md shadow-lg w-full justify-between">
                    <div
                      className={`flex flex-col gap-1 ${
                        event.isArchived || event.isUnavailable
                          ? "line-through"
                          : ""
                      }`}
                    >
                      {event.name}
                      {isCompleted(event.id)}
                    </div>
                    <div className="flex gap-4 items-center">
                      {event.isArchived && (
                        <div className="py-1 px-2 bg-indigo-500 text-white self-center h-fit text-xs font-medium rounded-xl">
                          Archived
                        </div>
                      )}
                      {event.isUnavailable && (
                        <div className="py-1 px-2 bg-amber-400 text-black self-center h-fit text-xs font-medium rounded-xl">
                          Unavailable
                        </div>
                      )}
                      <div className="flex flex-row gap-4">
                        <button
                          onClick={() => router.push(`/events/${event.id}`)}
                        >
                          <FaEye size={16} />
                        </button>
                        <button
                          onClick={() => router.push(`/admin/${event.id}`)}
                        >
                          <FaEdit size={16} />
                        </button>
                        <button onClick={() => handleUnavailable(event.id)}>
                          <CgUnavailable size={16} />
                        </button>
                        <button onClick={() => handleArchive(event.id)}>
                          <FaArchive size={16} />
                        </button>
                        <button>
                          <FaTrash
                            size={16}
                            onClick={() => handleDelete(event.id, event.images)}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex w-12 self-center justify-center">
                    {isWorking === event.id && (
                      <FaHourglass className="animate-spin" size={16} />
                    )}
                  </div>
                </div>
                {errorMessage && isWorking === event.id && (
                  <div className="flex bg-red text-white text-sm px-2 py-1 items-center rounded-full ml-6 mr-auto">
                    <div>{errorMessage}</div>
                    <div
                      className="bg-yellow text-black text-xs px-2 py-1 rounded-xl ml-3 hover:cursor-pointer"
                      onClick={() => {
                        setErrorMessage("");
                        setIsWorking("");
                      }}
                    >
                      OK
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
