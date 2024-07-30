import * as yup from "yup";
import { useState } from "react";
export default function Login_Register_Form({ type, authorization }) {
  const [error, setError] = useState(null);
  // Create a validation schema
  const schema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });
  // function authriz(params) {

  // }
  function submit(type) {
    {
      let email = document.getElementById("email" + type).value;
      let password = document.getElementById("password" + type).value;
      setError(null);
      schema
        .validate({ email, password })
        .then((valid) => {
          console.log(valid);
          if (type == "Sign In") {
            const arr = JSON.parse(localStorage.getItem("users"));
            console.log(arr);
            if (
              arr
                ? arr.find(
                    (user) => user.email == email && user.password == password
                  )
                : false
            ) {
              authorization("Sign In", email);
              let list = arr.filter((user) => user.email != email);
              list.push({ email, password, state: "logged in" });
              localStorage.setItem("users", JSON.stringify(list));
            } else {
              setError("wrong email or password");
            }
          } else {
            if (localStorage.getItem("users")) {
              console.log("sdbvsgb");
              const arr = JSON.parse(localStorage.getItem("users"));

              if (arr.find((user) => user.email == email)) {
                setError("The entered account is already registered");
                return null;
              } else {
                arr.push({ email, password, state: "logged in" });
                localStorage.setItem("users", JSON.stringify(arr));
                authorization("Register", email);
              }
            } else {
              localStorage.setItem(
                "users",
                JSON.stringify([{ email, password, state: "logged in" }])
              );
              authorization("Register", email);
            }
          }
        })
        .catch((errors) => {
          console.log(errors);
          if (errors) setError(errors.errors[0]);
          // Validation errors
        });
    }
  }
  // Validate an object

  return (
    <>
      <div
        id={type}
        tabIndex={-1}
        aria-hidden="true"
        className="hidden overflow-y-auto  overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0  max-h-full bg-gray-800 bg-opacity-70 h-screen "
      >
        <div className="p-12 bg-white  rounded-2xl w-[325px]  border-black border-2  ">
          <div className="mb-4">
            <h3 className="font-semibold text-2xl text-gray-800">{type}</h3>
            {type === "Sign In" ? (
              <p className="text-gray-500">Please sign in to your account.</p>
            ) : (
              <p className="text-gray-500">Please register an account.</p>
            )}
          </div>
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 tracking-wide">
                Email
              </label>
              <input
                className=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                id={"email" + type}
                type="text"
                placeholder="mail@gmail.com"
              />
            </div>
            <div className="space-y-2">
              <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
                Password
              </label>
              <input
                className="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                id={"password" + type}
                type="password"
                placeholder="minimum 8 characters"
              />
            </div>
            <div className="flex items-center justify-between"></div>
            <div>
              <button
                onClick={() => {
                  submit(type);
                }}
                className="w-full flex justify-center bg-slate-500 hover:bg-slate-700 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
              >
                {type}
              </button>
            </div>
          </div>
          {error ? <p className="text-red-500 text-center">{error}</p> : null}
        </div>
      </div>
    </>
  );
}
