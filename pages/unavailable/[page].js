import PaginationPage from "../../components/PaginationPage";
import { supabaseClient } from "../../lib/supabaseClient";
import { transformImages } from "../../_helpers/cloudinary";

const tableName = "production";

export const PER_PAGE = 12;

export const getStaticPaths = async () => {
  const { data, count } = await supabaseClient
    .from(tableName)
    .select("*", { count: "exact" })
    .eq("isUnavailable", true);

  if (count < PER_PAGE)
    return {
      paths: [],
      fallback: false,
    };
  let arrayLength = null;
  if (count < PER_PAGE * 2) arrayLength = 1;
  if (count < PER_PAGE * 3) arrayLength = 2;
  if (count > PER_PAGE * 3) arrayLength = 3;
  return {
    // prerender the next 3 pages after the first, which is handled by the index page
    paths: Array.from({ length: arrayLength }).map(
      (_, i) => `/unavailable/${i + 2}`
    ),
    // block request for non-generated pages and cache them in the background
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params }) => {
  const page = Number(params?.page) || 1;
  try {
    const { data: lastUpdated } = await supabaseClient
      .from(tableName)
      .select("updated")
      .order("updated", { ascending: false, nullsFirst: false })
      .limit(1)
      .single();

    const { data, count } = await supabaseClient
      .from(tableName)
      .select("*", { count: "exact" })
      .eq("isUnavailable", true)
      .range((page - 1) * PER_PAGE, page * PER_PAGE - 1);
    console.log("👉 count < PER_PAGE", count < PER_PAGE);
    if (count < PER_PAGE)
      return {
        props: {
          events: null,
          lastUpdated: null,
          total: null,
          currentPage: null,
        },
      };
    if (!data.length) {
      return {
        notFound: true,
      };
    }

    // redirect the first page to /unavailable to avoid duplicated content
    if (page === 1) {
      return {
        redirect: {
          destination: "/unavailable",
          permanent: false,
        },
      };
    }
    const result = data.map((event) => {
      const transformedImage = transformImages([event.images[0]]);
      const newUrl = transformedImage.toURL();
      const { images, ...rest } = event;
      return { ...rest, imageUrl: newUrl };
    });

    return {
      props: {
        events: result,
        lastUpdated: lastUpdated.updated,
        total: count,
        currentPage: page,
      },
      revalidate: 60 * 60 * 24, // ISR cache: once a day
    };
  } catch (err) {
    console.log(err);
  }
};

export default function PaginatedPage({
  events,
  lastUpdated,
  currentPage,
  total,
}) {
  return (
    <PaginationPage
      filter={"unavailable"}
      events={events}
      lastUpdated={lastUpdated}
      currentPage={currentPage}
      total={total}
      perPage={PER_PAGE}
    />
  );
}
