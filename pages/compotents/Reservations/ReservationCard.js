import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useCountries from "../Listings/Countries";
import Image from "next/image";
import { AiFillHeart } from "react-icons/ai";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { CircularProgress } from "@mui/material";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useListings from "../AllListing/Listing";
import { differenceInCalendarDays, format } from "date-fns";

const ReservationCard = ({ id, reserveitem }) => {
  const [item, setitem] = useState({});
  const [loading, setloading] = useState(false);
  const router = useRouter();
  const { getById } = useListings();
  useEffect(() => {
    (async () => {
      const itm = await getById(id);
      setitem(itm);
    })();
  }, [id]);

  const reservedate = `${format(
    new Date(reserveitem?.startDate),
    "PP"
  )} - ${format(new Date(reserveitem?.enddate), "PP")}`;
  const { getByValue } = useCountries();
  const location = getByValue(item?.locationValue);
  const { data: session, status } = useSession();
  const cancelReservation = async () => {
    setloading(true);
    let startdays = differenceInCalendarDays(new Date(reserveitem?.startDate), new Date());
    let enddays = differenceInCalendarDays(new Date(reserveitem?.enddate), new Date());
    if (startdays >= 0 &&startdays <= 1) {
      toast.error(
        "Your reservation start from today or tomorrow so you can not cancel reservation now!"
      );
      setloading(false);
      return;
    }
    if (startdays <= 0 && enddays >= 0) {
      toast.error(
        "Reservation Started, Now you can not canceled your reservation"
      );
      setloading(false);
      return;
    }
    if ( enddays < 0) {
      toast.error(
        "Reservation Completed"
      );
      setloading(false);
      return;
    }


    if (session && session?.user?.email) {
      try {
        const responce = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/api/cancelreservation`,
          {
            method: "POST",
            body: JSON.stringify({
              reservid: reserveitem?.id,
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
          router.push(router.pathname);
        } else {
          toast.error(data.message);
        }
        setloading(false);
      } catch (error) {
        setloading(false);
        toast.error("Some error accured!");
      }
    } else {
      toast.error("Sign in");
      setshowloginModal(true);
      setloading(false);
    }
  };
  return (
    <div className="col-span-1 cursor-pointer group">
      {item && (
        <div className="flex flex-col w-full gap-1">
          <div className="relative w-full overflow-hidden aspect-square rounded-xl">
            {item?.imageSrc ? (
              <Image
                onClick={() => {
                  router.push(`/listings/${item?.id}`);
                }}
                effect="blur"
                loading="lazy"
                fill
                alt="Listing"
                src={item?.imageSrc}
                className="object-cover w-full h-full transition group-hover:scale-110"
              />
            ) : (
              <Skeleton
                highlightColor="#DCDCDC"
                style={{ zIndex: 0 }}
                height={330}
              />
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
            {item?.category || (
              <Skeleton width={140} highlightColor="#DCDCDC" />
            )}
          </div>
          <div className="font-light text-neutral-500 dark:text-neutral-400">
            {reservedate || <Skeleton width={140} highlightColor="#DCDCDC" />}
          </div>
          {!reserveitem?.totalprice && (
            <Skeleton width={70} highlightColor="#DCDCDC" />
          )}
          {reserveitem?.totalprice && (
            <div className="flex flex-row items-center gap-1">
              <div className="font-semibold">₹{reserveitem?.totalprice}</div>
            </div>
          )}
          <div className="font-light text-neutral-500 dark:text-neutral-400">
            {reservedate ? (
              <button
                onClick={cancelReservation}
                className="w-full px-10 py-1.5 text-white rounded-lg bg-rose-600"
              >
                {loading ? (
                  <CircularProgress color="success" size={18} />
                ) : (
                  "Cancel"
                )}
              </button>
            ) : (
              <Skeleton width={140} highlightColor="#DCDCDC" />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationCard;
