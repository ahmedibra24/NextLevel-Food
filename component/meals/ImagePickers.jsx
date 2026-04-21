"use client";
import { useRef, useState } from "react";
import classes from "./image-picker.module.css";
import Image from "next/image";
import React from "react";

export default function ImagePickers({ label, name }) {
  const [pickedImage, setPickedImage] = useState(null);
  const imageInput = useRef(); // عشان اقدر اربط الزار بال ان بت

  function handlePreviewImage(event) {
    const file = event.target.files[0];

    if (!file) {
      setPickedImage(null);

      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };

    fileReader.readAsDataURL(file); // عشان تطلع ال يو ار ال من الفايل
  }

  function handlePickClick() {
    imageInput.current.click();
  }
  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p> No image picked yet.</p>}
          {pickedImage && (
            <Image
              fill
              src={pickedImage}
              alt="the image selected by the user."
            />
          )}
        </div>

        <input
          className={classes.input}
          id={name}
          type="file"
          name={name}
          accept="image/png , image/jpeg"
          ref={imageInput}
          onChange={handlePreviewImage}
          required
        />
      </div>
      <button
        className={classes.button}
        type="button"
        onClick={handlePickClick}
      >
        Pick an Image
      </button>
    </div>
  );
}
