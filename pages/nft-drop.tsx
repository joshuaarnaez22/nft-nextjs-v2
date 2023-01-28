import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { GetServerSideProps } from "next";
import { sanityClient, urlForImage } from "../sanity";
import { Collection } from "../types";
import Link from "next/link";
import { useRouter } from "next/router";
import { BsArrowLeft } from "react-icons/bs";

interface Props {
  collections: Collection[];
}
const NftDrop = ({ collections }: Props) => {
  const router = useRouter();
  return (
    <>
      <div
        onClick={() => router.back()}
        className="absolute mt-3 ml-3  cursor-pointer hover:animate-pulse hover:bg-gray-300 p-3 hover:rounded-full hover:opacity-30"
      >
        <BsArrowLeft size={30} className="opacity-40" />
      </div>
      <div className="flex flex-col max-w-7xl mx-auto min-h-screen p-10">
        <Head>
          <title>NFT Drop</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <h1 className="text-xl font-extralight cursor-pointer ">
          The{" "}
          <span className="font-extrabold underline decoration-pink-400/50">
            Santa Claws
          </span>{" "}
          NFT Drop
        </h1>
        <main className="bg-slate-100 m-10 px-3 py-5 rounded-xl shadow-xl shadow-rose-400/20">
          <div className="grid gap-y-10 md:grid-cols-2  lg:grid-cols-3 2xl:grid-cols-4">
            {collections.map((collection) => (
              <Link
                href={`nft/${collection.slug.current}`}
                key={collection._id}
              >
                <div className="flex flex-col cursor-pointer items-center transition-all duration-700 ease-in-out hover:scale-x-105">
                  <div className="bg-gray-400/20 rounded-2xl">
                    <Image
                      src={urlForImage(collection.mainImage).url()}
                      alt={""}
                      width={600}
                      height={600}
                      className=" h-96 w-60 rounded-2xl object-cover"
                    />
                  </div>

                  <div className="p-5">
                    <h2 className="text-3xl ">{collection.title}</h2>
                    <p className="mt-2 text-sm text-gray-400 ">
                      {collection.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </>
  );
};

export default NftDrop;

export const getServerSideProps: GetServerSideProps = async () => {
  const query = `* [_type == "collection"] {
    _type,
    _id,
    title,
    description,
    nftCollectionName,
    address,
    slug {
      current
    },
    previewImage {
      asset
    },
    mainImage {
      asset
    },
    creator->{  
      _id,
      name,
      address,
    slug {
    current
  },
    },
}`;

  const collections = await sanityClient.fetch(query);
  return {
    props: {
      collections,
    },
  };
};
