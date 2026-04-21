import React from "react";
import Image from "next/image";
import { getMeal } from "@/lib/meals";
import classes from "./page.module.css";
import { notFound } from "next/navigation";

export async function generateMetadata({params}) {
  const meal = getMeal(params.slug);
  if (!meal) {
    notFound();
  }

  return {
    title: meal.title,
    description: meal.description,
  };
}

export default function mealsDetails({ params }) {
  const meal = getMeal(params.slug);

  if (!meal) {
    notFound();
  }

  const instructions = meal.instructions.replace(/\n/g, "<br />");
  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image
            src={`https://foodbtest1.s3.us-east-1.amazonaws.com/${meal.image}`}
            alt={meal.title}
            fill
          />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}> {meal.summary}</p>
        </div>
      </header>
      <main className={classes.instructions}>
        <p dangerouslySetInnerHTML={{ __html: instructions }}></p>
        {/* dangerouslySetInnerHTML 
        استخدمتها عشان اقدؤ اضيف فواصل بعد كل نهاية سطر او بمعني تاني عشان اقدر اتحكم فى ال اتش تي ام ال */}
      </main>
    </>
  );
}
