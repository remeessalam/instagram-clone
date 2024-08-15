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
