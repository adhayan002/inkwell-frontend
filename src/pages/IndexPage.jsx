import Posts from "../components/Posts"
import {useEffect, useState} from "react";

export default function IndexPage() {
  const [posts,setPosts] = useState([]);
  useEffect(() => {
    fetch('https://backend-blog-jwod.onrender.com/post').then(response => {
       console.log(response);
      response.json().then(posts => {
        setPosts(posts);
      });
    });
  }, []);
  return (
    <>
      {posts.length > 0 && posts.map(post => (
        // eslint-disable-next-line react/jsx-key
        <Posts {...post} />
      ))}
    </>
  );
}
