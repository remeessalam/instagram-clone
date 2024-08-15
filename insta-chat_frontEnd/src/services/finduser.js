import axios from "./axioscall";

const finduser = (name) => {
  let token = JSON.parse(localStorage.getItem("userToken"));

  return new Promise((resolve, reject) => {
    axios
      .post("/finduser", { name }, { headers: { "x-access-token": token } })
      .then((data) => {
        resolve(data);
      });
  });
};

export default finduser;
