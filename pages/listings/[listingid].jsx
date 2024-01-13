import React, { useEffect, useMemo, useState } from "react";
import Navbar from "../compotents/Navbar/Navbar";
import useCountries from "../compotents/Listings/Countries";
import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";
import Image from "next/image";
import { AiFillHeart, AiOutlineHeart, AiFillStar } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { CircularProgress } from "@mui/material";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { BsDot } from "react-icons/bs";
import { TiUser } from "react-icons/ti";
import CategoryDetails from "../compotents/Category/CategoryDetails";
import { categories } from "../compotents/Category/Categories";
import dynamic from "next/dynamic";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { Range } from "react-date-range";
import Calendar from "../compotents/Calendar";

const MapWithNoSSR = dynamic(() => import("../compotents/Listings/Map"), {
  ssr: false,
});

const ListingFullInfo = ({
  setshowloginModal,
  listingdetails,
  wishlisted,
  user,
  reservations,
  setshowsignupModal,
  setshowrentModal,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();
  const [wishlist, setwishlist] = useState(wishlisted);
  const location = getByValue(listingdetails?.locationValue);
  const { data: session, status } = useSession();
  const [loading, setloading] = useState(false);
  const [resloading, setresloading] = useState(false);
  const [totalprice, settotalprice] = useState(listingdetails.price);
  const [disableDates, setdisableDates] = useState([]);
  const initialdaterange = {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  };

  const category = categories.filter(
    (item) => item.label === listingdetails.category
  )[0];
  const [bookrangedate, setbookrangedate] = useState(initialdaterange);
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
              listingid: listingdetails?.id,
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
              listingid: listingdetails?.id,
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

  const createReservation = async () => {
    if (!(session?.user?.email && session)) {
      toast.error("Login");
      setshowloginModal(true);
      return;
    }
    let dt = bookrangedate.startDate;
    let et = bookrangedate.endDate;
    const stdate = disableDates.find(
      (date) => date.toDateString() === dt.toDateString()
    );
    const eddate = disableDates.find(
      (date) => date.toDateString() === et.toDateString()
    );
    if (stdate || eddate) {
      toast.error("Please select other dates this will be booked");
      return;
    }
    setresloading(true);
    try {
      const info = {
        totalprice,
        id: listingdetails?.id,
        uid: user?.id,
        startDate: new Date(bookrangedate?.startDate),
        endDate: new Date(bookrangedate?.endDate),
        secret: "thiswillbekailashloginsystem",
        email: session?.user?.email,
      };
      const responce = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/reservations`,
        {
          method: "POST",
          body: JSON.stringify(info),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const data = await responce.json();
      if (data.success) {
        toast(data.message, {
          icon: "👏",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        settotalprice(listingdetails?.price);
        setbookrangedate(initialdaterange);
        router.push(`/trips`);
      } else {
        toast(data.message, {
          icon: "👏",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      }
      setresloading(false);
    } catch (error) {
      setresloading(false);
    }
    setresloading(false);
  };

  useEffect(() => {
    let date = [];
    reservations.forEach((reserv) => {
      const range = eachDayOfInterval({
        start: new Date(reserv.startDate),
        end: new Date(reserv.enddate),
      });
      date = [...date, ...range];
    });
    setdisableDates(date);
  }, [reservations]);

  useEffect(() => {
    if (bookrangedate.startDate && bookrangedate.endDate) {
      const dayCount = Math.abs(
        differenceInCalendarDays(bookrangedate.startDate, bookrangedate.endDate)
      );
      if (dayCount && listingdetails?.price) {
        settotalprice(dayCount * listingdetails?.price);
      } else {
        settotalprice(listingdetails?.price);
      }
    }
  }, [bookrangedate, listingdetails?.price]);
  return (
    <div>
      <Navbar
        setshowsignupModal={setshowsignupModal}
        setshowloginModal={setshowloginModal}
        setshowrentModal={setshowrentModal}
      />
      <div className="min-h-screen mx-4 my-2 mb-10 md:max-w-screen-md lg:max-w-screen-lg sm:mx-10 md:mx-auto md:my-5">
        <div>
          <h1 className="text-3xl font-bold">
            {listingdetails?.title || <Skeleton />}
          </h1>
          {location ? (
            <div className="flex flex-wrap items-center my-2 space-x-2">
              <h1 className="flex items-center">
                <AiFillStar size={18} />
                <span>5.0</span>
                <BsDot />
                <span className="items-center cursor-pointer hover:underline">
                  13 reviews
                </span>
              </h1>
              <TiUser />
              <h1>Superhost</h1>
              <BsDot />
              <h1>
                {location?.label}, {location?.region}
              </h1>
            </div>
          ) : (
            <Skeleton width={200} />
          )}
        </div>
        <div className="flex flex-col gap-6">
          <div className="w-full h-[40vh] lg:h-[66vh] overflow-hidden rounded-xl relative">
            {listingdetails?.imageSrc ? (
              <Image
                alt="Image"
                src={listingdetails?.imageSrc}
                className="object-cover w-full"
                fill
              />
            ) : (
              <Skeleton className="h-[40vh] lg:h-[66vh]" />
            )}
            {!loading && (
              <div className="absolute cursor-pointer top-3 right-3">
                {wishlist ? (
                  <AiFillHeart
                    size={30}
                    color="red"
                    onClick={removeToWishList}
                  />
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
        </div>
        <div className="grid grid-cols-1 mt-6 md:grid-cols-7 md:gap-10">
          <div className="flex flex-col col-span-4 gap-8 ">
            <div className="flex flex-col gap-2">
              <div className="flex flex-row items-center gap-2 text-xl font-semibold">
                <div>Hosted by {user?.name || <Skeleton width={150} />}</div>
                {user?.image ? (
                  <Image
                    src={user?.image}
                    alt="userimage"
                    loading="lazy"
                    className="rounded-full"
                    height={25}
                    width={25}
                  />
                ) : (
                  <Skeleton width={30} height={30} borderRadius={30} />
                )}
              </div>
              <div className="flex flex-row items-center gap-4 font-light">
                {listingdetails?.guestCount ? (
                  <div>{listingdetails?.guestCount} guests</div>
                ) : (
                  <Skeleton width={60} />
                )}
                {listingdetails?.roomCount ? (
                  <div>{listingdetails?.roomCount} rooms</div>
                ) : (
                  <Skeleton width={60} />
                )}
                {listingdetails?.bathroomCount >= 0 ? (
                  <div>{listingdetails?.bathroomCount} bathrooms</div>
                ) : (
                  <Skeleton width={60} />
                )}
              </div>
            </div>
            <hr className="dark:border-gray-700" />
            {category && (
              <CategoryDetails
                Icons={category?.icons}
                label={category?.label}
                description={category?.desc}
              />
            )}
            <hr className="dark:border-gray-700" />
            <div className="text-lg font-light">
              {listingdetails?.description}
            </div>
            <hr className="dark:border-gray-700" />
            <div className="overflow-x-auto overflow-y-auto">
              <MapWithNoSSR selectedCountry={location} />
            </div>
          </div>
          <div className="order-first mb-10 md:order-last md:col-span-3">
            <div className="bg-white dark:bg-gray-950 rounded-xl border-[1px] overflow-hidden border-neutral-200 dark:border-gray-800">
              <div className="flex flex-row items-center gap-1 p-4">
                <div className="text-2xl font-semibold">
                  ₹{listingdetails?.price}
                </div>
                <div className="items-center text-2xl font-semibold">
                  per night
                </div>
              </div>
              <hr className="my-2 dark:border-gray-700" />
              <div className="">
                <Calendar
                  value={bookrangedate}
                  disableDates={disableDates}
                  setbookrangedate={setbookrangedate}
                />
              </div>
              <hr className="my-2 dark:border-gray-700" />
              <div className="items-center justify-center p-4 text-center">
                <button
                  onClick={createReservation}
                  className="w-5/6 px-10 py-3 mx-auto text-center text-white rounded-lg bg-rose-600"
                >
                  {resloading ? (
                    <CircularProgress color="success" size={18} />
                  ) : (
                    "Reserve"
                  )}
                </button>
              </div>
              <hr className="my-2 dark:border-gray-700" />
              <div className="flex flex-row items-center justify-between p-4 text-lg font-semibold">
                <div>Total</div>
                <div>₹{totalprice}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h1 className="h-20"></h1>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  const { listingid } = context.query;
  let listingdetails = {};
  let favListings = [];
  let wishlisted = false;
  let user = {};
  let reservations = [];
  try {
    const particularListing = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/fetchbyid`,
      {
        method: "POST",
        body: JSON.stringify({
          id: listingid,
          secret: "thiswillbekailashloginsystem",
        }),
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    const res = await particularListing.json();
    listingdetails = res.data;

    const reservationDates = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/getreservationbyid`,
      {
        method: "POST",
        body: JSON.stringify({
          id: listingid,
          secret: "thiswillbekailashloginsystem",
        }),
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    const reserv = await reservationDates.json();
    reservations = reserv.data;
    if (listingdetails.userId) {
      const userDetails = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/getlistinguser`,
        {
          method: "POST",
          body: JSON.stringify({
            id: listingdetails?.userId,
            secret: "thiswillbekailashloginsystem",
          }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const uu = await userDetails.json();
      user = uu.data;
    }

    if (session && session?.user?.email) {
      const userFavIds = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/favourites`,
        {
          method: "POST",
          body: JSON.stringify({
            email: session?.user?.email,
            secret: "thiswillbekailashloginsystem",
          }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const res = await userFavIds.json();
      favListings = res.data;
      wishlisted = favListings.includes(listingdetails.id);
    }
    return {
      props: { listingdetails, wishlisted, user, reservations: reservations },
    };
  } catch (error) {
    console.log(error);
    listingdetails = {};
    return {
      props: { listingdetails, wishlisted: false, user, reservations: [] },
    };
  }
};

export default ListingFullInfo;
