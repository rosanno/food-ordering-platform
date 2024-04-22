import Article from "./_components/article";
import Featured from "./_components/featured";
import Restaurants from "./_components/restaurants";
import Step from "./_components/step";

export default function Home() {
  return (
    <>
      <article
        className="
         grid
         md:grid-cols-12
         md:gap-12
         items-center
        "
      >
        <Article />
        <Featured />
      </article>
      <Step />
      <Restaurants />
    </>
  );
}
