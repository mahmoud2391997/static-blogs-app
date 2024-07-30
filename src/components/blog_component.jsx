import axios from "axios";
import { useEffect, useState } from "react";
import PaggingBar from "./pagging";
import SearchBar from "./SearchBar";
import Warning from "./DeleteItem";
import isEqual from "lodash/isEqual";
import { Await } from "react-router-dom";
import AddBlogForm from "./AddBlogForm";
function BlogComponent({ user }) {
  const categories = [
    "general",
    "business",
    "entertainment",
    "health",
    "science",
    "sports",
    "technology",
  ];
  const [addedBlog, setAddedBlog] = useState(null);
  const [editingBlog, setEditingBlog] = useState(null);
  const [addedBlogs, setAddedBlogs] = useState([]);
  const [authedData, setAuthedData] = useState([]);
  const [blogToDelete, setBlogToDelete] = useState(null);
  const [activeButton, setActiveButton] = useState(0);
  const [data, setData] = useState([]);
  const [pageData, setPageData] = useState(null);
  const [searchedData, setSearchedData] = useState([]);
  const [pages, setPages] = useState(null);
  const [resetSearch, setResetString] = useState("");
  const [currentCategory, setCurrentCategory] = useState("general");
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 12;

  const handleButtonClick = (index) => {
    setActiveButton(index);
    setCurrentCategory(categories[index]);
  };
  function handleAddButton() {
    let users = JSON.parse(localStorage.getItem("users"));
    let user = users.find((user) => user.state == "logged in");
    let addedBlog = {
      source: { name: document.getElementById("add-item-source").value },
      urlToImage: document.getElementById("add-item-image").value,
      title: document.getElementById("add-item-title").value,
      puslishedAt: document.getElementById("add-item-pub-at").value,
      author: document.getElementById("add-item-author").value,
      content: document.getElementById("add-item-content").value,
      user: user.email,
    };
    setAddedBlog(addedBlog);
    document.getElementById("add-item-source").value = "";
    document.getElementById("add-item-image").value = "";
    document.getElementById("add-item-title").value = "";
    document.getElementById("add-item-pub-at").value = "";
    document.getElementById("add-item-author").value = "";
    document.getElementById("add-item-content").value = "";
    let addBlog = document.getElementById("add-item");
    addBlog.classList.add("hidden");
    addBlog.classList.remove("flex");
    axios
      .post(
        "https://destiny-tasty-apricot.glitch.me/api/addedBlogs",
        addedBlog,
        {
          Authorization: "dvfvsdfv",
        }
      )
      .then((response) => {
        // Handle success

        console.log(response.data); // The response data from the server
        window.location.href = window.location.href;
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });

    getAdded();
  }
  function onClickDelete() {
    {
      let warning = document.getElementById("delete-modal");
      warning.classList.remove("hidden");
      warning.classList.add("flex");
    }
  }
  function editing(blog) {
    setEditingBlog(blog);
    let edit = document.getElementById("edit");
    edit.classList.remove("hidden");
    edit.classList.add("flex");
  }
  useEffect(() => {
    if (editingBlog) {
      let edit = document.getElementById("edit");
      edit.classList.remove("hidden");
      edit.classList.add("flex");

      edit.addEventListener("click", (e) => {
        if (e.target == edit) {
          edit.classList.remove("flex");
          edit.classList.add("hidden");
        }
      });
    }
  }, [editingBlog]);
  function handleDelete(blog) {
    let index = authedData.findIndex((mainBlog) => isEqual(mainBlog, blog));
    authedData.splice(index, 1);
    setAuthedData(authedData);
    axios
      .delete(
        `https://destiny-tasty-apricot.glitch.me/api/addedBlogs/${blog.id}`,
        {
          Authorization: "dvfvsdfv",
        }
      )
      .then((response) => {
        // Handle success
        console.log(response.data);
        getAdded();
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
    {
      let deleteModel = document.getElementById("delete-modal");

      deleteModel.classList.add("hidden");
      deleteModel.classList.remove("flex");
    }
    setAuthedData(authedData.filter((ele) => ele != blog));
  }
  function handleClick(params) {
    setPageData(data.slice(blogsPerPage * params, blogsPerPage * (params + 1)));
    setCurrentPage(params + 1);
    console.log(params);
  }
  function onSearch(input) {
    const filtered = data.filter((blog) =>
      blog.title.toLowerCase().includes(input.toLowerCase())
    );
    setSearchedData(filtered);
    console.log(filtered);
  }

  useEffect(() => {
    axios
      .get(
        `http://newsapi.org/v2/everything?q=${currentCategory}&apiKey=d84d60794beb40f0b45129ff86ae475b`
      )
      .then(({ data }) => {
        let blogs;
        addedBlogs.length != 0
          ? (blogs = [...data.articles, ...addedBlogs])
          : (blogs = [...data.articles]);
        console.log(addedBlogs);
        console.log(blogs);

        console.log("Df");
        setData(blogs);
        setAuthedData(blogs);
        setSearchedData(blogs);
        setPageData(blogs.slice(0, blogsPerPage));
        setPages(Math.ceil(blogs.length / blogsPerPage));

        setResetString(!resetSearch);
        setCurrentPage(1);
      });
  }, [currentCategory, addedBlogs, addedBlog]);
  function editBlog(blog) {
    console.log("EDIT");
    let editedBlog = {
      source: { name: document.getElementById("edit-source").value },
      urlToImage: document.getElementById("edit-image").value,
      title: document.getElementById("edit-title").value,
      puslishedAt: document.getElementById("edit-pub-at").value,
      author: document.getElementById("edit-author").value,
      content: document.getElementById("edit-content").value,
      user: blog.user,
    };
    {
      let edit = document.getElementById("edit");

      edit.classList.add("hidden");
      edit.classList.remove("flex");
    }
    setAddedBlog(blog);
    authedData.push(blog);

    axios
      .put(
        `https://destiny-tasty-apricot.glitch.me/api/addedBlogs/${blog.id}`,
        editedBlog,
        {
          Authorization: "dvfvsdfv",
        }
      )
      .then((response) => {
        // Handle success
        console.log(response.data); // The response data from the server
        window.location.href = window.location.href;
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
  }

  useEffect(() => {
    setPageData(searchedData.slice(0, blogsPerPage));
    setPages(Math.ceil(searchedData.length / blogsPerPage));
  }, [searchedData]);

  useEffect(() => {
    axios
      .get("https://destiny-tasty-apricot.glitch.me/api/addedBlogs", {
        Authorization: "dvfvsdfv",
      })
      .then((response) => {
        // Handle success]
        setAddedBlogs(response.data.blogs);
        let blogs = authedData;
        if (response.data.blogs)
          blogs = [...authedData, ...response.data.blogs];

        setAuthedData(blogs);
        setData(blogs);
        setSearchedData(blogs);
        setPageData(blogs.slice(0, blogsPerPage));
        setPages(Math.ceil(blogs.length / blogsPerPage));
        console.log(blogs);
        console.log(response.data); // The response data from the server
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
  }, []);

  function getAdded() {
    axios
      .get("https://destiny-tasty-apricot.glitch.me/api/addedBlogs", {
        Authorization: "dvfvsdfv",
      })
      .then((response) => {
        // Handle success]
        setAddedBlogs(response.data.blogs);
        let blogs = authedData;
        if (response.data.blogs)
          blogs = [...authedData, ...response.data.blogs];

        setAuthedData(blogs);
        setData(blogs);
        setSearchedData(blogs);
        setPageData(blogs.slice(0, blogsPerPage));
        setPages(Math.ceil(blogs.length / blogsPerPage));
        console.log(blogs);
        console.log(response.data); // The response data from the server
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
  }
  console.log(user);
  return (
    <div className="w-full relative h-full">
      <div className="w-full fixed top-24 z-30">
        <SearchBar onSearch={onSearch} value={resetSearch} />
        <Warning
          type={"delete"}
          logOut={null}
          handleDelete={handleDelete}
          blog={blogToDelete}
        />
        <AddBlogForm type={"edit"} blog={editingBlog} handleEdit={editBlog} />
        <AddBlogForm
          blog={null}
          type={"add-item"}
          handleEdit={null}
          handleAddButton={handleAddButton}
        />
      </div>
      <div className=" w-[75%] absolute  top-28 left-[2%]   grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 xl:flex flex-col justify-between items-center ">
        {pageData != null && pageData != []
          ? pageData.map((oneArticle, index) => {
              return (
                <>
                  <div
                    className=" xl:h-52 flex xl:flex-row justify-between items-center my-8  flex-col w-full h-full"
                    key={index}
                  >
                    <div className="xl:w-[30%] w-full h-52">
                      <img
                        className="w-full h-full"
                        src={oneArticle.urlToImage}
                      />
                    </div>
                    <div className=" xl:w-[65%] w-full h-full flex flex-col justify-between items-start">
                      <p className=" uppercase font-sans text-gray-500">
                        {oneArticle.source.name}
                      </p>
                      <p className="font-sans font-bold text-3xl">
                        {oneArticle.title}
                      </p>
                      <p className="sans text-gray-400">
                        {oneArticle.author}. {oneArticle.publishedAt}
                      </p>
                      <p className="font-sans font-semibold line-clamp-2">
                        {oneArticle.content.slice(
                          0,
                          oneArticle.content.length - 13
                        )}
                      </p>
                    </div>
                    {user ? (
                      user.email == oneArticle.user ? (
                        <div className="flex-col justify-around h-full flex edit-delete ">
                          <button
                            onClick={() => {
                              setBlogToDelete(oneArticle);
                              onClickDelete(blogToDelete);
                            }}
                            className=" btn bg-red-600 flex w-7 h-7 p-0"
                          >
                            <i class="fa-solid fa-trash"></i>
                          </button>
                          <button
                            onClick={() => {
                              editing(oneArticle);
                            }}
                            className=" btn bg-gray-400 flex p-0"
                          >
                            <i class="fa-regular fa-pen-to-square"></i>
                          </button>
                        </div>
                      ) : null
                    ) : null}
                  </div>
                </>
              );
            })
          : null}
        <PaggingBar
          pages={pages}
          handleClick={handleClick}
          currentPage={currentPage}
        />
      </div>
      <div className=" h-screen  top-28 fixed right-[5%]  w-[10%] my-10">
        <div className="text-lg font-sans font-bold h-[10%]">Categories</div>
        <div className="h-[60%] flex flex-col justify-between items-start">
          {categories.map((category, index) => {
            return (
              <p
                onClick={() => handleButtonClick(index)}
                className={` hover:text-blue-500 ${
                  activeButton === index ? "text-blue-500" : "black"
                } cursor-pointer`}
                key={index}
              >
                {category}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default BlogComponent;
