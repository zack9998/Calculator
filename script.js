const toggleButton = document.querySelector(".themes__toggle");
const numbers = document.querySelectorAll('[data-type="number"]');
const operations = document.querySelectorAll('[data-type="operation"]');
const calculResult = document.querySelector(".calc__result");
let previousValue = "";
let currentValue = "";
let operand = "";

const switchColor = () => {
  toggleButton.classList.toggle("themes__toggle--isActive");
};

toggleButton.addEventListener("click", switchColor);
toggleButton.addEventListener("keydown", (event) => {
  event.key === "Enter" && switchColor();
});

//print numbers

const printNumber = () => {
  numbers.forEach((number) => {
    number.addEventListener("click", () => {
      if (calculResult.innerText.includes(".") && number.dataset.value === ".")
        return;

      if (
        calculResult.innerText[0] === "0" &&
        !calculResult.innerText.includes(".")
      ) {
        calculResult.innerText = number.dataset.value;
      } else calculResult.innerText += number.dataset.value;

      if (calculResult.innerText[0] === ".") {
        calculResult.innerText = "0.";
      }
    });
  });
};

//Reset
const resetUI = () => {
  const resetButon = operations[5];
  resetButon.addEventListener("click", () => {
    calculResult.innerText = "0";
    previousValue = "";
    currentValue = "";
    operand = "";
  });
};

// Del;
const delNumber = () => {
  operations[0].addEventListener("click", () => {
    if (!currentValue || currentValue === "0") {
      if (!operand) {
        if (!previousValue || previousValue === "0") return;
        else if (previousValue.length === 1) {
          calculResult.innerText = "0";
          previousValue = "";
        } else {
          calculResult.innerText = calculResult.innerText.slice(0, -1);
          previousValue = calculResult.innerText;
        }
      } else operand = "";
    } else if (currentValue.length === 1) {
      calculResult.innerText = "0";
      currentValue = "";
    } else {
      calculResult.innerText = calculResult.innerText.slice(0, -1);
      currentValue = calculResult.innerText;
    }
  });
};

const updateUI = () => {
  numbers.forEach((number) => {
    number.addEventListener("click", () => {
      if (!operand) {
        if (
          calculResult.innerText.includes(".") &&
          number.dataset.value === "."
        )
          return;
        else {
          previousValue += number.dataset.value;
          calculResult.innerText = previousValue;
        }
      } else {
        if (
          calculResult.innerText.includes(".") &&
          number.dataset.value === "."
        )
          return;
        else {
          currentValue += number.dataset.value;
          calculResult.innerText = currentValue;
        }
      }
    });
  });

  operations.forEach((operation) => {
    operation.addEventListener("click", () => {
      if (!previousValue) return;
      else if (
        operation.dataset.value != "c" &&
        operation.dataset.value != "Backspace" &&
        operation.dataset.value != "Enter"
      ) {
        operand = operation.dataset.value;
        calculResult.innerText = operand;
      }
    });
  });

  return {
    previousValue,
    operand,
    currentValue,
  };
};

const operationsHandler = () => {
  updateUI();

  operations[6].addEventListener("click", () => {
    switch (operand) {
      case "+":
        calculResult.innerText = String(
          Number(previousValue) + Number(currentValue)
        );
        break;

      case "-":
        calculResult.innerText = String(
          Number(previousValue) - Number(currentValue)
        );
        break;
      case "*":
        calculResult.innerText = String(
          Number(previousValue) * Number(currentValue)
        );
        break;

      case "/":
        calculResult.innerText = String(
          Number(previousValue) / Number(currentValue)
        );
        break;

      default:
        return;
    }
  });
};

resetUI();
delNumber();
operationsHandler();
