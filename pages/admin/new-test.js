import EventForm from "@/components/components/EventForm";
import { supabaseClient } from "@/components/lib/supabaseClient";
import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function NewTest() {
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
        .rpc("is_claims_admin", {})
        // .rpc("get_claim", { uid: user.id, claim: "admin" })
        .then((data) => console.log("👉 data", data.data));
    myClaims();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const { data, error } = await supabaseClient.rpc("get_my_claims", {});
    // console.log("👉 data", data);
    // console.log("👉 error", error);
    // console.log("👉 myTest", myTest);
    // const { data, error } = await supabaseClient
    //   .from("testEvents")
    //   .insert({ id: 100, name: myTest }, { returning: "minimal" });
    if (error) {
      console.error(error);
      //TODO more error handling here
    }
  };
  return (
    <form className="flex gap-5 justify-center" onSubmit={handleSubmit}>
      <input
        type="text"
        value={myTest}
        onChange={(e) => setMyTest(e.currentTarget.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
