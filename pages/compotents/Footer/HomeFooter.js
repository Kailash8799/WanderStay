import Link from "next/link";
import React from "react";
import LanguageIcon from '@mui/icons-material/Language';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const HomeFooter = () => {
  return (
    <div className="sticky bottom-0 items-center justify-between hidden py-3 bg-white border-t border-gray-300 md:flex dark:bg-black lg:px-16 md:px-5 dark:border-gray-700">
      <div className="items-center">
        <ul className="flex flex-wrap items-center">
          <li className="font-medium">© 2023 Airbnb, Inc.</li>
          <Link href={"/"}><li className="font-medium">&nbsp;·&nbsp;Privacy</li></Link>
          <Link href={"/"}><li className="font-medium">&nbsp;·&nbsp;Terms</li></Link>
          <Link href={"/"}><li className="font-medium">&nbsp;·&nbsp;Sitemap</li></Link>
          <Link href={"/"}><li className="font-medium">&nbsp;·&nbsp;Companydetails</li></Link>
        </ul>
      </div>
      <div className="items-center">
        <ul className="flex flex-wrap items-center space-x-2">
          <li><LanguageIcon /></li>
          <li className="font-semibold text-center cursor-pointer">English(IN)</li>
          <li className="font-semibold text-center cursor-pointer">₹ INR</li>
          <li className="font-semibold text-center cursor-pointer">Support & resources <ExpandLessIcon /></li>
        </ul>
      </div>
    </div>
  );
};

export default HomeFooter;
