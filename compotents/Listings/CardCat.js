import React from 'react'

const CardCat = ({Icons,label,selected,setSelectedcategory}) => {
  const clickCategory = ()=>{
    setSelectedcategory(label)
  }
  return (
    <div
    onClick={clickCategory}
    className={`mx-2 my-1.5 flex flex-col flex-shrink-0 items-center justify-center gap-2 px-3 py-1 border border-gray-800 dark:border-gray-600 rounded-lg hover:text-neutral-800 hover:border-b-neutral-400 dark:hover:border-b-neutral-600 dark:hover:text-neutral-200 transition cursor-pointer ${selected ? 'border-2 text-neutral-900 dark:text-neutral-300 border-neutral-700' : 'border-transparent'} ${selected ? 'text-neutral-600' : 'text-neutral-500'}`}
  >
      <Icons size={26}/>
      <h1 className="flex-shrink-0 text-sm font-medium">{label}</h1>
  </div>
  )
}

export default CardCat