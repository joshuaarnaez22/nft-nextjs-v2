import React, { useEffect, useState } from "react";
import Image from "next/image";
import { sanityClient, urlForImage } from "../../sanity";
import { Collection } from "../../types";

import {
  useAddress,
  useMetamask,
  useDisconnect,
  useContract,
} from "@thirdweb-dev/react";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { BigNumber } from "ethers";
import { FaEthereum } from "react-icons/fa";
interface Props {
  collection: Collection;
}
const BoredApes = ({ collection }: Props) => {
  const { contract } = useContract(collection.address, "nft-drop");
  const connectWithMetamask = useMetamask();
  const address = useAddress();
  const disconnect = useDisconnect();
  const [totalSupply, setTotalSupply] = useState<BigNumber>();
  const [claimedSupply, setClaimedSupply] = useState(0);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState("");

  useEffect(() => {
    if (!contract) return;
    (async () => {
      setLoading(true);
      const nft = await contract.claimConditions.getAll();
      setPrice(nft[0]?.currencyMetadata.displayValue);
      claimedNfts();
      setLoading(false);
    })();
  }, [contract]);

  const mintNFT = async () => {
    try {
      if (!contract || !address) return;
      setLoading(true);
      const qty = 1;
      const tx = await contract.claimTo(address, qty);
      const receipt = tx[0].receipt;
      const claimedTokenId = tx[0].id;
      const claimedNFT = await tx[0].data();
      console.log(receipt);
      console.log(claimedTokenId);
      console.log(claimedNFT);
      claimedNfts();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const claimedNfts = async () => {
    const claimed = await contract?.getAllClaimed();
    const total = await contract?.totalSupply();
    setTotalSupply(total);
    setClaimedSupply(claimed?.length || 0);
  };

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
          <p className="animate-pulse font-bold text-center text-sm text-rose-400 pt-3">
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
          {loading ? (
            <p className="animate-bounce pt-2 text-xl text-green-500">
              Loading Supply Count...
            </p>
          ) : (
            <p className=" text-xl text-green-500 py-2">
              {claimedSupply} / {totalSupply?.toString()} NFT&apos;s claimed
            </p>
          )}
        </div>
        {loading && (
          <div className="flex items-center justify-center">
            <Image
              src="/loading.gif"
              alt={""}
              width={0}
              height={0}
              quality={100}
              className=" h-32 w-60 object-cover"
            />
          </div>
        )}

        {/* // NOTE - FOOTER */}
        <div>
          <button
            onClick={mintNFT}
            disabled={
              loading || claimedSupply === totalSupply?.toNumber() || !address
            }
            className="w-full h-16 bg-red-600 rounded-full text-white font-bold mb-10 transition-all duration-700 ease-in-out hover:scale-x-105 disabled:bg-gray-400 disabled:transform-none"
          >
            {loading ? (
              <>Loading...</>
            ) : claimedSupply === totalSupply?.toNumber() ? (
              <>Sold Out</>
            ) : !address ? (
              <>Sign in to Mint</>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <span className="font-bold">Mint NFT ({price} ETH)</span>
                <FaEthereum />
              </div>
            )}
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
