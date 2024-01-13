import React from "react";
import {AiOutlinePlusCircle,AiOutlineMinusCircle} from 'react-icons/ai'

const Info = ({totalguests,settotalguest,totalrooms,settotalroom,totalbathrooms,settotalbathrooms}) => {
  return (
    <div>
      <h1 className="mx-2 text-lg font-bold text-start">
        Share some basics about your place
      </h1>
      <p className="mx-2 text-sm font-medium text-start">
        What amenities do you have?
      </p>
      <div className="flex items-center justify-center -mx-6 text-center" >
                  <hr className="w-full my-3 border-gray-200 dark:border-gray-700"/>
          </div>
      <div className="h-[40vh] mx-2  space-y-8 mt-2  scroll-smooth no-scrollbar">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-base font-medium">Guests</h1>
            <h4 className="text-sm">How many guests do have allow?</h4>
          </div>
          <div className="flex items-center justify-between space-x-2">
            <AiOutlineMinusCircle onClick={()=>{settotalguest(totalguests == 0 ? 0 : totalguests-1)}} className="cursor-pointer" size={25}/>
            <h1 className="text-lg">{totalguests}</h1>
            <AiOutlinePlusCircle onClick={()=>{settotalguest(totalguests+1)}} className="cursor-pointer" size={25}/>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-base font-medium">Rooms</h1>
            <h4 className="text-sm">How many rooms do you have?</h4>
          </div>
          <div className="flex items-center justify-between space-x-2">
            <AiOutlineMinusCircle onClick={()=>{settotalroom(totalrooms == 0 ? 0 : totalrooms-1)}} className="cursor-pointer" size={25}/>
            <h1 className="text-lg">{totalrooms}</h1>
            <AiOutlinePlusCircle onClick={()=>{settotalroom(totalrooms+1)}} className="cursor-pointer" size={25}/>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-base font-medium">Bathrooms</h1>
            <h4 className="text-sm">How many bathrooms do you have?</h4>
          </div>
          <div className="flex items-center justify-between space-x-2">
            <AiOutlineMinusCircle onClick={()=>{settotalbathrooms(totalbathrooms == 0 ? 0 : totalbathrooms-1)}} className="cursor-pointer" size={25}/>
            <h1 className="text-lg">{totalbathrooms}</h1>
            <AiOutlinePlusCircle onClick={()=>{settotalbathrooms(totalbathrooms+1)}} className="cursor-pointer" size={25}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
