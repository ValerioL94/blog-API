export default function About() {
  return (
    <div className="wrapper">
      <h1>About</h1>
      <p>
        This is the front-end site of the blog-API project where registered
        authors can create, read, update and delete both posts and comments.
      </p>
      <p>
        This site is intended to be used by registered users. If you don&apos;t
        have an account you won&apos;t be able to do much here.
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
