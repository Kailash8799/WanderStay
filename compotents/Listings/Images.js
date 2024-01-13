import React, { useCallback } from "react";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { TbPhotoPlus } from "react-icons/tb";

const Images = ({images,setimages}) => {
  const handleChange = useCallback((result)=>{
    setimages(result.info.secure_url)
  },[setimages])
  return (
    <div>
      <h1 className="mx-3 text-lg font-bold text-start">
        Add photo of your place
      </h1>
      <p className="mx-3 text-sm font-medium text-start">
        Show guests what your place looks like!
      </p>
      <div className="max-h-[50vh] mt-4 overflow-y-auto space-y-3 space-x-3 scroll-smooth no-scrollbar">
        <CldUploadWidget onUpload={handleChange} uploadPreset="qn3tboz1" options={{ maxFiles: 1 }}>
          {({ open }) => {
            return (
              <div
                onClick={() => open !== undefined && setTimeout(()=>open?.apply(),1000)}
                className="relative flex flex-col items-center justify-center gap-4 p-20 transition border-2 border-dashed cursor-pointer hover:opacity-70 border-neutral-500 text-neutral-600"
              >
                <TbPhotoPlus size={50}/>
                <div className="text-lg font-semibold">
                  Click to upload
                </div>
                {images && (
                  <div className="absolute inset-0 w-full h-full">
                    <CldImage alt="upload" fill style={{objectFit:'cover'}} src={images}/>
                  </div>
                )}
              </div>
            );
          }}
        </CldUploadWidget>
      </div>
    </div>
  );
};

export default Images;
