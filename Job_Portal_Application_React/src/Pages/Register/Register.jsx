import React, { useState } from "react";
import axios from "axios";
import styles from "./Register.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {

  const location = useLocation();

  const defaultRole = location.state?.role || "user";


  const [form,setForm] = useState({
    name:"",
    email:"",
    password:"",
    mobile:"",
    role:defaultRole
  });
const [shake, setShake] = useState(false);

  const [loading,setLoading] = useState(false);
  const [error,setError] = useState("");
  const [showPassword,setShowPassword] = useState(false);


  const navigate = useNavigate();



  const handleChange=(e)=>{

    setForm({
      ...form,
      [e.target.name]:e.target.value
    });

  };



  const isStrongPassword=(pwd)=>{

    return pwd.length >= 6 && /\d/.test(pwd);

  };




  const handleRegister = async()=>{


    setError("");


    if(
      !form.name ||
      !form.email ||
      !form.password ||
      !form.mobile
    ){

      toast.error("Please fill all required fields");
      setShake(true);
  setTimeout(() => setShake(false), 400);
      return;

    }



    if(!isStrongPassword(form.password)){

      setError(
        "Password must be 6+ chars with number"
      );

      return;

    }



    try{


      setLoading(true);



      await axios.post(
        "http://localhost:5000/users",
        {


          name:form.name,

          email:form.email,

          password:form.password,

          mobile:form.mobile,

          role:form.role,


          appliedJobs:[],

          savedJobs:[],

          profileComplete:false,


          profile:{


            location:"",

            education:"",

            experience:"",

            skills:"",

            resume:"",

            bio:"",

            linkedin:"",

            github:""

          }


        }
      );



      toast.success("Account Created 🚀");



      navigate("/login",{

        state:{
          email:form.email
        }

      });



    }
    catch(err){

      toast.error("Registration Failed");

    }
    finally{

      setLoading(false);

    }

  };




return (

<div className={styles.registerContainer}>


<div className={styles.registerPage}>

{/* LEFT SIDE */}

<div className={styles.registerLeft}>


<h1>
NextHire 🚀
</h1>


<h2>
Find your dream job faster
</h2>


<div className={styles.benefit}>

<p>✅ Create your professional profile</p>

<p>✅ Apply to thousands of jobs</p>

<p>✅ Track application status</p>

<p>✅ Get recruiter updates</p>


</div>



<img

src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"

className={styles.registerImage}

/>



</div>





{/* REGISTER CARD */}


<div className={`${styles.registerCard} ${shake ? styles.shake : ""}`}>

<h2>
Create Your NextHire Profile 🚀
</h2>


<p>
Start your career journey
</p>





{error &&

<p className="error">

{error}

</p>

}




<input

name="name"

placeholder="Full Name"

value={form.name}

onChange={handleChange}

/>





<input

name="email"

placeholder="Email"

value={form.email}

onChange={handleChange}

/>






<div className={styles.passwordBox}>


<input


name="password"


type={
showPassword ? "text" : "password"
}


placeholder="Password"


value={form.password}


onChange={handleChange}


/>



<span
onClick={()=>setShowPassword(!showPassword)}
>

{
showPassword ? "🙈" : "👁️"
}

</span>


</div>





{
form.password &&


<p className={styles.passwordStatus}>


{
form.password.length >=6

?

"Strong password ✅"

:

"Weak password"

}


</p>

}






<input


name="mobile"


type="tel"


placeholder="Mobile Number"


value={form.mobile}


onChange={handleChange}


/>





<input

value={form.role}

disabled

className={styles.roleInput}

/>





<button

type="button"

onClick={handleRegister}

disabled={loading}

>


{
loading
?
"Creating..."

:

"Create Account"

}


</button>





<p className={styles.footerText}>


Already have account ?{"  "}


<Link to="/login" className={styles.loginLink}>

Login

</Link>


</p>




</div>



</div>


</div>

);


};


export default Register;