import React, { useState } from "react";
import axios from "axios";
import styles from "./AdminRegister.module.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const AdminRegister = () => {


const navigate = useNavigate();


const [form,setForm] = useState({

name:"",
email:"",
password:"",
mobile:"",
adminCode:"",
role:"admin"

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
!form.name ||
!form.email ||
!form.password ||
!form.adminCode
){

toast.error("Fill all required fields");
return;

}



try{


setLoading(true);



await axios.post(

"http://localhost:5000/admins",

form

);



toast.success("Admin Account Created 🚀");



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


{/* LEFT */}

<div className={styles.left}>


<h1>
NextHire 🚀
</h1>


<h2>
Manage your job platform
</h2>



<div className={styles.benefits}>


<p>✅ Manage users</p>

<p>✅ Control job postings</p>

<p>✅ Monitor recruiters</p>

<p>✅ View platform analytics</p>


</div>



<img

className={styles.image}

src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"

/>



</div>




{/* FORM */}



<div className={styles.card}>


<h2>
Admin Registration 👑
</h2>


<p>
Create administrator account
</p>




<input

name="name"

placeholder="Admin Name"

value={form.name}

onChange={handleChange}

/>



<input

name="email"

placeholder="Email"

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

name="adminCode"

placeholder="Admin Code"

value={form.adminCode}

onChange={handleChange}

/>





<button

className={styles.button}

onClick={handleRegister}

disabled={loading}

>

{
loading ? "Creating..." : "Create Admin"
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


export default AdminRegister;