import React, { useCallback, useState } from "react";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BiPlus, BiSearch, BiUpload } from "react-icons/bi";
import toast from "react-hot-toast";
import { BsImage } from "react-icons/bs";
import Loader from "@/components/home/loader";
import { RxCross1 } from "react-icons/rx";
const ImageUpload = ({ images, setImages, setFeatures, features }) => {
  const [uploading, setUploading] = useState(false);
  const [alert, setAlert] = useState(false);

  const handleFileUpload = async (e) => {
    // get the file
    const file = e.target.files;
    setUploading(true);
    // create formdata
    const formData = new FormData();
    for (let i = 0; i < file.length; i++) {
      formData.append("files", file[i]);
    }

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URLS}/upload`,
        formData,
        config
      );

      setImages(data?.urls[0]);
      setAlert(true);
      setUploading(false);
      toast.success("Image uploaded succesfully!!");
    } catch (error) {
      setUploading(false);
      toast.error(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  };
  const handleDeleteImage = () => {
    setImages("");
  };
  const categoryList = [
    "Hors d’oeuvres",
    "Main Course",
    "desserts",
    "DRINK & COCKTAIL",
  ];
  return (
    <div className="w-full md:w-[400px] flex bg-[#fdfdfd] border py-8 px-4 flex-col gap-8 rounded-[10px]">
      {uploading && <Loader />}
      <div className="w-[95%] md:w-[90%] mx-auto flex flex-col gap-4">
        <div className="w-full flex items-center justify-between">
          <h4 className="text-lg font-bold family1">
            Menu Image
            <span className="font-normal family1 text-xs block">
              Share what makes your rooms images special.
            </span>
          </h4>
        </div>
        <div className="w-full flex flex-col gap-4">
          <div className="w-full flex flex-col gap-4 text-sm family1">
            {images?.length > 0 ? (
              <div className="flex flex-col gap-2">
                <span>Photos</span>
                <div className="w-full h-56 relative">
                  <img
                    alt="Cotion"
                    loading="lazy"
                    className="w-full h-full object-cover"
                    src={images}
                  />
                  <div
                    onClick={() => handleDeleteImage()}
                    className="w-12 h-12 hover:bg-[#eee] rounded-full bg-white absolute top-4 right-2 flex items-center justify-center shadow-lg text-base"
                  >
                    <RxCross1 />
                  </div>
                </div>
                <label
                  htmlFor="upload"
                  className="w-full cursor-pointer text-xs bg-[#fafafa] border border-dotted rounded-lg flex gap-2 flex-col items-center justify-center h-[100px]"
                >
                  <BsImage fontSize={"18px"} />
                  Click to upload images of your choice
                  <input
                    type="file"
                    id="upload"
                    placeholder="Gig Image"
                    autoComplete="off"
                    style={{ display: "none" }}
                    onChange={handleFileUpload}
                    multiple
                    className="w-full"
                  />
                </label>
              </div>
            ) : (
              <label
                htmlFor="upload"
                className="w-full bg-[#fafafa] border-dotted text-xs rounded-lg cursor-pointer family1 flex-col gap-2 flex items-center justify-center border h-[100px]"
              >
                <input
                  type="file"
                  id="upload"
                  placeholder="Gig Image"
                  autoComplete="off"
                  style={{ display: "none" }}
                  onChange={handleFileUpload}
                  multiple
                  className="w-full "
                />
                <BsImage fontSize={"24px"} /> Click to upload images of your
                choice
              </label>
            )}
          </div>
        </div>
      </div>
      <div className="w-[95%] md:w-[90%] mx-auto flex flex-col gap-4">
        <div className="w-full flex items-center justify-between">
          <h4 className="text-lg font-bold family1">
            Menu Category
            <span className="font-normal family1 text-xs block">
              Share what makes your rooms images special.
            </span>
          </h4>
        </div>
        <div className="w-full flex flex-col gap-4">
          <Select onValueChange={(e) => setFeatures(e)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {categoryList?.map((category, index) => {
                return (
                  <SelectGroup>
                    <SelectItem key={index} value={category}>
                      {category}
                    </SelectItem>
                  </SelectGroup>
                );
              })}
            </SelectContent>
          </Select>
     
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
