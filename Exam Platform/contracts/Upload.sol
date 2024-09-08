// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Upload {
  
  struct Access{
     address user; 
     bool access; //true or false
  }
  mapping(address=>string[]) value;
  mapping(address=>mapping(address=>bool)) ownership;
  mapping(address=>Access[]) accessList;
  mapping(address=>mapping(address=>bool)) previousData;

  function add(address _user,string memory url) external {
      value[_user].push(url);
  }
  function allow(address user) external {//def
      ownership[msg.sender][user]=true; 
      if(previousData[msg.sender][user]){
         for(uint i=0;i<accessList[msg.sender].length;i++){
             if(accessList[msg.sender][i].user==user){
                  accessList[msg.sender][i].access=true; 
             }
         }
      }else{
          accessList[msg.sender].push(Access(user,true));  
          previousData[msg.sender][user]=true;  
      }
    
  }
  function disallow(address user) public{
      ownership[msg.sender][user]=false;
      for(uint i=0;i<accessList[msg.sender].length;i++){
          if(accessList[msg.sender][i].user==user){ 
              accessList[msg.sender][i].access=false;  
          }
      }
  }

  function display(address _user) external view returns(string[] memory){
      require(_user==msg.sender || ownership[_user][msg.sender],"You don't have access");
      return value[_user];
  }

  function shareAccess() public view returns(Access[] memory){
      return accessList[msg.sender];
  }

  struct PaperDetails {
        string name;              // Name of the exam
        string description;       // Description of the exam
        int vacancy;              // Number of available slots (Seat Availability)
        string eligibility;       // Eligibility Criteria
        uint256 registrationDeadline;  // Registration deadline as a timestamp
        uint256 totalMarks;       // Total marks for the exam
        uint256 examDuration;     // Exam duration in minutes
        string examDate;          // Date of the exam
        string salary;            // Salary or reward for the examiner
        address creator;          // Address of the exam creator (admin)
    }
    
    // Mapping to store each exam paper with a unique ID
    mapping(uint => PaperDetails) public papers;
    
    // Counter to keep track of exam IDs
    uint public paperCount = 0;

    // Function to create a new exam paper
    function createPaper(
        string memory _name, 
        string memory _description, 
        int _vacancy, 
        string memory _eligibility, 
        uint256 _registrationDeadline, 
        uint256 _totalMarks, 
        uint256 _examDuration, 
        string memory _examDate, 
        string memory _salary
    ) public {
        paperCount++; // Increment the paper ID counter
        papers[paperCount] = PaperDetails(
            _name, 
            _description, 
            _vacancy, 
            _eligibility, 
            _registrationDeadline, 
            _totalMarks, 
            _examDuration, 
            _examDate, 
            _salary, 
            msg.sender
        ); // Store the new paper details
    }

    // Function to retrieve the details of an exam paper by its ID
    function getPaperDetails(uint _paperId) public view returns (
        string memory, 
        string memory, 
        int, 
        string memory, 
        uint256, 
        uint256, 
        uint256, 
        string memory, 
        string memory, 
        address
    ) {
        PaperDetails memory paper = papers[_paperId];
        return (
            paper.name, 
            paper.description, 
            paper.vacancy, 
            paper.eligibility, 
            paper.registrationDeadline, 
            paper.totalMarks, 
            paper.examDuration, 
            paper.examDate, 
            paper.salary, 
            paper.creator
        );
    }
}