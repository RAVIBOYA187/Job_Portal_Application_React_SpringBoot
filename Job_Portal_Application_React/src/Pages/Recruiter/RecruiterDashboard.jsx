
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./RecruiterDashboard.module.css"; // 👈 SAME AS USER DASHBOARD
import { FaBriefcase, FaUsers, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RecruiterDashboard = ({ user }) => {
     console.log("USER:", user);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [rejectModal,setRejectModal] = useState(null);
  const [rejectReason,setRejectReason] = useState("");
  const [selectedJobApplicants, setSelectedJobApplicants] = useState([]);
const [showApplicantsModal, setShowApplicantsModal] = useState(false);
const [selectedJobName, setSelectedJobName] = useState("");
const [showTodayModal, setShowTodayModal] = useState(false);
  const navigate = useNavigate();
console.log(applications);

  useEffect(() => {
    if (!user) return;

    axios.get("http://localhost:5000/jobs").then((res) => {
      const myJobs = res.data.filter((j) => j.recruiterId === user.id);
      setJobs(myJobs);
    });

    axios.get("http://localhost:5000/applications").then((res) => {
      const myApps = res.data.filter((a) => a.recruiterId === user.id);
      setApplications(myApps);
    });
  }, [user]);
  const updateStatus = async (id, newStatus) => {
  try {
    const res = await axios.patch(
      `http://localhost:5000/applications/${id}`,
      { status: newStatus }
    );

    setApplications((prev) =>
      prev.map((app) =>
        app.id === id ? res.data : app
      )
    );
  } catch (err) {
    console.log(err);
  }
};
const sendReject = async () => {
  try {
    await axios.patch(
      `http://localhost:5000/applications/${rejectModal.id}`,
      {
        status: "Rejected",
        rejectReason
      }
    );
    await axios.post(
      "http://localhost:5000/notifications",
      {
        userId: rejectModal.applicantId,
        title: "Application Rejected",
        message: `Your application for ${rejectModal.role} at ${rejectModal.company} was rejected.`,
        reason: rejectReason,
        isRead: false,
        createdAt: new Date().toISOString()
      }
    );

    setApplications((prev) =>
      prev.map((app) =>
        app.id === rejectModal.id
          ? {
              ...app,
              status: "Rejected",
              rejectReason
            }
          : app
      )
    );

    toast.success("Rejection Sent Successfully");

    setRejectModal(null);
    setRejectReason("");

  } catch (err) {
    toast.error("Failed to Send");
  }
};
const today = new Date().toISOString().split("T")[0];

const todaysApplicants = applications.filter(
  (app) => app.appliedDate === today
);
  return (
    <div className={styles.container}>

      {/* HERO (same as user dashboard) */}
      <div className={styles.hero}>
        <h2>
          Welcome Back, <span>{user?.recruiterName || "Recruiter"}</span> 👋
        </h2>
        <p>Manage your jobs and find the best candidates.</p>
      </div>

      {/* STATS GRID (same style) */}
      <div className={styles.grid}>

        <div className={`${styles.card} ${styles.total}`}>
          <h3>{jobs.length}</h3>
          <p>Total Jobs</p>
        </div>

        <div className={`${styles.card} ${styles.applied}`}>
          <h3>{applications.length}</h3>
          <p>Applications</p>
        </div>
        <div
  className={`${styles.card} ${styles.today}`}
  onClick={() => setShowTodayModal(true)}
  style={{ cursor: "pointer" }}
>
  <h3>{todaysApplicants.length}</h3>
  <p>Today's Applications</p>
</div>

        <div className={`${styles.card} ${styles.interview}`}>
          <h3>{jobs.length}</h3>
          <p>Active Jobs</p>
        </div>
        <div className={`${styles.card} ${styles.shortlisted}`}>
  <h3>
    {
      applications.filter(
        (app) => app.status === "Shortlisted"
      ).length
    }
  </h3>
  <p>Shortlisted</p>
</div>

<div className={`${styles.card} ${styles.hired}`}>
  <h3>
    {
      applications.filter(
        (app) => app.status === "Hired"
      ).length
    }
  </h3>
  <p>Hired</p>
</div>
      </div>
      
      {/* QUICK ACTIONS (same pattern as user dashboard) */}
      <div className={styles.quickActions}>
        <div className={styles.quickHeader}>
          <h3>Quick Actions ⚡</h3>
          <p>Manage recruitment faster</p>
        </div>

        <div className={styles.actionGrid}>

          <div
            className={styles.actionCard}
            onClick={() => navigate("/app/recruiter/post-job")}
          >
            <span className={styles.icon}>➕</span>
            <h4>Post Job</h4>
            <p>Create new job posting</p>
          </div>

          <div
            className={styles.actionCard}
            onClick={() => navigate("/app/recruiter/jobs")}
          >
            <span className={styles.icon}>📋</span>
            <h4>My Jobs</h4>
            <p>View posted jobs</p>
          </div>

          <div
            className={styles.actionCard}
            onClick={() => navigate("/app/recruiter/applicants")}
          >
            <span className={styles.icon}>👥</span>
            <h4>Applicants</h4>
            <p>Check candidates</p>
          </div>

          <div
            className={styles.actionCard}
            onClick={() =>
              navigate(`/app/recruiter-profile/${user?.id}`)
            }
          >
            <span className={styles.icon}>👤</span>
            <h4>Profile</h4>
            <p>Update company info</p>
          </div>

        </div>
      </div>

      {/* RECENT JOBS (same style as user dashboard) */}
      <div className={styles.recentJobs}>
        {console.log(jobs)}
        <h3>Recent Jobs</h3>

        {jobs.slice(0, 3).map((job) => (
          <div key={job.id} className={styles.jobRow}>
            <span>{job.role}</span>
            <span>{job.location}</span>
          </div>
        ))}
      </div>

<div className={styles.recentJobs}>
  <h3>Job Performance 📊</h3>

  <div className={styles.tableWrapper}>
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Job Role</th>
          <th>Company</th>
          <th>Applicants</th>
        </tr>
      </thead>

      <tbody>
        {jobs.map((job) => {
          const applicantCount = applications.filter(
            (app) => app.jobId === job.id
          ).length;

          return (
            <tr
  key={job.id}
  onClick={() => {
    const applicants = applications.filter(
      (app) => app.jobId === job.id
    );

    setSelectedJobApplicants(applicants);
    setSelectedJobName(job.role);
    setShowApplicantsModal(true);
  }}
  style={{ cursor: "pointer" }}
>
              <td>{job.role}</td>
              <td>{job.company}</td>
              <td>{applicantCount}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
</div>

    {/* RECENT APPLICANTS */}
<div className={styles.recentJobs}>
  <h3>Recent Applicants</h3>
   <div className={styles.tableWrapper}>

    <table className={styles.table}>
      <thead>
        <tr>
          <th>Candidate</th>
          <th>Location</th>
          <th>Role</th>
          <th>Applied Date</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {applications.slice(0, 5).map((app) => {

         const isFinalStatus =
    app.status === "Hired" || app.status === "Rejected";
      const isRejected = app.status === "Rejected";

    return (
          <tr key={app.id}>
            
            <td>{app.applicantName || "Candidate"}</td>

            <td>{app.currentLocation || app.location}</td>

            <td>{app.role}</td>

            <td>
              {app.appliedDate
                ? new Date(app.appliedDate).toLocaleDateString("en-IN")
                : "Today"}
            </td>

            <td>
              <span className={`${styles.status} ${styles[app.status]}`}>
                {app.status || "Applied"}
              </span>
            </td>

            <td className={styles.actions}>
               <button
               className={styles.viewBtn}
               onClick={()=>setSelectedApplicant(app)}
               >
               View
               </button>
              <button onClick={() => updateStatus(app.id, "Shortlisted")} disabled={isFinalStatus || isRejected}>
                Shortlist
              </button>

              <button onClick={() => updateStatus(app.id, "Interview")} disabled={isFinalStatus}>
                Interview
              </button>

              <button onClick={() =>{
                setRejectModal(app)
               updateStatus(app.id, "Rejected")
            }} disabled={isFinalStatus}
              >
                Reject
              </button>

              <button onClick={() => updateStatus(app.id, "Hired")} disabled={isFinalStatus}>
                Hire
              </button>
            </td>

          </tr>
        )
    })}
      </tbody>
    </table>

  </div>
 
</div>
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
{showApplicantsModal && (
  <div className={styles.modalOverlay}>
    <div className={styles.modal}>

      <div className={styles.modalHeader}>
        <h2>{selectedJobName} Applicants</h2>

        <button
          className={styles.closeBtn}
          onClick={() => setShowApplicantsModal(false)}
        >
          ✕
        </button>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Location</th>
            <th>Experience</th>
            <th>Mobile</th>
            <th>Skills</th>
            <th>Gender</th>
            <th>Applied Date</th>
            <th>Status</th>
            <th>View Profile</th>
          </tr>
        </thead>

        <tbody>
          {selectedJobApplicants.map((app) => (
            <tr key={app.id}>
              <td>{app.applicantName}</td>
              <td>{app.email}</td>
              <td>{app.currentLocation}</td>
              <td>{app.experience || "Fresher"}</td>
              <td>{app.mobile}</td>
              <td>{app.skills}</td>
              <td>{app.gender}</td>
              <td>
                {app.appliedDate
                  ? new Date(app.appliedDate).toLocaleDateString("en-IN")
                  : "N/A"}
              </td>
              <td>{app.status}</td>
              <td>
 <button
  className={styles.viewBtn}
  onClick={() => {
    setShowApplicantsModal(false); // close performance modal
    setSelectedApplicant(app);     // open applicant details
  }}
>
  View
</button>
</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  </div>
)}
{showTodayModal && (
  <div className={styles.modalOverlay}>
    <div className={styles.modal}>

      <div className={styles.modalHeader}>
        <h2>Today's Applicants</h2>

        <button
          className={styles.closeBtn}
          onClick={() => setShowTodayModal(false)}
        >
          ✕
        </button>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Location</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {todaysApplicants.map((app) => (
            <tr key={app.id}>
              <td>{app.applicantName}</td>
              <td>{app.email}</td>
              <td>{app.role}</td>
              <td>{app.currentLocation}</td>
              <td>{app.status}</td>
              <td><button
  className={styles.viewBtn}
  onClick={() => {
    setShowTodayModal(false);
    setSelectedApplicant(app);
  }}
>
  View
</button></td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  </div>
)}
    </div>
  );
};

export default RecruiterDashboard;