"use client"

import Image from 'next/image';
import React, { useEffect, useState, useRef } from 'react';

export default function HomePage() {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const video = videoRef.current;

        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(function (stream) {
                    if (video) {
                        video.srcObject = stream;
                        video.play();
                    }
                })
                .catch(function (error) {
                    console.error("Error accessing the camera: ", error);
                });
        }
    }, []);

    const captureImage = async () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (video && canvas) {
            const context = canvas.getContext('2d');
            if (context) {
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                const dataUrl = canvas.toDataURL('image/png');
                setImageSrc(dataUrl);

                await postImage(dataUrl);
            }
        }
    };

    const postImage = async (image: string) => {
        try {
            const response = await fetch('http://localhost:8080/api/cctv', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ classs: 'image', score: 'People' }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log('Image posted successfully:', result);
        } catch (error) {
            console.error('Error posting image:', error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
            <h1 className="text-3xl text-white mb-4">Live CCTV - KEL 4</h1>
            <div className="relative w-full flex justify-center">
                <video ref={videoRef} width="800" height="400" className="border" />
                <canvas ref={canvasRef} width="800" height="400" style={{ display: 'none' }} />
                {imageSrc && (
                    <div className="w-full h-full flex justify-center mt-4">
                        <Image width={700} height={200} src={imageSrc} alt="Captured" />
                    </div>
                )}
                <div className="absolute top-0 left-[500px] p-2 bg-gray-900 bg-opacity-75 text-white text-xs">
                    {new Date().toLocaleString()}
                </div>
            </div>
            <button
                onClick={captureImage}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            >
                Jepret
            </button>
        </div>
    );
}