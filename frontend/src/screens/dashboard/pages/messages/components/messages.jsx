
import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { Table } from "@/components/common/styles";
import TableCard from "@/components/common/TableCard";
import { useSelector } from "react-redux";
import moment from "moment";
import { IoMdSend } from "react-icons/io";
import { BsImage } from "react-icons/bs";
let socketIo = "";
const user = [
  {
    id: "6699372f2dc6dd45026faf26",
    name: "testuser",
    username: "user123",
    email: "testuser@gmail.com",
    emailVerified: null,
    image: null,
    createdAt: "2024-07-18T15:39:27.523Z",
    updatedAt: "2024-07-18T15:39:27.523Z",
  },
  {
    id: "669938972dc6dd45026faf27",
    name: "Edidiong Essien",
    username: "eddycodes",
    email: "edidiong1000@gmail.com",
    emailVerified: null,
    image:
      "https://avada.website/restaurant/wp-content/uploads/sites/112/2019/12/info92x.jpg",

    createdAt: "2024-07-18T15:45:27.533Z",
    updatedAt: "2024-07-18T15:45:27.533Z",
  },
  {
    id: "669938c72dc6dd45026faf28",
    name: "Victor Essien",
    username: "victorcodes",
    email: "victorcancode1000@gmail.com",
    emailVerified: null,
    image:
      "https://avada.website/restaurant/wp-content/uploads/sites/112/2019/12/info62x-600x814.jpg",
    role: "ADMIN",
    createdAt: "2024-07-18T15:46:15.155Z",
    updatedAt: "2024-07-18T15:46:15.155Z",
  },
  {
    id: "66993a115341c637335b49b4",
    name: "Precious Sam",
    username: "precious",
    email: "precious1000@gmail.com",
    emailVerified: null,
    image: null,
    createdAt: "2024-07-18T15:51:45.484Z",
    updatedAt: "2024-07-18T15:51:45.484Z",
  },
];
const message = [
  {
    sender: {
      id: "669938c72dc6dd45026faf28",
      name: "Victor Essien",
      username: "victorcodes",
      email: "victorcancode1000@gmail.com",
    },
    body: "What a beautiful program",
    createdAt: "2024-07-18T15:45:27.533Z",
  },
  {
    sender: {
      id: "669938c72dc6dd45026faf28",
      name: "Victor Essien",
      username: "victorcodes",
      email: "victorcancode1000@gmail.com",
    },
    body: "Man u are very good",
    createdAt: "2024-07-18T15:45:27.533Z",
  },
  {
    sender: {
      id: "669938972dc6dd45026faf27",
      name: "Edidiong Essien",
      username: "eddycodes",
      email: "edidiong1000@gmail.com",
      emailVerified: null,
    },
    body: "What a beautiful program",
    createdAt: "2024-07-18T15:45:27.533Z",
  },
  {
    sender: {
      id: "669938972dc6dd45026faf27",
      name: "Edidiong Essien",
      username: "eddycodes",
      email: "edidiong1000@gmail.com",
      emailVerified: null,
    },
    body: "Man u are very good",
    createdAt: "2024-07-18T15:45:27.533Z",
  },
];
const Nessage = () => {
  //   const [roommodal, setRoomModal] = useState(false);
  const { users, getallRoomisLoading, token, currentUser } = useSelector(
    (store) => store.auth
  );
  const [body, setBody] = React.useState("");
  const [page, setPage] = useState(1);
  const handleCreateMessage = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      // const { data } = await axios.post(
      //   `${import.meta.env.VITE_API_BASE_URLS}/message/${
      //     conversationDetails?._id
      //   }`,
      //   {
      //     body,
      //     userId: currentUser?._id,
      //   },
      //   config
      // );

      // handleSingleMessageDetails();
      // setMessage((prev) => [
      //   ...prev,
      //   { body: data.body, userId: currentUser?._id },
      // ]);
      // socketIo?.emit("sendMessage", {
      //   receiverId: userDetails?._id,
      //   senderId: currentUser?._id,
      //   text: body,
      // });
      // setBody("");
    } catch (err) {
      console.log(err);
    }

    setBody("");
  };
  return (
    <div className="w-full h-[500px] border rounded-[20px] grid lg:grid-cols-custom_2 ">
      <div className="w-[360px] h-full border-r flex flex-col">
        <div className="w-full px-6 border-b h-[70px] flex items-center gap-3">
          <h4 className="text-xl lg:text-2xl font-semibold family1">
            Messages
          </h4>
          {/* <label
            htmlFor=""
            className="text-dark w-full
             items-center py-2 border rounded-[40px] px-4"
          >
            <div className="text-grey rounded-full text-dark flex items-center justify-center">
              <BiSearch />
            </div>
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent family1 text-base border-none outline-none text-dark"
            />
          </label> */}
        </div>
        <div className="w-full flex flex-col">
          {user?.map((user, index) => {
            return (
              <div
                key={index}
                className={`${
                  index === 1 ? "bg-[#fafafa]" : ""
                } hover:bg-[#f1f1f1] w-full cursor-pointer flex items-center justify-between py-3 px-4`}
              >
                <div className="w-full flex items-center gap-4">
                  {user?.image ? (
                    <img
                      src={user?.image}
                      alt=""
                      className="w-12 h-12 rounded-full"
                    />
                  ) : (
                    <img
                      src="https://fundednext.fra1.digitaloceanspaces.com/dashboard/demo-avatar.jpg"
                      alt=""
                      className="w-12 h-12 rounded-full"
                    />
                  )}

                  <h5 className="text-base font-semibold family1">
                    {user?.name}
                    <span className="block font-normal text-xs text-grey">
                      Last Message
                    </span>
                  </h5>
                </div>
                <h6 className="text-xs font-normal family1">
                  4:45pm
                  <span className="block font-normal text-xs text-grey">
                    {/* Last Message */}
                  </span>
                </h6>
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full flex flex-col">
        {/* TOP BAR */}
        <div className="w-full px-6 border-b h-[70px] flex items-center gap-3">
          <div className="w-full flex items-center gap-4">
            {user[0]?.image ? (
              <img
                src={user[0]?.image}
                alt=""
                className="w-12 h-12 rounded-full"
              />
            ) : (
              <img
                src="https://fundednext.fra1.digitaloceanspaces.com/dashboard/demo-avatar.jpg"
                alt=""
                className="w-12 h-12 rounded-full"
              />
            )}

            <h5 className="text-base font-semibold family1">
              {user[0]?.name}
              <span className="block font-normal text-xs text-grey">
                {moment(user[0]?.createdAt).format("DD MMM YYYY")}
              </span>
            </h5>
          </div>
        </div>
        {/* MESSAGE LIST */}

        <div
          className="w-full bg-[#fafafa] max-h-[360px] h-[360px] 
        py-4 overflow-y-auto p-2 flex flex-col gap-4"
        >
          {
            // {/* first conversation */ }
            message?.map((message, index) => {
              const senderMessage = currentUser?.id === message?.sender?.id;
              const createdAt = moment(message?.createdAt).format(
                "MMMM Do YYYY, h:mm a"
              );
              // console.log(senderMessage)
              return (
                <div key={index} className="w-full flex px-2 flex-col">
                  {/* first sender Message */}
                  {senderMessage ? (
                    <div className="w-full flex items-center justify-end">
                      <div className="flex w-full justify-end items-end gap-3">
                        <div className="flex-1 flex items-end flex-col justify-end gap-3">
                          <span className="max-w-[200px] md:max-w-[400px] rounded-[40px] family1 text-[12px] md:text-[12px] leading-[1.6] text-white flex items-center bg-[#1980EC] justify-center p-4 px-8">
                            {message?.body}
                          </span>
                          <span className="text-xs text-dark">{createdAt}</span>
                        </div>
                        <div className="w-14 h-14 rounded-full flex items-center justify-center text-xl text-white bg-[#000]">
                          {message?.sender?.username &&
                            message?.sender?.username[0]}
                        </div>
                        {/* <img src={message?.sender?.username} className='w-14 h-14 mb-8 rounded-full' alt="" /> */}
                      </div>
                    </div>
                  ) : (
                    <div className="w-full flex items-center justify-start">
                      <div className="flex w-full justify-start items-end gap-3">
                        <div className="w-14 h-14 rounded-full flex items-center justify-center text-xl text-white bg-[#000]">
                          {message?.sender?.username &&
                            message?.sender?.username[0]}
                        </div>
                        <div className="flex-1 flex items-start flex-col justify-start gap-3">
                          <span className="max-w-[200px] md:max-w-[400px] rounded-[30px] family1 text-[12px] md:text-[12px] leading-[1.6] text-dark flex items-center bg-[#e9e9e9] justify-center p-4 px-8">
                            {message?.body}
                          </span>
                          <span className="text-xs text-dark">{createdAt}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* first receiver Message */}
                </div>
              );
            })
          }
        </div>

        {/* input form */}
        <div className="w-full border-t h-[70px] px-8 flex items-center justify-center">
          <form
            onSubmit={(e) => handleCreateMessage(e)}
            action=""
            className="w-full"
          >
            <label htmlFor="search" className="flex text-lg items-center gap-2">
              <div
                className="w-12 cursor-pointer text-dark text-2xl h-12 hover:bg-[#F1F1F1] rounded-full
               text-dark flex items-center justify-center"
              >
                <BsImage />
              </div>

              <input
                value={body}
                name="body"
                onChange={(e) => setBody(e.target.value)}
                id="search"
                type="text"
                placeholder="Start a new Message"
                className="flex-1 bg-transparent text-base"
              ></input>
              <div
                className="w-12 cursor-pointer text-dark text-2xl h-12 hover:bg-[#F1F1F1] rounded-full
               text-dark flex items-center justify-center"
              >
                <IoMdSend />
              </div>
            </label>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Nessage;
