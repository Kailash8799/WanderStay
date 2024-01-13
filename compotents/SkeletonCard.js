
import React from "react";
import { AiFillHeart } from "react-icons/ai";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const SkeletonCard = () => {
  return (
    <div className="col-span-1 cursor-pointer group">
        <div className="flex flex-col w-full gap-1">
          <div className="relative w-full overflow-hidden aspect-square rounded-xl">
           <Skeleton highlightColor="#DCDCDC" style={{zIndex:0}} height={330}/> 
              <div className="absolute top-3 right-3">
                <AiFillHeart size={30} color="red"/>
              </div>
          </div>
          <Skeleton highlightColor="#DCDCDC"/>
          <div className="font-light text-neutral-500 dark:text-neutral-400">
            <Skeleton width={140} highlightColor="#DCDCDC"/> 
          </div>
        <Skeleton width={70} highlightColor="#DCDCDC"/>
        </div>
    </div>
  );
};

export default SkeletonCard;
