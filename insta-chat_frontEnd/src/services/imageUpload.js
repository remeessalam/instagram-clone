import axios from "axios";

const uploadImages = (images) => {
  return new Promise(async (resolve, reject) => {
    let urls = [];

    try {
      const uploadPromises = images.map(async (img) => {
        const response = await fetch(img.croppedImageUrl);
        const blob = await response.blob();

        const file = new File([blob], "image.jpg", { type: "image/jpeg" });

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "bdfqt5ve");

        const { data } = await axios.post(
          "https://api.cloudinary.com/v1_1/dgveluvei/image/upload",
          formData
        );
        let optimizedImageUrl = data.secure_url.replace(
          "/upload/",
          "/upload/q_auto,f_auto/"
        );

        if (optimizedImageUrl) {
          urls.push({ url: optimizedImageUrl });
        }
      });

      await Promise.all(uploadPromises);
      resolve(urls);
    } catch (err) {
      reject(err);
    }
  });
};

export default uploadImages;
