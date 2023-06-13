import React, { useState } from "react";

const totalData = [
  {
    punchIn: "Tue Apr 11 2023 16:23:48 GMT+0530 (India Standard Time)",
    punchOut: "",
    punchOutReason: "started the shift first time",
  },
  {
    punchIn: "",
    punchOut: "Tue Apr 11 2023 17:56:58 GMT+0530 (India Standard Time)",
    punchOutReason: "",
  },
  {
    punchIn: "Tue Apr 11 2023 17:57:01 GMT+0530 (India Standard Time)",
    punchOut: "",
    punchOutReason: "",
  },
  {
    punchIn: "",
    punchOut: "Tue Apr 11 2023 17:57:32 GMT+0530 (India Standard Time)",
    punchOutReason: "",
  },
  {
    punchIn: "Tue Apr 11 2023 17:57:39 GMT+0530 (India Standard Time)",
    punchOut: "",
    punchOutReason: "",
  },
];
let empty = "";
const calculateTotalTime = (item) => {
  console.log("hello", item);
  let totalPunchIn = 0;
  let totalPunchOut = 0;

  item.map((data) => {
    if (data.punchIn !== empty) {
      totalPunchIn = totalPunchIn + new Date(data.punchIn).getTime();
    }

    if (data.punchOut !== empty) {
      totalPunchOut = totalPunchOut + new Date(data.punchOut).getTime();
    }
  });

  return {
    punchIn: totalPunchIn,
    punchOut: totalPunchOut,
  };
};

const Test = () => {
  const { punchIn, punchOut } = calculateTotalTime(totalData);
  const [out, setOut] = useState();
  const [totalIn, setTotalIn] = useState();
  const punchOutData = () => {
    setOut(new Date(punchOut).toTimeString());
  };

  const punchInData = () => {
    setTotalIn(new Date(punchIn).toTimeString());
  };
  return (
    <div>
      <h1>Total Sum of punch</h1>

      <p>Punch Out :{out}</p>

      <button onClick={punchOutData}>Punch Out</button>
      <p>Punch In:{totalIn}</p>

      <button onClick={punchInData}>Punch In</button>
    </div>
  );
};

export default Test;
