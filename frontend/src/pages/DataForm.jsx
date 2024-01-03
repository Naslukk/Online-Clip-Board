import React, { useState, useEffect } from "react";
import axios from "axios";
import QRCode from "../components/QRCode";
import { useParams } from "react-router-dom";

const DataForm = () => {
  const [userData, setUserData] = useState("");
  const [numericCode, setNumericCode] = useState("");
  const [timer, setTimer] = useState(600); // Initial timer value in seconds
  const [resData, setResData] = useState("");
  const [numericCodeIn, setNumericCodeIn] = useState("");
  const [qrCodeValue, setQrCodeValue] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const { id } = useParams();

  const handleSubmission = async () => {
    try {
      const response = await axios.post("http://localhost:5000/submit", {
        userData,
      });
      setNumericCode(response.data.numericCode);
      startTimer(response.data.numericCode);
      setQrCodeValue(`http://localhost:5173/${response.data.numericCode}`);
    } catch (error) {
      console.error("Error submitting data:", error);
      setErrorMsg("Data cannot be submitted");
    }
  };

  const startTimer = (code) => {
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    // Clear interval when timer reaches 0
    setTimeout(async () => {
      clearInterval(intervalId);
      setNumericCode(""); // Reset numericCode when the timer reaches 0

      try {
        // Delete the data in the backend after the timer expires
        await axios.delete(`http://localhost:5000/delete/${code}`);
      } catch (error) {
        console.error("Error deleting data:", error);
      }
    }, timer * 1000);
  };

  const handleRetrieval = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/retrieve/${numericCodeIn}`
      );
      setResData(response.data.userData);
    } catch (error) {
      console.error("Error retrieving data:", error);
      setErrorMsg("Data is not available");
    }
  };
  useEffect(() => {
    
    if (id) {
      setNumericCodeIn(id);
    }
  }, []);

  useEffect(() => {
    // Reset the timer when numericCode changes
    setTimer(600);
  }, [numericCode]);

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-300 rounded-md shadow-md min-h-screen flex flex-col">
      <h2 className="text-2xl font-semibold mb-4 mt-0">Online Clipboard</h2>

      <div className="flex flex-col items-center justify-center h-[500px]">
        <div className="mb-4 max-w-md w-full">
          <label className="block mb-2">
            Enter Data:
            <input
              type="text"
              value={userData}
              onChange={(e) => {setUserData(e.target.value)
                if(errorMsg || numericCodeIn || resData){
                  setErrorMsg("");
                  setNumericCodeIn("");
                  setResData("")
                }
              }}
              className="block w-full border-gray-300 rounded-md p-2"
            />
          </label>
          <button
            onClick={handleSubmission}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Submit
          </button>
        </div>

        {numericCode && (
          <div className="mb-4 flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-2">
              Timer for {numericCode}: {timer} seconds
            </h2>
            {qrCodeValue && <QRCode value={qrCodeValue} />}
          </div>
        )}

        <div className="mb-4 max-w-md w-full">
          <h2 className="text-2xl font-semibold mb-2">Receive Data</h2>
          <label className="block mb-2">
            Enter Numeric Code:
            <input
              type="text"
              value={numericCodeIn}
              onChange={(e) => {
                setNumericCodeIn(e.target.value);
                if(errorMsg){
                  setErrorMsg("");
                }
              }}
              className="block w-full border-gray-300 rounded-md p-2"
            />
          </label>
          <button
            onClick={handleRetrieval}
            className="w-full bg-green-500 text-white px-4 py-2 rounded-md"
          >
            Receive
          </button>
        </div>
        {errorMsg && (
          <div className="w-fit shadow-md bg-white p-4 bor  rounded-md">
            <p className="text-red-600">{errorMsg}</p>
          </div>
        )}

        {resData && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Received data :</h2>
            <p className="text-gray-700">{resData}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataForm;
