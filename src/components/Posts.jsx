/* eslint-disable react/prop-types */
import { useContext } from "react";
import "./Posts.css";
import { format } from "date-fns";
import { UserContext } from "./UserContext";
import { Link } from "react-router-dom";

export default function Posts({_id,title,summary,cover,content,author,createdAt}){
  const { userInfo } = useContext(UserContext);
  console.log(cover)
    return (
      <>
        <>
      <div className="post">
      <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
      <Link to={`/post/${_id}`}>
          <img
            src={cover}
            alt="blog"
            loading="lazy"
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
          </Link>
        </div>
        <div className="texts">
        <Link to={`/post/${_id}`}>
            <h2>{title}</h2>
            </Link>
          <p className="info">
              {JSON.stringify(author) === JSON.stringify(userInfo.id)
                ? userInfo.username
                : author.username}
            <time>{format(new Date(createdAt), "MMM d, yyyy HH:mm")} </time>
          </p>
          <p className="summary">{summary}</p>
        </div>
      </div>
    </>
      </>
    );
}