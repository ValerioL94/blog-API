import { useState, useEffect } from 'react';
import '../styles/Blog.css';

export default function Blog() {
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
    <div className="wrapper">
      <h2>Posts</h2>
      <div className="posts-wrapper">
        {!posts.length && <h2>Fetching posts...</h2>}
        {posts &&
          posts.map((data) =>
            data.published ? (
              <div key={data._id} className="post-preview">
                <h3>
                  <a href={'/posts/' + data._id}>{data.title}</a>
                </h3>
                <p>
                  <strong>Author:</strong> {data.author.username}
                </p>
                <p>
                  <strong>Date:</strong>{' '}
                  {new Date(data.createdAt).toLocaleString()}
                </p>
              </div>
            ) : (
              ''
            )
          )}
      </div>
    </div>
  );
}
