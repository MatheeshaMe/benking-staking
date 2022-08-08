import React from "react";
import Web3 from "web3";
import Header from "../../components/Header/Header";
import "./Claim.css";

const Claim = ({
  setRoute,
  route,
  claimValue,
  onClcikClaim,
  earningInfo,
  earnings,
  claim,
}) => {
  //   export const getEllipsisTxt = (str, n = 4) => {
  //     if (str) {
  //         return `${str.slice(0, n)}...${str.slice(str.length - n)}`;
  //     }
  //     return '';
  // };
  const v = Web3.utils.fromWei(earnings.toString(), "ether");
  console.log(`v:-${earnings}`);

  return (
    <div className="claim-container">
      <div className="header--wrap">
        <Header setRoute={setRoute} route={route} />
      </div>
      <div className="body-container">
        <div className="body-wrapper">
          <div className="value-container">
            {/* <div className="number-wrapper">{earnings.toString() / 10 ** 18}</div> */}
            <div className="number-wrapper">{`${v.slice(0, 4)}${v.slice(
              v.length - 4
            )}`}</div>
            <div className="HAY-wrapper">HAY</div>
          </div>
          <div className="btn-wrapper">
            <button className="claim--btn" onClick={earningInfo}>
              Check Earnings
            </button>
          </div>
          {/* <div className="btn-wrapper"> */}
          <button
            className="claim--btn"
            style={{ marginTop: "30px" }}
            onClick={claim}
          >
            claim
          </button>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default Claim;
