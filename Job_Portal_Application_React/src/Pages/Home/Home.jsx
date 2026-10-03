import React  from "react";
import { useNavigate } from "react-router-dom";
import das from "../../../public/images/das.jpg"
import star from "../../../public/images/star.png"
import styles from "./Home.module.css";


const Home = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.home}>

      {/* HERO SECTION */}
        <div className={styles.main}>
         <div className={styles.leftSection}>
        <h1>
          Track Your Career Journey 🚀
        </h1>
        
        <p>
          A powerful Job Application Tracker that helps you manage,
          monitor, and improve your job search like a pro.
        </p>
         <div className={styles.cta}>
          {/* <button onClick={() => navigate("/select-role")}>
            Get Started
          </button> */}
        <button onClick={() => navigate("/select-role")}>
  Get Started
</button>
          <button className={styles.secondary} onClick={() => navigate("/login")}>
            Login
          </button>
        </div>

        </div>
       <div className={styles.rightSection}>
        {/* <span className="preview">
Live Dashboard Preview
</span> */}
  <div className={styles.dashboardCard}>
    <img src={das} />
  </div>
</div>
       </div>

      {/* STATS */}
      <section className={styles.stats}>

        <div className={styles.statCard}>
          <h2>10K+</h2>
          <p>Applications Tracked</p>
        </div>

        <div className={styles.statCard}>
          <h2>5K+</h2>
          <p>Users Helping Career Growth</p>
        </div>

        <div className={styles.statCard}>
          <h2>90%</h2>
          <p>Success Tracking Accuracy</p>
        </div>

      </section>

      {/* FEATURES */}
      
<div className={styles.features}>

  <div className={styles.card}>
    <img src={star} alt="dashboard" />
    <h3>Smart Dashboard</h3>
    <p>
      Track total applications, interviews, offers, and rejection stats in one place with real-time insights.
    </p>
  </div>

  <div className={styles.card}>
    <img src="https://cdn-icons-png.flaticon.com/512/3135/3135706.png" alt="job tracking" />
    <h3>Job Tracking System</h3>
    <p>
      Manage all your job applications with status flow: Applied → Interview → Offer → Rejected.
    </p>
  </div>

  <div className={styles.card}>
    <img src="https://cdn-icons-png.flaticon.com/512/942/942748.png" alt="analytics" />
    <h3>Analytics Insights</h3>
    <p>
      Visual charts help you understand your success rate and improve your job search strategy.
    </p>
  </div>

  <div className={styles.card}>
    <img src="https://cdn-icons-png.flaticon.com/512/1250/1250615.png" alt="fast" />
    <h3>Fast & Easy Management</h3>
    <p>
      Add, edit, delete job applications instantly with smooth and simple UI experience.
    </p>
  </div>

</div>
<div className={styles.section1}>
        <h2>Why Students & Developers Use It</h2>
        <ul>
          <li>✔ Avoid forgetting job applications</li>
          <li>✔ Track interview progress easily</li>
          <li>✔ Understand hiring performance</li>
          <li>✔ Improve career planning</li>
        </ul>
      </div>
       <div className={styles.section}>
        <h2>How It Works</h2>
        <p>
          1. Register → 2. Login → 3. Add Jobs → 4. Track Status → 5. View Analytics 📊
        </p>
      </div>
       {/* CTA */}
      <div className={styles.heroCta}>
        <h2>Start building your career dashboard today</h2>
        <p>No complexity. Just smart job tracking.</p>

        {/* <button onClick={() => navigate("/select-role")}>
          Get Started Free
        </button> */}

        <button onClick={() => navigate("/select-role")}>
  Get Started
</button>
      </div>
      {/* FOOTER */}
      <footer className={styles.footer}>
        Built with React ⚡ JSON Server | Job Tracker Pro
      </footer>

    </div>
  );
};

export default Home;