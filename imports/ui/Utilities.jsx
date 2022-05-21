import React, { useState } from "react";
import { Session } from "meteor/session";
import { Square } from "./Square";

export const setHighestValue = (score) => {
  let highestValue = Session.get("highestValue")
    ? Session.get("highestValue")
    : 0;
  return score > highestValue
    ? Session.setPersistent("highestValue", score)
    : Session.setPersistent("highestValue", highestValue);
};
export const setLastValue = (score) => {
  return Session.setPersistent("lastValue", score);
};
export const resetPlayerInfo = () => {
  return (
    Session.get("FirstPlayer") == undefined
      ? null
      : Session.setPersistent("FirstPlayer", null),
    window.location.reload(false)
  );
};

export const getValue = () => {
  return (
    <div className="containerDiv">
      <Square
        PlayerInfo={getPlayerInfo()}
        highestValue={Session.get("highestValue")}
        value={Session.get("lastValue")}
        onClick={() => {
          resetPlayerInfo();
        }}
      />
    </div>
  );
};

export const getPlayerInfo = () => {
  return Session.get("FirstPlayer");
};

export const forms = () => {
  const [inputs, setInputs] = useState({});
  const [check, setCheck] = useState(false);

  function refresh() {
    window.location.reload(false);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("inp", inputs);
    Session.setPersistent("FirstPlayer", inputs);
    refresh();
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
    console.warn(inputs);
  };
  return (
    <form
      onSubmit={
        inputs.FirstName != null
          ? handleSubmit
          : window.alert("Please enter players name")
      }
    >
      <label>
        First Player Name:
        <input type="text" name="FirstName" onChange={handleChange} />
      </label>
      <label>
        Second Player Name:
        <input type="text" name="SecondName" onChange={handleChange} />
      </label>
      <input className="baslatButton" type="submit" value="Let's Game" />
    </form>
  );
};
