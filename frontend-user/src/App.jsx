import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const getRequest = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error: Status ${response.status}`);
    }
    return response.json();
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await getRequest('http://localhost:3000/blog/posts');
        setPosts(posts);
      } catch (error) {
        setPosts(null);
        console.log(error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <>
      <header>
        <h1>
          <a href="/">Home</a>
        </h1>
      </header>
      <main>
        <h1>Posts</h1>
        <div className="posts-wrapper">
          {posts &&
            posts.map((data) => (
              <div key={data._id} className="post">
                <h1>{data.title}</h1>
                <p>{data.content}</p>
                <p>Published: {new Date(data.createdAt).toLocaleString()}</p>
              </div>
            ))}
        </div>
      </main>
      <footer>
        <p>Copyright © 2024 ValerioL94</p>
        <a href="https://github.com/ValerioL94">
          <img
            className="logo pulse"
            src="/images/github-mark.svg"
            alt="github logo"
          />
        </a>
      </footer>
    </>
  );
}

export default App;
