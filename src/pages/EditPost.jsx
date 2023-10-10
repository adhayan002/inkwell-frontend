import { useEffect, useState } from "react";

import { Navigate, useParams } from "react-router-dom";
import { Editor } from "../components/Editor";

export const EditPost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    fetch(`https://backend-blog-jwod.onrender.com/post/${id}`).then((response) =>
      response.json().then((data) => {
        setTitle(data.title);
        setSummary(data.summary);
        setContent(data.content);
      })
    );
  }, []);

  const handleEdit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("id", id);
    data.set("file", files);
    const res = await fetch(`https://backend-blog-jwod.onrender.com/post`, {
      method: "PUT",
      body: data,
      credentials: "include",
    });
    if (res.ok) setRedirect(true);
  };

  if (redirect) {
    return <Navigate to={`/post/${id}`} />;
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
      <div>
        <h1 className="font-bold text-3xl text-center p-5 mb-10">Edit post</h1>
        <form onSubmit={handleEdit}>
          <div className="mb-6">
            <label className="block mb-2 text-lg font-medium text-gray-900 ">
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
            <label className="block mb-2 text-lg font-medium text-gray-900 ">
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
              Edit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};