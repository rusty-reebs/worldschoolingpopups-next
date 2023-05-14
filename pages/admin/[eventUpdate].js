import EventForm from "@/components/components/EventForm";
import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function EventUpdate() {
  const router = useRouter();
  const user = useUser();

  useEffect(() => {
    if (!user) router.push("/admin");
  }, [user]);

  if (user) return <EventForm id={router.query.eventUpdate} />;
}
