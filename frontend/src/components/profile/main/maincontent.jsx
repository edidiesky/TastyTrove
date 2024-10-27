
import React, { useEffect, useState } from "react";
import { BiCamera, BiLock, BiSearch, BiUser } from "react-icons/bi";
import { DashboardProfileInputData } from "@/constants/data/formdata";
import axios from "axios";
import toast from "react-hot-toast";
import { Switch } from "@/components/ui/switch";
import { useDispatch, useSelector } from "react-redux";
import { UpdateSingleUser } from "@/features/auth/authReducer";
import Loader from "@/components/home/loader";
const MainContent = () => {
  return (
    <div className="w-full relative min-h-[100vh] flex flex-col">
      <Profile />
    </div>
  );
};

const Hero = () => {
  return (
    <div
      className="w-full min-h-[30vh] py-32 relative flex items-center justify-center
   gap-8"
    >
      <div className="w-full h-full z-30 bg-[rgba(0,0,0,.6)] absolute top-0 left-0"></div>
      <img
        src="/images/hazel_8.jpeg"
        alt=""
        className="absolute z-10 object-cover top-0 left-0 h-full w-full"
      />
      <div
        className="w-[90%] mx-auto z-40 flex items-center justify-center flex-col
       gap-4"
      >
        <h1 className="text-white family2  text-center leading-[1.3] text-5xl md:text-6xl family2">
          My Profile
        </h1>
  
      </div>
    </div>
  );
};

