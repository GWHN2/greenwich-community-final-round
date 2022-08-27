import React from "react";

const Stake = () => {
  const handleStake = async () => {
    try {
    } catch (error) {
      console.log("Stake: ", error);
    }
  };

  return (
    <div
      className="px-4 py-2 rounded-lg shadow-lg cursor-pointer plug-gradient"
      onClick={handleStake}
    >
      <h2 className="text-xl font-bold text-white">Become a Stakeholder</h2>
    </div>
  );
};

export default Stake;
