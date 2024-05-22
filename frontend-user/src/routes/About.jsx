export default function About() {
  return (
    <div className="wrapper">
      <h2>About</h2>
      <p>This is the front-end site of the blog-API project.</p>
      <p>
        As you might have read on the home page there is currently no
        registration needed to leave comments.
      </p>
      <p>
        This means that you won&apos;t be able to edit or delete comments, so
        keep that in mind before posting.
      </p>
      <p>
        If you don&apos;t know why you&apos;re here or what I&apos;m talking
        about, you might want to check this out at{' '}
        <a href="https://www.theodinproject.com/lessons/nodejs-blog-api">
          The Odin Project
        </a>{' '}
        website then!
      </p>
    </div>
  );
}
