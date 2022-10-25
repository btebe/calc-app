let equal_press = 0;
const keyInput = document.querySelectorAll(".input-btn");
const screen_input = document.getElementById("input");
const equal = document.getElementById("equal");
const clear = document.getElementById("clear");
const erase = document.getElementById("erase");
const btn_theme = document.querySelectorAll(".btn-theme");

//clear input when page reloads
window.onload = () => {
  screen_input.value = "";
};

// keyboard support
document.addEventListener("keydown", (event) => {
  const keys = [
    "0", "1", "2",
    "3", "4", "5",
    "6", "7", "8",
    "9", "/", "x",
    "-",
  ];
  if (keys.includes(event.key)) {
    if (equal_press == 1) {
      //clear screen for result and holds next value
      screen_input.value = event.key;
      equal_press = 0;
    } else {
      //add to screen
      screen_input.value += event.key;
    }
  }
  if (event.key == "Backspace") erase.click();
  if (event.key == "Enter") equal.click();
  if (event.key == "c") clear.click();
});

//keyboard support
document.addEventListener("keypress", (event) => {
  const keys = ["+", "*"];
  if (keys.includes(event.key)) screen_input.value += event.key;
});

keyInput.forEach((keybtn) => {
  keybtn.addEventListener("click", () => {
    if (equal_press == 1) {
      //clear screen for result and holds next value
      screen_input.value = keybtn.value;
      equal_press = 0;
    } else {
      screen_input.value += keybtn.value;
    }
  });
});

//evaluates numerical expressions inputed
equal.addEventListener("click", () => {
  equal_press = 1;
  let input = screen_input.value;
  if (input.includes("x")) input = input.replace("x", "*");

  try {
    let solution = eval(input);
    Number.isInteger(solution)
      ? (screen_input.value = solution.toLocaleString())
      : (screen_input.value = solution.toFixed(4));
  } catch (err) {
    screen_input.value = "ERROR";
  }
});

//clears screen input
clear.addEventListener("click", () => {
  screen_input.value = "";
});

//deletes the last digit inputed
erase.addEventListener("click", () => {
  screen_input.value = screen_input.value.substr(
    0,
    screen_input.value.length - 1
  );
});

// change theme 
btn_theme.forEach((element, index) => {
  element.addEventListener("click", () => {
    document.getElementsByTagName("body")[0].removeAttribute("class");
    if (index == 1) {
      document.getElementsByTagName("body")[0].classList.add("theme-two");
    } else if (index == 2) {
      document.getElementsByTagName("body")[0].classList.add("theme-three");
    }
    btn_theme.forEach((item) => {
      item == element ? item.style.opacity = "1" : item.style.opacity = "0";
    });
  });
});
