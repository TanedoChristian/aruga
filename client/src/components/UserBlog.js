import React, { useEffect, useState } from "react";
import SetUp from "../Setup";
import axios from "axios";
import BlogCard from "./BlogCard";
import Header from "./Header";
import ConfirmModal from "./ConfirmModal";
const UserBlog = () => {
  const [blog, setBlog] = useState([]);
  const [blogDelete, setBlogDelete] = useState("");
  const [success, setSuccess] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [updateBlog, setUpdateBlog] = useState({});
  const [isShowModal, setShowModal] = useState(false);
  const [errorFile, setErrorFile] = useState();
  const [isOpenModal, setOpenModal] = useState(false);

  useEffect(() => {
    axios
      .get(`${SetUp.SERVER_URL()}/blog/${sessionStorage.getItem("userid")}`)
      .then(({ data }) => {
        setBlog(data);
      });
  }, [success]);

  const handleFunction = (id) => {
    setBlogDelete(id);
    setOpenModal(true);
  };

  const handleUpdateBlog = (data) => {
    setUpdateBlog((prev) => {
      return { ...prev, ...data };
    });
    setShowModal(true);
    setShowOptions(false);
  };

  const handleModal = () => {
    setShowModal(false);
  };

  const handleTitle = (e) => {
    setUpdateBlog((prev) => {
      return { ...prev, blog_title: e.target.value };
    });
  };

  const handleDescription = (e) => {
    setUpdateBlog((prev) => {
      return { ...prev, blog_details: e.target.value };
    });
  };

  const submitUpdateBlog = () => {
    axios({
      method: "PUT",
      url: SetUp.SERVER_URL() + "/blog",
      data: updateBlog,
    }).then((data) => {
      setShowModal(false);
      setSuccess(!success);
    });
  };

  return (
    <div className="w-full flex justify-center h-screen">
      <ConfirmModal
        isOpen={isOpenModal}
        width="w-[60%]"
        height="h-[20vh]"
        title="Delete Blog"
      >
        <div className="flex justify-center gap-5 items-center h-screen">
          <button
            className="p-3 px-5 bg-rose-400 text-white rounded-md shadow-md"
            onClick={() => {
              axios({
                method: "DELETE",
                url: SetUp.SERVER_URL() + `/blog/${blogDelete}`,
              }).then(({ data }) => {
                setSuccess(!success);
                setOpenModal(false);
              });
            }}
          >
            Confirm
          </button>
          <button
            className="p-3 px-5 bg-rose-400 text-white rounded-md shadow-md"
            onClick={() => {
              setOpenModal(false);
            }}
          >
            Cancel
          </button>
        </div>
      </ConfirmModal>
      <div
        id="defaultModal"
        aria-hidden="true"
        className="absolute h-full fade-in-1 top-0  animation-fade w-[100%] bg-white z-[50]  "
        style={{ display: isShowModal ? "block" : "none" }}
      >
        <div className="relative w-full h-full max-w-2xl md:h-auto">
          <div className="relative bg-white rounded-lg  h-screen shadow-xl">
            <div className="flex items-center justify-between p-3  w-[100%] border-t border-gray-200 gap-2">
              <h3 className="text-2xl font-semibold text-gray-900 ">
                Update Blog
              </h3>
              <button
                type="button"
                className="text-gray-600 bg-transparent  hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={handleModal}
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <div className="p-4  flex flex-col gap-5 bg-white ">
              <div className="flex flex-col gap-1">
                <label className="text-lg font-medium">Title</label>
                <input
                  type=""
                  className="p-3 outline-none bg-gray-50 rounded-lg text-slate-600"
                  placeholder="Title"
                  defaultValue={updateBlog.blog_title}
                  onChange={handleTitle}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-lg font-medium">Details</label>
                <textarea
                  type="text"
                  id="message"
                  rows="12"
                  className="bg-gray-50 outline-none h-[20vh]  rounded-lg"
                  placeholder="Write Something"
                  onChange={handleDescription}
                  defaultValue={updateBlog.blog_details}
                />
              </div>

              <div className="flex   gap-1  bottom-2   justify-center w-full">
                <button
                  className="p-4 bg-rose-400 text-white text-md rounded-lg w-full "
                  onClick={submitUpdateBlog}
                >
                  Update Blog
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-[90%] flex-col ">
        <Header />
        <div className="flex flex-col p-5">
          <h1 className="font-bold text-xl poppins"> My Blog </h1>
          <div className="w-[50%] bg-rose-300 p-1"></div>
        </div>

        <section className="bg-gray-50 mt-1 pb-8">
          <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div className="grid gap-4 lg:grid-cols-2">
              {blog
                .slice(0)
                .reverse()
                .map((data) => (
                  <article className="p-4 bg-white rounded-xl  border-gray-100 flex flex-col shadow-md">
                    <div className="w-full flex-col p-2">
                      <div className="flex justify-between">
                        <p className="poppins font-medium text-slate-800">
                          {`${data.firstname} ${data.lastname}`}
                        </p>
                        <span className="rounded-md shadow-sm flex gap-2">
                          <button
                            className=" justify-center w-full  p-2 items-center text-sm font-medium  rounded-md text-gray-700  bg-white  "
                            type="button"
                            onClick={() => {
                              handleUpdateBlog(data);
                            }}
                          >
                            <span className="text-sm px-2 flex ">
                              <i class="fa-solid fa-pen"></i>
                            </span>
                          </button>

                          <button
                            className=" justify-center w-full p-2 items-center text-sm font-medium  rounded-md text-gray-700  bg-white  "
                            type="button"
                            onClick={() => {
                              handleFunction(data.blog_id);
                            }}
                          >
                            <span className="text-sm px-2 flex ">
                              <i class="fa-solid fa-trash"></i>
                            </span>
                          </button>
                        </span>
                      </div>
                      <p className="poppins text-xs font-light text-slate-600">
                        {new Date(data.blog_postdate).toLocaleDateString(
                          "en-US",
                          {
                            month: "long",
                            day: "2-digit",
                            year: "numeric",
                          }
                        )}
                      </p>
                    </div>

                    <h2 className="p-3 text-xl font-bold tracking-tight text-rose-400 poppins capitalize">
                      <a href="#">{data.blog_title}</a>
                    </h2>

                    <div className="w-full h-[30vh] flex">
                      <img
                        className="flex  object-cover rounded-md shadow-xl border border-gray-200"
                        src={`${SetUp.SERVER_URL()}/${data.blog_img}`}
                      />
                    </div>

                    <p className="p-2 py-5 font-light text-gray-600 text-sm  h-[7rem] overflow-hidden capitalize">
                      {data.blog_details}
                    </p>
                  </article>
                ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserBlog;
