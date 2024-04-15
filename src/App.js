import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App() {
  return (
    <div>
      <Step />
      <DateCalculate />
      <CoculateBills />
    </div>
  );
}
function Step() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  function handlePrevious() {
    if (step > 1) setStep((s) => s - 1);
  }
  function handleNext() {
    if (step < 3) setStep((s) => s + 1);
  }

  return (
    <>
      <button className="close" onClick={() => setIsOpen((s) => !s)}>
        &times;
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={`${step >= 1 ? "active" : ""}`}>1</div>
            <div className={`${step >= 2 ? "active" : ""}`}>2</div>
            <div className={`${step >= 3 ? "active" : ""}`}>3</div>
          </div>
          <div className="message">
            step {step} : {messages[step - 1]}
          </div>
          <div className="buttons">
            <Button
              bgColor="#7950f2"
              color="white"
              onClick={handlePrevious}
              text="Previous"
            />
            <Button
              bgColor="#7950f2"
              color="white"
              onClick={handleNext}
              text="Next"
            />
          </div>
        </div>
      )}
    </>
  );
}

function Button({ bgColor, color, onClick, text }) {
  return (
    <button
      style={{ backgroundColor: bgColor, color: color }}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

function DateCalculate() {
  const date = new Date();
  const day = date.getDate();
  // date.setDate(day + 20);
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(0);
  date.setDate(day + step * count);
  return (
    <div className="steps">
      <div className="buttons">
        <input
          type="range"
          min="1"
          max="10"
          value={step}
          onChange={(e) => setStep(Number(e.target.value))}
        />
        {/* <button onClick={() => setStep(step - 1)}>-</button>{" "} */}
        <div>step:{step} </div>
        {/* <button onClick={() => setStep(step + 1)}>+</button> */}
        <br></br>
        <button onClick={() => setCount(count - 1)}>-</button>{" "}
        {/* <div>count:{count * step} </div> */}
        <input
          type="text"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
        />
        <button onClick={() => setCount(count + 1)}>+</button>
        {count !== 0 || step !== 1 ? (
          <button onClick={() => setCount(0) & setStep(1)}>Reset</button>
        ) : null}
      </div>
      {/* <div>
        {count !== 0 &&
          step !== 0 &&
          `${Math.abs(step * count)}  day ${count > 1 ? "form" : "age"}`}{" "}
        Taday is {date.toLocaleDateString()}
      </div> */}
      <div style={{ color: "red" }}>
        {count === 0
          ? "Taday is "
          : count > 0
          ? `${step * count} days from is `
          : `${Math.abs(step * count)} days age was `}
        {date.toLocaleDateString()}
      </div>
    </div>
  );
}

function CoculateBills() {
  const [bill, setBill] = useState(0);
  const [percentage1, setPercentage1] = useState(0);
  const [percentage2, setPercentage2] = useState(0);
  const [percentage3, setPercentage3] = useState(0);
  const totalTip = percentage1 + percentage2 + percentage3;
  const totalBill = bill + totalTip;

  function handleReset() {
    setBill(0);
    setPercentage1(0);
    setPercentage2(0);
    setPercentage3(0);
  }
  return (
    <div>
      <Bill text="How much bill?" bill={bill} setBill={setBill} />
      <Service
        text="How much service do you want to pay?"
        percentage={percentage1}
        setPercentage={setPercentage1}
      />
      <Service
        text="How much service do you firends want to pay?"
        percentage={percentage2}
        setPercentage={setPercentage2}
      />
      <Service
        text="How much service do you mother want to pay?"
        percentage={percentage3}
        setPercentage={setPercentage3}
      />
      {bill > 0 && (
        <>
          <Output bill={bill} totalTip={totalTip} totalBill={totalBill} />
          <Reset onReset={handleReset} />
        </>
      )}
    </div>
  );
}

function Bill({ text, bill, setBill }) {
  return (
    <div>
      {text}
      <input
        type="number"
        placeholder="Enter bill amount"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />
    </div>
  );
}
function Service({ text, percentage, setPercentage }) {
  return (
    <div>
      {text}:
      <select
        type="option"
        value={percentage}
        onChange={(e) => setPercentage(Number(e.target.value))}
      >
        <option value="0">0%</option>
        <option value="10">10%</option>
        <option value="15">15%</option>
        <option value="20">20%</option>
      </select>
    </div>
  );
}
function Output({ bill, totalTip, totalBill }) {
  return (
    <h2>
      Total amount to pay ${totalBill} (${bill} * {totalTip}% tip)
    </h2>
  );
}
function Reset({ onReset }) {
  return <button onClick={onReset}>Reset</button>;
}
