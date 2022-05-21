import React from "react";

export const Square = (props) => {
  let value = props.value;
  let highestValue = props.highestValue;
  let onClick = props.onClick;
  return (
    <div>
      <button
        className="square"
        onClick={() => {
          onClick();
        }}
      >
        <p className="changeplayers">Change Players</p>
      </button>
      <p className="button"> Last Score: {value}</p>
      <p className="button"> Highest Score: {highestValue}</p>
    </div>
  );
};
