import AddBlogForm from "./components/AddBlogForm";
import BlogComponent from "./components/blog_component";
import Test from "./components/Blogs";
import Login_Register_Form from "./components/LoginForm";
import LoginForm from "./components/LoginForm";
import NavBar from "./components/NavBar";
import { useEffect, useState } from "react";
import PaggingBar from "./components/pagging";
import SearchBar from "./components/SearchBar";
import Warning from "./components/DeleteItem";
import axios from "axios";
export default function App() {
  console.log(localStorage.getItem("users"));
  let users = JSON.parse(localStorage.getItem("users"));
  console.log(users);
  let authUser = sessionStorage.getItem("auth");
  console.log(authUser);

  //  sessionStorage.getItem("auth") ? null : .map((user)=> {user.state = "logged out"})
  const [authorized, setAuthorized] = useState(
    users
      ? users.find((user) => user.email == authUser)
        ? users.find((user) => user.email == authUser).state == "logged in"
        : false
      : false
  );
  function authorization(type, email) {
    sessionStorage.setItem("auth", email);
    setAuthorized(true);
    let signin = document.getElementById(type);
    let addBlog = document.getElementById("addBlog-btn");
    let logOut = document.getElementById("logout-btn");
    let login = document.getElementById("login-btn");
    let register = document.getElementById("register-btn");
    let editDelete = document.getElementsByClassName("edit-delete");
    signin.classList.remove("flex");
    signin.classList.add("hidden");
    document.getElementById("email" + type).value = "";
    document.getElementById("password" + type).value = "";
    addBlog.classList.remove("hidden");
    logOut.classList.remove("hidden");
    login.classList.add("hidden");
    register.classList.add("hidden");
    console.log(editDelete);
    Array.prototype.forEach.call(editDelete, (item) => {
      item.classList.remove("hidden");
      item.classList.add("flex");
    });
  }

  function logOut() {
    let logout = document.getElementById("logout-modal");
    logout.classList.remove("hidden");
    logout.classList.add("flex");
    //   let addBlog = document.getElementById("addBlog-btn")
    //   let logOut = document.getElementById("logout-btn")
    //  let login = document.getElementById("login-btn")
    //  let  register = document.getElementById("register-btn")
    //  addBlog.classList.add("hidden")
    //   logOut.classList.add("hidden")
    //   login.classList.remove("hidden")
    //   register.classList.remove("hidden")
  }

  function confirmLogout() {
    let auth = JSON.parse(localStorage.getItem("users")).find(
      (user) => user.email == sessionStorage.getItem("auth")
    );
    auth.state = "logged out";
    console.log(auth);
    let users = JSON.parse(localStorage.getItem("users")).filter(
      (user) => user.email != auth.email
    );
    users.push(auth);
    console.log(users);
    localStorage.setItem("users", JSON.stringify(users));
    sessionStorage.removeItem("auth");
    setAuthorized(false);
    let logout = document.getElementById("logout-modal");
    logout.classList.add("hidden");
    logout.classList.remove("flex");
    let addBlog = document.getElementById("addBlog-btn");
    let logOut = document.getElementById("logout-btn");
    let login = document.getElementById("login-btn");
    let register = document.getElementById("register-btn");
    addBlog.classList.add("hidden");
    logOut.classList.add("hidden");
    login.classList.remove("hidden");
    register.classList.remove("hidden");
  }

  function addBlog() {
    let addBlog = document.getElementById("add-item");
    addBlog.classList.remove("hidden");
    addBlog.classList.add("flex");
  }

  function onClick(type) {
    {
      let signin = document.getElementById(type);
      signin.classList.remove("hidden");
      signin.classList.add("flex");
      document.getElementById("email" + type).value = "";
      document.getElementById("password" + type).value = "";
    }
  }

  useEffect(() => {
    {
      let signin = document.getElementById("Sign In");
      signin.addEventListener("click", (e) => {
        if (e.target == signin) {
          signin.classList.add("hidden");
          signin.classList.remove("flex");
        }
      });
      let register = document.getElementById("Register");
      register.addEventListener("click", (e) => {
        if (e.target == register) {
          register.classList.add("hidden");
          register.classList.remove("flex");
        }
      });

      let logout = document.getElementById("logout-modal");
      logout.addEventListener("click", (e) => {
        if (e.target == logout) {
          logout.classList.add("hidden");
          logout.classList.remove("flex");
        }
      });
      let addBlog = document.getElementById("add-item");
      addBlog.addEventListener("click", (e) => {
        if (e.target == addBlog) {
          addBlog.classList.add("hidden");
          addBlog.classList.remove("flex");
          document.getElementById("add-item-source").value = "";
          document.getElementById("add-item-image").value = "";
          document.getElementById("add-item-title").value = "";
          document.getElementById("add-item-pub-at").value = "";
          document.getElementById("add-item-author").value = "";
          document.getElementById("add-item-content").value = "";
        }
      });
    }

    if (authorized) {
      let addBlog = document.getElementById("addBlog-btn");
      let editDelete = document.getElementsByClassName("edit-delete");
      let logOut = document.getElementById("logout-btn");
      let login = document.getElementById("login-btn");
      let register = document.getElementById("register-btn");
      addBlog.classList.remove("hidden");
      logOut.classList.remove("hidden");
      login.classList.add("hidden");
      register.classList.add("hidden");
      Array.prototype.map.call(editDelete, (item) => {
        item.classList.remove("hidden");
        console.log("ghyjghjlo");
        item.classList.add("flex");
      });
    }
  }, []);

  // useEffect(()=>{
  //   let  users = JSON.parse(localStorage.getItem("users"));
  //   let loggedinIndex = users.findIndex((user)=> user.state == "logged in");
  //   if (loggedinIndex != -1) {

  //     users[loggedinIndex]["state"] = "logged out"
  //     localStorage.setItem("users",JSON.stringify(users));
  //   }
  // },[])
  return (
    <>
      <NavBar onClick={onClick} addBlog={addBlog} onLogout={logOut} />
      <Login_Register_Form type={"Sign In"} authorization={authorization} />
      <Login_Register_Form type={"Register"} authorization={authorization} />
      <Warning type={"logout"} logOut={confirmLogout} />
      <BlogComponent
        user={users ? users.find((user) => user.state == "logged in") : null}
      />
    </>
  );
}
