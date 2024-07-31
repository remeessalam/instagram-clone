import axios from "./axioscall";

const addComment = async (postId, text, navigate) => {
  // const navigate = useNavigate();
  console.log(postId, "commentclicked");

  let token = JSON.parse(localStorage.getItem("userToken"));

  if (!token) {
    navigate("/login");
    return Promise.reject("No token found");
  }

  return new Promise((resolve, reject) => {
    axios
      .post(
        "/post/sendcomment",
        { postId, text },
        { headers: { "x-access-token": token } }
      )
      .then((data) => {
        resolve(data.data);
      })
      .catch((err) => reject(err));
  });
};

export default addComment;
