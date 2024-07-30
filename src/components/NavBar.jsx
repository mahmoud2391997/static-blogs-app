import { useState } from "react";
import React from "react";

const NavBar = ({ onClick, addBlog, onLogout }) => {
  return (
    <header
      className="fixed z-20 top-0 flex flex-row w-full h-20 items-center justify-between bg-gray-800
        "
    >
      <a href="/">
        <div className="ml-[6%] flex flex-row justify-between items-center h-10 w-44">
          <div className="  w-10 h-10 flex justify-center items-center rounded-full bg-white text-center">
            <div
              className=" w-4 h-8 text-gray-800 font-sans text-2xl font-extrabold text-left
    "
            >
              B
            </div>
          </div>
          <div
            className=" font-sans font-bold text-2xl block text-white
      "
            id="brand"
          >
            MY BLOGS
          </div>
        </div>
      </a>

      <div class="dropdown">
        <div class="menu">
          <div class="bar st "></div>
          <div class="bar nd "></div>
          <div class="bar rd "></div>
        </div>
        <div class="dropdown-content">
          <a href="main.html">
            <button type="button" class="button home">
              Home
            </button>
          </a>
          <a href="products.html">
            <button type="button" class="button">
              Products
            </button>
          </a>
          <a href="cart.html">
            <button type="button" class="button">
              Cart
            </button>
          </a>
          <a id="dark_mode">
            <button id="dark-drop">
              <i class="fa fa-moon-o" aria-hidden="true">
                {" "}
                Dark
              </i>
            </button>
          </a>
          <a id="light_mode">
            <button id="light-drop">
              <i class="fas fa-sun "> Light</i>
            </button>
          </a>
        </div>
      </div>

      <div class="  mb-7   w-[15%] h-6 mr-6 block">
        <ul
          className=" list-none flex justify-around items-center m-0 pl-0 w-full
         "
        >
          <li id="login-btn">
            <button
              type="button"
              class="button home btn text-gray-800"
              onClick={() => {
                onClick("Sign In");
              }}
            >
              Sign in
            </button>
          </li>
          <li id="register-btn">
            <button
              type="button"
              class="button btn text-gray-800"
              onClick={() => {
                onClick("Register");
              }}
            >
              Register
            </button>
          </li>
          <li id="addBlog-btn" className="hidden">
            <button
              type="button"
              class="button btn text-gray-800 "
              onClick={() => {
                addBlog();
              }}
            >
              {" "}
              <i class="fa-solid fa-plus"></i>Add Blog
            </button>
          </li>
          <li id="logout-btn" className="hidden">
            <button
              type="button"
              class="button btn text-gray-800 "
              onClick={() => {
                onLogout();
              }}
            >
              <i class="fa-solid fa-right-from-bracket"></i> Log Out
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default NavBar;
