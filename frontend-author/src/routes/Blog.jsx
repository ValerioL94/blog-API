import { useLoaderData, Link } from 'react-router-dom';
import '../styles/Blog.css';

export default function Blog() {
  const { posts } = useLoaderData();
  return (
    <div className="wrapper">
      <h1>Posts</h1>
      <div className="posts-wrapper">
        {!posts.length && <h2>Fetching posts...</h2>}
        {posts.length &&
          posts.map((data) =>
            data.published ? (
              <div key={data._id} className="post-preview">
                <h2>
                  <Link to={`${data._id}`}>{data.title}</Link>
                </h2>
                <p>
                  <strong>Author:</strong> {data.author.username}
                </p>
                <p>
                  <strong>Date:</strong>{' '}
                  {new Date(data.createdAt).toLocaleString()}
                </p>
                <hr />
              </div>
            ) : (
              ''
            )
          )}
      </div>
      <button
        style={{ alignSelf: 'flex-end', margin: '10px' }}
        className="form-submit"
        onClick={() => (document.documentElement.scrollTop = 0)}
      >
        Go to top
      </button>
    </div>
  );
}
