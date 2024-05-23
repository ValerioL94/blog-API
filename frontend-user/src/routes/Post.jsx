import { useLoaderData, Form } from 'react-router-dom';

function Post() {
  const { commentsInPost, post } = useLoaderData();
  async function handleSubmit(e) {
    e.preventDefault();
    console.log('Form submitted, thanks!');
  }
  return (
    <div className="wrapper">
      <h1>{post.title}</h1>
      <div className="post-fullview">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <p>
            <strong>Author: </strong>
            {post.author.username}
          </p>
          <p>
            <strong>Date: </strong>
            {new Date(post.createdAt).toLocaleString()}{' '}
          </p>
        </div>
        <p>{post.content}</p>
        <p>
          Leave a comment below or write to my fake email{' '}
          <strong style={{ color: 'blue' }}>{post.author.email}</strong> .
        </p>
      </div>
      <div className="comments-wrapper">
        <h3>Comments</h3>
        {!commentsInPost.length && <p>There are no comments.</p>}
        {commentsInPost.length &&
          commentsInPost.map((comment) => (
            <div key={comment._id} className="comment">
              <p>
                <strong>{comment.username}</strong>
              </p>
              <p>{comment.content}</p>
              <p>{new Date(comment.createdAt).toLocaleString()}</p>
              <hr />
            </div>
          ))}
      </div>
      <div className="form-wrapper">
        <h3>Add comment</h3>
        <Form onSubmit={handleSubmit} className="form-group" method="post">
          <label htmlFor="username">Username: </label>
          <input
            name="username"
            id="username"
            className="form-control"
            type="text"
            placeholder="John Doe"
            required
          />
          <label htmlFor="content">Comment: </label>
          <textarea
            style={{ resize: 'none' }}
            name="content"
            id="content"
            className="form-control"
            rows="5"
            placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque hendrerit efficitur lacus nec fermentum. Sed nisl mauris, dapibus aliquam leo at, efficitur blandit diam."
            maxLength={300}
            required
          ></textarea>
          <button className="form-submit" type="submit">
            Send
          </button>
        </Form>
      </div>
    </div>
  );
}

export default Post;
