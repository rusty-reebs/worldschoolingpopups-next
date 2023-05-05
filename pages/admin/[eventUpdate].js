import EventForm from "@/components/components/EventForm";
import { useRouter } from "next/router";

export default function EventUpdate() {
  const router = useRouter();
  return <EventForm id={router.query.eventUpdate} />;
}
