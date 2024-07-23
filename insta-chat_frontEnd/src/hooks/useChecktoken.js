import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useChecktoken = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("userToken"));
    !token && navigate("/login");
  }, [navigate]);
};

export default useChecktoken;
