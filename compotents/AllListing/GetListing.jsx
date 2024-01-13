import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import useCountries from "../Listings/Countries";
import { format } from "date-fns";
import Image from "next/image";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { CircularProgress } from "@mui/material";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {motion} from 'framer-motion'

const GetListing = ({ item, setshowloginModal, wishlisted }) => {
  const router = useRouter();
  const { getByValue } = useCountries();
  const [wishlist, setwishlist] = useState(wishlisted);
  const location = getByValue(item?.locationValue);
  const { data: session, status } = useSession();
  const [loading, setloading] = useState(false);
  const addToWishList = async () => {
    setloading(true);
    if (session && session?.user?.email) {
      try {
        const responce = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/api/addfavourites`,
          {
            method: "POST",
            body: JSON.stringify({
              email: session?.user?.email,
              listingid: item?.id,
              secret: "thiswillbekailashloginsystem",
            }),
            headers: {
              "Content-type": "application/json",
            },
          }
        );
        const data = await responce.json();
        if (data.success) {
          toast.success(data.message);
          setwishlist(true);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error("Some error accured!");
      }
    } else {
      toast.error("Sign in");
      setshowloginModal(true);
    }
    setloading(false);
  };
  const removeToWishList = async () => {
    setloading(true);
    if (session && session?.user?.email) {
      try {
        const responce = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/api/deletefavourites`,
          {
            method: "POST",
            body: JSON.stringify({
              email: session?.user?.email,
              listingid: item?.id,
              secret: "thiswillbekailashloginsystem",
            }),
            headers: {
              "Content-type": "application/json",
            },
          }
        );
        const data = await responce.json();
        if (data.success) {
          toast.success(data.message);
          setwishlist(false);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error("Some error accured!");
      }
    } else {
      toast.error("Sign in");
      setshowloginModal(true);
    }
    setloading(false);
  };

  const variant = {
    hidden:{opacity:0},
    show:{
      opacity:1,
      transition:{
        staggerChildren:0.3,
      }
    }
  }

  const imag = {
    hidden:{
      opacity:0,
      y:30,
    },
    show:{
      opacity:1,
      y:0,
      transition:{
        duration:1,
      }
    }
  }
  return (
    <motion.div variants={variant} initial="hidden" animate="show" className="col-span-1 cursor-pointer group">
      <div className="flex flex-col w-full gap-1">
        <div className="relative w-full overflow-hidden aspect-square rounded-xl">
          {item?.imageSrc ? (
            <Image
              onClick={() => {
                router.push(`/listings/${item.id}`);
              }}
              effect="blur"
              loading="lazy"
              fill
              alt="Listing"
              src={item?.imageSrc}
              className="object-cover w-full h-full transition group-hover:scale-110"
            />
          ) : (
            <Skeleton height={330} highlightColor="#DCDCDC" />
          )}
          {!loading && (
            <div className="absolute top-3 right-3">
              {wishlist ? (
                <AiFillHeart size={30} color="red" onClick={removeToWishList} />
              ) : (
                <AiOutlineHeart
                  size={30}
                  color="white"
                  onClick={addToWishList}
                />
              )}
            </div>
          )}
          {loading && (
            <div className="absolute top-3 right-4">
              <CircularProgress size={20} color="success" />
            </div>
          )}
        </div>
        {location ? (
          <div className="text-lg font-semibold">
            {location?.region},{" "}
            {location?.label.length > 20
              ? location?.label.slice(0, 30) + "..."
              : location?.label}
          </div>
        ) : (
          <Skeleton highlightColor="#DCDCDC" />
        )}
        <div className="font-light text-neutral-500 dark:text-neutral-400">
          {item?.category || <Skeleton width={140} highlightColor="#DCDCDC" />}
        </div>
        <div className="flex flex-row items-center gap-1">
          {item?.price ? (
            <div className="font-semibold">
              ₹{item?.price} <span className="font-light">night</span>
            </div>
          ) : (
            <Skeleton width={90} highlightColor="#DCDCDC" />
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default GetListing;
