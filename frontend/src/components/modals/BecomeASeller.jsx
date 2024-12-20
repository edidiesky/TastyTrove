import React, { useEffect, useState } from "react";
import axios from "axios";
import { BiCamera } from "react-icons/bi";
import { motion } from "framer-motion";
import styled from "styled-components";
import { RxCross2 } from "react-icons/rx";
import AnimateText from "@/animations/AnimateText";
import {
  onLoginModal,
  offSellerModal,
  offLoginModal,
} from "../../features/modals/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../home/loader";
import { SellerFormInputData } from "@/constants/data/formdata";
import { BecomingASeller } from "@/features/auth/authReducer";
import Image from "../common/Image";
import toast from "react-hot-toast";

const ModalVariants = {
  initial: {
    opacity: 0,
    y: "100vh",
  },
  enter: {
    opacity: 1,
    y: "0",
    transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
  },
  exit: {
    opacity: 1,
    y: "100vh",

    transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
  },
};
const BecomeASellerModal = () => {
  const dispatch = useDispatch();
  const handleClearAlert = () => {
    dispatch(offSellerModal());
  };
  const [image, setImage] = useState("");

  const { becomeASellerisSuccess, currentUser, becomeASellerisLoading } =
    useSelector((store) => store.auth);
  const { sellermodal } = useSelector((store) => store.modal);
  const [formvalue, setFormValue] = useState({
    name: "",
    username: "",
    email: "",
    hashedPassword: "",
    city: "",
    country: "",
  });

  const noEntry =
    formvalue.email === "" ||
    formvalue.hashedPassword === "" ||
    formvalue.username === "" ||
    formvalue.city === "" ||
    formvalue.country === "" ||
    image === "" ||
    formvalue.name === "";

  const [uploading, setUploading] = useState(false);
  const [alert, setAlert] = useState(false);

  const handleFormChange = (e) => {
    setFormValue({
      ...formvalue,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmision = (e) => {
    e.preventDefault();
    dispatch(
      BecomingASeller({
        image,
        ...formvalue,
      })
    );
  };

  useEffect(() => {
    if (becomeASellerisSuccess) {
      dispatch(offSellerModal());
    }
  }, [becomeASellerisSuccess]);

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

      setImage(...data?.urls);
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

  useEffect(() => {
    if (currentUser) {
      setFormValue({
        name: currentUser?.name,
        username: currentUser?.username,
        email: currentUser?.email,
        city: currentUser?.city,
        country: currentUser?.country,
        // role: currentUser?.isAdmin,
      });
      setImage(currentUser?.image ? currentUser?.image : "");
    }
  }, [setFormValue, currentUser, setImage]);

  return (
    <SellerModalStyles
      className="w-full h-screen"
      as={motion.div}
      initial={{ opacity: 0, visibility: "hidden" }}
      exit={{ opacity: 0, visibility: "hidden" }}
      animate={{ opacity: 1, visibility: "visible" }}
    >
      {/* {becomeASellerisLoading && <Loader />} */}
      {uploading && <Loader />}
      <motion.div
        variants={ModalVariants}
        initial="initial"
        animate={sellermodal ? "enter" : "exit"}
        exit="exit"
        className="guestModalCard grid md:grid-cols-2"
      >
        <div className="w-full h-full relative md:block hidden">
          <div className="bg-[rgba(0,0,0,.5)] z-20 absolute w-full h-full"></div>
          <Image
            alt=""
            loading="lazy"
            src={
              "https://avada.website/restaurant/wp-content/uploads/sites/112/2020/01/hero12x.jpg"
            }
            className=""
          />
        </div>
        <div className="w-full mx-auto py-2 flex flex-col">
          <div className="w-full sticky top-0 left-0 p-6 px-4 flex items-center justify-between">
            <h3 className="text-2xl md:text-3xl px-2 font-semibold family6">
              Become a Seller
              <span className="block text-sm font-normal family1">
                Fill in the form to become a seller!
              </span>
            </h3>
            <div
              className="cross absolute top-6 right-5"
              onClick={handleClearAlert}
            >
              <RxCross2 />
            </div>
          </div>
          <div className="w-full h-[500px] overflow-auto justify-center flex">
            <form
              onSubmit={handleFormSubmision}
              className="w-[90%] mx-auto  p-2 pb-4 flex flex-col gap-8"
            >
              <div className="w-16 h-16 relative">
                {image !== "" ? (
                  <img
                    src={image}
                    alt=""
                    className="w-16 object-cover h-16 rounded-full"
                  />
                ) : (
                  <img
                    src="https://fundednext.fra1.digitaloceanspaces.com/dashboard/demo-avatar.jpg"
                    alt=""
                    className="w-16 object-cover h-16 rounded-full"
                  />
                )}
                <label htmlFor="upload">
                  <div
                    className="absolute cursor-pointer text-white text-lg rounded-full border-4 border-[rgba(255,255,255,1)] 
                  flex items-center justify-center w-8 h-8 bottom-5 -right-5 bg-[#5542F6]"
                  >
                    <BiCamera />
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
                  </div>
                </label>
              </div>
              <div className="grid md:grid-cols-2 gap-2 w-full">
                {SellerFormInputData?.map((input, index) => {
                  return (
                    <label
                      key={index}
                      htmlFor={input.label}
                      className="text-sm family1 rounded-[10px] flex flex-col gap-2 text-dark"
                    >
                      <span className="text-dark ">{input.label}</span>
                      <input
                        className="w-full input rounded-md text-dark
                           font-normal text-sm"
                        required={true}
                        name={input?.name}
                        id={input.label}
                        value={formvalue[input.name]}
                        type={input.type}
                        placeholder={input.label}
                        onChange={handleFormChange}
                      ></input>
                    </label>
                  );
                })}
              </div>

              <div className="w-full pb-4 flex items-center justify-center flex-col gap-3">
           

                 <button
                    data-test="becomingASellerModalButton"
                    type="submit"
                    disabled={becomeASellerisLoading || noEntry}
                    className="p-4 px-8 hover:opacity-[.5] text-[#fff] flex items-center justify-center w-full cursor-pointer 
                   bg-[#000] rounded-[40px] family1 font-normal"
                  >
                    {becomeASellerisLoading ? (
                      <div className="w-full flex justify-center items-center gap-4">
                        <Loader type="dots" /> Becoming a seller in progress
                      </div>
                    ) : (
                      <AnimateText children={"Become a seller"} />
                    )}
                  </button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </SellerModalStyles>
  );
};
const SellerModalStyles = styled(motion.div)`
  /* width: 100vw;
  height: 100vh; */
  position: fixed;
  left: 0;
  display: flex;
  z-index: 60;
  align-items: center;
  justify-content: center;
  top: 0;
  background: rgba(0, 0, 0, 0.3);
  .option {
    width: 100%;
    position: relative;
    text-align: center;
    padding: 0 1.4rem;
    font-size: 15px;
    &::after {
      width: 45%;
      height: 0.2px;
      content: "";
      background-color: rgba(0, 0, 0, 0.1);
      left: 0;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }
    &::before {
      width: 45%;
      height: 0.4px;
      content: "";
      background-color: rgba(0, 0, 0, 0.1);
      right: 0;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .guestModalCard {
    max-width: 1000px;
    min-width: 900px;
    overflow: hidden;
    background: #fff;
    /* gap: 2rem; */
    border-radius: 10px;
    /* min-height: 90vh; */
    box-shadow: 0 2rem 3rem rgba(0, 0, 0, 0.4);
    position: relative;
    @media (max-width: 980px) {
      max-width: 400px;
      min-width: 400px;
    }
    @media (max-width: 480px) {
      max-width: 90%;
      min-width: 90%;
    }
    .cross {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      &:hover {
        background: #d9d8d8;
      }
      svg {
        font-size: 20px;
      }
    }
    .deleteCardBottom {
      display: flex;
      align-items: center;
      justify-content: center;
      padding-top: 2rem;
      gap: 1rem;
      button {
        padding: 1.2rem 2rem;
        border: none;
        font-size: 1.3rem;
        font-weight: 400;
        background: var(--grey-2);
        color: #fff;
        outline: none;
        border-radius: 40px;
        cursor: pointer;
        text-transform: none;
        &:hover {
          background: var(--grey-1);
          color: var(--text-color);
        }
        &.deleteBtn {
          background: var(--blue-1);
          &:hover {
            opacity: 0.8;
            color: #fff;
          }
        }
      }
    }
  }
`;

export default BecomeASellerModal;
