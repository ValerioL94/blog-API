import { useSubmit } from 'react-router-dom';

/* eslint-disable react/prop-types */
export default function Comment({ data }) {
  const submit = useSubmit();
  return (
    <div className="comment">
      <p>
        <strong>{data.username}</strong>
      </p>
      <p>{data.content}</p>
      <p>{new Date(data.createdAt).toLocaleString()}</p>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <button type="button" className="form-submit">
          Edit
        </button>
        <button
          type="submit"
          className="form-submit"
          onClick={(e) => {
            e.preventDefault();
            submit({ id: data._id }, { method: 'delete' });
          }}
        >
          Delete
        </button>
      </div>
      <hr />
    </div>
  );
}
