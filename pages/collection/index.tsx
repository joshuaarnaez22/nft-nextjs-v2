import { useContract } from "@thirdweb-dev/react";
import React from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import { FaEthereum } from "react-icons/fa";

import Image from "next/image";
const CollectionId = () => {
  const router = useRouter();
  const { contract } = useContract(
    router.query.collectionId as string,
    "marketplace"
  );

  useEffect(() => {
    (async () => {
      const listings = await contract?.getActiveListings();
      console.log(listings);
    })();
  }, [contract]);

  return (
    <div className="min-h-screen bg-gray-800">
      <Navbar />
    </div>
  );
};

export default CollectionId;
