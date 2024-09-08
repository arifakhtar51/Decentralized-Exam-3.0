import './App.css';
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import FileUpload from "./components/FileUpload";
import Display from "./components/Display";
import Modal from "./components/Modal";
import Navbar from "./components/Navbar";
import PaperCreation from "./components/PaperCreation";
import PaperDetails from "./components/PaperDetails";
import Upload from "./artifacts/contracts/Upload.sol/Upload.json";

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [paperDetails, setPaperDetails] = useState({
    name: '',
    description: '',
    vacancy: 0,
    eligibility: '',
    registrationDeadline: '',
    totalMarks: 0,
    examDuration: 0,
    examDate: '',
    salary: ''
  });
  const [papers, setPapers] = useState([]);
  const [paperId, setPaperId] = useState('');

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const loadProvider = async () => {
      if (provider) {
        window.ethereum.on("chainChanged", () => window.location.reload());
        window.ethereum.on("accountsChanged", () => window.location.reload());

        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);

        const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
        const contract = new ethers.Contract(contractAddress, Upload.abi, signer);
        setContract(contract);
        setProvider(provider);
      } else {
        console.error("Metamask is not installed");
      }
    };
    provider && loadProvider();
  }, []);

  return (
    <>
      <Navbar account={account} />
      {!modalOpen && <button className="share" onClick={() => setModalOpen(true)}>Share</button>}
      {modalOpen && <Modal setModalOpen={setModalOpen} contract={contract} />}

      <div className="App">
        <FileUpload account={account} provider={provider} contract={contract} />
        <Display contract={contract} account={account} />
        <PaperCreation contract={contract} paperDetails={paperDetails} setPaperDetails={setPaperDetails} />
        <PaperDetails contract={contract} papers={papers} setPapers={setPapers} paperId={paperId} setPaperId={setPaperId} />
      </div>
    </>
  );
}

export default App;
