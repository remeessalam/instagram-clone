import { useEffect, useRef, useState } from "react";

const Final = ({ images, setImages }) => {
  const canvasRefs = useRef([]);
  const [newImageUrls, setNewImageUrls] = useState([]); // State to hold new image URLs

  useEffect(() => {
    const urls = []; // Array to store the new image URLs

    // Loop through each image and apply cropping + filters on the canvas
    images.forEach((imageData, index) => {
      const canvas = canvasRefs.current[index];
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.src = imageData.croppedImageUrl; // Load the cropped image URL (or base64)

      img.onload = () => {
        // Set canvas size based on the cropped dimensions
        canvas.width = imageData.croppedPixel.width;
        canvas.height = imageData.croppedPixel.height;

        // Apply the filters
        ctx.filter = imageData.filter;

        // Draw the image with cropping
        ctx.drawImage(
          img,
          imageData.croppedPixel.x,
          imageData.croppedPixel.y,
          imageData.croppedPixel.width,
          imageData.croppedPixel.height,
          0,
          0,
          canvas.width,
          canvas.height
        );

        // Create a new image URL from the canvas after drawing is complete
        const newImageUrl = canvas.toDataURL("image/jpeg");
        urls.push(newImageUrl);

        // After all canvases are processed, update the state with the new URLs
        if (urls.length === images.length) {
          setNewImageUrls(urls);
        }
      };
    });
  }, [images]);

  return (
    <>
      <div className="w-[634px] h-[675px] bg-black text-white flex flex-wrap">
        {images.map((imageData, index) => (
          <div key={imageData.id} className="w-full h-full">
            <canvas
              className="w-full h-full"
              ref={(el) => (canvasRefs.current[index] = el)}
            />
          </div>
        ))}
      </div>

      {/* Display the new image URLs */}
      <div className="mt-4">
        <h2>Generated Image URLs:</h2>
        {newImageUrls.map((url, index) => (
          <div key={index} className="mt-2">
            <a href={url} download={`image-${index + 1}.jpg`}>
              Download Image {index + 1}
            </a>
          </div>
        ))}
      </div>
    </>
  );
};

export default Final;
