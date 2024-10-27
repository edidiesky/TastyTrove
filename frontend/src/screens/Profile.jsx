import React, { useEffect } from "react";
import HomeIndex from "../components/profile";
import Meta from "@/components/common/Meta";

const Profile = () => {
    return (
        <div>
            <Meta title={
                "My profile"
            } />
            <HomeIndex />
        </div>
    );
};

export default Profile;
