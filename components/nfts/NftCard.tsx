import React, { useEffect, useState } from "react";
import { ThirdwebNftMedia } from "@thirdweb-dev/react";

const Card = ({ marketListing, nft }: any) => {
  const [listed, isListed] = useState(false);

  useEffect(() => {
    (async () => {
      await marketListing?.map((listing: any) => {
        if (listing.id === nft.metadata.id) return isListed(true);
      });
    })();
  }, [marketListing, nft]);
  console.log(listed);

  return (
    <div className="">
      <ThirdwebNftMedia
        metadata={nft.metadata}
        className="w-[250px] h-[250px]"
      />
      <div className="h-32 bg-red-500 mt-[-1rem] z-10 relative rounded-b-xl">
        content
      </div>
    </div>
  );
};

export default Card;
