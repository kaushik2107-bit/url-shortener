import Link from "next/link";
import { supabase } from "../lib/supabase";

interface types {
  notFound: boolean;
  data: obj[];
}

interface obj {
  url: string;
  id?: string;
}

export default function RedirectURL({ notFound }: types) {
  if (notFound)
    return (
      <div className="space-y-16">
        <div className="text-4xl text-gray-600 m-auto w-fit mt-48 uppercase">
          404 NOT FOUND
        </div>
        <div className="m-auto w-fit text-2xl text-gray-600 underline ">
          <Link href="/" className="">
            Go back to Home
          </Link>
        </div>
      </div>
    );
}

export async function getServerSideProps(context: any) {
  const { url } = context.query;
  const { data } = await supabase.from("urls").select("url").eq("id", url);
  const notFound = data?.length === 0;

  if (!notFound && data) {
    const dest_url = data[0].url;
    return {
      redirect: {
        permanent: false,
        destination: dest_url,
      },
    };
  }

  return {
    props: {
      notFound: notFound,
    }, // will be passed to the page component as props
  };
}
