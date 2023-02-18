import { useContract } from "@thirdweb-dev/react";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Image from "next/image";
import { GetStaticPaths, GetStaticProps } from "next";
import { sanityClient } from "../../sanity";
import { CgWebsite } from "react-icons/cg";
import { AiOutlineInstagram, AiOutlineTwitter } from "react-icons/ai";
import { HiDotsVertical } from "react-icons/hi";
import { FaEthereum } from "react-icons/fa";
import NftCard from "@/components/nfts/NftCard";
import { Waveform } from "@uiball/loaders";

const CollectionId = ({ result, id }: any) => {
  const [allNfts, setAllNfts] = useState<any>();
  const [marketListing, setMarketListing] = useState<any>();
  const { contract: nftContract } = useContract(id as string, "nft-collection");
  const { contract: marketplaceContract } = useContract(
    "0x35De079eb867399e2f290df52d1B2366e902C404",
    "marketplace"
  );

  useEffect(() => {
    if (!nftContract) return;
    (async () => {
      const result = await nftContract.getAll();
      console.log(result);

      setAllNfts(result);
    })();
  }, [nftContract]);

  useEffect(() => {
    if (!marketplaceContract) return;
    (async () => {
      const result = await marketplaceContract.getAllListings();
      setMarketListing(result);
    })();
  }, [marketplaceContract]);

  return (
    <div className="min-h-screen bg-gray-800">
      <Navbar />

      <div className="h-[30vh] w-full flex justify-center">
        <Image
          src={
            result.bannerImage
              ? result.bannerImage
              : "https://via.placeholder.com/200"
          }
          width={800}
          height={800}
          className="w-full object-fit"
          alt=""
        />
      </div>
      <div className="w-full">
        <div className="w-full flex justify-center ">
          <Image
            src={
              result.profileImage
                ? result.profileImage
                : "https://via.placeholder.com/200"
            }
            width={600}
            height={600}
            className="w-40 h-40 rounded-full mt-[-4rem]"
            alt=""
          />
        </div>
        <div className="w-full flex justify-end">
          <div className=" w-56 mr-3 flex">
            <div className="border-2 rounded-l-lg">
              <div className="p-3 text-[1.4rem] ">
                <CgWebsite color="white" />
              </div>
            </div>
            <div className="border-2 border-l-0">
              <div className="p-3 text-[1.4rem] ">
                <AiOutlineInstagram color="white" />
              </div>
            </div>
            <div className="border-2 border-l-0">
              <div className="p-3 text-[1.4rem] ">
                <AiOutlineTwitter color="white" />
              </div>
            </div>
            <div className="border-2 border-l-0 rounded-r-lg">
              <div className="p-3 text-[1.4rem] ">
                <HiDotsVertical color="white" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center  items-center space-y-5">
          <div className="text-white text-5xl font-bold">
            Bored Ape Yacht Club
          </div>
          <div className="text-white text-lg">
            Created by <span className="text-blue-500">{result.creator}</span>
          </div>

          <div className="flex border-1 border-gray-900 space-x-20 py-5 px-10  shadow-2xl rounded-xl">
            <div className="flex flex-col space-y-2 items-center ">
              <div className="text-3xl text-white font-bold">
                {allNfts ? allNfts.length : 0}
              </div>
              <div className=" text-xl text-white">items</div>
            </div>
            <div className="flex flex-col space-y-2 items-center ">
              <div className="text-3xl text-white font-bold">
                {result.allOwner.length}
              </div>
              <div className=" text-xl text-white">owner</div>
            </div>
            <div className="flex flex-col space-y-2 justify-center items-center ">
              <div className="flex items-center text-3xl text-white font-bold">
                <FaEthereum />
                {result.floorPrice}
              </div>
              <div className="text-xl text-white">floor price</div>
            </div>
            <div className="flex flex-col space-y-2 justify-center items-center ">
              <div className="flex items-center text-3xl text-white font-bold">
                <FaEthereum />
                {result.volumeTraded}
              </div>
              <div className="text-xl text-white">volume traded</div>
            </div>
          </div>
        </div>
        <div className="text-center mt-10 text-xl text-gray-500 font-semibold">
          {result.description}
        </div>

        <div className="flex flex-wrap justify-center mt-10">
          <>
            {allNfts &&
              allNfts.map((nft: any) => (
                <div key={nft.metadata.id} className="m-5">
                  <NftCard {...{ marketListing, nft }} />
                </div>
              ))}
          </>
        </div>
      </div>
    </div>
  );
};

export default CollectionId;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: "0x8d687ed506bBAE7F16B11E93716DAB9C7f1eC8Db" } }],
    fallback: false, // can also be true or 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const query = `*[_type == "marketItems" && contractAddress == $id][0] {
  title,
  contractAddress,
  description,
  "creator": createdBy->username,
  floorPrice,
  volumeTraded,
  "allOwner": owners[]->,
  description,
  "bannerImage": bannerImage.asset->url,
  "profileImage": profileImage.asset->url
}`;

  const result = await sanityClient.fetch(query, { id: context.params?.id });
  return {
    props: { result, id: context.params?.id },
  };
};
