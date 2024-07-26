import { getAllNotifications, UpdateNotification } from '@/features/notification/notificationReducer'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { RxCross1 } from 'react-icons/rx'
import { useDispatch, useSelector } from 'react-redux'
// https://res.cloudinary.com/dl93zl9fn/image/upload/v1720214200/dauy0yzuetvaqhpa4jsq.png


export default function NotificationSidebar({
    setNotificationActiveBar,
    notificationactivebar,
}) {
    const dispatch = useDispatch()
    const { Notifications } = useSelector(store => store.notification)
    const [notificationread, setNotificationRead] = useState(true)
    useEffect(() => {
        dispatch(getAllNotifications())
    }, [])
    const UpdateMessageToRead = (id) => {
        dispatch(UpdateNotification({
            read: true,
            id: id,

        }))
    }
    return (
        <div className={`${notificationactivebar ? "right-0" : "-right-[100%]"
            } transition-all ease duration-700 z-[300000000] w-[320px] md:w-[400px] bg-[#fff] shadow-xl h-screen fixed top-0`}>
            <div
                onClick={() => setNotificationActiveBar(!notificationactivebar)}
                style={{ zIndex: "200000", transition: "all .4s ease" }}
                className={`${notificationactivebar ? "right-0" : "-right-[100%]"
                    } w-full h-full  fixed flex top-0 bg-[#42424227] flex-col gap-2`}
            ></div>
            <div style={{ zIndex: "250000" }} className="w-full flex flex-col py-8 relative bg-[#fff] h-full">
                <div className="pb-4 border-b w-full">
                    <div className="w-[85%] max-w-custom_1 flex items-center justify-between mx-auto">
                        <h4 className="text-2xl md:text-2xl family1 font-awmibold">
                            Notifications
                        </h4>
                        <div onClick={() => setNotificationActiveBar(false)} className="w-12 hover:bg-[#f7f7f7] cursor-pointer h-12 rounded-full flex items-center justify-center text-lg">

                            <RxCross1 fontSize={"20px"} />
                        </div>
                    </div>
                </div>
                <div className="w-full h-[85%] max-h-[85%] overflow-y-auto flex flex-col">
                    {
                        Notifications?.map((message, index) => {
                            return <div onClick={() => UpdateMessageToRead(message?.id)} key={index} className={`w-full ${!message?.read ? "bg-[#eee] hover:bg-[#eeeeee4b]" : ""} hover:bg-[#eee] cursor-pointer px-4 border-b py-3`}>
                                <div className="w-full flex items-center gap-3">
                                    <img src={message?.user?.image} alt="" className="w-12 border border-[rgba(0,0,0,.2)] h-12 rounded-full" />
                                    <h5 className="text-base font-semibold">
                                        <div className="flex items-center gap-1">
                                            {
                                                message?.user?.username
                                            }
                                            {" "}
                                            -
                                            <span className="text-xs md:text-sm family1 font-normal text-dark">
                                                {message?.action}
                                            </span>
                                        </div>
                                        <span className="block text-xs font-normal text-grey">
                                            {moment(message?.createdAt).format('llll')}
                                        </span>
                                    </h5>
                                </div>
                            </div>
                        })
                    }

                </div>
                <div className="sticky pt-4 border-t bottom-0 left-0 w-full">
                    <div className="w-full px-4 flex items-center justify-end gap-4">
                        <div className="py-3  px-4 bg-[#000] text-[#fff] rounded-full text-sm">Mark All As Read</div>
                        <div className="py-3 px-4 border rounded-full text-sm">Clear Notification</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
