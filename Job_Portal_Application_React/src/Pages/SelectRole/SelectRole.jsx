import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SelectRole.module.css";

const SelectRole = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.card}>

        <h1>Select Your Role</h1>
        <p>Choose how you want to use NextHire</p>

        <div className={styles.roles}>

          <div
            className={styles.roleCard}
            onClick={() =>
              navigate("/register", {
                state: { role: "user" },
              })
            }
          >
            <span>👤</span>
            <h3>User</h3>
            <p>Apply and track jobs</p>
          </div>

          <div
            className={styles.roleCard}
            onClick={() =>
              navigate("/recruiter-register", {
                state: { role: "recruiter" },
              })
            }
          >
            <span>💼</span>
            <h3>Recruiter</h3>
            <p>Post jobs and hire candidates</p>
          </div>

          <div
            className={styles.roleCard}
            onClick={() =>
              navigate("/admin-register", {
                state: { role: "admin" },
              })
            }
          >
            <span>👑</span>
            <h3>Admin</h3>
            <p>Manage the platform</p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default SelectRole;