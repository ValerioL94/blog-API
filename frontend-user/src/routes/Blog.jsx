import { useLoaderData, Link } from 'react-router-dom';
import '../styles/Blog.css';

export default function Blog() {
  const { posts } = useLoaderData();
  return (
    <div className="wrapper">
      <h2>Posts</h2>
      <div className="posts-wrapper">
        {!posts.length && <h3>Fetching posts...</h3>}
        {posts.length &&
          posts.map((data) =>
            data.published ? (
              <div key={data._id} className="post-preview">
                <h3>
                  <Link to={`${data._id}`}>{data.title}</Link>
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
