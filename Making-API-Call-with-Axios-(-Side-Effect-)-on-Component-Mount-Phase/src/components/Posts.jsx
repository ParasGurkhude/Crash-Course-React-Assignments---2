import { useState, useEffect } from "react";
import axios from "axios";
import Post from "./Post";
import LoadingIndicator from "./LoadingIndicator";
import ErrorIndicator from "./ErrorIndicator";

function Posts() {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(false);

  async function fetchAndUpdateData() {
    setLoading(true);
    try {
        let res = await axios({
          method: "get",
          url: `https://jsonplaceholder.typicode.com/posts`,
        });
        setPosts(res?.data);
        setLoading(false);
    } catch (error) {
        setError(true);
        setLoading(false);
    }
  }

  useEffect(() => {
    fetchAndUpdateData();
  }, []);

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorIndicator />;
  }

  return (
    <div className="App">
      <h1>List of Posts</h1>
      <div className="Post">
        {posts.map((post) =>(
          <Post  {...post} key={post.id} />
        ))}
      </div>
    </div>
  );
}

export default Posts;
