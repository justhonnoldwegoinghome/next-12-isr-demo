export default function Home({ joke }) {
  return (
    <div>
      <p>{joke}</p>
      <button
        onClick={() => {
          fetch("/api/revalidate?secret=123")
            .then((res) => res.json())
            .then(console.log);
        }}
      >
        On-demand ISR
      </button>
    </div>
  );
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
