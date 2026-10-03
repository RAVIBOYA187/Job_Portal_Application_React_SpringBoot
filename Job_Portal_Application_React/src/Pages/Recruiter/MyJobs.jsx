import React,{useEffect,useState} from "react";
import axios from "axios";
import styles from "./MyJobs.module.css";

const MyJobs = ({user})=>{


const [jobs,setJobs] = useState([]);
const [editJob,setEditJob] = useState(null);
const [showEdit,setShowEdit] = useState(false);



useEffect(()=>{

loadJobs();

},[]);



const loadJobs = async()=>{

try{

const res = await axios.get(
"http://localhost:5000/jobs"
);


const recruiterJobs =
res.data.filter(
(job)=>job.recruiterId === user?.id
);


setJobs(recruiterJobs);


}
catch(err){

console.log(err);

}

};





const deleteJob = async(id)=>{

try{


await axios.delete(
`http://localhost:5000/jobs/${id}`
);


setJobs(prev=>
prev.filter(job=>job.id !== id)
);


alert("Job Deleted");


}
catch(err){

console.log(err);

}

};





const updateJob = async()=>{


try{


const res = await axios.patch(
`http://localhost:5000/jobs/${editJob.id}`,
editJob
);



setJobs(prev=>
prev.map(job=>

job.id===editJob.id
?
res.data
:
job

)
);



setShowEdit(false);


alert("Job Updated");


}
catch(err){

console.log(err);

}


};




return(

<div className={styles.container}>


<h1 className={styles.title}>
My Posted Jobs
</h1>



<div className={styles.jobsContainer}>


{
jobs.map(job=>(


<div
className={styles.jobCard}
key={job.id}
>



<img
src={job.logo}
className={styles.logo}
/>



<div className={styles.jobInfo}>

<h2>
{job.role}
</h2>

<p>
{job.company}
</p>

</div>




<div className={styles.details}>

<span>
📍 {job.location}
</span>


<span>
💰 {job.salary}
</span>


</div>





<div className={styles.details}>


<span>
💼 {job.jobType}
</span>


<span>
🏠 {job.workMode}
</span>


</div>





<div className={styles.actions}>


<button

className={styles.editBtn}

onClick={()=>{

setEditJob(job);
setShowEdit(true);

}}

>
Edit
</button>




<button

className={styles.deleteBtn}

onClick={()=>deleteJob(job.id)}

>
Delete
</button>


</div>



</div>


))

}



</div>
{
showEdit && editJob && (

<div className={styles.modalOverlay}>

<div className={styles.modal}>
<div className={styles.modalHeader}>

<h2>Edit Job</h2>

<button
className={styles.closeBtn}
onClick={()=>{
setShowEdit(false);
setEditJob(null);
}}
>
✕
</button>
</div>

<label>Company Name</label>
<input
value={editJob.company || ""}
onChange={(e)=>
setEditJob({...editJob, company:e.target.value})
}
/>



<label>Company Logo URL</label>
<input
value={editJob.logo || ""}
onChange={(e)=>
setEditJob({...editJob, logo:e.target.value})
}
/>



<label>Job Role</label>
<input
value={editJob.role || ""}
onChange={(e)=>
setEditJob({...editJob, role:e.target.value})
}
/>



<label>Department</label>
<input
value={editJob.department || ""}
onChange={(e)=>
setEditJob({...editJob, department:e.target.value})
}
/>



<label>Location</label>
<input
value={editJob.location || ""}
onChange={(e)=>
setEditJob({...editJob, location:e.target.value})
}
/>



<label>Experience</label>
<input
value={editJob.experience || ""}
onChange={(e)=>
setEditJob({...editJob, experience:e.target.value})
}
/>
<label>Salary</label>
<input
value={editJob.salary || ""}
onChange={(e)=>
setEditJob({...editJob, salary:e.target.value})
}
/>
<label>Job Type</label>

<select
value={editJob.jobType || ""}
onChange={(e)=>
setEditJob({...editJob, jobType:e.target.value})
}
>

<option>Full Time</option>
<option>Part Time</option>
<option>Internship</option>

</select>





<label>Work Mode</label>

<select
value={editJob.workMode || ""}
onChange={(e)=>
setEditJob({...editJob, workMode:e.target.value})
}
>

<option>Remote</option>
<option>Hybrid</option>
<option>Onsite</option>

</select>





<label>Vacancies</label>

<input
value={editJob.vacancies || ""}
onChange={(e)=>
setEditJob({...editJob, vacancies:e.target.value})
}
/>





<label>Skills</label>

<input
value={editJob.skills || ""}
onChange={(e)=>
setEditJob({...editJob, skills:e.target.value})
}
/>





<label>Requirements</label>

<textarea

value={editJob.requirements || ""}

onChange={(e)=>
setEditJob({
...editJob,
requirements:e.target.value
})
}

/>





<label>Responsibilities</label>

<textarea

value={editJob.responsibilities || ""}

onChange={(e)=>
setEditJob({
...editJob,
responsibilities:e.target.value
})
}

/>





<label>Eligibility</label>

<textarea

value={editJob.eligibility || ""}

onChange={(e)=>
setEditJob({
...editJob,
eligibility:e.target.value
})
}

/>





<label>Job Description</label>

<textarea

value={editJob.description || ""}

onChange={(e)=>
setEditJob({
...editJob,
description:e.target.value
})
}

/>





<label>Apply Link</label>

<input

value={editJob.applyLink || ""}

onChange={(e)=>
setEditJob({
...editJob,
applyLink:e.target.value
})
}

/>





<div className={styles.modalBtns}>

<button
onClick={updateJob}
>
Update
</button>


<button
onClick={()=>{
setShowEdit(false)
setEditJob(null)
}}
>
Cancel
</button>


</div>


</div>

</div>

)

}
</div>

)

}


export default MyJobs;