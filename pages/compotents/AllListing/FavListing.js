import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useCountries from "../Listings/Countries";
import Image from "next/image";
import { AiFillHeart } from "react-icons/ai";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { CircularProgress } from "@mui/material";
import useListings from "./Listing";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const FavListing = ({ id }) => {
  const [item,setitem] = useState({})
  const router = useRouter();
  const {getById} = useListings()
  useEffect(()=>{
    (async()=>{
      const itm = await getById(id)
      setitem(itm)
    })()
  },[id])
  const { getByValue } = useCountries();
  const location = getByValue(item?.locationValue);
  const { data: session, status } = useSession();
  const [loading, setloading] = useState(false);
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
              listingid: id,
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
          router.push(router.pathname)
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
  return (
    <div className="col-span-1 cursor-pointer group">
      {item && (
        <div className="flex flex-col w-full gap-1">
          <div className="relative w-full overflow-hidden aspect-square rounded-xl">
          {(item?.imageSrc) ?<Image
              onClick={() => {
                router.push(`/listings/${item.id}`);
              }}
              effect="blur"
              loading="lazy"
              fill
              alt="Listing"
              src={item.imageSrc}
              className="object-cover w-full h-full transition group-hover:scale-110"
            /> : <Skeleton highlightColor="#DCDCDC" style={{zIndex:0}} height={330}/> }
            {!loading && (
              <div className="absolute top-3 right-3">
                <AiFillHeart size={30} color="red" onClick={removeToWishList} />
              </div>
            )}
            {loading && (
              <div className="absolute top-3 right-4">
                <CircularProgress size={20} color="success" />
              </div>
            )}
          </div>
         {location ? <div className="text-lg font-semibold">
            {location?.region},{" "}
            {location?.label.length > 20
              ? location?.label.slice(0, 30) + "..."
              : location?.label}
          </div> : <Skeleton highlightColor="#DCDCDC"/>}
          <div className="font-light text-neutral-500 dark:text-neutral-400">
            {item?.category || <Skeleton width={140} highlightColor="#DCDCDC"/> }
          </div>
         {!item?.price && <Skeleton width={70} highlightColor="#DCDCDC"/>}
          {item?.price && <div className="flex flex-row items-center gap-1">
            <div className="font-semibold">
              ₹{item?.price } <span className="font-light">night</span>
            </div>  
          </div>}
        </div>
      )}
    </div>
  );
};

export default FavListing;
