import React, { useState, useRef } from "react";
import "./App.css";

function App() {
  let totalNumberBtn = 0;
  let btnNumber;
  let btn = document.querySelector(".number");
  let btnValue;
  let result;
  let isMinusClicked = false;
  let isAddClicked = false;
  let numbers = [];
  let operators = [];
  let numbersWithSpaces = [];
  let negativeCount = 0;
  let[inputValue, setInputValue] = useState("");
  let[isExponentClicked, setIsExponentClicked]=useState(false);
const inputRef = useRef();

  let isEXPClicked = false;
  let EXPArr = [];
  let EXPResult = 0;
  let exponentArr = [];
  let exponentResult = 0;
  // let isExponentClicked = false;

  function numberHolder(btnValue) {
    setInputValue((prevValue) => prevValue + btnValue);
  }
  
  function runClear() {
    setInputValue("");
    operators = [];
    numbers = [];
    numbersWithSpaces = [];
    exponentArr = [];
    EXPArr = [];
    EXPResult = 0;
    exponentResult = 0;
    result = 0;
  }

  function runPercent() {
    // inputField.value = Number(inputField.value / 100);
    setInputValue((prevValue) => (Number(prevValue) / 100).toString());
  }

  function runFactorial() {
    let factorialResult = 1;
    let holder = Number(inputValue);
    if (Number(inputValue) < 0) {
      setInputValue("Error, input is negative numbers!");
    } else if (Number(inputValue) === 0) {
      setInputValue("1");
    } else {
      for (let i = holder; i >= 1; i--) {
        factorialResult *= i;
      }
    }
    setInputValue(factorialResult.toString());
  }

  function runSin() {
    setInputValue(Math.sin(Number(inputValue)).toString());
  }
  function runCos() {
    setInputValue(Math.sin(Number(inputValue)).toString());
  }
  function runLn() {
    setInputValue(Math.log(Number(inputValue)).toString());
  }
  function runLog() {
    setInputValue(Math.log10(Number(inputValue)).toString());
  }
  function runSqrt() {
    setInputValue(Math.sqrt(Number(inputValue)).toString());
  }
  function runTan() {
    setInputValue(Math.tan(Number(inputValue)).toString());
  }
  function runEXP() {
    setInputValue((prevValue) => prevValue + "E");
    isEXPClicked = true;
  }
  function runExp() {
    if(inputValue.includes("^"))
    {
      return;
    }
    setInputValue((prevValue) => prevValue + "^");
    isExponentClicked = true;
  }
  function runDot() {
    setInputValue((prevValue) => prevValue + ".");
  }

  function minusFunction() {
    setInputValue((prevValue) => prevValue + "-");
  }
  function addFunction() {
    setInputValue((prevValue) => prevValue + "+");
  }
  function multiplyFunction() {
    setInputValue((prevValue) => prevValue + "x");
  }
  function divideFunction() {
    setInputValue((prevValue) => prevValue + "/");
  }
  function displayResult() {
    if (isEXPClicked) {
      EXPArr = inputValue.split("E");
      EXPResult = EXPArr[0] + "0".repeat(EXPArr[1]);
      inputValue = EXPResult;
      isEXPClicked = false;
      
    }

    else if (isExponentClicked) {
      exponentArr = inputValue.split("^");
      if (exponentArr.length !== 2) {
        setInputValue("Error: Invalid exponent format");
        setIsExponentClicked(false);
        return;
      }
      const base = parseFloat(exponentArr[0]);
      const exponent = parseFloat(exponentArr[1]);
  
      if (isNaN(base) || isNaN(exponent)) {
        setInputValue("Error: Invalid numbers for exponentiation");
        setIsExponentClicked(false);
        return;
      }
  
      const result = Math.pow(base, exponent);
      setInputValue(result.toString());
      setIsExponentClicked(false);
    }
     else {
      let numbersWithSpaces = inputValue.split(/[-+x/^]/);

      numbers = numbersWithSpaces.filter((element) => element != "");
      for (let i = 0; i < inputValue.length; i++) {
        if (inputValue[i] == "+") {
          operators.push("+");
        }
        if (inputValue[i] == "-") {
          operators.push("-");
        }
        if (inputValue[i] == "x") {
          operators.push("*");
        }
        if (inputValue[i] == "/") {
          operators.push("/");
        }
        if(inputValue[i]=="^")
        {
          operators.push("^");
        }
      }

      let result = Number(numbers[0]);

      for (let i = 1; i < numbers.length; i++) {
        if (operators[i - 1] == "+") {
          result += parseFloat(numbers[i]);
        }
        if (operators[i - 1] == "-") {
          result -= parseFloat(numbers[i]);
        }
        if (operators[i - 1] == "x") {
          result *= parseFloat(numbers[i]);
        }
        if (operators[i - 1] == "/") {
          result /= parseFloat(numbers[i]);
        }
        if(operators[i-1]=="^")
        {
          result=Math.pow(result,parseFloat(numbers[i]));
        }
      }

      setInputValue(result.toString());
      operators = [];
    }
  }
  return (
    <div>
      <div className="entire-body">
        <div className="Intro-text">
          <p>
            To use the built in calculator functions, enter a number using the
            calculator buttons and then press the appropriate function, such as
            "cos","sin", etc...
          </p>
        </div>

        <div className="grid-cont">
          <div className="input">
          <input
  type="text"
  className="inputNumber"
  value={inputValue}
  onChange={(e) => setInputValue(e.target.value)}
  ref={inputRef}
/>
            <br />
          </div>
          <div className="row1">
            <button type="button" className="box btn">
              Deg
            </button>
            <button onClick={runFactorial} type="button" className="box btn ">
              x!
            </button>
            <button type="button" className="box btn ">
              (
            </button>
            <button type="button" className="box btn ">
              )
            </button>
            <button onClick={runPercent} type="button" className="box btn ">
              %
            </button>
            <button onClick={runClear} type="button" className="box btn ">
              AC
            </button>
          </div>
          <div className="row2">
            <button onClick={runSin} type="button" className="sin box btn ">
              sin
            </button>
            <button onClick={runLn} type="button" className="ln box btn ">
              ln
            </button>
            <button
              onClick={(event) => numberHolder(event.target.innerHTML)}
              type="button"
              className="number lghtgrey box btn "
            >
              7
            </button>
            <button
              onClick={(event) => numberHolder(event.target.innerHTML)}
              type="button"
              className="number lghtgrey box btn "
            >
              8
            </button>
            <button
              onClick={(event) => numberHolder(event.target.innerHTML)}
              type="button"
              className="number lghtgrey box btn "
            >
              9
            </button>
            <button
              onClick={divideFunction}
              type="button"
              className="divide box btn "
            >
              &divide;
            </button>
          </div>
          <div className="row3">
            <button onClick={runCos} type="button" className="cos box btn ">
              cos
            </button>
            <button onClick={runLog} type="button" className="log box btn ">
              log
            </button>
            <button
              onClick={(event) => numberHolder(event.target.innerHTML)}
              type="button"
              className="number lghtgrey box btn "
            >
              4
            </button>
            <button
              onClick={(event) => numberHolder(event.target.innerHTML)}
              type="button"
              className="number lghtgrey box btn "
            >
              5
            </button>
            <button
              onClick={(event) => numberHolder(event.target.innerHTML)}
              type="button"
              className="number lghtgrey box btn "
            >
              6
            </button>
            <button
              onClick={multiplyFunction}
              type="button"
              className="times box btn "
            >
              &times;
            </button>
          </div>
          <div className="row4">
            <button onClick={runTan} type="button" className="tan box btn ">
              tan
            </button>
            <button onClick={runSqrt} type="button" className="sqrt box btn ">
              Sqrt
            </button>
            <button
              onClick={(event) => numberHolder(event.target.innerHTML)}
              type="button"
              className="number lghtgrey box btn "
            >
              1
            </button>
            <button
              onClick={(event) => numberHolder(event.target.innerHTML)}
              type="button"
              className="number lghtgrey box btn "
            >
              2
            </button>
            <button
              onClick={(event) => numberHolder(event.target.innerHTML)}
              type="button"
              className="number lghtgrey box btn "
            >
              3
            </button>
            <button
              onClick={minusFunction}
              type="button"
              className="minus box btn "
            >
              -
            </button>
          </div>
          <div className="row5">
            <button onClick={runEXP} type="button" className="EXP box btn ">
              EXP
            </button>
            <button onClick={runExp} type="button" className="exp box btn ">
              x <sup>y</sup>
            </button>
            <button
              onClick={(event) => numberHolder(event.target.innerHTML)}
              type="button"
              className="number lghtgrey box btn "
            >
              0
            </button>
            <button
              onClick={runDot}
              type="button"
              className="lghtgrey box btn "
            >
              .
            </button>
            <button
              onClick={displayResult}
              type="button"
              className="equal box btn "
            >
              =
            </button>
            <button
              onClick={addFunction}
              type="button"
              className="plus box btn "
            >
              +
            </button>
          </div>
        </div>
      </div>
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4"
        crossOrigin="anonymous"
      ></script>
      <script src="script.js"></script>
    </div>
  );
}

export default App;