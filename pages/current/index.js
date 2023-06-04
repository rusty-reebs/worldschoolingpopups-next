import { PER_PAGE } from "./[page]";
import PaginationPage from "../../components/PaginationPage";
import { supabaseClient } from "../../lib/supabaseClient";

const tableName = process.env.NEXT_PUBLIC_TABLE_NAME;

export default function Current({ events, total, currentPage }) {
  return (
    <PaginationPage
      events={events}
      currentPage={currentPage}
      total={total}
      perPage={PER_PAGE}
    />
  );
}

export const getStaticProps = async () => {
  try {
    const { count, error } = await supabaseClient
      .from("current")
      .select("*", { count: "exact", head: true });
    const { data } = await supabaseClient
      //   .from(tableName)
      //   .select("*")
      //   .neq("isArchived", true)
      //   .neq("isUnavailable", true)
      //   .gt("end", new Date())
      //   .neq("end", null)
      //   .order("eventType", { ascending: true })
      //   .order("start", { ascending: false })
      .from("current")
      .select("*")
      .limit(PER_PAGE);
    // console.log("👉 data", data);
    return {
      props: {
        events: data,
        total: count,
        currentPage: 1,
      },
    };
  } catch (err) {
    console.log(err);
  }
};
