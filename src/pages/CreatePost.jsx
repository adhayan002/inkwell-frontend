import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import { Navigate } from "react-router-dom";
import { Editor } from "../components/Editor";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);

  const createNewPost = async (e) => {
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files);
    e.preventDefault();
    const response = await fetch(`https://drab-hen-slippers.cyclic.app/post`, {
      method: "POST",
      body: data,
      credentials: "include",
    });
    if (response.ok) {
      setRedirect(true);
    }
  };

  if (redirect) {
    return (
      <div>
        <Navigate to={"/"} />
      </div>
    );
  }

  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setFiles(base64);
  };

  return (
    <div>
      <h1 className="font-bold text-3xl text-center p-5 mb-10">
        Create your new post!
      </h1>
      <form onSubmit={createNewPost}>
        <div className="mb-6">
          <label className="block text-gray-600 text-sm font-semibold mb-2 ">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="block w-full pr-10 border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 sm:text-sm"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-600 text-sm font-semibold mb-2">
            Summary
          </label>
          <input
            type="text"
            id="summary"
            className="block w-full pr-10 border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 sm:text-sm"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            required
          />
        </div>
        <label className="block mb-2 text-lg font-medium text-gray-900 ">
          Upload a cover image
        </label>
        <input
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 "
          aria-describedby="photo_help"
          id="photo"
          type="file"
          accept="image/*"
          onChange={(e) => handleFileUpload(e)}
          required
        />
        <div className="mt-1 text-sm text-gray-500 " id="photo_help">
          Photos can help to make your blog posts more visually appealing and
          engaging
        </div>
        <Editor value={content} onChange={setContent} />
        <div className="flex justify-center my-10 py-5">
          <button
            type="submit"
            className="py-2 w-full border duration-300 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-md transition-colors hover:animate-pulse"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
