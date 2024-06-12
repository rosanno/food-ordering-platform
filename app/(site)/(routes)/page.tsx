import Article from "@/components/article";
import Featured from "@/components/featured";
import Restaurants from "@/components/restaurants";
import Step from "@/components/step";

export default function Home() {
  return (
    <>
      <article
        className="
         grid
         md:grid-cols-12
         md:gap-12
         items-center
         mt-10
         md:mt-0
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
