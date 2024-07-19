// import { LockClosedIcon } from '@heroicons/react/20/solid'
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../services/axioscall";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { userReducer } from "../../reduxgobalState/userSlice";
import { useDispatch } from "react-redux";
import "./Login.css";
import Slider from "./Slider";
import { useMediaQuery } from "react-responsive";

function Login() {
  let image = [
    "/png/screenshot1.png",
    "/png/screenshot2.png",
    "/png/screenshot3.png",
    "/png/screenshot4.png",
  ];
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [inputType, setInputType] = useState("");
  const IsBigScreen = useMediaQuery({ query: "(min-width: 1024px)" });

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("userToken"));
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  let formdata = {};

  const onSubmit = async (formData) => {
    try {
      console.log(formData, "onsubmitiscalled", inputValue, inputPassword);
      if (/^\d+$/.test(inputValue)) {
        setInputType(inputValue);
        formdata.phone = inputValue;
      } else if (/\S+@\S+\.\S+/.test(inputValue)) {
        formdata.email = inputValue;
        setInputType(inputValue);
      } else {
        formdata.userName = inputValue;
        setInputType(inputValue);
      }
      // return;
      formdata.password = inputPassword;
      console.log(formdata, "thisisformdataiss");
      const { data } = await axios.post("/login", {
        email: inputValue,
        password: inputPassword,
      });
      if (data.status === !false) {
        localStorage.setItem("userToken", JSON.stringify(data.token));
        localStorage.setItem("userid", JSON.stringify(data?.userid));
        localStorage.setItem("user", JSON.stringify(data?.user));
        dispatch(userReducer());
        navigate("/");
      } else {
        setError(data.error);
      }
    } catch (err) {
      // console.log(err, 'login error')
    }
  };
  const response = async (credentialResponse) => {
    var token = credentialResponse.credential;
    var decoded = jwt_decode(token);

    const { data } = await axios.post("/login", decoded);

    if (data.status === !false) {
      localStorage.setItem("userToken", JSON.stringify(data?.token));
      localStorage.setItem("userid", JSON.stringify(data?.userid));
      localStorage.setItem("user", JSON.stringify(data?.user));
      dispatch(userReducer());
      navigate("/");
    } else {
      setError(data.error);
    }
  };

  const [inputValue, setInputValue] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [passHidden, setPassHidded] = useState(true);
  const handleInputChange = (event) => {
    console.log(event.target.name);
    event.target.name === "email"
      ? setInputValue(event.target.value)
      : setInputPassword(event.target.value);
  };

  return (
    <>
      <div className="flex min-h-full  items-center justify-center py-2 px-4 sm:px-6 lg:px-8 lg:mr-[36px]">
        <div className="w-full h-[581px]  object-center space-y-8   mt-[10vh] flex justify-center items-center ">
          {IsBigScreen && (
            <div className="backgroundImage w-[468px] mt-12 h-full overflow-hidden relative">
              <Slider images={image} interval={2500} />
            </div>
          )}
          <div className="flex flex-col gap-3 w-[350px]">
            <div className="border border-slate-200 w-full max-w-sm pl-10 pr-10 pt-16 pb-16 mt-1">
              <div className="flex justify-center">
                <img className="max-w-[66%]" src="/name.png" alt="site name" />
              </div>
              <form
                className="mt-8 space-y-6"
                action=""
                onSubmit={handleSubmit(onSubmit)}
                method=""
              >
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="-space-y-px ">
                  <div
                    className="relative rounded flex justify-center bg-[#FAFAFA] flex-col border border-gray-300 h-11"
                    onClick={() => {
                      emailRef.current.focus();
                      emailRef.current.click();
                    }}
                  >
                    {/* {inputValue && ( */}
                    <span
                      className={`placeholder px-3  text-gray-500 transition-all ease-in-out delay-0 text-xs 
                        
                      `}
                    >
                      {inputValue && <p>phone number, username, or email</p>}
                    </span>
                    {/* // )} */}
                    <input
                      ref={emailRef}
                      type="text"
                      name="email"
                      placeholder="Phone number, username, or email"
                      className="relative block w-full bg-[#FAFAFA] appearance-none text-xs   pl-3  text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm "
                      value={inputValue}
                      // {...register("email", {
                      //   required: {
                      //     value: true,
                      //     // message: "Email is required"
                      //   },
                      //   pattern: {
                      //     value:
                      //       /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      //     // message: "Enter a valid email",
                      //   },
                      // })}
                      onChange={handleInputChange}
                    />
                  </div>
                  {errors.email && (
                    <p className=" mt-1 text-center text-1xl font-sans font-light tracking-tight text-gray-900">
                      {errors.email.message}
                    </p>
                  )}
                  <div className="bg-[#FAFAFA]">
                    <div
                      className="flex rounded items-center  justify-between  border border-gray-300 h-11 mt-3 py-3"
                      onClick={() => {
                        passwordRef.current.focus();
                        passwordRef.current.click();
                      }}
                    >
                      <div className="flex flex-col cursor-text">
                        <span
                          className={` px-3  text-gray-500 transition-all ease-in-out delay-0 text-xs 
                        
                      `}
                        >
                          {inputPassword && <p>password</p>}
                        </span>
                        <input
                          ref={passwordRef}
                          type={passHidden ? "password" : "text"}
                          placeholder="Password"
                          name="password"
                          className="relative bg-[#FAFAFA] w-full appearance-none text-xs   px-3  text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm "
                          value={inputPassword}
                          // {...register("password", {
                          //   required: {
                          //     value: true,
                          //     // message: "Password required",
                          //   },
                          //   minLength: {
                          //     value: 8,
                          //     // message: "Password should be 8 characters long",
                          //   },
                          // })}
                          onChange={handleInputChange}
                        />
                      </div>
                      {inputPassword && (
                        <span
                          onClick={() => setPassHidded((pre) => !pre)}
                          className="pr-3"
                        >
                          {passHidden ? "Show" : "Hide"}
                        </span>
                      )}
                    </div>
                  </div>
                  {errors.password && (
                    <p className=" mt-1 text-center text-1xl font-sans font-light tracking-tight text-gray-900">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div>
                  <button
                    onClick={onSubmit}
                    type="submit"
                    className="group relative flex w-full justify-center rounded-md border border-transparent bg-[#67B5FA] py-2 px-4 text-sm font-semibold text-white hover:bg-[#0064e0] "
                  >
                    Log in
                  </button>
                </div>
              </form>

              <div className="flex mx-auto mt-6 mb-6">
                <div className="w-5/12 h-7 flex flex-col justify-center">
                  <hr className="bg-black-700" />
                </div>
                <h4 className="text-center font-semibold decoration-[#4a4b4b] px-2 w-2/12">
                  {" "}
                  OR{" "}
                </h4>
                <div className="w-5/12 h-7 flex flex-col justify-center">
                  <hr className="bg-black-700" />
                </div>
              </div>

              <span className="flex justify-center">
                <GoogleLogin
                  onSuccess={response}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                />
              </span>
              {error ? (
                <p className="text-center text-red-600">{error}</p>
              ) : (
                <p></p>
              )}
            </div>

            <div className="flex items-center justify-center  ">
              <div className="w-full max-w-sm object-center space-y-7 border border-slate-200 p-8 ">
                <p className="text-center">
                  Don't have an account?{" "}
                  <button className="text-sky-600 font-bold">
                    <Link to={"/signup"}>Sign up</Link>
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
