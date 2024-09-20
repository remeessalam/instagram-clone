import axios from "axios";

const uploadImages = (images) => {
  return new Promise(async (resolve, reject) => {
    let urls = [];
    console.log(images, "this is images");

    try {
      const uploadPromises = images.map(async (img) => {
        // Convert blob URL to actual blob
        const response = await fetch(img.croppedImageUrl);
        const blob = await response.blob();

        // Convert the blob to a File object
        const file = new File([blob], "image.jpg", { type: "image/jpeg" });

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "bdfqt5ve");

        // Upload to Cloudinary
        const { data } = await axios.post(
          "https://api.cloudinary.com/v1_1/dgveluvei/image/upload",
          formData
        );
        let optimizedImageUrl = data.secure_url.replace(
          "/upload/",
          "/upload/q_auto,f_auto/"
        );
        const sizeInBytes = optimizedImageUrl.size;
        const sizeInKB = (sizeInBytes / 1024).toFixed(2); // Convert to KB and round to 2 decimal places
        const sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2);
        console.log(
          optimizedImageUrl,
          sizeInKB,
          sizeInMB,
          sizeInBytes,
          "thisisiisiisdi"
        );
        if (optimizedImageUrl) {
          // Push the Cloudinary URL to the array
          urls.push({ url: optimizedImageUrl });
        }
      });

      // Wait for all uploads to complete
      await Promise.all(uploadPromises);
      resolve(urls);
    } catch (err) {
      reject(err);
    }
  });
};

export default uploadImages;
