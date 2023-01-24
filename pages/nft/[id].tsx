import React from "react";
import Image from "next/image";
import { sanityClient, urlForImage } from "../../sanity";
import { Collection } from "../../types";

import { useAddress, useMetamask, useDisconnect } from "@thirdweb-dev/react";
import { GetServerSideProps } from "next";
import Link from "next/link";

interface Props {
  collection: Collection;
}
const BoredApes = ({ collection }: Props) => {
  console.log(collection);

  const connectWithMetamask = useMetamask();
  const address = useAddress();
  const disconnect = useDisconnect();

  return (
    <div className="flex h-screen flex-col lg:grid lg:grid-cols-10">
      {/* //NOTE - LEFT SIDE WITH APE IMAGE */}

      <div className="flex flex-col justify-center items-center bg-gradient-to-br from-cyan-500 to-rose-500 py-2 lg:min-h-screen lg:col-span-4">
        <div className="bg-gradient-to-br from-yellow-400 to-purple-600 p-2 rounded-xl">
          <Image
            src={urlForImage(collection.previewImage).url()}
            alt="ape_image"
            width="400"
            height="400"
            quality={100}
            className="w-44 rounded-xl  -cover lg:h-96 lg:w-72"
          />
        </div>
        <div className="text-center space-y-2 p-5">
          <h1 className="text-4xl font-bold text-white">
            {collection.nftCollectionName}
          </h1>
          <h2 className="text-xl text-gray-300">{collection.description}</h2>
        </div>
      </div>

      {/* //NOTE - RIGHT SIDE WITH HEADER, CONTENT AND FOOTER */}
      <div className=" flex flex-col px-8 lg:col-span-6 lg:px-10 ">
        {/* //NOTE - HEADER */}
        <div className="flex justify-between items-center pt-10 pb-5 ">
          <h1 className="w-48 text-xl font-extralight cursor-pointer sm:w-80">
            The{" "}
            <Link href="/">
              <span className="font-extrabold underline decoration-pink-400/50">
                Santa Claws
              </span>{" "}
            </Link>
            NFT Market Place
          </h1>
          <button
            onClick={() => (address ? disconnect() : connectWithMetamask())}
            className="text-white bg-rose-400 rounded-full px-4 py-2 text-sm font-bold lg:text-base lg:px-6 lg:py-3"
          >
            {address ? "Sign Out" : " Sign In"}
          </button>
        </div>
        <hr className="border" />
        {address && (
          <p className="font-bold text-center text-sm text-rose-400 pt-3">
            Your&apos;e logged in with wallet {address.substring(0, 5)}...
            {address.substring(address.length - 5)}
          </p>
        )}
        {/* // NOTE - CONTENT */}
        <div className=" flex flex-col flex-1 items-center text-center mt-10 space-y-10 lg:justify-center">
          <Image
            src={urlForImage(collection.mainImage).url()}
            alt={""}
            width={600}
            height={600}
            className=" h-96 w-60 rounded-2xl object-cover"
          />
          <h1 className="text-3xl font-bold lg:font-extrabold">
            {" "}
            {collection.title}
          </h1>
          <p className="pt-2 text-xl text-green-500">
            13 / 21 NFT&apos;s claimed
          </p>
        </div>

        {/* // NOTE - FOOTER */}
        <div>
          <button className="w-full h-16 bg-red-600 rounded-full text-white font-bold my-10 transition-all duration-700 ease-in-out hover:scale-x-105">
            Mint NFT (0.01 ETH)
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoredApes;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const query = `* [_type == "collection" && slug.current ==  $id][0] {
    _type,
      _id,
      title,
     description,
      nftCollectionName,
      previewImage {
      asset
    },
    mainImage {
      asset
    },
      address,
    slug {
      current
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

  const collection = await sanityClient.fetch(query, { id: params?.id });

  if (!collection) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      collection,
    },
  };
};
