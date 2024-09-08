// src/pages/UserPortal.js
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './UserPortal.css';

const UserPortal = () => {
  const [jobId, setJobId] = useState('');
  const [dob, setDob] = useState('');
  const [certificate, setCertificate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log({ jobId, dob, certificate });
  };

  return (
    <div className="user-portal">
      <Navbar />
      <main className="user-portal-content">
        <h1>Apply for a Job</h1>
        <form onSubmit={handleSubmit} className="application-form">
          <div className="form-group">
            <label htmlFor="jobId">Job ID:</label>
            <input
              type="text"
              id="jobId"
              value={jobId}
              onChange={(e) => setJobId(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="dob">Date of Birth:</label>
            <input
              type="date"
              id="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="certificate">Certificate Name:</label>
            <input
              type="text"
              id="certificate"
              value={certificate}
              onChange={(e) => setCertificate(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-button">Submit</button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default UserPortal;
