import { useContract } from "@thirdweb-dev/react";
import React, { useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import { FaEthereum } from "react-icons/fa";
import Image from "next/image";
import { GetServerSideProps } from "next";
import { sanityClient } from "../../sanity";

const CollectionId = ({ result }: any) => {
  console.log(result);
  const router = useRouter();
  const [allNfts, setAllNfts] = useState<any>();
  const [marketListing, setMarketListing] = useState<any>();
  const { id } = router.query;
  console.log(router);

  const { contract: nftContract } = useContract(id as string, "nft-collection");
  const { contract: marketplaceContract } = useContract(
    "0x35De079eb867399e2f290df52d1B2366e902C404",
    "marketplace"
  );

  useMemo(async () => {
    if (!nftContract) return;
    const result = await nftContract.getAll();
    console.log(result);
    setAllNfts(result);
  }, [nftContract]);

  useMemo(async () => {
    if (!marketplaceContract) return;
    const result = await marketplaceContract.getAllListings();
    console.log(result);
    setMarketListing(result);
  }, [marketplaceContract]);

  return (
    <div className="min-h-screen bg-gray-800">
      <Navbar />
    </div>
  );
};

export default CollectionId;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const query = `*[_type == "marketItems" && contractAddress == $id][0] {
  title,
  contractAddress,
  description,
  "creator": createdBy->username,
  floorPrice,
  volumeTraded,
  "allOwner": owners[]->,
  description  
}`;

  const result = await sanityClient.fetch(query, { id: params?.id });
  return {
    props: { result },
  };
};
