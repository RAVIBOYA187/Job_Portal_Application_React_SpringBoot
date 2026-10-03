

import React, { useState } from "react";
import axios from "axios";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = ({ setUser }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [shake, setShake] = useState(false);

  const [role, setRole] = useState("user");

  const navigate = useNavigate();


  const handleLogin = async () => {

    if(!email || !password){
      toast.error("Please enter email and password");
      return;
    }


    try {

      setLoading(true);


      // fetch all collections
      const [
        usersRes,
        recruitersRes,
        adminsRes
      ] = await Promise.all([
        axios.get("http://localhost:5000/users"),
        axios.get("http://localhost:5000/recruiters"),
        axios.get("http://localhost:5000/admins")
      ]);


      const allUsers = [
        ...usersRes.data,
        ...recruitersRes.data,
        ...adminsRes.data
      ];


      const foundUser = allUsers.find(
        (item)=>
          item.email === email &&
          item.password === password &&
          item.role === role
      );


      if(!foundUser){

        toast.error("Invalid credentials ❌");

        setErrors({
          email:"Invalid email or password",
          password:"Invalid email or password"
        });


        setShake(true);

        setTimeout(()=>{
          setShake(false);
        },400);


        return;
      }



      // SUCCESS

      setUser(foundUser);

      localStorage.setItem(
        "user",
        JSON.stringify(foundUser)
      );


      toast.success("Login successful 🚀");



      // role based navigation

      if(foundUser.role === "admin"){

        navigate("/app/admin/dashboard");

      }
      else if(foundUser.role === "recruiter"){


        navigate(
          "/app/recruiter/jobs"
        );

      }
      else{

        navigate("/app");

      }



    } catch(error){

      console.log(error);

      toast.error("Server error ❌");

    } finally {

      setLoading(false);

    }

  };




  return (

    <div className={styles.loginContainer}>


      {/* LEFT SIDE */}

      <div className={styles.leftSide}>

        <h1>🚀 Job Tracker</h1>

        <p>
          Your career journey starts here
        </p>


        <ul>

          <li>💼 Apply to top companies</li>

          <li>📊 Track applications</li>

          <li>🔔 Get interview updates</li>

          <li>🎯 Build your career faster</li>

        </ul>


      </div>




      {/* LOGIN CARD */}

      <div 
      className={`${styles.loginCard} ${
        shake ? styles.shake : ""
      }`}
      >


        <h2>
          Login 👋
        </h2>


        <p>
          Login to Job Tracker
        </p>




        <p className={styles.roleLabel}>
          Continue as
        </p>



        <div className={styles.roleCards}>


          <div
          className={`${styles.roleCard}
          ${role==="user" ? styles.selected:""}`}
          onClick={()=>setRole("user")}
          >

            <span>👤</span>
            <h4>User</h4>

          </div>




          <div
          className={`${styles.roleCard}
          ${role==="recruiter" ? styles.selected:""}`}
          onClick={()=>setRole("recruiter")}
          >

            <span>💼</span>
            <h4>Recruiter</h4>

          </div>




          <div
          className={`${styles.roleCard}
          ${role==="admin" ? styles.selected:""}`}
          onClick={()=>setRole("admin")}
          >

            <span>👑</span>
            <h4>Admin</h4>

          </div>


        </div>





        {/* EMAIL */}

        <div className={styles.inputWrapper}>


          <input
          placeholder="Email"
          value={email}
          onChange={(e)=>{

            setEmail(e.target.value);

            setErrors({
              ...errors,
              email:""
            });

          }}

          className={
            errors.email 
            ? styles.errorInput 
            : ""
          }

          />


          {
            errors.email &&
            <span className={styles.errorIcon}>
              ⚠️
            </span>
          }


        </div>






        {/* PASSWORD */}


        <div className={styles.inputWrapper}>


          <input

          type={
            showPassword
            ? "text"
            : "password"
          }

          placeholder="Password"

          value={password}


          onChange={(e)=>{

            setPassword(e.target.value);

            setErrors({
              ...errors,
              password:""
            });

          }}


          className={
            errors.password
            ? styles.errorInput
            :""
          }

          />



          <span
          onClick={()=>
            setShowPassword(!showPassword)
          }

          style={{
            cursor:"pointer"
          }}

          >
            👁️
          </span>


        </div>






        <button
        onClick={handleLogin}
        disabled={loading}
        >

          {
            loading
            ? "Logging in..."
            : "Login"
          }

        </button>






        <p className={styles.footerText}>


          Don’t have an account?


          <span
          className={styles.registerLink}

          onClick={()=>
            navigate("/select-role")
          }

          >

            Register

          </span>


        </p>



      </div>



    </div>

  );

};


export default Login;