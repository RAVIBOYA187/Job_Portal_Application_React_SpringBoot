import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./BrowseJobs.module.css";
import { toast } from "react-toastify";

const BrowseJobs = ({user}) => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [search, setSearch] = useState("");
  const [profile, setProfile] = useState(user);
const [appliedJobs,setAppliedJobs] = useState([]);
const [savedJobs, setSavedJobs] = useState([]);
useEffect(() => {
  axios.get("http://localhost:5000/users")
    .then((res) => {
      const loggedUser = res.data.find(u => u.role === "user");
      setProfile(loggedUser);
    });
}, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/jobs")
      .then((res) => setJobs(res.data));
  }, []);
useEffect(() => {
  if (!profile?.id) return;

  const loadAppliedJobs = async () => {
    const res = await axios.get(
      `http://localhost:5000/applications?applicantId=${profile.id}`
    );

    setAppliedJobs(res.data.map(app => app.jobId));
  };

  loadAppliedJobs();
}, [profile]);
  const filteredJobs = jobs.filter(
    (job) =>
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.role.toLowerCase().includes(search.toLowerCase())
  );


const saveJob = async (job) => {
  try {
    const isSaved = savedJobs.includes(job.id);

    if (isSaved) {
      const res = await axios.get(
        `http://localhost:5000/savedJobs?originalJobId=${job.id}`
      );

      if (res.data.length > 0) {
        await axios.delete(
          `http://localhost:5000/savedJobs/${res.data[0].id}`
        );
      }

      setSavedJobs(prev =>
        prev.filter(id => id !== job.id)
      );

      toast.info("Job Unsaved");
    } else {
      await axios.post(
        "http://localhost:5000/savedJobs",
        {
          ...job,
          originalJobId: job.id
        }
      );

      setSavedJobs(prev => [
        ...prev,
        job.id
      ]);

      toast.success("Job Saved ⭐");
    }
  } catch (error) {
    toast.error("Failed");
  }
};
 const applyJob = async (job) => {
if (appliedJobs.includes(job.id)) {
  toast.info("Already Applied");
  return;
}
try{

const application = {
  jobId: job.id,
  company: job.company,
  role:job.role,
  recruiterId: job.recruiterId,

  applicantId: profile.id,
  applicantName: profile.name,
  email: profile.email,
  mobile: profile.mobile,

  location: profile.profile?.location,
  dob: profile.profile?.dob,
  gender: profile.profile?.gender,
  currentLocation: profile.profile?.currentLocation,
  experience: profile.profile?.experience,
  skills: profile.profile?.skills,
  bio: profile.profile?.bio,
  languages: profile.profile?.languages,
  linkedinProfile: profile.profile?.linkedinProfile,
  githubProfile: profile.profile?.githubProfile,
  educations: profile.profile?.educations,
  projects: profile.profile?.projects,

  status: "Applied",
   createdAt: new Date().toISOString(),                 // ⭐ BEST
  appliedDate: new Date().toISOString().split("T")[0] 
};


await axios.post(
"http://localhost:5000/applications",
application
);
setAppliedJobs(prev => [
  ...prev,
  job.id
]);


toast.success("Application Submitted 🎉");


}

catch(error){
 console.log("Apply Error:", error);
  console.log("Response:", error.response);
toast.error("Failed to Apply");

}

};
useEffect(() => {
  const loadSavedJobs = async () => {
    const res = await axios.get(
      "http://localhost:5000/savedJobs"
    );

    setSavedJobs(
      res.data.map(item => item.originalJobId)
    );
  };

  loadSavedJobs();
}, []);
  return (
    <div className={styles.browsePage}>
      <div className={styles.browseHeader}>
        <h2>Browse Jobs 🚀</h2>

       <div className={styles.searchBox}>
  <input
    type="text"
    placeholder="🔍 Search jobs..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
</div>
      </div>

      <div className={styles.jobsSidebar}>
        {filteredJobs.map((job) => (
          <div
            className={`${styles.jobItem} ${
              selectedJob?.id === job.id ? styles.activeJob : ""
            }`}
            key={job.id}
          >
           <img
  src={
    job.logo ||
    "https://via.placeholder.com/80"
  }
  alt={job.company}
  className={styles.companyLogo}
/>

            <h3>{job.role}</h3>
            <p>{job.company}</p>

            <span>📍 {job.location}</span>

            <div className={styles.salary}>
              💰 {job.salary}
            </div>

            <div className={styles.jobActions}>
  
<button
  className={styles.applyBtn}
  onClick={() => applyJob(job)}
  disabled={appliedJobs.includes(job.id)}
>
  {appliedJobs.includes(job.id)
    ? "Applied ✓"
    : "Apply Now"}
</button>
<button
  className={styles.saveBtn}
  onClick={() => saveJob(job)}
>
  {savedJobs.includes(job.id)
    ? "Unsave"
    : "Save"}
</button>
  <button
    className={styles.viewBtn}
    onClick={() => setSelectedJob(job)}
  >
    View Details
  </button>
</div>
          </div>
        ))}
      </div>

      {selectedJob && (
        <div className={styles.modalOverlay}>
          <div className={styles.jobModal}>
            <button
              className={styles.closeBtn}
              onClick={() => setSelectedJob(null)}
            >
              ✕
            </button>

            <div className={styles.modalHeader}>
              <h2>{selectedJob.role}</h2>
              <h3>{selectedJob.company}</h3>
            </div>

            <div className={styles.jobMeta}>
              <span>📍 {selectedJob.location}</span>
              <span>💼 {selectedJob.jobType}</span>
              <span>🏠 {selectedJob.workMode}</span>
            </div>

            <div className={styles.jobMeta}>
              <span>💰 {selectedJob.salary}</span>
              <span>⭐ {selectedJob.experience}</span>
              <span>⏱ {selectedJob.postedDate}</span>
            </div>

            <h4>Skills Required</h4>

            <div className={styles.skills}>
              {selectedJob.skills?.map((skill, i) => (
                <span key={i}>{skill}</span>
              ))}
            </div>

            <h4>Job Description</h4>
            <p className={styles.description}>
              {selectedJob.description}
            </p>
            <h4>Recruiter Details</h4>

<div className={styles.recruiterInfo}>
  <p>👤 {selectedJob.recruiterName}</p>
  <p>📧 {selectedJob.recruiterEmail}</p>
  <p>📱 {selectedJob.recruiterMobile}</p>
</div>
            <h4>Requirements</h4>

            <ul className={styles.requirements}>
              {selectedJob.requirements?.map((req, i) => (
                <li key={i}>{req}</li>
              ))}
            </ul>

            <div className={styles.modalActions}>
         <button
  className={styles.applyBtn}
  onClick={() => applyJob(selectedJob)}
  disabled={appliedJobs.includes(selectedJob.id)}
>
  {appliedJobs.includes(selectedJob.id)
    ? "Applied ✓"
    : "Apply Now"}
</button>
<button
  className={`${styles.saveBtn} ${
    savedJobs.includes(selectedJob.id)
      ? styles.unsaveBtn
      : ""
  }`}
  onClick={() => saveJob(selectedJob)}
>
  {savedJobs.includes(selectedJob.id)
    ? "Unsave"
    : "Save"}
</button>
       
              
              <button
              className={styles.cancelBtn}
              onClick={() => setSelectedJob(null)}
            >
              Cancel
            </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrowseJobs;