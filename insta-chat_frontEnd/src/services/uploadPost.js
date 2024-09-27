import axios from "./axioscall";

const InsertPost = (cloudinaryImage, caption, images) => {
  let finalImage = images.map((image, i) => {
    return {
      crop: image.crop,
      croppedPixel: image.croppedPixel,
      filter: image.filter,
      aspectRatio: image.aspectRatio,
      cloudinaryImage: cloudinaryImage[i],
    };
  });
  return new Promise(async (resolve, reject) => {
    let token = JSON.parse(localStorage.getItem("userToken"));
    const data = await axios.post(
      "/post/uploadPost",
      { finalImage, caption },
      { headers: { "x-access-token": token } }
    );
    resolve(data);
  });
};

export default InsertPost;
