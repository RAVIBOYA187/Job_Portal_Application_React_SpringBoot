import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Dashboard.module.css";
import { useNavigate, useOutletContext } from "react-router-dom";

const Dashboard = () => {
  const { user } = useOutletContext();
  const [jobs, setJobs] = useState([]);
const navigate = useNavigate();
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/jobs");
      setJobs(res.data);
    } catch (err) {
      console.log(err);
    }
  };
 const goToBrowse = () => navigate("/app/browse-jobs");

const goToSaved = () => navigate("/app/saved-jobs");

const goToApply = () => navigate("/app/browse-jobs");

const goToProfile = () => navigate(`/app/profile/${user?.id}`);
  const normalize = (status) => status?.toLowerCase().trim();

  const getCount = (type) =>
    jobs.filter((job) => normalize(job.status) === type).length;

  const total = jobs.length;
  const applied = getCount("applied");
  const interview = getCount("interview");
  const offer = getCount("offer");

  return (
    <div className={styles.container}>

      {/* HEADER */}
     
<div className={styles.hero}>
  <div>
    <h2>
      Welcome Back, <span>{user?.name || "User"}</span> 👋
    </h2>
    <p>Track your applications and achieve your dream job.</p>
  </div>
</div>
      {/* KPI CARDS */}
      <div className={styles.grid}>
       <div className={`${styles.card} ${styles.total}`}>
          <h3>{total}</h3>
          <p>Total Jobs</p>
        </div>

        <div className={`${styles.card} ${styles.applied}`}>
          <h3>{applied}</h3>
          <p>Applied</p>
        </div>

      <div className={`${styles.card} ${styles.interview}`}>
          <h3>{interview}</h3>
          <p>Interview</p>
        </div>

        <div className={`${styles.card} ${styles.offer}`}>
          <h3>{offer}</h3>
          <p>Offers</p>
        </div>
      </div>

      {/* QUICK ACTIONS */}
     <div className={styles.quickActions}>

  <div className={styles.quickHeader}>
    <h3>Quick Actions ⚡</h3>
    <p>Do common tasks faster</p>
  </div>

  <div className={styles.actionGrid}>

    <div className={styles.actionCard} onClick={goToBrowse}>
      <span className={styles.icon}>🔎</span>
      <h4>Browse Jobs</h4>
      <p>Find new opportunities</p>
    </div>

    <div className={styles.actionCard} onClick={goToSaved}>
      <span className={styles.icon}>⭐</span>
      <h4>Saved Jobs</h4>
      <p>View your shortlist</p>
    </div>

    <div className={styles.actionCard} onClick={goToApply}>
      <span className={styles.icon}>➕</span>
      <h4>Apply Job</h4>
      <p>Start application</p>
    </div>

    <div className={styles.actionCard} onClick={goToProfile}>
      <span className={styles.icon}>👤</span>
      <h4>Update Profile</h4>
      <p>Improve visibility</p>
    </div>

  </div>
</div>
<div className={styles.recentJobs}>
  <h3>Recent Applications</h3>

  {jobs.slice(0,3).map(job=>(
    <div key={job.id} className={styles.jobRow}>
      <span>{job.company}</span>
      <span>{job.status}</span>
    </div>
  ))}
</div>
    </div>
  );
};

export default Dashboard;