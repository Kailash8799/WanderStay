import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import qs from 'query-string'

const CategoryCard = ({label,Icons,desc,selected}) => {
  const router = useRouter()
  const params = useSearchParams()

  const handleClick = ()=>{
    let currentQuery = {}
    if(params){
      currentQuery = qs.parse(params.toString());
    }
    const updatedquery = {
      ...currentQuery,
      category:label
    }
    if(params?.get('category') === label){
      delete updatedquery.category
    }

    const url = qs.stringifyUrl({
      url:'/',
      query:updatedquery
    },{skipNull:true})

    router.push(url)
  }

  return (
    <div
      onClick={handleClick}
      className={`flex flex-col flex-shrink-0 items-center justify-center gap-2 px-3 py-1 border-b-2 hover:text-neutral-800 hover:border-b-neutral-400 dark:hover:border-b-neutral-600 transition cursor-pointer ${selected ? 'border-b-neutral-700' : 'border-transparent'} ${selected ? 'text-neutral-600' : 'text-neutral-500'}`}
    >
        <Icons size={26}/>
        <h1 className="flex-shrink-0 text-sm font-medium">{label}</h1>
    </div>
  );
};

export default CategoryCard;
