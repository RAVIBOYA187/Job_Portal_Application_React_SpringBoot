import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./RecruiterProfile.module.css";
import {
  FaEnvelope,
  FaPhone,
  FaBuilding,
  FaMapMarkerAlt,
  FaGlobe,
  FaEdit
} from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

const RecruiterProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [temp, setTemp] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:5000/recruiters/${id}`)
      .then(res => {
        setProfile(res.data);
        setTemp(res.data);
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    setTemp({ ...temp, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const res = await axios.patch(
        `http://localhost:5000/recruiters/${id}`,
        temp
      );

      setProfile(res.data);
      setEditMode(false);
    } catch (err) {
      console.log(err);
    }
  };

  if (!profile) return <h2 className={styles.loading}>Loading...</h2>;
const calculateCompletion = () => {
  if (!profile) return 0;

  let total = 5; // fields count
  let filled = 0;

  if (profile.recruiterName) filled++;
  if (profile.companyName) filled++;
  if (profile.email) filled++;
  if (profile.mobile) filled++;
  if (profile.location) filled++;

  return Math.round((filled / total) * 100);
};

const progress = calculateCompletion();
  return (
    <div className={styles.container}>

      <div className={styles.card}>

        {/* HEADER */}
        <div className={styles.header}>

          <div className={styles.avatar}>
            {profile.recruiterName?.charAt(0)}
          </div>

          <div className={styles.headerInfo}>
            <h2>{profile.recruiterName}</h2>
            <p>{profile.companyName}</p>
          </div>

          <button
            className={styles.editBtn}
            onClick={() => setEditMode(true)}
          >
            <FaEdit /> Edit
          </button>

        </div>
<div className={styles.progressSection}>
  <div className={styles.progressTop}>
    <span>Profile Completion</span>
    <span>{progress}%</span>
  </div>

  <div className={styles.progressBar}>
    <div
      className={styles.progressFill}
      style={{ width: `${progress}%` }}
    ></div>
  </div>
</div>
        {/* INFO */}
        <div className={styles.infoCard}>
          <p><FaEnvelope /> {profile.email}</p>
          <p><FaPhone /> {profile.mobile}</p>
          <p><FaBuilding /> {profile.companyName}</p>
          <p><FaMapMarkerAlt /> {profile.location}</p>

          {profile.website && (
            <p><FaGlobe /> {profile.website}</p>
          )}
        </div>

        {/* EDIT FORM */}
        {editMode && (
          <div className={styles.editBox}>

            <h3>Edit Profile</h3>

            <input
              name="recruiterName"
              value={temp.recruiterName || ""}
              onChange={handleChange}
              placeholder="Recruiter Name"
            />

            <input
              name="companyName"
              value={temp.companyName || ""}
              onChange={handleChange}
              placeholder="Company Name"
            />

            <input
              name="mobile"
              value={temp.mobile || ""}
              onChange={handleChange}
              placeholder="Mobile"
            />

            <input
              name="location"
              value={temp.location || ""}
              onChange={handleChange}
              placeholder="Location"
            />

            <input
              name="website"
              value={temp.website || ""}
              onChange={handleChange}
              placeholder="Website"
            />

            <div className={styles.btnRow}>
              <button className={styles.saveBtn} onClick={handleSave}>
                Save
              </button>

              <button
                className={styles.cancelBtn}
                onClick={() => setEditMode(false)}
              >
                Cancel
              </button>
            </div>

          </div>
        )}

      </div>
      {/* <div className={styles.actionButtons}>

<div className={styles.actionButtons}>

  <button
    className={styles.viewJobsBtn}
    onClick={() => navigate(`app/jobs`)}
  >
    View My Jobs
  </button>

  <button
    className={styles.createJobBtn}
    onClick={() => navigate(`app/postjob`)}
  >
    + Create Job
  </button>

</div>

</div> */}
    </div>
  );
};

export default RecruiterProfile;