import React, { useState, useEffect } from 'react'
import styled from "styled-components"
import axios from "axios";
import { BiChevronRight, BiChevronLeft } from 'react-icons/bi'
import io from "socket.io-client";
let socketIo = io as any;
import moment from "moment";
import { IoMdSend } from "react-icons/io";
import { useAppDispatch, useAppSelector } from '@/hooks/reduxtoolkit';
import { GetAllUserProfile } from '@/features/auth/authReducer';
import DashboardBanner from '@/components/common/dashboardBanner';
import { FaSearch } from 'react-icons/fa';
import { clearconversation, } from '@/features/conversation/conversationSlice';
import { Createconversation, GetUsersMessageConversation } from '@/features/conversation/conversationReducer';

const MessageList = () => {
    socketIo = socketIo.connect(`http://localhost:4000`);
    const dispatch = useAppDispatch()
    const [conversationId, setConversationId] = useState<string>('')
    const { users, userInfo, userDetails, token, noOfPages } = useAppSelector(store => store.auth)

    const [message, setMessage] = React.useState<any>([])
    const [body, setBody] = React.useState<string>("");
    const [page, setPage] = useState(1)

    const { conversationDetails } = useAppSelector((store: { conversation: any; }) => store.conversation)

    React.useEffect(() => {
        dispatch(GetAllUserProfile({ page: page }))
    }, [page]);

    const newUsersList = users?.filter((user: any) => user?._id !== userInfo?._id)

    // set the conversation to first tab
    React.useEffect(() => {
        // dispatch(GetAllUserProfile({ page: 1 }))
        if (conversationId === "") {
            setConversationId(newUsersList[0]?._id)
        }

    }, [setConversationId, newUsersList, conversationId]);


    useEffect(() => {
        setMessage([])
        dispatch(clearconversation("any"))
    }, [])

    useEffect(() => {
        if (conversationId !== "" && !conversationDetails) {
            dispatch(Createconversation({ conversationData: { receiverId: conversationId } }))
        }
    }, [conversationDetails, conversationId])

    const singleConversationUser = newUsersList?.find((user: any) => user?._id === conversationId)

    useEffect(() => {
        if (conversationId !== "") {
            dispatch(GetUsersMessageConversation({ receiverId: conversationId }))
        }
    }, [conversationId])
    // create a conversation if it does not exist
    // set the message list
    // test form the two client
    // 
    const handleSingleMessageDetails = async () => {
        try {
            const config = {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            };
            const response = await axios.get(
                `${import.meta.env.VITE_API_BASE_URLS}/message/${conversationDetails?._id}`,
                config
            )
            setMessage(response.data.message)
            // setMessage(response.data.messages)

        } catch (err: any) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (conversationDetails) {
            handleSingleMessageDetails()
        } else {
            setMessage([])
        }

    }, [setMessage, conversationDetails])
    // console.log(singleConversationUser)
    // console.log(message)


    const handleCreateMessage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            };
            const { data } = await axios.post(
                `${import.meta.env.VITE_API_BASE_URLS}/message/${conversationDetails?._id}`,
                {
                    body,
                    userId: userInfo?._id,
                },
                config
            )

            handleSingleMessageDetails()
            setMessage((prev?: any) => [...prev, { body: data.body, userId: userInfo?._id, }])
            socketIo?.emit("sendMessage", {
                receiverId: userDetails?._id,
                senderId: userInfo?._id,
                text: body,
            });
            setBody("");

        } catch (err: any) {
            console.log(err)
        }

        setBody("");

    };

    React.useEffect(() => {
        socketIo?.emit('addUserId', userInfo?._id)
        socketIo?.on('getAllConnectedUser', (users?: any) => {
            // console.log(users)
        })
        socketIo?.on('getMessage', (message?: any) => {
            console.log(message)
            setMessage((prev?: any) => [...prev, { body: message.text, userId: userInfo?._id, }])
            
        })

    }, [socketIo, setMessage]);
    return (
        <div className="w-100 flex flex-col gap-8">
            <DashboardBanner title='Message List' />
            <MessageStyles className="w-[98%]  border-[rgba(0,0,0,.2)] border mx-auto flex column">
                <div className="message_wrapper w-100">
                    <div className="w-100 border-r border-[rgba(0,0,0,.2)]">
                        <div className="w-100 flex flex-col">
                            <h4 className="text-4xl flex items-start flex-col justify-center px-2 font-bold family1 w-full h-28">
                                Chats
                                <span className="block font-normal text-grey text-xl family1">A list of your messages</span>
                            </h4>
                            <div className="w-100 border-t border-[rgba(0,0,0,.09)]  border-b p-4 text-2xl">
                                <label htmlFor="search" className="text-2xl rounded-[40px] input flex items-center gap-1">
                                    <FaSearch />
                                    <input id='search' type="text" placeholder='Search' className="w-90 text-2xl" ></input>
                                </label>
                            </div>

                            {/* message list */}
                            <div className="w-100 max-h-[430px] h-[430px] overflow-y-auto flex flex-col">
                                {
                                    newUsersList?.map((x: any, index: any) => {
                                        return <div
                                            onClick={() => setConversationId(x?._id)}
                                            key={index} className="w-100 py-2 transition-all ease duration-700 hover:bg-[#fafafa] cursor-pointer flex min-h-[70px] border-[rgba(0,0,0,.09)] border-b justify-center items-center">
                                            <div className="w-full px-[10px] h-full gap-1 flex items-start justify-between">
                                                <div className="flex h-full items-center gap-1">
                                                    {/* <img src={x?.image} className='w-[50px] h-[50px] rounded-full' alt="" /> */}
                                                    <div className="w-14 h-14 rounded-full flex items-center justify-center text-xl text-white bg-[#000]">
                                                        {x?.username && x?.username[0]}
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <h4 className="text-2xl md:text-xl font-extrabold">
                                                            {x?.username}
                                                        </h4>
                                                        <span className="block leading-[1.1] family1 font-normal text-xl text-grey">
                                                            {x?.email}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                            <div className="flex w-full p-4 item-center text-3xl family1 font-normal justify-center gap-2">
                                <span
                                    onClick={() => setPage(page === 0 ? 1 : page - 1)}
                                    className="w-16 h-16 flex cursor-pointer items-center justify-center rounded-xl border text-[#000] border-[#000] shadow-2xl text-2xltext-bold">
                                    <BiChevronLeft fontSize={'24px'} />
                                </span>
                                {page || 1}
                                <span
                                    onClick={() => setPage(page + 1 > noOfPages! ? 1 : page + 1)}
                                    className="w-16 h-16 flex cursor-pointer items-center rounded-xl border text-[#000] border-[#000] shadow-2xl justify-center text-2xltext-bold">
                                    <BiChevronRight fontSize={'24px'} />
                                </span>

                            </div>
                        </div>
                    </div>
                    <div className="w-100 md:flex flex-col hidden">
                        {/* top Message */}
                        <div className="h-28 border-b w-100 border-[rgba(0,0,0,.2)] flex items-center justify-center">
                            <div className="w-[95%] mx-auto flex items-center">
                                <div className="flex items-center gap-1">
                                    {/* <img src="/user_2.png" className='w-20 h-20 rounded-full' alt="" /> */}
                                    <div className="w-20 h-20 rounded-full flex items-center justify-center text-xl text-white bg-[#000]">
                                        {singleConversationUser?.username && singleConversationUser?.username[0]}
                                    </div>
                                    <h4 className="family1 text-2xl font-bold">
                                        {singleConversationUser?.username}
                                        <span className="block font-normal text-xl text-grey">
                                            {singleConversationUser?.email}
                                        </span>
                                    </h4>
                                </div>
                            </div>
                        </div>
                        {/* message List */}
                        <div className="w-100 max-h-[450px] h-[450px] py-4 overflow-y-auto p-2 flex flex-col gap-1">
                            {
                                // {/* first conversation */ }
                                message?.map((message: any, index: any) => {
                                    const senderMessage = userInfo?._id === message?.sender?._id
                                    const createdAt = moment(message?.createdAt).format(
                                        "MMMM Do YYYY, h:mm a"
                                    );
                                    // console.log(senderMessage)
                                    return <div key={index} className="w-100 flex px-2 flex-col">
                                        {/* first sender Message */}
                                        {
                                            senderMessage ? <div className="w-100 flex items-center justify-end">
                                                <div className="flex w-100 justify-end items-end gap-1">
                                                    <div className="flex-1 flex items-end flex-col justify-end gap-1">
                                                        <span className="max-w-[200px] md:max-w-[400px] rounded-[40px] family1 text-[12px] md:text-[12px] leading-[1.6] text-white flex items-center bg-[var(--blue-1)] justify-center p-4 px-8">
                                                            {message?.body}
                                                        </span>
                                                        <span className="text-sm text-dark">{createdAt}</span>
                                                    </div>
                                                    <div className="w-14 h-14 rounded-full flex items-center justify-center text-xl text-white bg-[#000]">
                                                        {message?.sender?.username && message?.sender?.username[0]}
                                                    </div>
                                                    {/* <img src={message?.sender?.username} className='w-14 h-14 mb-8 rounded-full' alt="" /> */}
                                                </div>

                                            </div>
                                                : <div className="w-100 flex items-center justify-start">
                                                    <div className="flex w-100 justify-start items-end gap-1">
                                                        <div className="w-14 h-14 rounded-full flex items-center justify-center text-xl text-white bg-[#000]">
                                                            {message?.sender?.username && message?.sender?.username[0]}
                                                        </div>
                                                        <div className="flex-1 flex items-start flex-col justify-start gap-1">
                                                            <span className="max-w-[200px] md:max-w-[400px] rounded-[30px] family1 text-[12px] md:text-[12px] leading-[1.6] text-dark flex items-center bg-[#e9e9e9] justify-center p-4 px-8">
                                                                {message?.body}
                                                            </span>
                                                            <span className="text-sm text-dark">{createdAt}</span>
                                                        </div>


                                                    </div>

                                                </div>
                                        }

                                        {/* first receiver Message */}


                                    </div>
                                })
                            }


                        </div>

                        {/* message form */}
                        <div className="h-32 border-t w-100 border-[rgba(0,0,0,.1)] flex items-center justify-center">
                            <div className="w-[95%] mx-auto flex items-center">
                                <form 
                                    onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                                        handleCreateMessage(e)
                                    }
                                className="flex w-100 items-center gap-1">
                                    <div className="w-16 h-16 rounded-full flex items-center justify-center text-xl text-white bg-[#000]">
                                        {userInfo?.username && userInfo?.username[0]}
                                    </div>
                                    <label htmlFor="search" className="text-3xl border border-[rgba(0,0,0,.4)] w-100 rounded-[40px] justify-between input flex items-center gap-1">

                                        <input
                                            value={body}
                                            name="body"
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                setBody(e.target.value)
                                            }
                                            id='search' type="text" placeholder='Start a new Message' className="w-90 text-2xl" ></input>
                                        <IoMdSend />
                                    </label>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </MessageStyles>
        </div>
    )
}

const MessageStyles = styled.div`
  margin: 2rem auto;
  background:#fff;
  border-radius: 4px;
  /* border:1px solid rgba(0,0,0,.2); */
  .message_wrapper {
    display: grid;
    grid-template-columns: 280px 1fr;
    @media (max-width:780px) {
       grid-template-columns: 1fr;
    }
  }
`
export default MessageList