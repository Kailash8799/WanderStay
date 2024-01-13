import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import Gfooter from "./compotents/Footer/Gfooter";
import LoginModel from "./compotents/Modals/LoginModel";
import SignUpModal from "./compotents/Modals/SignUpModal";
import { useState } from "react";
import ForgotModal from "./compotents/Modals/ForgotModal";
import { SessionProvider } from "next-auth/react";
import RentModal from "./compotents/Modals/RentModal";
import FiltersModal from "./compotents/Modals/FiltersModal";
import ResetFilter from "./compotents/Modals/ResetFilter";
import { AnimatePresence } from "framer-motion";

export default function App({ Component, pageProps }) {
  const [showloginModal, setshowloginModal] = useState(false);
  const [showsignupModal, setshowsignupModal] = useState(false);
  const [showforgotModal, setshowforgotModal] = useState(false);
  const [showrentModal, setshowrentModal] = useState(false);
  const [showfilterModal, setshowfilterModal] = useState(false);
  const [showresetfilterModal, setshowresetfilterModal] = useState(false);
  return (
    <AnimatePresence>
    <ThemeProvider enableSystem={true} attribute="class">
      <SessionProvider session={pageProps.session}>
        <FiltersModal
          showfilterModal={showfilterModal}
          setshowfilterModal={setshowfilterModal}
        />
        <ResetFilter
          showresetfilterModal={showresetfilterModal}
          setshowresetfilterModal={setshowresetfilterModal}
        />
        <RentModal
          showrentModal={showrentModal}
          setshowrentModal={setshowrentModal}
        />
        <LoginModel
          showloginModal={showloginModal}
          setshowloginModal={setshowloginModal}
          showsignupModal={showsignupModal}
          setshowsignupModal={setshowsignupModal}
          setshowforgotModal={setshowforgotModal}
        />
        <SignUpModal
          showloginModal={showloginModal}
          setshowloginModal={setshowloginModal}
          showsignupModal={showsignupModal}
          setshowsignupModal={setshowsignupModal}
        />
        <ForgotModal
          showloginModal={showloginModal}
          setshowloginModal={setshowloginModal}
          showforgotModal={showforgotModal}
          setshowforgotModal={setshowforgotModal}
        />
        <Component
          {...pageProps}
          showloginModal={showloginModal}
          setshowloginModal={setshowloginModal}
          showsignupModal={showsignupModal}
          setshowsignupModal={setshowsignupModal}
          setshowrentModal={setshowrentModal}
          setshowfilterModal={setshowfilterModal}
          setshowresetfilterModal={setshowresetfilterModal}
          showresetfilterModal={showresetfilterModal}
        />
        <Gfooter />
      </SessionProvider>
    </ThemeProvider>
    </AnimatePresence>
  );
}
