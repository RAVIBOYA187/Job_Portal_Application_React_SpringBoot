import React,{useEffect,useState} from "react";
import axios from "axios";
import styles from "./Applicants.module.css";
import { useNavigate } from "react-router-dom";

const Applicants = ({user})=>{


const [applications,setApplications]=useState([]);
const [selectedApplicant, setSelectedApplicant] = useState(null);
const [view,setView] = useState("card");
const [search,setSearch] = useState("");
const [rejectModal,setRejectModal] = useState(null);
const [rejectReason,setRejectReason] = useState("");
const navigate = useNavigate();
useEffect(()=>{

loadApplications();

},[]);



const loadApplications=async()=>{

try{

const res = await axios.get(
"http://localhost:5000/applications"
);


const data = res.data.filter(
(app)=>
app.recruiterId === user?.id
);


setApplications(data);


}
catch(err){

console.log(err);

}

};





const updateStatus=async(id,status)=>{


try{


const res = await axios.patch(
`http://localhost:5000/applications/${id}`,
{
status:status
}
);



setApplications(prev=>

prev.map(app=>

app.id===id
?
res.data
:
app

)

);


}
catch(err){

console.log(err);

}


};
const sendReject = async()=>{

if(!rejectReason.trim()) return;

try{


// 1. status update
await updateStatus(
  rejectModal.id,
  "Rejected"
);


// 2. notification create
await axios.post(
  "http://localhost:5000/notifications",
  {
    userId: rejectModal.applicantId, // ✅ change
    title: "Application Rejected ❌",
    message: `Your application for ${rejectModal.role} at ${rejectModal.company} was rejected`,
    reason: rejectReason,
    date: new Date().toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    }),
    read: false
  }
);


// close popup

setRejectModal(null);
setRejectReason("");


}
catch(err){

console.log(err);

}

}
const filteredApplications = applications.filter((app)=>{

const name = app.applicantName?.toLowerCase() || "";
const email = app.email?.toLowerCase() || "";

const value = search.toLowerCase();


return (
  name.includes(value) ||
  email.includes(value)
);

});


