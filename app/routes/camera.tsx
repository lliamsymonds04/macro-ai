import { useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router";
import Webcam from "react-webcam";
import HashLoader from "react-spinners/HashLoader";
import type { Route } from "./+types/camera";

import { describeFood, getMacros } from "~/utils/GetMacros";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Camera" },
    { name: "description", content: "Take a photo" },
  ];
}

const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "environment"
  };


async function uploadImageToImgur(imageSrc: string) {
    const api_key = import.meta.env.VITE_IMGUR_CLIENT_ID

    const base64Image = imageSrc.split(",")[1];
    console.log(base64Image)
    const response = await fetch("https://api.imgur.com/3/image", {
        method: "POST",
        headers: {
        Authorization: `Client-ID ${api_key}`,
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
            image: base64Image, // Remove the base64 prefix (e.g., "data:image/jpeg;base64,")
            type: "base64",
        }),
    });

    const result = await response.json();
    console.log(result)
    if (result.success) {
        return result.data.link
    } else {
        throw new Error("Failed to upload image to Imgur.")
    }
}

export default function Camera() {
    const navigate = useNavigate()

    const webcamRef = useRef<Webcam>(null);
    const [isProcessingImage, setProcessingImage] = useState(false)
    const [imageSrc, setImageSrc] = useState<string | null>(null)


    const captureFood = useCallback(
        async () => {
            if (webcamRef.current == null || isProcessingImage) {
                return 
            }

            setProcessingImage(true)
            const screenShot = webcamRef.current.getScreenshot()
            setImageSrc(screenShot)

            if (screenShot) {
                try {

                    const url = await uploadImageToImgur(screenShot)

                    const food_description = await describeFood(url)

                    navigate(`/macros/${food_description}`, { replace: true });

                } catch {
                    alert("Failed to process image.")
                    navigate('/', { replace: true });
                } finally {
                    setProcessingImage(false)
                    setImageSrc(null)
                }
            } else {
                setProcessingImage(false)
                alert("Failed to capture image.")
            }
        },
        [webcamRef]
    );

    return (
        <div className="flex flex-col items-center mt-10 gap-8">
            <h1 className="font-bold text-4xl">Capture Food</h1>

            <div className="border-purple-600 border-4 rounded-lg w-5/6 max-w-xl">
                {imageSrc ? <img src={imageSrc} alt="Captured"/> :
                
                <Webcam
                    audio={false}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                    ref={webcamRef}
                />}
            </div>
            
            {isProcessingImage ? <HashLoader 
                color={"#9d00ff"}
                loading={isProcessingImage}
                size={50}
            />: 
            <button 
                onClick={captureFood}
                className="bg-violet-600 hover:bg-violet-700 w-1/2 max-w-24 rounded-full h-10 focus:outline-none focus:ring focus:ring-violet-400 font-bold transition-all duration-100"
            >Capture</button>}
            
        </div>
    )
}