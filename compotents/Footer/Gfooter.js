import React from 'react'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FavoriteBorderTwoToneIcon from '@mui/icons-material/FavoriteBorderTwoTone';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Image from 'next/image';

const Gfooter = () => {
  return (
    <div className="sticky bottom-0 flex items-center justify-around py-1 bg-white border-t border-gray-300 md:hidden dark:bg-black lg:px-16 md:px-5 dark:border-gray-700">
        <div className='items-center justify-center text-center'>
            <SearchOutlinedIcon />
            <h1 className='font-sans text-sm font-medium text-black dark:text-white'>Explore</h1>
        </div>
        <div className='items-center justify-center text-center'>
            <FavoriteBorderTwoToneIcon />
            <h1 className='font-sans text-sm font-medium text-black dark:text-white'>Wishlists</h1>
        </div>
        <div className='items-center justify-center text-center'>
            <Image src={"/icon.png"} className='mx-auto' alt='icon' width={35} height={35}/>
            <h1 className='font-sans text-sm font-medium text-black dark:text-white'>Trips</h1>
        </div>
        <div className='items-center justify-center text-center'>
            <ChatBubbleOutlineRoundedIcon />
            <h1 className='font-sans text-sm font-medium text-black dark:text-white'>Inbox</h1>
        </div>
        <div className='items-center justify-center text-center'>
            <AccountCircleOutlinedIcon />
            <h1 className='font-sans text-sm font-medium text-black dark:text-white'>Profile</h1>
        </div>
    </div>
  )
}

export default Gfooter