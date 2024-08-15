import { Outlet, createBrowserRouter, useLocation } from "react-router-dom";
import Login from "./components/login/Login";
import Signup from "./components/signup/SignUp";
import HomePage from "./pages/Homepage";
import ProfilePage from "./pages/ProfilePage";
import Chatpage from "./pages/Chatpage";
import Error from "./pages/Error";
import Showuser from "./pages/ShowProfile";
import io from "socket.io-client";
import { bigScreen, forSideBar } from "./utils/constant";
import SideBar from "./layout/SideNavBar";
import Edit from "./pages/Edit";
import { useMediaQuery } from "react-responsive";

const socket = io.connect("http://localhost:4000/");
// const socket = "hai";
const AppLayout = () => {
  const location = useLocation();
  const IsBigScreen = useMediaQuery({ query: bigScreen });
  const forSide = useMediaQuery({ query: forSideBar });
  return (
    <div className="flex w-screen overflow-hidden shrink">
      <div
        className={`${IsBigScreen ? `` : `w-0`}${
          forSide
            ? location?.pathname === "/chat"
              ? `w-[80px]`
              : `w-[244px]`
            : `w-[80px]  `
        }`}
      >
        <SideBar />
      </div>
      <div
        className={` w-full 
        ml-0`}
        // lg:ml-[240px]
      >
        <Outlet />
      </div>
    </div>
  );
};

//we can create route in createBrowserrouter it's coming from react-router-dom
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    error: <Error />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/chat",
        element: <Chatpage Socket={socket} />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/showuser/:id",
        element: <Showuser />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    error: <Error />,
  },
  {
    path: "/signup",
    element: <Signup />,
    error: <Error />,
  },
  {
    path: "/edit",
    element: <Edit />,
  },
]);
export default appRouter;
// export default App;

// http://localhost:4000

//  OLD WAY OR DOING ROUTE

// function App() {
//   const socket = io.connect("http://localhost:4000/");
//   // http://localhost:4000
//   // https://socket.adidasshoe.shop/
//   return (
//     <div>
//       <GoogleOAuthProvider clientId="117584395273-oljruplarl1md005un2cv7rmkvf11so6.apps.googleusercontent.com">
//         <BrowserRouter>
//           <Routes>
//             <Route exact path="/login" element={<Login />} />
//             <Route exact path="/signup" element={<Signup />} />
//             <Route exact path="/" element={<HomePage />} />
//             <Route exact path="/profile" element={<ProfilePage />} />
//             <Route exact path="/chat" element={<Chatpage Socket={socket} />} />
//             <Route exact path="/showuser/:id" element={<Showuser />} />
//           </Routes>
//         </BrowserRouter>
//       </GoogleOAuthProvider>
//     </div>
//   );
// }
