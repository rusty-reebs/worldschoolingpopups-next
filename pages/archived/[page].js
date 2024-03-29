import PaginationPage from "../../components/PaginationPage";
import { supabaseClient } from "../../lib/supabaseClient";
import { transformImages } from "../../_helpers/cloudinary";

const tableName = process.env.NEXT_PUBLIC_TABLE_NAME;

export const PER_PAGE = 12;

export const getStaticPaths = async () => {
  const { data, count } = await supabaseClient.from(tableName).select("*", { count: "exact" }).eq("isArchived", true);

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
    // prerender the next pages after the first, which is handled by the index page
    paths: Array.from({ length: arrayLength }).map((_, i) => `/archived/${i + 2}`),
    // block request for non-generated pages and cache them in the background
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params }) => {
  const page = Number(params?.page) || 1;
  const offset = (page - 1) * PER_PAGE;
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
      .eq("isArchived", true)
      .range(offset, offset + PER_PAGE - 1);

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

    // redirect the first page to /archived to avoid duplicated content
    if (page === 1) {
      return {
        redirect: {
          destination: "/archived",
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
      revalidate: 60 * 60, // 1 hour
    };
  } catch (err) {
    console.log(err);
  }
};

export default function PaginatedPage({ events, lastUpdated, currentPage, total }) {
  return (
    <PaginationPage
      filter={"archived"}
      events={events}
      lastUpdated={lastUpdated}
      currentPage={currentPage}
      total={total}
      perPage={PER_PAGE}
    />
  );
}
