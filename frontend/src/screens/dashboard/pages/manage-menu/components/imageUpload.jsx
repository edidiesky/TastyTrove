import React, { useCallback, useState } from "react";
import axios from "axios";
import { BiSearch, BiUpload } from "react-icons/bi";
import toast from "react-hot-toast";
import { BsImage } from "react-icons/bs";
import Loader from "@/components/home/loader";
const ImageUpload = ({ images, setImages }) => {
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

      setImages(data?.urls);
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

  return (
    <div className="w-[400px] flex bg-[#fdfdfd] border py-8 px-4 rounded-[20px]">
      {uploading && <Loader />}
      <div className="w-[95%] md:w-[90%] mx-auto flex flex-col gap-4">
        <div className="w-full flex items-center justify-between">
          <h4 className="text-2xl family1">
            Room Images
            <span className="font-normal family1 text-sm block">
              Share what makes your rooms images special.
            </span>
          </h4>
        </div>
        <div className="w-full flex flex-col gap-4">
          <div className="w-full flex flex-col gap-4 text-sm family1">
            {images?.length > 0 ? (
              <div className="flex flex-col gap-4">
                <span>Photos</span>
                <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-2">
                  {images?.map((image, index) => {
                    return (
                      <div className="w-full border p-2">
                        <img
                          alt="Cotion"
                          loading="lazy"
                          className="h-20 w-full object-cover"
                          src={image}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <label
                htmlFor="upload"
                className="w-full bg-[#fafafa] rounded-lg cursor-pointer family1 flex-col gap-2 flex items-center justify-center border border-dotted h-[200px]"
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
    </div>
  );
};

export default ImageUpload;
