import EventForm from "@/components/components/EventForm";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// import data from "../../../../../../../Users/russell/Downloads/backup.json";
import data from "../../backup-may27.json";
const lookup = require("country-code-lookup");

export default function NewTest() {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const user = useUser();
  const [myTest, setMyTest] = useState("");
  console.log("👉 user", user);
  //   useEffect(() => {
  //     if (!user) router.push("/admin");
  //   }, [user]);
  useEffect(() => {
    const myClaims = async () =>
      supabaseClient
        // .rpc("is_claims_admin", {})
        .rpc("get_claim", { uid: user?.id, claim: "admin" })
        .then((data) => console.log("👉 data", data.data));
    myClaims();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const { data, error } = await supabaseClient.rpc("get_my_claims", {});
    // console.log("👉 data", data);
    // console.log("👉 error", error);
    // console.log("👉 myTest", myTest);
    const { data, error } = await supabaseClient
      .from("testEvents")
      .insert({ id: 100, name: myTest });
    if (error) {
      console.error(error);
      //TODO more error handling here
    }
  };

  const transformData = async () => {
    // const firstTen = data.slice(0, 10);
    // console.log("👉 firstTen", firstTen);
    const newTableFormat = data.map((event) => {
      const info = lookup.byCountry(event.location.country);
      return {
        created_at: event.dateSubmitted ? new Date(event.dateSubmitted) : null,
        name: event.name,
        country: event.location.country,
        images: event.images,
        updated: null,
        city: event.location.city,
        lat: event.location.lat,
        lon: event.location.lon,
        eventType: event.date.eventType,
        start: event.date.start ? new Date(event.date.start) : null,
        end: event.date.end ? new Date(event.date.end) : null,
        min: event.age.min,
        max: event.age.max,
        description: event.description,
        email: event.contact.email,
        website: event.contact.website,
        fbPage: event.contact.fbPage,
        isArchived: false,
        isUnavailable: false,
        isMultipleLocations: false,
        isGlobal: false,
        countryCode: info.iso2,
        isOnline: false,
      };
    });
    const { error } = await supabaseClient
      .from("production")
      .insert(newTableFormat);
    console.log("👉 error", error);
  };

  const uploadData = async () => {
    const { error } = await supabaseClient.from("production").insert(dataArray);
    console.log("👉 error", error);
  };

  return (
    <div className="flex flex-col gap-10">
      <form className="flex gap-5 justify-center" onSubmit={handleSubmit}>
        <input
          type="text"
          value={myTest}
          onChange={(e) => setMyTest(e.currentTarget.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <div className="flex flex-col gap-10">
        <div className="mx-auto">
          <button
            className="border border-black p-2 rounded-lg bg-darkblue text-white shadow-md"
            onClick={() => transformData()}
          >
            Transform
          </button>
        </div>
        <div className="mx-auto">
          <button
            className="border border-black p-2 rounded-lg bg-darkblue text-white shadow-md"
            onClick={() => uploadData()}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}
