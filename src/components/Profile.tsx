import Image from "next/image";
import React from "react";
import testImg from "@/public/icons/ic_profile.svg";

const Profile = () => {
  return <Image src={testImg} alt="프로필" />;
};

export default Profile;
