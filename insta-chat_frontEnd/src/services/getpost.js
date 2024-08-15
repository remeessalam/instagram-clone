import axios from "./axioscall";

const Getpost = () => {
  let token = JSON.parse(localStorage.getItem("userToken"));

  return new Promise((resolve, reject) => {
    axios
      .post("/post/getpost", {}, { headers: { "x-access-token": token } })
      .then((data) => {
        resolve(data);
      });
  });
};

export default Getpost;
