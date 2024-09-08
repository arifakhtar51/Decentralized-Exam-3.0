import { useState } from "react";
import "./Display.css";

const Display = ({ contract, account }) => {
  const [data, setData] = useState([]);
  
  const getData = async () => {
    let dataArray;
    const otherAddress = document.querySelector(".address").value;
    console.log(otherAddress," Ilove u");
    try {
      if (otherAddress) {
        dataArray = await contract.display(otherAddress);
        console.log("Yaha");
      } else {
        dataArray = await contract.display(account);
      }
    } catch (e) {
      console.error("Error fetching data:", e);
      alert("You don't have access or an error occurred");
      return;
    }

    // Check if dataArray is an array and not empty
    if (Array.isArray(dataArray) && dataArray.length > 0) {
      const images = dataArray.map((item, i) => {
        // Check if the item starts with "ipfs://"
        const ipfsHash = item.startsWith("ipfs://") ? item.substring(7) : item;
        // console.log(ipfsHash);

        return (
          <a href={ipfsHash} key={i} target="_blank" rel="noopener noreferrer">
            <img
              src="https://gateway.pinata.cloud/ipfs/QmaMs6gbq6eG94xQyZe24QumezWDEDdTDpsWLgR3iprMkj"
              alt="Image from IPFS"
              className="mage-list"
            />
          </a>
        );
      });
      setData(images);
    } else {
      alert("No images to display");
      setData([]);
    }
  };

  return (
    <>
      <div className="image-list">{data}</div>
      <input
        type="text"
        placeholder="Enter Address"
        className="address"
      />
      <button className="center button" onClick={getData}>
        Get Data
      </button>
    </>
  );
};

export default Display;



// import { useState } from "react";
// import "./Display.css";

// const Display = ({ contract, account }) => {
//   const [data, setData] = useState([]);
  
//   const getData = async () => {
//     let dataArray;
//     const otherAddress = document.querySelector(".address").value;
    
//     try {
//       if (otherAddress) {
//         dataArray = await contract.display(otherAddress);
//         console.log("Yaha");
//       } else {
//         dataArray =  contract.display(account);
//       }
//     } catch (e) {
//       console.error("Error fetching data:", e);
//       alert("You don't have access or an error occurred");
//       return;
//     }

//     // Check if dataArray is an array and not empty
//     if (Array.isArray(dataArray) && dataArray.length > 0) {
//       const images = dataArray.map((item, i) => {
//         // Check if the item starts with "ipfs://"
//         const ipfsHash = item.startsWith("ipfs://") ? item.substring(7) : item;

//         return (
//           <a href={`https://gateway.pinata.cloud/ipfs/${ipfsHash}`} key={i} target="_blank" rel="noopener noreferrer">
//             <img
//               src={`https://gateway.pinata.cloud/ipfs/${ipfsHash}`}
//               alt="Arif from IPFS"
//               className="image-list"
//             />
//           </a>
//         );
//       });
//       setData(images);
//     } else {
//       alert("No images to display");
//       setData([]);
//     }
//   };

//   return (
//     <>
//       <div className="image-list">{data}</div>
//       <input
//         type="text"
//         placeholder="Enter Address"
//         className="address"
//       />
//       <button className="center button" onClick={getData}>
//         Get Data
//       </button>
//     </>
//   );
// };

// export default Display;

