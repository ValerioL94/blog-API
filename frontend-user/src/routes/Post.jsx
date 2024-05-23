import { useLoaderData } from 'react-router-dom';

function Post() {
  const { commentsInPost, post } = useLoaderData();
  console.log(commentsInPost);
  console.log(post);
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
        {!commentsInPost.length && <h3>There are no comments.</h3>}
        {commentsInPost.length && <h3>Comments: </h3>}
        {commentsInPost.length &&
          commentsInPost.map((comment) => (
            <div key={comment._id} className="comment">
              <p>
                <strong>{comment.username}</strong>
              </p>
              <p>{comment.content}</p>
              <p>{new Date(comment.createdAt).toLocaleString()}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Post;
