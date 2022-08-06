import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import { Routes } from "../../App";
import "./Header.css";

const Header = ({ unstakeMany, unstakeArr, approveAll }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentRouteName = location.pathname.slice(1); // stake / unstake

  const onClickStakeButton = () => {
    // console.log("Stake button clicked!");
    navigate("/stake");
  };

  const onClickUnStakeButton = () => {
    navigate("/unstake");
  };

  const onClcikClaimButton = () => {
    navigate("/claim");
  };

  const onclickUnstakeMany = () => {
    console.log("unstakeArr\n", unstakeArr);
    if (unstakeArr.length > 0) {
      unstakeMany(unstakeArr);
    }
  };

  return (
    <div className="header-wrapper">
      <div className="btn-wrapper">
        {approveAll && (
          <div className="stacke-btn-wrapper">
            <button className="stacke-btn btn" onClick={approveAll}>Approve All</button>
          </div>
        )}
        <div className="stacke-btn-wrapper">
          <button className="stacke-btn btn" onClick={onClickStakeButton}>
            STAKE
          </button>
        </div>
        <div className="unstacke-btn-wrapper">
          <button className="unstacke-btn btn" onClick={onClickUnStakeButton}>
            UNSTAKE
          </button>
        </div>
      </div>
      <div className="claim-btn-wrapper">
        {currentRouteName === "unstake" && (
          <button className="claim-btn btn" onClick={onclickUnstakeMany}>
            {`UNSTAKE SELECTED (${unstakeArr.length})`}
          </button>
        )}
        <button className="claim-btn btn" onClick={onClcikClaimButton}>
          CLAIM
        </button>
      </div>
    </div>
  );
};

export default Header;
