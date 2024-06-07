"use client"
import React, { useState, useEffect } from "react";
import { AiFillFileImage } from "react-icons/ai";
import Image from "next/image";

interface DisplayFirebaseAssetProps {
    assetUrl: string;
}

const ShowAsset: React.FC<DisplayFirebaseAssetProps> = ({ assetUrl }) => {
    const [contentType, setContentType] = useState<string | null>(null);

    useEffect(() => {
        if (assetUrl.toLowerCase().includes(".pdf")) {
            setContentType("pdf");
        } else if (
            assetUrl.toLowerCase().includes(".png") ||
            assetUrl.toLowerCase().includes(".jpg") ||
            assetUrl.toLowerCase().includes(".jpeg") ||
            assetUrl.toLowerCase().includes(".svg")
        ) {
            setContentType("image");
        }
    }, [assetUrl]);

    if (contentType === "pdf") {
        return (
            <div>
                <iframe
                    src={assetUrl}
                    title="PDF Viewer"
                    width="200px"
                    height="200px"
                    className="overflow-hidden"
                ></iframe>
                <div className="text-center text-white-600 mt-2">
                    <a href={assetUrl} target="_blank" rel="noopener noreferrer">
                        Download
                    </a>
                </div>
            </div>
        );
    } else if (contentType === "image") {
        return (
            <a href={assetUrl} target="_blank" rel="noopener noreferrer max-w-[400px]">
                <a target="_blank" href={assetUrl}><Image alt={assetUrl} src={assetUrl} width={200} height={200} className="object-cover" /></a>
            </a>
        );
    } else {
        return (
            <div className="w-200px h-200px flex justify-center items-center p-4 rounded-lg">
                <AiFillFileImage className="text-white-600" />
            </div>
        );
    }
};

export default ShowAsset;