const Profile = () => {
  const [index, setIndex] = useState(0);
  const { currentUser, updateUserisLoading, getallUserisLoading } = useSelector(
    (store) => store.auth
  );
  const [formvalue, setFormValue] = useState({
    name: "",
    username: "",
    email: "",
    location: "",
  });
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState(false);
  useEffect(() => {
    if (currentUser) {
      setFormValue({
        name: currentUser?.name,
        username: currentUser?.username,
        email: currentUser?.email,
      });
      setImage(currentUser?.image ? currentUser?.image : "");
    }
  }, [setFormValue, currentUser, setImage]);

  const handleFormChange = (e) => {
    setFormValue({
      ...formvalue,
      [e.target.name]: e.target.value,
    });
  };


  const dispatch = useDispatch();
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

  const handleUpdateUser = () => {
    dispatch(UpdateSingleUser({ image: image, isAdmin: role, ...formvalue }));
  };

  const handleUpdateUserPassword = (e) => {
    e.preventDefault()
    if (password !== confirmpassword) {
      toast.error("Password do not match");
      return;
    } else {
      dispatch(
        UpdateSingleUser({
          password,
          image,
          ...formvalue,
        }, { id: currentUser?.id })
      );
    }
  };
  return (
    <div
      className="w-full relative py-16 flex items-center justify-center
   gap-8"
    >
      <div
        className="w-[90%] md:w-[800px] relative mx-auto max-w-custom_1 z-40 flex items-start justify-center flex-col
       gap-12"
      >
        <h1 className="text-dark text-start leading-[1.3] text-4xl md:text-5xl family5 italic">
          Account Settings
          <span className="block text-lg font-normal font-booking_font">
            Make changes on your profile
          </span>
        </h1>

        <div className="w-full lg:grid-cols-custom_2 relative items-start gap-8 grid">
          {(updateUserisLoading || getallUserisLoading || uploading) && <Loader />}
          <div className="w-full lg:sticky top-[10%] flex md:flex-col flex-row">
            <div
              onClick={() => setIndex(0)}
              className={`px-6  ${index === 0 ? "bg-[#fafafa] border-b-4 md:border-b-0 md:border-r-4" : " bg-white border-0"
                }  text-base family1 cursor-pointer py-4 flex items-center justify-start gap-4`}
            >
              <BiUser /> Profile Settings
            </div>

            <div
              onClick={() => setIndex(1)}
              className={`px-6  ${index === 1 ? "bg-[#fafafa] border-b-4 md:border-b-0 md:border-r-4" : " bg-white border-0"
                }  text-base family1 cursor-pointer py-4 flex items-center justify-start gap-4`}
            >
              <BiLock /> Password
            </div>
          </div>
          <>
            {index === 0 ? (
              <div className="w-full p-8 px-6 bg-white border rounded-[20px]">
                <div className="w-full flex flex-col gap-8">
                  <div>
                    <div className="w-full flex items-center gap-8">
                      <div className="w-20 h-20 md:w-32 md:h-32 relative">
                        {image !== "" ? (
                          <img
                            src={image}
                            alt=""
                            className="w-full absolute object-cover h-full rounded-full"
                          />
                        ) : (
                          <img
                            src="https://fundednext.fra1.digitaloceanspaces.com/dashboard/demo-avatar.jpg"
                            alt=""
                            className="w-full absolute object-cover h-full rounded-full"
                          />
                        )}
                        <label htmlFor="upload">
                          <div className="absolute cursor-pointer text-white text-base md:text-2xl rounded-full border-4
                           border-[rgba(255,255,255,1)] flex items-center justify-center w-8 h-8 md:w-12 md:h-12 bottom-5 -right-5 bg-[#5542F6]">
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
                      <div
                        onClick={handleUpdateUser}
                        style={{ letterSpacing: "2px" }}
                        className="btn btn-2 text-xs font-booking_font p-4 px-6 uppercase font-normal rounded-[40px] text-white"
                      >
                        Upload Now
                      </div>
                    </div>
                  </div>
                  <form className="w-full grid grid-cols-1 gap-4">
                    {DashboardProfileInputData?.map((input, index) => {
                      return (
                        <label
                          key={index}
                          htmlFor={input.label}
                          className="text-sm font-booking_font_normal rounded-[10px] flex flex-col gap-2 text-dark"
                        >
                          <span className="text-dark font-normal">
                            {input.label}
                          </span>
                          <div className="input flex items-center gap-1">
                            {/* <MdOutlineMailOutline fontSize={'18px'} className="text-dark" /> */}
                            <input
                              className="w-full rounded-2xl text-dark font-normal text-sm"
                              required={true}
                              name={input?.name}
                              id={input.label}
                              value={formvalue[input.name]}
                              type={input.type}
                              placeholder={input.label}
                              onChange={handleFormChange}
                            ></input>
                          </div>
                        </label>
                      );
                    })}
                    <div className="flex mt-8">
                      <div
                        onClick={handleUpdateUser}
                        style={{ letterSpacing: "2px" }}
                        className="btn btn-2 text-xs font-booking_font p-4 px-6 uppercase font-normal rounded-[40px] text-white"
                      >
                        Save Changes
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            ) : (
              <div className="w-full p-8 px-6 bg-white border rounded-[20px]">
                <div className="w-full flex flex-col gap-8">
                  <div className="w-full flex items-center gap-8">
                    <h4 className="text-xl md:text-xl family1 font-semibold">Change Password</h4>
                  </div>
                  <form className="w-full grid grid-cols-1 gap-4">
                    <label
                      htmlFor={"password"}
                      className="text-base font-booking_font_normal rounded-[10px] flex flex-col gap-2 text-dark"
                    >
                      <span className="text-grey font-normal">Password</span>
                      <div className="input flex items-center gap-1">
                        {/* <MdOutlineMailOutline fontSize={'18px'} className="text-grey" /> */}
                        <input
                          className="w-full rounded-2xl text-dark font-normal text-sm"
                          required={true}
                          name={"password"}
                          id={"password"}
                          value={password}
                          type={"password"}
                          placeholder={"password"}
                          onChange={(e) => setPassword(e.target.value)}
                        ></input>
                      </div>
                    </label>

                    <label
                      htmlFor={"confirmpassword"}
                      className="text-base font-booking_font_normal rounded-[10px] flex flex-col gap-2 text-dark"
                    >
                      <span className="text-grey font-normal">
                        Confirm Password
                      </span>
                      <div className="input flex items-center gap-1">
                        {/* <MdOutlineMailOutline fontSize={'18px'} className="text-grey" /> */}
                        <input
                          className="w-full rounded-2xl text-dark font-normal text-sm"
                          required={true}
                          name={"confirmpassword"}
                          id={"confirmpassword"}
                          value={confirmpassword}
                          type={"password"}
                          placeholder={"Comfirm your Password"}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        ></input>
                      </div>
                    </label>

                    <div className="flex mt-8">
                      <button
                        type="submit"
                        disabled={password === "" && confirmpassword === ""}
                        onClick={handleUpdateUserPassword}
                        style={{ letterSpacing: "2px" }}
                        className="btn btn-2 text-xs font-booking_font p-4 px-6 uppercase font-normal rounded-[40px] text-white"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
