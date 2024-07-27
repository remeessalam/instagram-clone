// import { useDispatch } from "react-redux";
// import axios from "../services/axioscall";
// import { useNavigate } from "react-router-dom";
// import { userReducer } from "../reduxgobalState/userSlice";
// const useOnSubmit = async () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const handleSubmit = async (formData, setError, path) => {
//     try {
//       const { data } = await axios.post(path, { formData: formData });
//       if (data.status === true) {
//         localStorage.setItem("userToken", JSON.stringify(data.token));
//         localStorage.setItem("userid", JSON.stringify(data?.userid));
//         localStorage.setItem("user", JSON.stringify(data?.user));
//         dispatch(userReducer());
//         navigate("/");
//       } else {
//         setError(data.error);
//       }
//     } catch (err) {
//       // console.log(err, 'login error')
//     }
//   };

//   return handleSubmit;
// };
// // const onSubmit = async () => {
// //   if (allValidated) return;
// //   console.log(formData, "dataishere");
// //   const { data } = await axios.post("/signup", formData);
// //   if (data.status === true) {
// //     localStorage.setItem("userToken", JSON.stringify(data.token));
// //     localStorage.setItem("userid", JSON.stringify(data?.userid));
// //     localStorage.setItem("user", JSON.stringify(data?.user));
// //     dispatch(userReducer());
// //     navigate("/");
// //   } else {
// //     setError(data.error);
// //   }
// // };

// // const onSubmits = async (formData) => {
// //   try {
// //     console.log(formData, "onsubmitiscalled", inputValue, inputPassword);

// //     const { data } = await axios.post("/login", {
// //       email: inputValue,
// //       password: inputPassword,
// //     });
// //     if (data.status === true) {
// //       localStorage.setItem("userToken", JSON.stringify(data.token));
// //       localStorage.setItem("userid", JSON.stringify(data?.userid));
// //       localStorage.setItem("user", JSON.stringify(data?.user));
// //       dispatch(userReducer());
// //       navigate("/");
// //     } else {
// //       setError(data.error);
// //     }
// //   } catch (err) {
// //     // console.log(err, 'login error')
// //   }
// // };

// export default useOnSubmit;

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "../services/axioscall";
import { userReducer } from "../reduxgobalState/slices/userSlice";

const useOnSubmit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (
    formData,
    setError,
    path,
    allValidated = null
  ) => {
    try {
      if (allValidated && path === "/signup") return;
      const { data } = await axios.post(path, { formData: formData });
      if (data.status === true) {
        localStorage.setItem("userToken", JSON.stringify(data.token));
        localStorage.setItem("userid", JSON.stringify(data?.userid));
        localStorage.setItem("user", JSON.stringify(data?.user));
        dispatch(userReducer());
        navigate("/");
      } else {
        setError(data.error);
      }
    } catch (err) {
      // handle error here if needed
    }
  };

  return handleSubmit;
};

export default useOnSubmit;
