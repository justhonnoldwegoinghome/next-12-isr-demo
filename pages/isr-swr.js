import useSWR from "swr";

async function getJoke() {
  const res = await fetch(
    "https://v2.jokeapi.dev/joke/Programming?type=single"
  );
  const data = await res.json();
  return data["joke"];
}

export default function Page({ jokeFromGetStaticProps }) {
  const { data: jokeFromSWR, mutate } = useSWR("/isr-swr", getJoke, {
    revalidateOnMount: false,
    fallbackData: jokeFromGetStaticProps,
  });

  console.log("=======================================");
  console.log("joke from getStaticProps", jokeFromGetStaticProps);
  console.log("joke from swr", jokeFromSWR);
  console.log("=======================================");

  return (
    <div>
      <p>{jokeFromSWR}</p>
      <button
        onClick={() => {
          // mutate
          mutate();
          // revalidate
          fetch("/api/revalidate?secret=42")
            .then((res) => res.json())
            .then(console.log);
        }}
      >
        Mutate and revalidate
      </button>
    </div>
  );
}

export async function getStaticProps() {
  const jokeFromGetStaticProps = await getJoke();
  return {
    props: {
      jokeFromGetStaticProps,
    },
  };
}
