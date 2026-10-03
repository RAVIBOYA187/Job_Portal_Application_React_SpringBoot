import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Pages/Login/Login'
import Layout from './Components/Layout/Layout'
import Register from './Pages/Register/Register'
import AddJob from './Pages/AddJob/AddJob'
import Dashboard from './Pages/Dashboard/Dashboard'
// import PrivateRoute from './Components/PrivateRoute/PrivateRoute'
import "./App.css"
// import PrivateLayout from './Components/PrivateRoute/PrivateRoute'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import Home from './Pages/Home/Home'
import Profile from './Pages/Profile/Profile'
import BrowseJobs from './Pages/BrowseJobs/BrowseJobs'
import SavedJobs from './Pages/SavedJobs/SavedJobs'
import Notifications from './Pages/Notifications/Notifications'
import SelectRole from './Pages/SelectRole/SelectRole'
import RecruiterRegister from './Pages/RecruiterRegister/RecruiterRegister'
import AdminRegister from './Pages/AdminRegister/AdminRegister'
import PostJob from './Pages/Recruiter/PostJob'
import MyJobs from './Pages/Recruiter/MyJobs'
import Applicants from './Pages/Recruiter/Applicants'
import MyApplications from './Pages/Jobs/MyApplications'
import RecruiterProfile from './Pages/Recruiter/RecruiterProfile'
import RecruiterDashboard from './Pages/Recruiter/RecruiterDashboard'

const App = () => {
  const [user, setUser] = useState(null);
  return (
    <BrowserRouter>

      <ToastContainer position="top-right" autoClose={2000} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/select-role" element={<SelectRole />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recruiter-register" element={<RecruiterRegister />} />
        <Route path="/admin-register" element={<AdminRegister />} />
          <Route path="/app" element={<Layout user={user}/>}>
          <Route index element={<Dashboard user={user} />} />
            <Route path="browse-jobs" element={<BrowseJobs/>}/>
            <Route path="saved-jobs" element={<SavedJobs/>}/>
            <Route path="notifications" element={<Notifications/>}/>
            <Route path="my-applications" element={<MyApplications user={user}/>} />
            <Route path="recruiter/post-job" element={<PostJob user={user}/>}/>
            <Route path="recruiter/jobs"element={<MyJobs user={user}/>}/>
            <Route path="recruiter/applicants" element={<Applicants user={user}/>}/>
            <Route path="recruiter/dashboard" element={<RecruiterDashboard user={user} />}/>

            <Route path="profile/:id" element={<Profile/>} />
            <Route path="recruiter-profile/:id" element={<RecruiterProfile/>} />
              <Route path="admin/dashboard" element={<Dashboard user={user} />} />
          </Route>
      </Routes>

    </BrowserRouter>
  );
};

export default App;
