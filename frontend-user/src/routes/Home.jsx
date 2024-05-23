export default function Home() {
  return (
    <div className="wrapper">
      <h1>Homepage</h1>
      <p>
        Welcome to the homepage! Not much to see here so I put a cute photo
        below.
      </p>
      <p>
        Anyway, check out the posts and leave a comment if you like. No
        registration needed at the moment!
      </p>
      <img
        className="home-photo"
        src="/assets/images/andrew-s-ouo1hbizWwo-unsplash.jpg"
        alt="a dog and a cat enjoying a sunny day"
      />
    </div>
  );
}
