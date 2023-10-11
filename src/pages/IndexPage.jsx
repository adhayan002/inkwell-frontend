import Posts from "../components/Posts"
import {useEffect, useState} from "react";

export default function IndexPage() {
  const [posts,setPosts] = useState([]);
  useEffect(() => {
    fetch('https://blog-api-inkwell.adaptable.app//post').then(response => {
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
