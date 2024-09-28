import React, { useState, useRef } from "react";
import "./edit.css";

const ImageCropper = () => {
  const [image, setImage] = useState(null);
  const [cropArea, setCropArea] = useState({
    x: 0,
    y: 0,
    width: 200,
    height: 200,
  });
  const [isDragging, setIsDragging] = useState(false);

  const imageRef = useRef(null);
  const cropBoxRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const startDrag = (e) => {
    setIsDragging(true);
  };

  const handleDrag = (e) => {
    if (!isDragging) return;

    const rect = imageRef.current.getBoundingClientRect();
    // const cropRect = cropBoxRef.current.getBoundingClientRect();

    const x = Math.max(
      0,
      Math.min(
        rect.width - cropArea.width,
        e.clientX - rect.left - cropArea.width / 2
      )
    );
    const y = Math.max(
      0,
      Math.min(
        rect.height - cropArea.height,
        e.clientY - rect.top - cropArea.height / 2
      )
    );

    setCropArea((prev) => ({
      ...prev,
      x,
      y,
    }));
  };

  const stopDrag = () => {
    setIsDragging(false);
  };

  const cropImage = () => {
    if (!image) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const imageElement = imageRef.current;

    const scaleX = imageElement.naturalWidth / imageElement.width;
    const scaleY = imageElement.naturalHeight / imageElement.height;

    canvas.width = cropArea.width * scaleX;
    canvas.height = cropArea.height * scaleY;

    ctx.drawImage(
      imageElement,
      cropArea.x * scaleX,
      cropArea.y * scaleY,
      cropArea.width * scaleX,
      cropArea.height * scaleY,
      0,
      0,
      canvas.width,
      canvas.height
    );

    const croppedImageURL = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = croppedImageURL;
    link.download = "cropped-image.png";
    link.click();
  };

  return (
    <div className="image-cropper-container">
      <input type="file" onChange={handleImageUpload} />
      <div className="crop-container">
        {image && (
          <div
            className="image-wrapper"
            style={{ position: "relative", display: "inline-block" }}
          >
            <img
              src={image}
              alt="To Crop"
              ref={imageRef}
              style={{ maxWidth: "100%" }}
            />
            <div
              className="crop-box"
              ref={cropBoxRef}
              style={{
                position: "absolute",
                top: `${cropArea.y}px`,
                left: `${cropArea.x}px`,
                width: `${cropArea.width}px`,
                height: `${cropArea.height}px`,
                border: "2px dashed #000",
                cursor: "move",
              }}
              onMouseDown={startDrag}
              onMouseMove={handleDrag}
              onMouseUp={stopDrag}
              onMouseLeave={stopDrag}
            ></div>
          </div>
        )}
      </div>
      <button onClick={cropImage} style={{ marginTop: "20px" }}>
        Crop Image
      </button>
    </div>
  );
};

export default ImageCropper;
