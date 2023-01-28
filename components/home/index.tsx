import React from "react";
import { FaEthereum } from "react-icons/fa";
import Image from "next/image";

const MainHome = () => {
  return (
    <div className="flex flex-col   xl:grid xl:grid-cols-10 space-y-5">
      {/* NOTE left side */}
      <div className="min-h-[300px] flex flex-col items-center justify-center xl:min-h-[calc(100vh-72px)] xl:col-span-6 ">
        <div className="text-4xl font-bold text-white text-center px-5">
          {" "}
          Discover, collect, and sell extraordinary NFTs
        </div>
        <div className="text-gray-400 text-2xl my-4 text-center">
          {" "}
          OpenSea is the world&apos;s first and largest NFT marketplace
        </div>
        <div className="flex space-x-5">
          <button className="text-lg bg-blue-500 px-7 py-3 rounded-xl font-semibold hover:bg-blue-400">
            Explore
          </button>
          <button className="text-lg bg-white px-7 py-3 rounded-xl font-semibold hover:bg-gray-200 ">
            Create
          </button>
        </div>
      </div>
      {/* NOTE right side */}
      <div className="flex justify-center items-center pb-10 xl:pb-0 xl:col-span-4">
        <div className="w-[400px] bg-gray-500 rounded-xl">
          <Image
            src="https://lh3.googleusercontent.com/ujepnqpnL0nDQIHsWxlCXzyw4pf01yjz1Jmb4kAQHumJAPrSEj0-e3ABMZlZ1HEpJoqwOcY_kgnuJGzfXbd2Tijri66GXUtfN2MXQA=s550"
            alt=""
            height={300}
            width={400}
            className="rounded-t-xl h-[450px]"
          />
          <div className="flex items-center h-20 px-5 rounded-b-xl">
            <Image
              alt=""
              height={40}
              width={40}
              src="https://lh3.googleusercontent.com/qQj55gGIWmT1EnMmGQBNUpIaj0qTyg4YZSQ2ymJVvwr_mXXjuFiHJG9d3MRgj5DVgyLa69u8Tq9ijSm_stsph8YmIJlJQ1e7n6xj=s64"
              className="rounded-full"
            />
            <div className="flex ml-4 justify-between w-[400px]">
              <div className="flex flex-col justify-center">
                <div className="text-white font-semibold">Jolly</div>
                <div className="font-semibold">hola-kanola</div>
              </div>
              <div className="flex items-center space-x-1">
                <span className="font-semibold text-white">0.01 ETH</span>{" "}
                <FaEthereum />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainHome;
