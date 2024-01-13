import React from 'react'

const CategoryDetails = ({Icons,label,description}) => {
  return (
    <div className='flex flex-col gap-6'>
        <div className='flex flex-row items-center gap-4'>
            <Icons size={40} className="text-black dark:text-neutral-400"/>
            <div className='flex flex-col'>
              <div className='text-lg font-semibold'>{label}</div>
              <div className='font-light'>{description}</div>
            </div>
        </div>
    </div>
  )
}

export default CategoryDetails