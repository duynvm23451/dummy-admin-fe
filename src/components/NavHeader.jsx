import React from "react";
import dummyLogo from "../assets/images/dummy-logo.png";
import { NavLink, useLocation } from "react-router-dom";
import { FaHouseUser } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import { MdAssignment } from "react-icons/md";
import { GiArchiveRegister } from "react-icons/gi";
import { FaHourglassEnd } from "react-icons/fa6";
import { logOut } from "../services/authenicationService";

const NavHeader = () => {
  const { pathname } = useLocation();
  return (
    <div className="absolute left-0 top-0 bottom-0 w-56 h-screen flex flex-col bg-theme-gray">
      <div className="flex items-center mt-4 ml-2 mb-10">
        <img src={dummyLogo} alt="logo" className="h-12" />
        <h2 className="uppercase text-2xl font-black">Dummy</h2>
      </div>
      <ul>
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            `flex items-center text-lg font-semibold mt-4 py-3 px-8 ${
              isActive ? "text-theme-yellow bg-theme-white" : "text-theme-black"
            }`
          }
        >
          <FaHouseUser
            className="w-7 h-7 mr-4 mb-0.5"
            isActive={pathname === "/"}
          />
          Người dùng
        </NavLink>
        <NavLink
          to={"/courses"}
          className={({ isActive }) =>
            `flex items-center text-lg font-semibold mt-4 py-3 px-8 ${
              isActive ? "text-theme-yellow bg-theme-white" : "text-theme-black"
            }`
          }
        >
          <SiGoogleclassroom
            className="w-7 h-7 mr-4 mb-0.5"
            isActive={pathname.includes("/courses")}
          />
          Khóa học
        </NavLink>
        <NavLink
          to={"/tests"}
          className={({ isActive }) =>
            `flex items-center text-lg font-semibold mt-4 py-3 px-8 ${
              isActive ? "text-theme-yellow bg-theme-white" : "text-theme-black"
            }`
          }
        >
          <MdAssignment
            className="w-7 h-7 mr-4 mb-0.5"
            isActive={pathname.includes("/tests")}
          />
          Bài kiểm tra
        </NavLink>
        <NavLink
          to={"/enrollments"}
          className={({ isActive }) =>
            `flex items-center text-lg font-semibold mt-4 py-3 px-8 ${
              isActive ? "text-theme-yellow bg-theme-white" : "text-theme-black"
            }`
          }
        >
          <GiArchiveRegister
            className="w-7 h-7 mr-4 mb-0.5"
            isActive={pathname.includes("/enrollments")}
          />
          Học viên
        </NavLink>
        <NavLink
          to={"/test-attempts"}
          className={({ isActive }) =>
            `flex items-center text-lg font-semibold mt-4 py-3 px-8 ${
              isActive ? "text-theme-yellow bg-theme-white" : "text-theme-black"
            }`
          }
        >
          <FaHourglassEnd
            className="w-7 h-7 mr-4 mb-0.5"
            isActive={pathname.includes("/test-attempts")}
          />
          Kết quả thi
        </NavLink>
      </ul>
      <div className="flex items-end mb-10 justify-center flex-1">
        <button
          onClick={logOut}
          className="px-8 bg-theme-red py-2 rounded-xl text-theme-white font-semibold text-lg"
        >
          Đăng xuất
        </button>
      </div>
    </div>
  );
};

export default NavHeader;
