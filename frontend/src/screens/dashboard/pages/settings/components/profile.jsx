"use client";
import React, { useEffect, useState } from "react";
import { BiCamera, BiLock, BiSearch, BiUser } from "react-icons/bi";
import { DashboardProfileInputData } from "@/constants/data/formdata";
import axios from "axios";
import toast from "react-hot-toast";
import { Switch } from "@/components/ui/switch";
import { useDispatch, useSelector } from "react-redux";
import { UpdateSingleUser } from "@/features/auth/authReducer";
import Loader from "@/components/home/loader";

const Profile = () => {
  const [index, setIndex] = useState(0);
  const { userInfo, updateUserisLoading, getallUserisLoading } = useSelector(
    (store) => store.auth
  );
  const [formvalue, setFormValue] = useState({
    name: "",
    username: "",
    email: "",
    location: "",
    role: false,
  });
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState(false);
  useEffect(() => {
    if (userInfo) {
      setFormValue({
        name: userInfo?.name,
        username: userInfo?.username,
        email: userInfo?.email,
        // role: userInfo?.isAdmin,
      });
      setRole(userInfo?.isAdmin);
      setImage(userInfo?.image ? userInfo?.image : "");
    }
  }, [setFormValue, userInfo, setRole, setImage]);

  const handleFormChange = (e) => {
    setFormValue({
      ...formvalue,
      [e.target.name]: e.target.value,
    });
  };

  const handleSwitchChange = (name) => (checked) => {
    setRole(checked);
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
          isAdmin: role,
          ...formvalue,
        })
      );
    }
  };

  return (
    <div className="w-full lg:grid-cols-custom_2 relative items-start gap-8 grid">
      {(updateUserisLoading || getallUserisLoading || uploading) && <Loader />}
      <div className="w-full lg:sticky top-[10%] py-8 bg-white border rounded-[20px]">
        <div
          onClick={() => setIndex(0)}
          className={`px-6  ${
            index === 0 ? "bg-[#fafafa] border-r-4" : " bg-white border-0"
          }  text-base font-booking_font4 cursor-pointer py-4 flex items-center justify-start gap-4`}
        >
          <BiUser /> Profile Settings
        </div>

        <div
          onClick={() => setIndex(1)}
          className={`px-6  ${
            index === 1 ? "bg-[#fafafa] border-r-4" : " bg-white border-0"
          }  text-base font-booking_font4 cursor-pointer py-4 flex items-center justify-start gap-4`}
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
                  <div className="w-32 h-32 relative">
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
                      <div className="absolute cursor-pointer text-white text-2xl rounded-full border-4 border-[rgba(255,255,255,1)] flex items-center justify-center w-12 h-12 bottom-5 -right-5 bg-[#5542F6]">
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
                      <div className="input flex item-center gap-1">
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
                <div className="flex flex-col gap-3">
                  <span className="text-dark text-base font-normal">
                    User Role
                  </span>
                  <div className="p-6 px-4 border w-full rounded-lg flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                      <span className="text-base font-bold font-booking_font_bold">
                        User Priviledge
                      </span>

                      <span className="text-sm font-normal font-booking_font">
                        Modify the users priviledge from normal user to admin
                      </span>
                    </div>
                    <Switch
                      checked={role}
                      onCheckedChange={handleSwitchChange("role")}
                    />
                  </div>
                </div>
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
                <h4 className="text-xl font-booking_font4">Change Password</h4>
              </div>
              <form className="w-full grid grid-cols-1 gap-4">
                <label
                  htmlFor={"password"}
                  className="text-base font-booking_font_normal rounded-[10px] flex flex-col gap-2 text-dark"
                >
                  <span className="text-grey font-normal">Password</span>
                  <div className="input flex item-center gap-1">
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
                  <div className="input flex item-center gap-1">
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
  );
};

export default Profile;
