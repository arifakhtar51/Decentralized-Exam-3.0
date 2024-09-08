import React from "react";

const PaperDetails = ({ contract, papers, setPapers, paperId, setPaperId }) => {
  const getPaperDetails = async () => {
    try {
      const paper = await contract.getPaperDetails(paperId);
      const formattedPaper = {
        name: paper[0],
        description: paper[1],
        vacancy: paper[2].toString(),
        eligibility: paper[3],
        registrationDeadline: new Date(paper[4].toNumber() * 1000).toLocaleString(),
        totalMarks: paper[5].toString(),
        examDuration: paper[6].toString(),
        examDate: paper[7] ? new Date(paper[7].toNumber() * 1000).toLocaleString() : "Invalid Date",
        // examDate: new Date(paper[7].toNumber() * 1000).toLocaleString(),
        salary: paper[8].toString(),
        createdBy: paper[9]
      };
      setPapers([formattedPaper]);
    } catch (error) {
      console.error('Error retrieving paper details:', error);
    }
  };

  return (
    <div>
      <h2>Get Exam Paper Details</h2>
      <input type="number" placeholder="Enter Paper ID" value={paperId} onChange={(e) => setPaperId(e.target.value)} />
      <button onClick={getPaperDetails}>Get Paper Details</button>

      {papers.length > 0 && papers.map((paper, index) => (
        <div key={index}>
          <h3>Paper ID: {paperId}</h3>
          <p>Name: {paper.name}</p>
          <p>Description: {paper.description}</p>
          <p>Vacancy: {paper.vacancy}</p>
          <p>Eligibility: {paper.eligibility}</p>
          <p>Registration Deadline: {paper.registrationDeadline}</p>
          <p>Total Marks: {paper.totalMarks}</p>
          <p>Exam Duration: {paper.examDuration} minutes</p>
          <p>Exam Date: {paper.examDate}</p>
          <p>Salary: {paper.salary}</p>
          <p>Created By: {paper.createdBy}</p>
        </div>
      ))}
    </div>
  );
};

export default PaperDetails;
