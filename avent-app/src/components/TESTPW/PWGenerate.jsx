import React, { useState } from "react";
import styled from "@emotion/styled";

const PWGenerate = () => {
  const [state, setState] = useState({
    password: "",
    passwordLength: false,
    containsNumbers: false,
    isUpperCase: false,
    containsSymbols: false,
  });

  // handle password
  const handleChange = (input) => (e) => {
    let targetValue = e.target.value.replace(/\s/g, "");
    setState({
      [input]: targetValue,
      //check for chars numbers > 7
      passwordLength: targetValue.length > 7 ? true : false,
      //check for numbers
      containsNumbers: targetValue.match(/\d+/g) ? true : false,
      // check for upper case
      isUpperCase: targetValue.match(/[A-Z]/) ? true : false,
      // check for symbols
      containsSymbols: targetValue.match(/[^A-Z a-z0-9]/) ? true : false,
    });
  };

  let { password, passwordLength, containsNumbers, isUpperCase, containsSymbols } = state;

  return (
    <>
      <div className="content">
        <form>
          {/* <input type="text" onChange={handleChange("password")} value={password} placeholder="Enter Password" /> */}
          <div>
            <div>{passwordLength ? <GreenDiv>Contains 8 characters</GreenDiv> : <RedDiv>Contains 8 characters</RedDiv>}</div>

            <div>{containsNumbers ? <GreenDiv>Contains numbers</GreenDiv> : <RedDiv>Contains numbers</RedDiv>}</div>

            <div>{isUpperCase ? <GreenDiv>Contains UpperCase</GreenDiv> : <RedDiv>Contains UpperCase</RedDiv>}</div>

            <div>{containsSymbols ? <GreenDiv>Contains Symbols</GreenDiv> : <RedDiv>Contains Symbols</RedDiv>}</div>
          </div>
        </form>
      </div>
    </>
  );
};

//emotions styled components for settings errors on password criteria
const GreenDiv = styled.div`
  color: green;
`;

const RedDiv = styled.div`
  color: red;
`;

export default PWGenerate;
