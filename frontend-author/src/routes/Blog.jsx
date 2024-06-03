import { useLoaderData, Link, useSubmit } from 'react-router-dom';
import '../styles/Blog.css';

export default function Blog() {
  const posts = useLoaderData();
  const submit = useSubmit();
  return (
    <div className="wrapper">
      <h1>Posts</h1>
      <div className="posts-wrapper">
        {!posts.length && <h2>Fetching posts...</h2>}
        {posts.length &&
          posts.map((data) => (
            <div key={data._id} className="post-preview">
              <h2>
                <Link to={`${data._id}`}>{data.title}</Link>
              </h2>
              <p>
                <strong>Author:</strong> {data.author.username}
              </p>
              <p>
                <strong>Published: </strong> {data.published ? 'Yes' : 'No'}
              </p>
              <p>
                <strong>Date:</strong>{' '}
                {new Date(data.createdAt).toLocaleString()}
              </p>
              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  submit({ id: data._id }, { method: 'delete' });
                }}
                className="form-submit"
              >
                Delete
              </button>
              <hr />
            </div>
          ))}
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          margin: '10px',
          fontWeight: 600,
        }}
      >
        <Link to={'newpost'}>New post</Link>
        <button
          type="button"
          className="form-submit"
          onClick={() => (document.documentElement.scrollTop = 0)}
        >
          Top &#8679;
        </button>
      </div>
    </div>
  );
}
