

import axios from "axios";
import React, { useState } from "react";
import "./AddJob.css";

const AddJob = () => {
  const [job, setJob] = useState({
    company: "",
    role: "",
    status: "Applied",
    applicationDate: "",
    interviewDate: "",
    interviewTime: "",
    interviewMode: "",
    recruiterName: "",
    recruiterEmail: "",
  });

  const handleChange = (e) => {
    setJob({
      ...job,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/jobs",
        job
      );

      alert("Job Added Successfully");
      setJob({
        company: "",
        role: "",
        status: "Applied",
        applicationDate: "",
        interviewDate: "",
        interviewTime: "",
        interviewMode: "",
        recruiterName: "",
        recruiterEmail: "",
      });
    } catch (error) {
      console.log(error);
      alert("Failed to add job");
    }
  };

  return (
    <div className="add-job-container">
      <div className="add-job-card">

        <h2>Add New Job</h2>

        <form onSubmit={handleSubmit}>

          {/* Job Information */}
          <div className="form-section">
            <h3>Job Information</h3>

            <input
              type="text"
              name="company"
              placeholder="Company Name"
              value={job.company}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="role"
              placeholder="Job Role"
              value={job.role}
              onChange={handleChange}
              required
            />

            <select
              name="status"
              value={job.status}
              onChange={handleChange}
            >
              <option>Applied</option>
              <option>Interview Scheduled</option>
              <option>Interview Completed</option>
              <option>Offer</option>
              <option>Rejected</option>
            </select>

            <input
              type="date"
              name="applicationDate"
              value={job.applicationDate}
              onChange={handleChange}
            />
          </div>

          {/* Interview Information */}
          <div className="form-section">
            <h3>Interview Information</h3>

            <input
              type="date"
              name="interviewDate"
              value={job.interviewDate}
              onChange={handleChange}
            />

            <input
              type="time"
              name="interviewTime"
              value={job.interviewTime}
              onChange={handleChange}
            />

            <select
              name="interviewMode"
              value={job.interviewMode}
              onChange={handleChange}
            >
              <option value="">Select Mode</option>
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
              <option value="Hybrid">Hybrid</option>
            </select>

            <input
              type="text"
              name="recruiterName"
              placeholder="Recruiter Name"
              value={job.recruiterName}
              onChange={handleChange}
            />

            <input
              type="email"
              name="recruiterEmail"
              placeholder="Recruiter Email"
              value={job.recruiterEmail}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="submit-btn">
            Add Job
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddJob;