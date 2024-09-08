import React from "react";

const PaperCreation = ({ contract, paperDetails, setPaperDetails }) => {
  const handleChange = (e) => {
    setPaperDetails({ ...paperDetails, [e.target.name]: e.target.value });
  };

  const createPaper = async (e) => {
    e.preventDefault();
    const { name, description, vacancy, eligibility, registrationDeadline, totalMarks, examDuration, examDate, salary } = paperDetails;
    const regDeadlineTimestamp = Math.floor(new Date(registrationDeadline).getTime() / 1000);
    const examDateTimestamp = Math.floor(new Date(examDate).getTime() / 1000);

    try {
      const tx = await contract.createPaper(
        name, description, vacancy, eligibility,
        regDeadlineTimestamp, totalMarks, examDuration,
        examDateTimestamp, salary
      );
      await tx.wait();
      alert('Exam Paper Created Successfully!');
    } catch (error) {
      console.error('Error creating paper:', error);
      alert('Transaction failed!');
    }
  };

  return (
    <div>
      <h2>Create Exam Paper</h2>
      <form onSubmit={createPaper}>
        <input type="text" name="name" placeholder="Name" value={paperDetails.name} onChange={handleChange} />
        <input type="text" name="description" placeholder="Description" value={paperDetails.description} onChange={handleChange} />
        <input type="number" name="vacancy" placeholder="Vacancy" value={paperDetails.vacancy} onChange={handleChange} />
        <input type="text" name="eligibility" placeholder="Eligibility" value={paperDetails.eligibility} onChange={handleChange} />
        <input type="date" name="registrationDeadline" placeholder="Registration Deadline" value={paperDetails.registrationDeadline} onChange={handleChange} />
        <input type="number" name="totalMarks" placeholder="Total Marks" value={paperDetails.totalMarks} onChange={handleChange} />
        <input type="number" name="examDuration" placeholder="Exam Duration (minutes)" value={paperDetails.examDuration} onChange={handleChange} />
        <input type="date" name="examDate" placeholder="Exam Date" value={paperDetails.examDate} onChange={handleChange} />
        <input type="text" name="salary" placeholder="Salary" value={paperDetails.salary} onChange={handleChange} />
        <button type="submit">Create Paper</button>
      </form>
    </div>
  );
};



export default PaperCreation;

