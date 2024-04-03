import Article from "../_components/article";
import Featured from "../_components/featured";

export default function Home() {
  return (
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
  );
}
