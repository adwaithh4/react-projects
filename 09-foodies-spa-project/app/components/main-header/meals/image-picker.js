'use client'
import { useRef, useState } from "react";
import classes from './image-picker.module.css'
import Image from "next/image";
export default function ImagePicker({label,name}){
    const[pickedImage,setPickedImage]=useState();
    const imageInput = useRef();
    function handlePickClick(){
        imageInput.current.click()
    }
    function handleImageChange(event){
        const file = event.target.files[0];
        console.log(file)
        if(!file){
            setPickedImage(null)
            return;
         }
         const fileReader = new FileReader();
         fileReader.onload= ()=>{
            setPickedImage(fileReader.result)
         }
         fileReader.readAsDataURL(file)
         
        }
        console.log(pickedImage)
         return(
        <div className={classes.picker}>
            <label htmlFor={name}>{label}</label>
            <div className={classes.control}>
                <div className={classes.preview}>
                    {!pickedImage && <p>No image picked yet.</p>}
                    {pickedImage && <Image src={pickedImage} alt="Image selected by the user" fill/>}
                </div>
                <input required onChange={handleImageChange} ref={imageInput} className={classes.input} type="file" id={name} accept="image/png,image/jpeg" name={name}/>
            </div>
            <button className={classes.button} type="button" onClick={handlePickClick}>
                Pick An Image
            </button>
        </div>
    )
}