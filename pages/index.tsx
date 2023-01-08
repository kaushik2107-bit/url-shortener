import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { useUrlShort } from "../hooks/useUrlShort";
import { ClipLoader } from "react-spinners";
import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/solid";

const Home = () => {
  const [url, setUrl] = useState<string>("");
  const [shortUrl, setShortUrl] = useState<string>("");
  const { buildUrl } = useUrlShort();
  const [loading, setLoading] = useState<boolean>(false);
  const [clicked, setClicked] = useState<boolean>(false);

  const handleSubmit = async (url: string) => {
    setLoading(true);
    setClicked(false);
    const id = await buildUrl(url);
    const short = `${process.env.NEXT_PUBLIC_URL}${id}`;
    setShortUrl(short);
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>URL Shortener</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-screen h-screen items-center flex flex-col space-y-12 pt-24">
        <h1 className="text-4xl font-semibold text-gray-600 ">URL Shortener</h1>
        <form
          className="flex flex-col w-full px-8 space-y-4 md:flex-row md:w-[80%] lg:w-[1000px] md:items-center md:space-y-0 md:space-x-4"
          onSubmit={(e) => (e.preventDefault(), handleSubmit(url))}
        >
          <input
            className="border-2 md:w-2/3 border-[gray] w-full h-12 rounded px-4 text-[16px] outline-none focus:border-blue-500"
            placeholder="Enter URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button
            className="border-2 md:w-1/3 h-12 text-[20px] bg-blue-500 text-white rounded"
            type="submit"
            disabled={loading}
          >
            {loading ? <ClipLoader size={25} color={"white"} /> : "Generate"}
          </button>
        </form>
        {shortUrl.length !== 0 && (
          <div className="flex items-center space-x-4 bg-green-400 text-white pl-6 px-4 py-3 rounded-2xl font-medium text-xl">
            <Link href={shortUrl} className="underline flex-1">
              {shortUrl}
            </Link>
            <button
              className="cursor-pointer flex flex-col items-center"
              onClick={() => (
                navigator.clipboard.writeText(shortUrl), setClicked(true)
              )}
            >
              {clicked ? (
                <ClipboardDocumentListIcon className="w-6 h-6" />
              ) : (
                <ClipboardDocumentIcon className="w-6 h-6" />
              )}
              <p className="text-xs">{clicked ? "copied" : "copy"}</p>
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
