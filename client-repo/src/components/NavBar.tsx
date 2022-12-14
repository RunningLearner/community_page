import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaSearch } from "react-icons/fa";
import { useAuthDispatch, useAuthState } from "../context/auth";

const NavBar: React.FC = () => {
  const { loading, authenticated } = useAuthState();
  const dispatch = useAuthDispatch();

  const test = "test";

  const handleLogOut = () => {
    axios
      .post("/auth/logout")
      .then(() => {
        dispatch("LOGOUT");
        window.location.reload();
      })
      .catch((error) => {
        console.log(console.error());
      });
  };

  return (
    <div className=" border-b border-gray-200 p-1 fixed inset-x-0 top-0 z-10 flex items-center justify-between px-5 bg-white h-15">
      <span className=" text-2xl font-semibold text-gray-400">
        <Link href="/" legacyBehavior>
          <a>
            <Image src="/flag.png" alt="logo" width={40} height={25} />
          </a>
        </Link>
      </span>

      <div className=" max-w-full px-4">
        <div className=" relative flex items-center bg-gray-100 border rounded hover:border-gray-700 hover:bg-white">
          <FaSearch className="ml-2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="px-3 py-1 bg-transparent rounded h-7 focus:outline-none"
          />
        </div>
      </div>

      <div className=" flex">
        {!loading &&
          (authenticated ? (
            <button
              className=" w-20 px-2 mr-2 text-sm text-center text-white bg-gray-400 rounded h-7"
              onClick={handleLogOut}
            >
              로그아웃
            </button>
          ) : (
            <>
              <Link href="/login" legacyBehavior>
                <a className="w-20 px-2 pt-1 mr-2 text-sm text-center text-blue-500 border border-blue-500 rounded h-7">
                  로그인
                </a>
              </Link>
              <Link href="/register" legacyBehavior>
                <a className="w-20 px-2 pt-1 text-sm text-center text-white bg-gray-400 rounded h-7">
                  회원가입
                </a>
              </Link>
            </>
          ))}
      </div>
    </div>
  );
};

export default NavBar;
