import React, {useState} from "react";
import axios from "axios";
import styles from "./PostJob.module.css";


const PostJob = ({user}) => {


const [job,setJob]=useState({

/* company */

company:"",
logo:"",
companyWebsite:"",
aboutCompany:"",


/* job */

role:"",
department:"",
location:"",
experience:"",
salary:"",
jobType:"",
workMode:"",
vacancies:"",

skills:"",
requirements:"",
responsibilities:"",
eligibility:"",

description:"",
applyLink:""

});



const handleChange=(e)=>{

setJob({
...job,
[e.target.name]:e.target.value
})

};





const postJob=async()=>{


const newJob = {

  ...job,

  id: Date.now().toString(),

  recruiterId: user?.id || "101",

  recruiterName: user?.name || "",
  recruiterEmail: user?.email || "",
  recruiterMobile: user?.mobile || "",

  skills: job.skills
    .split(",")
    .map(i => i.trim())
    .filter(Boolean),

  requirements: job.requirements
    .split(",")
    .map(i => i.trim())
    .filter(Boolean),

  responsibilities: job.responsibilities
    .split(",")
    .map(i => i.trim())
    .filter(Boolean),

  eligibility: job.eligibility
    .split(",")
    .map(i => i.trim())
    .filter(Boolean),

  status: "Active",

  postedDate: "Just now",

  createdAt: new Date().toISOString()
};
try{


await axios.post(
"http://localhost:5000/jobs",
newJob
);


alert("Job Posted Successfully");



setJob({

company:"",
logo:"",
companyWebsite:"",
aboutCompany:"",

role:"",
department:"",
location:"",
experience:"",
salary:"",
jobType:"",
workMode:"",
vacancies:"",

skills:"",
requirements:"",
responsibilities:"",
eligibility:"",

description:"",
applyLink:""

});


}

catch(err){

console.log(err);

}


};




return (

<div className={styles.container}>


<div className={styles.card}>


<h1>
Post New Job
</h1>



{/* COMPANY DETAILS */}

<h2 className={styles.sectionTitle}>
Company Details
</h2>



<input
name="company"
placeholder="Company Name"
value={job.company}
onChange={handleChange}
/>



<input
name="logo"
placeholder="Company Logo URL"
value={job.logo}
onChange={handleChange}
/>



<input
name="companyWebsite"
placeholder="Company Website"
value={job.companyWebsite}
onChange={handleChange}
/>



<textarea

name="aboutCompany"

placeholder="About Company"

value={job.aboutCompany}

onChange={handleChange}

/>





{/* JOB DETAILS */}



<h2 className={styles.sectionTitle}>
Job Details
</h2>



<input
name="role"
placeholder="Job Role"
value={job.role}
onChange={handleChange}
/>



<input
name="department"
placeholder="Department"
value={job.department}
onChange={handleChange}
/>



<input
name="location"
placeholder="Location"
value={job.location}
onChange={handleChange}
/>



<input
name="experience"
placeholder="Experience (0-2 Years)"
value={job.experience}
onChange={handleChange}
/>



<input
name="salary"
placeholder="Salary (18-24 LPA)"
value={job.salary}
onChange={handleChange}
/>




<select
name="jobType"
value={job.jobType}
onChange={handleChange}
>

<option value="">
Job Type
</option>

<option>
Full Time
</option>

<option>
Part Time
</option>

<option>
Internship
</option>

</select>





<select
name="workMode"
value={job.workMode}
onChange={handleChange}
>

<option value="">
Work Mode
</option>

<option>
Remote
</option>

<option>
Hybrid
</option>

<option>
Onsite
</option>

</select>





<input
name="vacancies"
placeholder="Number of vacancies"
value={job.vacancies}
onChange={handleChange}
/>





{/* SKILLS */}


<h2 className={styles.sectionTitle}>
Skills & Requirements
</h2>




<input
name="skills"
placeholder="Skills (Java, React, SQL)"
value={job.skills}
onChange={handleChange}
/>





<textarea

name="requirements"

placeholder="Requirements"

value={job.requirements}

onChange={handleChange}

/>





<textarea

name="responsibilities"

placeholder="Responsibilities"

value={job.responsibilities}

onChange={handleChange}

/>





<textarea

name="eligibility"

placeholder="Eligibility"

value={job.eligibility}

onChange={handleChange}

/>





{/* DESCRIPTION */}



<h2 className={styles.sectionTitle}>
Description
</h2>




<textarea

name="description"

placeholder="Job Description"

rows="5"

value={job.description}

onChange={handleChange}

/>





<input

name="applyLink"

placeholder="Apply Link (LinkedIn / Naukri / Careers Page)"

value={job.applyLink}

onChange={handleChange}

/>





<button
onClick={postJob}
>
Post Job
</button>




</div>

</div>

)

}


export default PostJob;