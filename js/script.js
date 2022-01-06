let bill = document.getElementById("bill");
let people = document.getElementById("people");
let tipRadio = document.getElementsByName("tip");
let tipCostum = document.getElementById("costum");
let reset = document.getElementById("reset")
let tipNotCostum = 0;
bill.addEventListener("keyup", evaluate);
people.addEventListener("keyup", evaluate);
tipCostum.addEventListener("keyup", evaluate);
reset.addEventListener("click", resetForm, true);
for (let i = 0; i < 5; i++) {
    tipRadio[i].addEventListener("click", evaluate);
}

// Function for evaluate
function evaluate() {
    activeBtnReset();
    if (!evaluateInput(bill, "billError")) {
      return;
    }
    if (!evaluateInput(people, "peopleError")) {
      return;
    }
    if (evaluateInput(tipCostum, "")) {
      compute(
        parseFloat(tipCostum.value / 100),
        parseFloat(bill.value),
        parseFloat(people.value)
      );
    } else {
      getTipRadio();
      compute(
        parseFloat(tipNotCostum),
        parseFloat(bill.value),
        parseFloat(people.value)
      );
    }
  }

function activeBtnReset() {
    if (
        bill.value !== "" ||
        bill.value > 0 ||
        people.value !== "" ||
        people.value > 0
    ) {
        reset.style.cursor = "pointer";
        reset.classList.add("btn-active");
        reset.addEventListener("click", resetForm, true);
    } else {
        reset.style.cursor = "not-allowed";
        reset.classList.remove("btn-active");
        reset.addEventListener("click", resetForm, true);
    }
}
function getTipRadio() {
    for (let i = 0; i < 5 ; i++) {
        if (tipRadio[i].checked) {
            tipNotCostum = tipRadio[i].value;
        }
    }
}
function evaluateInput(type, ID) {
    console.log(type);
    if (ID === "") {
      if (type.value > 0) {
        clearRadios();
        return true;
      }
      return false;
    }
    if (type.value === "" || type.value <= 0) {
      document.getElementById(`${ID}`).style.display = "block";
      document.getElementById("tipAmount").innerText = "0.00";
      return false;
    } else {
      document.getElementById(`${ID}`).style.display = "none";
      return true;
    }
  }
function compute(fTip, fBill, fPeople) {
    let tipAmount = (fBill * fTip) / fPeople;
    let total = (fBill * fTip + fBill) / fPeople;
    document.getElementById("tipAmount").innerText = tipAmount.toFixed(2);
    document.getElementById("total").innerText = total.toFixed(2);
  }
  
  function clearRadios() {
    for (let i = 0; i < 5; i++) {
      tipRadio[i].checked = false;
    }
  }
  
  function resetForm() {
    bill.value = "";
    people.value = "";
    clearRadios();
    tipCostum.value = "";
    document.getElementById("tipAmount").innerText = "0.00";
    document.getElementById("total").innerText = "0.00";
    document.getElementById("peopleError").style.display = "none";
    document.getElementById("billError").style.display = "none";
    activeBtnReset();
  }