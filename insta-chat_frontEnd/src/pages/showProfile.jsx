import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ShowProfile from "../components/showuser/ShowUser";

const Showuser = () => {
  const { id } = useParams();
  useEffect(() => {
    console.log(id, "id frnd");
  }, [id]);

  return <ShowProfile id={id} />;
};
export default Showuser;
