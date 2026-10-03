import React, { useState } from "react";
import axios from "axios";
import styles from "./RecruiterRegister.module.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const RecruiterRegister = () => {

const navigate = useNavigate();


const [form,setForm] = useState({
    recruiterName:"",
    companyName:"",
    email:"",
    password:"",
    mobile:"",
    location:"",
    website:"",
    role:"recruiter"
});


const [loading,setLoading] = useState(false);


const handleChange=(e)=>{

setForm({
    ...form,
    [e.target.name]:e.target.value
});

};



const handleRegister=async()=>{
  if(
    !form.recruiterName ||
    !form.companyName ||
    !form.email ||
    !form.password
  ){

  toast.error("Fill required fields");
  return;

}


try{

setLoading(true);


await axios.post(
"http://localhost:5000/recruiters",
form
);


toast.success("Recruiter Account Created 🚀");


navigate("/login",{
state:{
email:form.email
}
});


}
catch(error){

toast.error("Registration Failed");

}
finally{

setLoading(false);

}

};



return (

<div className={styles.container}>


{/* LEFT SIDE */}

<div className={styles.left}>

<h1>
NextHire 🚀
</h1>


<h2>
Hire talented people faster
</h2>


<div className={styles.benefits}>

<p>✅ Create company profile</p>

<p>✅ Post unlimited jobs</p>

<p>✅ Find skilled candidates</p>

<p>✅ Manage applicants easily</p>

</div>


<img
className={styles.image}
src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
/>


</div>



{/* RIGHT SIDE */}


<div className={styles.card}>


<h2>
Recruiter Registration 🚀
</h2>


<p>
Build your company account
</p>



<input
name="recruiterName"
placeholder="Recruiter Name"
value={form.recruiterName}
onChange={handleChange}
/>



<input
name="companyName"
placeholder="Company Name"
value={form.companyName}
onChange={handleChange}
/>



<input
name="email"
placeholder="Company Email"
value={form.email}
onChange={handleChange}
/>



<input

type="password"

name="password"

placeholder="Password"

value={form.password}

onChange={handleChange}

/>



<input
name="mobile"
placeholder="Mobile Number"
value={form.mobile}
onChange={handleChange}
/>



<input
name="location"
placeholder="Location"
value={form.location}
onChange={handleChange}
/>



<input
name="website"
placeholder="Company Website"
value={form.website}
onChange={handleChange}
/>



<button 
className={styles.button}
onClick={handleRegister}
disabled={loading}
>

{
loading ? "Creating..." : "Register Company"
}

</button>



<p>

Already have account?

<span 
className={styles.login}
onClick={()=>navigate("/login")}
>
Login
</span>

</p>


</div>


</div>

);

};


export default RecruiterRegister;