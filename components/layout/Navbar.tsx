import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { MdAccountBalanceWallet } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { sanityClient } from "../../sanity";

import { useMetamask, useAddress, useDisconnect } from "@thirdweb-dev/react";
import { Toaster, toast } from "react-hot-toast";
const Navbar = () => {
  // NOTE static address
  const collectionAddress = "0x35De079eb867399e2f290df52d1B2366e902C404";
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const disconnect = useDisconnect();

  useEffect(() => {
    if (!address) return localStorage.removeItem("address");

    const storageAdress = localStorage.getItem("address");

    if (storageAdress === address) return;

    (async () => {
      const ownerDoc = {
        _type: "owner",
        _id: address,
        username: "Unnamed",
        walletAddress: address,
      } as {
        _type: string;
        _id: string;
        username: string;
        walletAddress: string;
      };
      await sanityClient.createIfNotExists(ownerDoc);
      toast.success(
        `Welcome back ${address.substring(0, 5)}...${address.substring(
          address.length - 5
        )}`,
        {
          duration: 3000,
          style: {
            borderRadius: "10px",
            background: "#04111d",
            color: "white",
            fontWeight: "bold",
            padding: "20px",
          },
        }
      );

      localStorage.setItem("address", address);
    })();
  }, [address]);

  return (
    <div className="w-screen bg-slate-900 py-4 px-6 flex h-max-[72px]">
      <Toaster position="top-center" />
      {/* NOTE Logo */}
      <Link href="/">
        <div className="flex items-center cursor-pointer">
          <Image
            src="/opensea.png"
            width="40"
            height="40"
            alt=""
            className="hidden md:block"
          />
          <h1 className="font-bold text-2xl ml-4 text-white">OpenSea</h1>
        </div>
      </Link>

      {/* NOTE Seachbar */}
      <div className="flex flex-1 h-10 item-center w-max-[520px] mx-4 bg-slate-700 rounded-xl  hover:bg-gray-600">
        <div className="flex  my-auto justify-center">
          <AiOutlineSearch
            className="font-bold mx-3 text-2xl  text-gray-500 "
            size={25}
          />
        </div>
        <input
          className="w-full ring-0 bg-transparent border-0 outline-0 px-2 text-white placeholder:text-gray-500"
          type="text"
          placeholder="Search items, collections, and accounts"
        />
      </div>

      {/* NOTE  header items default screen*/}
      <div className="flex items-center justify-end space-x-7 lg:hidden">
        <CgProfile
          size={32}
          className="text-white cursor-pointer hover:opacity-80 "
        />
        <AiOutlineShoppingCart
          size={32}
          className="text-white cursor-pointer hover:opacity-80 "
        />
        <GiHamburgerMenu
          size={32}
          className="text-white cursor-pointer hover:opacity-80 "
        />
      </div>

      {/* NOTE  header items basic screen*/}
      <div className="hidden lg:flex items-center justify-end space-x-7 mx-8  ">
        <Link
          href={{
            pathname: `/collection`,
            query: { collectionAddress },
          }}
          as="/collection"
        >
          <div className="text-white text-lg cursor-pointer hover:opacity-80 font-semibold">
            Collections
          </div>
        </Link>
        <Link href="/nft-drop">
          <div className="text-white text-lg cursor-pointer hover:opacity-80 font-semibold">
            Drop
          </div>
        </Link>
        <div className="text-white text-lg cursor-pointer hover:opacity-80 font-semibold">
          Stats
        </div>
        <div className="text-white text-lg cursor-pointer hover:opacity-80 font-semibold">
          Resources
        </div>
        <CgProfile
          onClick={() => (address ? disconnect() : connectWithMetamask())}
          size={32}
          className={`cursor-pointer hover:opacity-80 font-semibol ${
            address ? "text-gray-500" : "text-white"
          }`}
        />
        <MdAccountBalanceWallet
          size={32}
          className="text-white cursor-pointer hover:opacity-80 font-semibold"
        />
        <AiOutlineShoppingCart
          size={32}
          className="text-white cursor-pointer hover:opacity-80 font-semibold"
        />
      </div>
    </div>
  );
};

export default Navbar;
