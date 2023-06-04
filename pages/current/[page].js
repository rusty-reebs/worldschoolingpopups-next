import PaginationPage from "../../components/PaginationPage";
import { supabaseClient } from "../../lib/supabaseClient";

export const PER_PAGE = 12;

export const getStaticPaths = async () => {
  return {
    // prerender the next 5 pages after the first, which is handled by the index page
    paths: Array.from({ length: 3 }).map((_, i) => `/current/${i + 2}`),
    // block request for non-generated pages and cache them in the background
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params }) => {
  const page = Number(params?.page) || 1;
  try {
    const { data } = await supabaseClient
      .from("current")
      .select("*")
      //   .neq("isArchived")
      //   .neq("isUnavailable")
      //   .gt("end", new Date())
      //   .neq("end", null)
      //   .order("eventType", { ascending: true })
      //   .order("start", { ascending: false })
      //   .limit(PER_PAGE)
      .range((page - 1) * PER_PAGE, page * PER_PAGE);

    if (!data.length) {
      return {
        notFound: true,
      };
    }

    // redirect the first page to /current to avoid duplicated content
    if (page === 1) {
      return {
        redirect: {
          destination: "/current",
          permanent: false,
        },
      };
    }

    return {
      props: {
        events: data,
        total: data.length,
        currentPage: page,
      },
      revalidate: 60 * 60 * 24, // ISR cache: once a day
    };
  } catch (err) {
    console.log(err);
  }
};

export default function PaginatedPage({ events, currentPage, total }) {
  return (
    <PaginationPage
      events={events}
      currentPage={currentPage}
      total={total}
      perPage={PER_PAGE}
    />
  );
}
