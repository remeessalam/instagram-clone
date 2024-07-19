// import { LockClosedIcon } from '@heroicons/react/20/solid'
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../services/axioscall";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { userReducer } from "../../reduxgobalState/userSlice";
import { useDispatch } from "react-redux";

function Signup() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [error, setError] = useState("");
  const [allValidated, setAllValidated] = useState(false);
  const [passHidden, setPassHidded] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isfullNameValid, setIsfullNameValid] = useState(true);
  const [isUserNameValid, setIsUserNameValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [focus, setFocus] = useState({
    email: true,
    fullName: true,
    userName: true,
    password: true,
  });
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    userName: "",
    password: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const emailRef = useRef(null);
  const fullNameRef = useRef(null);
  const userNameRef = useRef(null);
  const passwordRef = useRef(null);

  useEffect(() => {
    isdataadded();
    const token = localStorage.getItem("userToken");
    if (token) {
      navigate("/");
    }
  });

  const onSubmit = async () => {
    if (allValidated) return;
    console.log(formData, "dataishere");

    return;
    const { data } = await axios.post("/signup", formData);
    if (data.status === true) {
      localStorage.setItem("userToken", JSON.stringify(data.token));
      localStorage.setItem("userid", JSON.stringify(data?.userid));
      localStorage.setItem("user", JSON.stringify(data?.user));
      dispatch(userReducer());
      navigate("/");
    } else {
      setError(data.error);
    }
  };
  const isdataadded = () => {
    if (
      !isEmailValid ||
      !isfullNameValid ||
      !isUserNameValid ||
      !isPasswordValid ||
      formData.email.length === 0 ||
      formData.fullName.length === 0 ||
      formData.userName.length === 0 ||
      formData.password.length === 0
    ) {
      setAllValidated(true);
      return;
    }
    setAllValidated(false);
  };

  const response = async (credentialResponse) => {
    //    const googlelogin  = jwt_decode(credentialResponse)

    var token = credentialResponse.credential;
    var decoded = jwt_decode(token);

    const { data } = await axios.post("/login", decoded);

    if (data.status === !false) {
      localStorage.setItem("userToken", JSON.stringify(data.token));
      navigate("/");
    } else {
      setError(data.error);
      console.log(data.error);
    }
  };
  const validateUserName = async (userName) => {
    const { data } = await axios.post("/signup/checkusername", {
      username: userName,
    });
    if (userName.length < 4 || userName.length > 30 || data.msg === "user") {
      setIsUserNameValid(false);
      return;
    }
    console.log(data, isUserNameValid, "thisisdata");
    setIsUserNameValid(true);
  };

  const validate = (name, value) => {
    if (name === "email") {
      const emailRegex =
        /^((([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})))$|^([0-9]{10})$/;
      return emailRegex.test(String(value).toLowerCase());
    } else if (name === "fullName") {
      if (value.length < 3 || value.length > 15) return false;
      return true;
    } else {
      if (value.length < 7 || value.length > 15) return false;
      return true;
    }
  };

  const handleInputChange = (event) => {
    isdataadded();
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    if (name === "email") {
      const isValidEmail = validate(name, value);
      console.log(isValidEmail, "validty");
      setIsEmailValid(isValidEmail);
    } else if (name === "fullName") {
      const isValidFullName = validate(name, value);
      console.log(isValidFullName, value, "fullnamevalided");
      setIsfullNameValid(isValidFullName);
    } else if (name === "password") {
      const isValidPassword = validate(name, value);
      setIsPasswordValid(isValidPassword);
    } else {
      return;
    }
  };

  return (
    <>
      <div className="flex min-h-full  items-center justify-center py-2 px-4 sm:px-6 lg:px-8 ">
        <div className="w-full max-w-sm object-center space-y-8 border border-slate-200 p-10 mt-[10vh]">
          <div>
            {/* <h2 className="text-center text-5xl font-serif font-light tracking-tight text-gray-900">
              Instachat
            </h2> */}
            <div className="w-full flex justify-center">
              <img className="max-w-[58%]" src="/name.png" alt="site name" />
            </div>
            <p className="text-center text-[#737373] font-semibold mt-5 pb-4">
              Sign up to see photos and videos from your friends.
            </p>

            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent  py-2 px-4 text-sm font-medium text-white  "
            >
              <span className="flex justify-center">
                <GoogleLogin
                  onSuccess={response}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                />
              </span>
            </button>
          </div>
          <div className="flex mx-auto">
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

          <form
            className="mt-8 space-y-6"
            action=""
            onSubmit={handleSubmit(onSubmit)}
            method=""
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              {/** EMAIL OR MOBILE NUMBER*/}
              <div
                className="relative rounded mb-3 bg-[#FAFAFA] group focus-within:border-[#999999]  cursor-text flex items-center flex-row border border-gray-300 h-11"
                onClick={() => {
                  emailRef.current.focus();
                  emailRef.current.click();
                  console.log("clicked");
                }}
              >
                <div className="flex flex-col justify-between w-full  ">
                  <span
                    className={`placeholder px-3  text-gray-500 transition-all ease-in-out delay-0 text-xs 
                        
                      `}
                  >
                    {formData.email && <p>Mobile Number or Email</p>}
                  </span>
                  <input
                    ref={emailRef}
                    name="email"
                    type="text"
                    placeholder="Mobile Number or Email"
                    className="relative block w-full bg-[#FAFAFA] appearance-none  pl-3  text-gray-900 placeholder-gray-500 focus:z-10  focus:outline-none  sm:text-xs "
                    value={formData.email}
                    onFocus={(e) =>
                      setFocus((pre) => ({ ...pre, [e.target.name]: false }))
                    }
                    onBlur={(e) =>
                      setFocus((pre) => ({ ...pre, [e.target.name]: true }))
                    }
                    onChange={handleInputChange}
                  />
                </div>
                {formData.email && (
                  <p className="pr-3  text-center text-1xl font-sans font-light tracking-tight text-gray-900">
                    {/* {errors.email.message} */}
                    {focus.email &&
                      (isEmailValid ? (
                        <img
                          src="/svg/tick.svg"
                          alt=""
                          width={22}
                          height={22}
                        />
                      ) : (
                        <img
                          src="/svg/close.svg"
                          alt=""
                          width={22}
                          height={22}
                        />
                      ))}
                  </p>
                )}
              </div>
              {/** END EMAIL OR MOBILE NUMBER*/}
              {/** FULL NAME  */}
              <div
                style={{ marginBottom: "12px" }}
                className="relative mb-3 rounded bg-inputfieldbg group focus-within:border-[#999999]  cursor-text flex items-center flex-row border border-gray-300 h-11"
                onClick={() => {
                  fullNameRef.current.focus();
                  fullNameRef.current.click();
                  console.log("clicked");
                }}
              >
                <div className="flex flex-col justify-between w-full">
                  <span className=" px-3  text-gray-500 transition-all ease-in-out delay-0 text-xs ">
                    {formData.fullName && <p>Full Name</p>}
                  </span>
                  <input
                    ref={fullNameRef}
                    name="fullName"
                    type="text"
                    placeholder="Full Name"
                    className="relative block w-full bg-[#FAFAFA] appearance-none  pl-3     text-gray-900 placeholder-gray-500 focus:z-10  focus:outline-none sm:text-xs "
                    onFocus={(e) =>
                      setFocus((pre) => ({ ...pre, [e.target.name]: false }))
                    }
                    onBlur={(e) =>
                      setFocus((pre) => ({ ...pre, [e.target.name]: true }))
                    }
                    onChange={handleInputChange}
                  />
                </div>
                {formData.fullName && (
                  <p className="pr-3  text-center text-1xl font-sans font-light tracking-tight text-gray-900">
                    {/* {errors.email.message} */}
                    {focus.fullName &&
                      (isfullNameValid ? (
                        <img
                          src="/svg/tick.svg"
                          alt=""
                          width={22}
                          height={22}
                        />
                      ) : (
                        <img
                          src="/svg/close.svg"
                          alt=""
                          width={22}
                          height={22}
                        />
                      ))}
                  </p>
                )}
              </div>
              {/** END FULL NAME  */}
              {/** USERNAME */}
              <div
                style={{ marginBottom: "12px" }}
                className="relative rounded bg-inputfieldbg group focus-within:border-[#999999]  cursor-text flex items-center flex-row border border-gray-300 h-11"
                onClick={() => {
                  userNameRef.current.focus();
                  userNameRef.current.click();
                  console.log("clicked");
                }}
              >
                <div className="flex flex-col justify-between w-full">
                  <span className=" px-3  text-gray-500 transition-all ease-in-out delay-0 text-xs ">
                    {formData.userName && <p>Username</p>}
                  </span>
                  <input
                    ref={userNameRef}
                    type="text"
                    name="userName"
                    placeholder="Username"
                    className="relative block w-full bg-inputfieldbg appearance-none   pl-3 text-gray-900 placeholder-gray-500 focus:z-10  focus:outline-none  sm:text-xs "
                    onFocus={(e) =>
                      setFocus((pre) => ({ ...pre, [e.target.name]: false }))
                    }
                    onBlur={(e) => (
                      setFocus((pre) => ({ ...pre, [e.target.name]: true })),
                      validateUserName(formData.userName)
                    )}
                    onChange={handleInputChange}
                  />
                </div>
                {formData.userName && (
                  <p className="pr-3  text-center text-1xl font-sans font-light tracking-tight text-gray-900">
                    {/* {errors.email.message} */}
                    {focus.userName &&
                      (isUserNameValid ? (
                        <img
                          src="/svg/tick.svg"
                          alt=""
                          width={22}
                          height={22}
                        />
                      ) : (
                        <img
                          src="/svg/close.svg"
                          alt=""
                          width={22}
                          height={22}
                        />
                      ))}
                  </p>
                )}
              </div>
              {/** END  USERNAME */}
              {/** PASSWORD */}
              <div className="relative rounded mt-3 bg-inputfieldbg group focus-within:border-[#999999]   flex items-center flex-row border border-gray-300 h-11">
                <div
                  className="flex flex-col justify-between w-full cursor-text"
                  onClick={() => {
                    passwordRef.current.focus();
                    passwordRef.current.click();
                    console.log("clicked");
                  }}
                >
                  <span className=" px-3  text-gray-500 transition-all ease-in-out delay-0 text-xs ">
                    {formData.password && <p>Password</p>}
                  </span>
                  <input
                    ref={passwordRef}
                    type={passHidden ? "password" : "text"}
                    name="password"
                    placeholder="Password"
                    className="relative block w-full appearance-none bg-inputfieldbg  pl-3  text-gray-900 placeholder-gray-500 focus:z-10  focus:outline-none focus:ring-gray-500 sm:text-xs"
                    onFocus={(e) =>
                      setFocus((pre) => ({ ...pre, [e.target.name]: false }))
                    }
                    onBlur={(e) =>
                      setFocus((pre) => ({ ...pre, [e.target.name]: true }))
                    }
                    onChange={handleInputChange}
                  />
                </div>
                {formData.password && (
                  <p className="">
                    {/* {errors.email.message} */}
                    {formData.password &&
                      (isPasswordValid ? (
                        <img
                          src="/svg/tick.svg"
                          alt="tick"
                          width={27.3}
                          height={25}
                        />
                      ) : (
                        <img
                          src="/svg/close.svg"
                          alt="close"
                          width={27.3}
                          height={25}
                        />
                      ))}
                  </p>
                )}
                {formData.password && (
                  <span
                    onClick={() => setPassHidded((pre) => !pre)}
                    className="pr-3 ml-3 min-w-[52px] select-none"
                  >
                    {passHidden ? "Show" : "Hide"}
                  </span>
                )}
              </div>
              {/**END PASSWORD  */}
            </div>

            <div>
              <button
                type="submit"
                className={`group relative flex w-full justify-center rounded-md border border-transparent  py-2 px-4 text-sm font-medium text-white  ${
                  allValidated ? "bg-[#67b5fa]" : "bg-[#0ea5e9]"
                }`}
              >
                Sign up
              </button>
              {error ? (
                <p className="text-center text-red-600 pt-3">{error}</p>
              ) : (
                <p></p>
              )}
            </div>
          </form>
        </div>
      </div>
      <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8 ">
        <div className="w-full max-w-sm object-center space-y-7 border border-slate-200 p-8 ">
          <p className="text-center">
            Have an account?{" "}
            <button className="text-sky-600 font-bold">
              <Link to={"/login"}>Log in</Link>
            </button>
          </p>
        </div>
      </div>
    </>
  );
}

export default Signup;

{
  /** email register 
  // {...register("email", {
                    //   required: { value: true, message: "Email is required" },
                    //   pattern: {
                    //     value:
                    //       /^((([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})))$|^([0-9]{10})$/,
                    //     message: "Enter a valid email",
                    //   },
                    FULL NAME REGISTER
                       // {...register("fullName", {
                    //   required: { value: true, message: "Enter Full Name" },
                    //   minLength: { value: 4, message: "Enter Name" },
                    // })}
                    USERNAME REGISTER
                   {...register("username", {
                      required: { value: true, message: "Username required" },
                      minLength: {
                        value: 3,
                        message: "Enter a valid username",
                      },
                    })}
                    PASSWORD REGISTER
                    {...register("password", {
                      required: { value: true, message: "Password required" },
                      minLength: {
                        value: 8,
                        message: "Password should be 8 characters long",
                      },
                    })}
                    // })} */
}
