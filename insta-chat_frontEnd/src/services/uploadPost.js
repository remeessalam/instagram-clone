import axios from "./axioscall";

const InsertPost = (post, caption) => {
  console.log(post, "thisispostaftercloudinary");
  return new Promise(async (resolve, reject) => {
    let token = JSON.parse(localStorage.getItem("userToken"));
    const data = await axios.post(
      "/post/uploadPost",
      { post, caption },
      { headers: { "x-access-token": token } }
    );
    resolve(data);
  });
};

export default InsertPost;
