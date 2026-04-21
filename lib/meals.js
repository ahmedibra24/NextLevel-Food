import fs from "node:fs";
import path from "node:path";
import slugify from "slugify";
import xss from "xss";
import { S3 } from "@aws-sdk/client-s3";

const s3 = new S3({
  region: "us-east-1",
});

const mealsDataPath = path.join(process.cwd(), "data", "meals.json");

function readMeals() {
  const fileContents = fs.readFileSync(mealsDataPath, "utf-8");
  return JSON.parse(fileContents);
}

function writeMeals(meals) {
  fs.writeFileSync(mealsDataPath, JSON.stringify(meals, null, 2), "utf-8");
}

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return readMeals();
}

export function getMeal(slug) {
  const meals = readMeals();
  return meals.find((meal) => meal.slug === slug);
}

export async function saveMeal(meal) {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}.${extension}`;
  const bufferedImage = await meal.image.arrayBuffer();

  await s3.putObject({
    Bucket: "foodbtest1",
    Key: fileName,
    Body: Buffer.from(bufferedImage),
    ContentType: meal.image.type,
  });

  meal.image = fileName;

  const meals = readMeals();
  meals.push(meal);
  writeMeals(meals);
}
