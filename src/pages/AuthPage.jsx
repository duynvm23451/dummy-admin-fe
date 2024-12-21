import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login } from "../utils/http";
import { setToken } from "../services/localStorageService";
import dummyLogo from "../assets/images/dummy-logo.png";

const AuthPage = () => {
  const onHandleSubmit = async (event) => {
    event.preventDefault();
    const fd = new FormData(event.target);
    const formData = Object.fromEntries(fd.entries());
    try {
      const data = await login(formData);

      setToken(data.data.access_token);
      toast.success(data.message);
      window.location.href = "/";
    } catch (error) {
      const errorData = error.response.data;
      toast.error(errorData.message, {
        position: "bottom-right",
      });
    }
  };
  return (
    <div className="h-screen bg-theme-gray flex justify-center items-center">
      <ToastContainer />
      <div className="w-1/3 bg-theme-white flex">
        <div className="w-full px-12 pt-8 pb-10">
          <div className="flex items-center flex-col">
            <h1 className="text-2xl font-semibold text-gray-600 text-center uppercase">
              chào mừng bạn đến trang đăng nhập cho quản trị viên
            </h1>
            <img src={dummyLogo} alt="logo" className="h-24" />
          </div>

          <form className="mt-8" onSubmit={onHandleSubmit}>
            <label className="block mb-2 uppercase text-sm font-semibold">
              tài khoản
            </label>
            <input
              className="block w-full px-4 py-1.5 rounded-2xl bg-gray-100"
              name="name"
            />
            <label className="block mt-4 mb-2 uppercase font-semibold text-sm">
              mật khẩu
            </label>
            <input
              className="block w-full px-4 py-1.5 rounded-2xl bg-gray-100"
              type="password"
              name="password"
            />
            <button
              type="submit"
              className="uppercase hover:opacity-80 text-sm font-semibold w-full py-2.5 bg-theme-red mt-8 rounded-2xl text-white"
            >
              đăng nhập
            </button>

            <div className={"flex justify-between mt-4"}>
              <div className="flex justify-center">
                <input type="checkbox" className="mr-1.5" />
                <label className="text-sm font-medium text-theme-red">
                  Lưu tài khoản
                </label>
              </div>

              <label className="text-sm font-medium text-gray-600">
                Quên mật khẩu ?
              </label>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
