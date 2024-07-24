import { Outlet, createBrowserRouter } from "react-router-dom";
import Login from "./components/login/Login";
import Signup from "./components/signup/signUp";
import HomePage from "./pages/homepage";
import { ProfilePage } from "./pages/profilePage";
import Chatpage from "./pages/chatpage";
import Error from "./pages/Error";
import { Showuser } from "./pages/showProfile";
import { GoogleOAuthProvider } from "@react-oauth/google";
import io from "socket.io-client";
import SideBar from "./layout/sideBar";
import { Provider } from "react-redux";
import { store } from "./reduxgobalState/store";

const socket = io.connect("http://localhost:4000/");
const AppLayout = () => {
  return (
    <>
      <Provider store={store}>
        <GoogleOAuthProvider clientId="117584395273-oljruplarl1md005un2cv7rmkvf11so6.apps.googleusercontent.com">
          <SideBar />
          <Outlet />
        </GoogleOAuthProvider>
      </Provider>
    </>
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
