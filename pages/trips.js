import React, { useEffect } from "react";
import Navbar from "./compotents/Navbar/Navbar";
import { getSession, useSession } from "next-auth/react";
import HomeFooter from "./compotents/Footer/HomeFooter";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import ReservationCard from "./compotents/Reservations/ReservationCard";

const Trips = ({
  setshowrentModal,
  setshowsignupModal,
  setshowloginModal,
  reservationAll
}) => {
  return (
    <div>
      <Navbar
        setshowrentModal={setshowrentModal}
        setshowsignupModal={setshowsignupModal}
        setshowloginModal={setshowloginModal}
      />
      <div className="min-h-[75vh] mx-4 mb-10 lg:mx-16 md:mx-10">
        <div className="mt-5 mb-3">
          <h1 className="text-lg font-bold text-bl dark:text-white">Trips</h1>
          <h1 className="text-sm font-light text-bl dark:text-white">
            Where you&apos;ve been and where you&apos;ve going!
          </h1>
        </div>
        {reservationAll?.length !== 0 ? (
          <div className="min-h-[60vh] pt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-8">
            {reservationAll?.map((item) => {
              return <ReservationCard key={item.id} id={item.listingId} reserveitem={item}/>;
            })}
          </div>
        ) : (
          <div className="items-center justify-center h-[70vh] text-center">
            <div className="relative top-52">
              <h1 className="items-center text-xl font-semibold text-center text-black dark:text-white">
                No trips found
              </h1>
              <h1 className="items-center text-base text-center text-black dark:text-white">
                Looks like you have no trips reservations yet
              </h1>
            </div>
          </div>
        )}
      </div>
      <HomeFooter />
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  let reservationAll = []
  try {
    if (session && session?.user?.email) {
      const userFavIds = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/gettrips`,
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
      reservationAll = res.reservation
    }
  } catch (error) {
    console.log(error);
  }
  return { props: {reservationAll}};
};

export default Trips;
