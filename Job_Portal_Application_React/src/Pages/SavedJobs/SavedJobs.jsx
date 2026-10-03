import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./SavedJobs.module.css";
import { toast } from "react-toastify";

const SavedJobs = ({ user }) => {
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [profile, setProfile] = useState(user);
  const [selectedJob, setSelectedJob] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchSavedJobs();
  }, []);

  useEffect(() => {
    axios.get("http://localhost:5000/users")
      .then((res) => {
        const loggedUser = res.data.find(
          (u) => u.role === "user"
        );

        setProfile(loggedUser);
      });
  }, []);

  useEffect(() => {
    if (!profile?.id) return;

    const loadAppliedJobs = async () => {
      const res = await axios.get(
        `http://localhost:5000/applications?applicantId=${profile.id}`
      );

      setAppliedJobs(
        res.data.map((app) => app.jobId)
      );
    };

    loadAppliedJobs();
  }, [profile]);

  const fetchSavedJobs = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/savedJobs"
      );

      setJobs(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const applyJob = async (job) => {
  const jobId = job.originalJobId || job.id;

  if (appliedJobs.includes(jobId)) {
    toast.info("Already Applied");
    return;
  }

  try {
    const application = {
      jobId: jobId,
      company: job.company,
      role: job.role,
      recruiterId: job.recruiterId,

      applicantId: profile.id,
      applicantName: profile.name,
      email: profile.email,
      mobile: profile.mobile,

      location: profile.profile?.location,
      currentLocation: profile.profile?.currentLocation,
      experience: profile.profile?.experience,
      skills: profile.profile?.skills,

      status: "Applied",
      createdAt: new Date().toISOString(),
      appliedDate: new Date().toISOString().split("T")[0]
    };

    await axios.post(
      "http://localhost:5000/applications",
      application
    );

    setAppliedJobs((prev) => [
      ...prev,
      jobId
    ]);
setSelectedJob(null);
    toast.success("Application Submitted 🎉");

  } catch (error) {
    toast.error("Failed to Apply");
  }
};
const filteredJobs = jobs.filter((job) => {
  const company = job.company?.toLowerCase() || "";
  const role = job.role?.toLowerCase() || "";

  return (
    company.includes(search.toLowerCase()) ||
    role.includes(search.toLowerCase())
  );
});
  const removeSavedJob = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/savedJobs/${id}`
      );

      setJobs((prev) =>
        prev.filter((job) => job.id !== id)
      );

      toast.success("Removed Successfully");
    } catch (err) {
      toast.error("Failed to Remove");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.saveHeader}>
      <h2 className={styles.heading}>
        Saved Jobs ❤️
      </h2>
        <input
          type="text"
          placeholder="Search jobs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {jobs.length === 0 ? (
        <div className={styles.empty}>
          No Saved Jobs Yet 🚀
        </div>
      ) : (
        <div className={styles.jobsGrid}>
         {filteredJobs.map((job) => (
            <div
              key={job.id}
              className={styles.card}
            >
               <img
                src={
                  job.logo ||
                  "https://via.placeholder.com/80"
                }
                alt={job.company}
                className={styles.companyLogo}
              />
              <h3 className={styles.role}>
                {job.role}
              </h3>

              <p className={styles.company}>
                🏢 {job.company}
              </p>

              <p className={styles.info}>
                📍 {job.location}
              </p>

              <p className={styles.salary}>
                💰 {job.salary}
              </p>

              <div className={styles.actions}>
     <button
  className={styles.applyBtn}
  onClick={() => applyJob(job)}
  disabled={
    appliedJobs.includes(
      job.originalJobId || job.id
    )
  }
>
   {
    appliedJobs.includes(
      job.originalJobId || job.id
    )
      ? "Applied ✓"
      : "Apply Now"
  }
</button>
 <button
                  className={styles.removeBtn}
                  onClick={() =>
                    removeSavedJob(job.id)
                  }
                >
                  Unsaved
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
      )}
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
  disabled={
    appliedJobs.includes(
      selectedJob.originalJobId || selectedJob.id
    )
  }
>
  {
    appliedJobs.includes(
      selectedJob.originalJobId || selectedJob.id
    )
      ? "Applied ✓"
      : "Apply Now"
  }
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

export default SavedJobs;
