export default function Home({ joke }) {
  return <div>{joke}</div>;
}

export async function getStaticProps() {
  const res = await fetch(
    "https://v2.jokeapi.dev/joke/Programming?type=single"
  );

  const data = await res.json();

  return {
    props: {
      joke: data["joke"],
    },
    revalidate: 10,
  };
}