return (

<div className={styles.container}>


<h1>
Applicants
</h1>

<input
  className={styles.searchBox}
  placeholder="🔍 Search applicant name or email..."
  value={search}
  onChange={(e)=>setSearch(e.target.value)}
/>
<div className={styles.toggle}>
<button
className={view==="card"?styles.activeView:""}
onClick={()=>setView("card")}
>
🗂 Cards
</button>


<button
className={view==="table"?styles.activeView:""}
onClick={()=>setView("table")}
>
📋 Table
</button>


</div>


{
view==="card" ? (

<div className={styles.grid}>

{
filteredApplications.length > 0 ? (
filteredApplications.map(app=>(

<div className={styles.card} key={app.id}>

<div className={styles.top}>

<div className={styles.avatar}>
{app.applicantName?.charAt(0)}
</div>

<div>
<h2>{app.applicantName}</h2>
<p>{app.email}</p>
</div>

</div>


<div className={styles.info}>

<p>
💼 Job:
<b>{app.role}</b>
</p>

<p>
🏢 Company:
<b>{app.company}</b>
</p>

</div>

<span
className={
 app.status==="Accepted"
 ? styles.accepted
 : app.status==="Rejected"
 ? styles.rejected
 : styles.pending
}
>
{app.status}
</span>
<div className={styles.actions}>


  <button
  className={styles.accept}
  disabled={app.status === "Rejected" || app.status === "Accepted"}
  onClick={() =>
    updateStatus(app.id,"Accepted")
  }
>
  Accept
</button>


<button
  className={styles.reject}
  disabled={app.status === "Accepted" || app.status === "Rejected"}
  onClick={() =>
    // updateStatus(app.id,"Rejected")
     setRejectModal(app)
  }
>
  Reject
</button>


<button
className={styles.viewBtn}
onClick={()=>setSelectedApplicant(app)}
>
View
</button>


</div>


</div>

))

):
(
<div className={styles.noData}>
  
{
applications.length === 0 ?

<>

<h3>👥 No Applicants Yet</h3>

<p>
No one has applied for your jobs yet
</p>

</>

:

<>

<h3>🔍 No Applicants Found</h3>

<p>
Try searching with another name or email
</p>

</>

}

</div>
)

}

</div>

)

:


(
<table className={styles.table}>


<thead>

<tr>
<th>Name</th>
<th>Email</th>
<th>Job</th>
<th>Status</th>
<th>Action</th>
</tr>

</thead>


<tbody>


{
filteredApplications.length > 0 ?
filteredApplications.map(app=>(


<tr key={app.id}>


<td>{app.applicantName}</td>

<td>{app.email}</td>

<td>{app.role}</td>


<td>

<span
className={
 app.status==="Accepted"
 ? styles.accepted
 : app.status==="Rejected"
 ? styles.rejected
 : styles.pending
}
>
{app.status}
</span>
</td>


<td className={styles.tableActions}>

  
<button
  className={styles.accept}
  disabled={app.status === "Accepted" || app.status === "Rejected"}
  onClick={() =>
    updateStatus(app.id,"Accepted")
  }
>
  Accept
</button>


<button
  className={styles.reject}
  disabled={app.status === "Accepted" || app.status === "Rejected"}
  onClick={() =>
    // updateStatus(app.id,"Rejected")
     setRejectModal(app)
  }
>
  Reject
</button>

  <button
    className={styles.tableViewBtn}
    onClick={() =>
      setSelectedApplicant(app)
    }
  >
    View
  </button>

</td>

</tr>


))
:
(
  <tr>
<td 
colSpan="5"
className={styles.noData}
>
{
applications.length === 0 ?

<>
<h3>👥 No Applicants Yet</h3>
<p>No one has applied for your jobs</p>
</>

:

<>
<h3>🔍 No Applicants Found</h3>
<p>Try searching with another name or email</p>
</>

}
</td>
</tr>
)

}


</tbody>

</table>

)
}

{selectedApplicant && (
  <div className={styles.modalOverlay}>
    <div className={styles.modal}>

      <div className={styles.modalHeader}>
        <div className={styles.profileCircle}>
          {selectedApplicant.applicantName?.charAt(0)}
        </div>

        <div>
          <h2>{selectedApplicant.applicantName}</h2>
          <p>{selectedApplicant.email}</p>
        </div>

        <button
          className={styles.closeBtn}
          onClick={() => setSelectedApplicant(null)}
        >
          ✕
        </button>
      </div>

      <div className={styles.detailsGrid}>
        <div>
          <label>📱 Mobile</label>
          <p>{selectedApplicant.mobile || "N/A"}</p>
        </div>

        <div>
          <label>🎂 DOB</label>
          <p>{selectedApplicant.dob || "N/A"}</p>
        </div>

        <div>
          <label>⚧ Gender</label>
          <p>{selectedApplicant.gender || "N/A"}</p>
        </div>

        <div>
          <label>📍 Location</label>
          <p>{selectedApplicant.currentLocation || "N/A"}</p>
        </div>

        <div>
          <label>💼 Experience</label>
          <p>{selectedApplicant.experience || "Fresher"}</p>
        </div>

        <div>
          <label>📌 Status</label>
          <p>{selectedApplicant.status}</p>
        </div>
      </div>

      <div className={styles.section}>
        <h3>🛠 Skills</h3>
        <p>{selectedApplicant.skills || "No skills added"}</p>
      </div>

      <div className={styles.section}>
        <h3>📝 Bio</h3>
        <p>{selectedApplicant.bio || "No bio available"}</p>
      </div>

      <div className={styles.section}>
        <h3>🌐 Profiles</h3>

        <p>
          LinkedIn:
          {selectedApplicant.linkedinProfile || " Not Added"}
        </p>

        <p>
          GitHub:
          {selectedApplicant.githubProfile || " Not Added"}
        </p>
      </div>

    </div>
  </div>
)}
{rejectModal && (

<div className={styles.modalOverlay}>

<div className={styles.modal}>


<h2>
Reject Applicant
</h2>


<h3>
{rejectModal.applicantName}
</h3>


<textarea

placeholder="Enter rejection reason..."

value={rejectReason}

onChange={(e)=>
setRejectReason(e.target.value)
}

/>


<button
className={styles.reject}
disabled={!rejectReason}
onClick={sendReject}
>
Send
</button>


<button
onClick={()=>{
setRejectModal(null);
setRejectReason("");
}}
>
Cancel
</button>


</div>

</div>

)}
</div>

)

}


export default Applicants;