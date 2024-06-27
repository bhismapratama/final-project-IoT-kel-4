"use client"

import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import * as tf from '@tensorflow/tfjs';
import * as cocoModel from '@tensorflow-models/coco-ssd'

type predicts = {
    class: string;
    score: number
}

export default function HomePage() {
    const [model, setModel] = useState<any>('')
    const [predictions, setPredictions] = useState<predicts[]>([])

    async function LoadModel() {
        try {
            const dataset = await cocoModel.load()
            setModel(dataset)
            console.log('dataset ready');

        } catch (error) {
            console.log(error);

        }
    }

    const videoConstraints = {
        width: 800,
        height: 450,
        facingMode: "user"
    };

    const loadTensorFlow = async () => {
        await tf.ready();
    }

    async function predict() {
        try {
            const detect = await model.detect(document.getElementById('video'))
            setPredictions(detect)
            console.log(detect);

            await postPredictions(detect[0]);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadTensorFlow().then(() => {
            LoadModel()
        });
    }, []);

    async function postPredictions(predictions: predicts) {
        const datas = {
            classs: predictions.class,
            score: predictions.score
        }
        try {
            const response = await fetch('http://localhost:8080/api/cctv', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datas),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log('Data posted successfully:', result);
        } catch (error) {
            console.error('Error posting data:', error);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
            <h1 className="text-3xl text-white mb-4">Live CCTV - KEL 4</h1>
            <div className="relative w-full max-w-4xl">
                <Webcam
                    id="video"
                    audio={false}
                    videoConstraints={videoConstraints}
                    className="w-full h-auto rounded-lg border-4 border-gray-800 shadow-lg"
                />
                <div className="absolute top-0 left-0 p-2 bg-gray-900 bg-opacity-75 text-white text-xs">
                    {new Date().toLocaleString()}
                </div>
                {predictions.length > 0 && (
                    <div className="absolute bottom-0 left-0 w-full bg-gray-900 bg-opacity-75 p-4 text-white text-xs">
                        {predictions.map((prediction, index) => (
                            <div key={index}>
                                <h3>Object: {prediction.class}</h3>
                                <h3>Score: {prediction.score}</h3>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <button
                onClick={predict}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            >
                Jepret
            </button>
        </div>
    )
}