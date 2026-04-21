import classes from "./page.module.css";
import Link from "next/link";
import MealsGrid from "@/component/meals/MealsGrid";
import { getMeals } from "@/lib/meals";
import { Suspense } from "react";

async function Meals() {
  const meals = await getMeals();
  return <MealsGrid meals={meals} />;
}

export default function MealsPage() {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious meals, created{" "}
          <span className={classes.highlight}>by you</span>
        </h1>
        <p>
          choose your favourite recipe and cook it yourself. it is easy and fun!
        </p>
        <p className={classes.cta}>
          <Link href="./meals/share"> share your favorite recipe</Link>
        </p>
      </header>

      <main className={classes.main}>
        <Suspense
          fallback={<p className={classes.loading}>fetching data .......</p>}
        >
          <Meals />
        </Suspense>
      </main>
    </>
  );
}
