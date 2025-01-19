import { useRef, useEffect, useState, useCallback } from "react";
import Webcam from "react-webcam";
import HashLoader from "react-spinners/HashLoader";
import type { Route } from "./+types/camera";

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

export default function Camera() {
    const webcamRef = useRef<Webcam>(null);
    const [isProcessingImage, setProcessingImage] = useState(false)
    const [imageSrc, setImageSrc] = useState<string | null>(null)


    const captureFood = useCallback(
        () => {
            if (webcamRef.current == null || isProcessingImage) {
                return 
            }

            setProcessingImage(true)
            // const imageSrc = webcamRef.current.getScreenshot();
            setImageSrc(webcamRef.current.getScreenshot())
        },
        [webcamRef]
    );

    return (
        <div className="flex flex-col items-center mt-10 gap-8">
            <h1 className="font-bold text-4xl">Capture Food</h1>

            <div className="border-purple-600 border-4 rounded-md">
                {imageSrc ? <img src={imageSrc} alt="Captured"/> :
                
                <Webcam
                    audio={false}
                    height={720}
                    screenshotFormat="image/jpeg"
                    width={1280}
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
            >Capture</button>

            }
            
        </div>
    )
}
