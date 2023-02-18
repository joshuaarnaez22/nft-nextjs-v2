import React, { useEffect, useState } from "react";
import { ThirdwebNftMedia } from "@thirdweb-dev/react";
import { Waveform } from "@uiball/loaders";

const Card = ({ marketListing, nft }: any) => {
  const [listed, isListed] = useState(false);
  const [price, setPrice] = useState(0);
  const [done, setDone] = useState(false);
  useEffect(() => {
    (async () => {
      await marketListing?.forEach((listing: any) => {
        if (listing.asset.id === nft.metadata.id) {
          isListed(true);
          setPrice(listing.buyoutCurrencyValuePerToken);
        }
        setDone(true);
      });
    })();
  }, [marketListing, nft]);

  if (!done)
    return (
      <>
        <div className="w-[250px] h-[378px] flex items-center justify-center">
          <Waveform size={40} lineWeight={3.5} speed={1} color="white" />
        </div>
      </>
    );

  return (
    <div className="">
      <ThirdwebNftMedia
        metadata={nft.metadata}
        className="w-[250px] h-[250px]"
      />
      <div className="h-32 bg-red-500 mt-[-1rem] z-10 relative rounded-b-xl">
        {listed ? "listed" : "notlisted"}
      </div>
    </div>
  );
};

export default Card;
