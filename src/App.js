import "./App.css";
import {Route, Routes } from "react-router-dom";
import Home from "./pages/Home"
import Navbar from "./components/common/Navbar"
import OpenRoute from "./components/core/auth/OpenRoute"
import PrivateRoute from "./components/core/auth/PrivateRoute";
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ForgotPassword from "./pages/ForgotPassword";
import VerifyEmail from "./pages/VerifyEmail";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Settings from "./components/core/Dashboard/Settings/index";
import AddCourse from "./components/core/Dashboard/AddCourse/index";
import { useSelector } from "react-redux";
import {ACCOUNT_TYPE} from './utils/constants'
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails";
import Cart from './components/core/Dashboard/Cart/index'
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";

function App() {
  const {user} = useSelector((state) => state.profile)
  return (
   <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
      <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />

      <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />  
      <Route
        path="verify-email"
        element={
          <OpenRoute>
            <VerifyEmail/>
          </OpenRoute>
        }
      />

      <Route
      path='/about'
      element={<AboutUs/>}
      />
       
      <Route
      path='/contact'
      element={<Contact/>}
      />
      <Route path="catalog/:catalogName" element={<Catalog/>} />
      <Route path="courses/:courseId" element={<CourseDetails/>} />
      <Route 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="dashboard/my-profile" element={<MyProfile />} />
          <Route path="dashboard/Settings" element={<Settings />} />

          {
          user?.accountType === ACCOUNT_TYPE.STUDENT && (
          <>
          <Route path="dashboard/cart" element={<Cart/>} />
          <Route path="dashboard/enrolled-courses" element={<EnrolledCourses/>} />
          </>
          )
          }
        
        {
          user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <>
            <Route path="dashboard/add-course" element={<AddCourse />} />
            {/* <Route path="dashboard/my-courses" element={<MyCourses />} />
            <Route path="dashboard/edit-course/:courseId" element={<EditCourse />} /> */}
            
            </>
          )
        }
      </Route>
    </Routes>

   </div>
  );
}

export default App;

