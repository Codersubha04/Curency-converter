const C_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies"

const dropdowns = document.querySelectorAll(".drop-down select");
const button = document.querySelector("form button");
const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");
const msg = document.querySelector(".massage");

// for(code in countryList){
//     console.log(code,countryList[code]);  // INR IN , USD US
// }

for (let select of dropdowns) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected"
        }
        else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected"
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        changeFlag(evt.target);
    });
}
const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtValue = amount.value;
    if (amtValue === "" || amtValue < 1) {
        amtValue = 1;
        amount.value = "1";
    }
    console.log(fromCurrency.value, toCurrency.value);
    const URL = `${C_URL}/${fromCurrency.value.toLowerCase()}/${toCurrency.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurrency.value.toLowerCase()];
    let finalAmount = amtValue * rate;
    msg.innerText = `${amtValue} ${fromCurrency.value} = ${finalAmount} ${toCurrency.value}`;

}

const changeFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newimg = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newimg;
}

button.addEventListener("click", async (evt) => {
    evt.preventDefault();
 updateExchangeRate();
});
window.addEventListener("load",()=>{
    updateExchangeRate();
})