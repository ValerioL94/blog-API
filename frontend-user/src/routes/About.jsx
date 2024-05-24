export default function About() {
  return (
    <div className="wrapper">
      <h1>About</h1>
      <p>
        This is the front-end site of the blog-API project where users can read
        posts and leave comments.
      </p>
      <p>
        For this site, I decided to use react and react-router to have a couple
        of different pages and practice a bit more what I&apos;ve learnt in the
        react course.
      </p>
      <p>
        As you might have read on the home page there is currently no
        registration needed to leave comments, this means that you won&apos;t be
        able to edit or delete them as well, so keep that in mind before
        posting!
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
