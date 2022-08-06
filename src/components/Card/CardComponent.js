import React, { useEffect, useState } from "react";
import "./Card.css";
import { IoCheckmarkCircle } from "react-icons/io5";
import { useLocation } from "react-router-dom";

const CardComponent = ({
  image,
  id,
  selectedId,
  setSelectedId,
  onClickCardBtn,
  setUnstakeArr,
  unstakeArr,
}) => {
  const location = useLocation();
  const currentRouteName = location.pathname.slice(1); // stake / unstake

  const [isInUnstakeArr, setisInUnstakeArr] = useState(false);

  useEffect(() => {
    setisInUnstakeArr(unstakeArr.includes(id));
  }, [unstakeArr, id]);

  const onClickCard = () => {
    setSelectedId(id);
    console.log("selected card id", id);
  };

  const onClickPlus = () => {
    console.log("before set", unstakeArr, selectedId);

    if (!isInUnstakeArr) {
      setUnstakeArr([...unstakeArr, selectedId]);
    } else {
      const newUnstakeArr = unstakeArr.filter((arrId) => arrId !== id);
      setUnstakeArr(newUnstakeArr);
    }
  };

  return (
    <>
      <div className="card-wrapper" onClick={onClickCard}>
        <div className="card-body">
          {/* <img src={image} alt="img" className="image" /> */}
          {/* <video autoPlay loop muted className="video"/> */}
          <video width="320" height="240" autoplay muted>
            <source src={image} type="video/mp4" />
          </video>
          <>
            {selectedId ? (
              selectedId === id || isInUnstakeArr ? (
                <div className="card-btn-wrapper">
                  <button onClick={onClickCardBtn} className="card-btn btn">
                    {currentRouteName}
                  </button>
                  {currentRouteName === "unstake" ? (
                    <button
                      onClick={onClickPlus}
                      className="plus-btn"
                      style={{
                        background: `${isInUnstakeArr ? "green" : "#8dcd49"}`,
                      }}
                    >
                      {isInUnstakeArr ? (
                        <div style={{ fontSize: "0.99em", fontWeight: "300" }}>
                          &#10003;
                        </div>
                      ) : (
                        <>{`+`}</>
                      )}
                    </button>
                  ) : (
                    <></>
                  )}
                </div>
              ) : (
                <></>
              )
            ) : (
              <></>
            )}
          </>
        </div>

        {selectedId ? (
          selectedId === id ? (
            <div className={"select-container"}>
              <span className="selected-icon-container">
                <IoCheckmarkCircle className="selected-icon" />
              </span>
              <span className="selected-hover">{`Selected: ${selectedId}`}</span>
            </div>
          ) : (
            <></>
          )
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default CardComponent;
