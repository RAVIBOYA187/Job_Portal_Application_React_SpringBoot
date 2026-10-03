import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import styles from "./MyApplications.module.css";

const MyApplications = ({ user }) => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [view, setView] = useState("cards");
  const [loading, setLoading] = useState(true);

  const loadApplications = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `http://localhost:5000/applications?applicantId=${user?.id}`
      );

      setJobs(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      loadApplications();
    }
  }, [user]);

  const filteredJobs = useMemo(() => {
    return jobs
      .filter(
        (job) =>
          statusFilter === "All" ||
          job.status === statusFilter
      )
      .filter(
        (job) =>
          job.company
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          job.role
            .toLowerCase()
            .includes(search.toLowerCase())
      );
  }, [jobs, search, statusFilter]);

  return (
    <div className={styles.jobsContainer}>
      <h2 className={styles.pageTitle}>
        My Applications
      </h2>

      <div className={styles.dashboardLayout}>
        <div className={styles.leftSection}>
          <input
            type="text"
            placeholder="Search company or role..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className={styles.searchBox}
          />

          <div className={styles.viewToggle}>
            <button
              onClick={() => setView("cards")}
            >
              Cards
            </button>

            <button
              onClick={() => setView("table")}
            >
              Table
            </button>
          </div>

          <div className={styles.filterBox}>
            <button
              onClick={() =>
                setStatusFilter("All")
              }
            >
              All
            </button>

            <button
              onClick={() =>
                setStatusFilter("Applied")
              }
            >
              Applied
            </button>

            <button
              onClick={() =>
                setStatusFilter("Accepted")
              }
            >
              Accepted
            </button>

            <button
              onClick={() =>
                setStatusFilter("Rejected")
              }
            >
              Rejected
            </button>
          </div>
        </div>

        {view === "cards" ? (
          <div className={styles.jobsGrid}>
            {!loading &&
            filteredJobs.length === 0 ? (
              <div className={styles.emptyState}>
                <h3>No Applications Found</h3>
              </div>
            ) : (
              filteredJobs.map((job) => (
                <div
                  className={styles.jobCard}
                  key={job.id}
                >
                  <div
                    className={
                      styles.jobTimeline
                    }
                  >
                    Applied ➜ Review ➜ Offer
                  </div>

                  <div
                    className={
                      styles.companyHeader
                    }
                  >
                    <div
                      className={
                        styles.companyLogo
                      }
                    >
                      {job.company?.charAt(0)}
                    </div>

                    <div>
                      <h3>{job.company}</h3>
                      <p>{job.role}</p>
                    </div>
                  </div>

                  <p>
                    📅 Applied:
                    {job.appliedDate}
                  </p>

                  <p>
                    📧 {job.email}
                  </p>

                  <p>
                    👤{" "}
                    {job.applicantName}
                  </p>

                  <span
                    className={`${styles.status} ${
                      styles[
                        job.status?.replace(
                          /\s+/g,
                          ""
                        )
                      ]
                    }`}
                  >
                    {job.status}
                  </span>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className={styles.tableWrapper}>
            <table
              className={styles.jobsTable}
            >
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Role</th>
                  <th>Applied Date</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredJobs.map((job) => (
                  <tr key={job.id}>
                    <td>{job.company}</td>
                    <td>{job.role}</td>
                    <td>
                      {job.appliedDate}
                    </td>
                    <td>{job.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyApplications;