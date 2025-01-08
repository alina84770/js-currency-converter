//exchange rate api
const URL = "https://api.exchangerate.host/convert?access_key=f5ffcdb3e75372f3af483cc049282fd8";
let select = document.querySelectorAll("select");
let btn = document.querySelector("button");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let p = document.querySelector(".result");

//updateResult function also execute as window loads in start
window.addEventListener("load", () => {
    updateResult();
})

//creating options tags dynamically for select tag. option tag is created for each key in countryList object

for (let dropdown of select) {
    for (let code in countryList) {
        let option = document.createElement("option");
        option.innerText = code;
        option.value = code;

        //firstly value of "from select" is "USD" and Value of "to select" is "PKR"

        if (dropdown.name === "from" && code === "USD") {
            option.selected = "selected";
        }
        else if (dropdown.name === "to" && code === "PKR") {
            option.selected = "selected";
        }
        dropdown.append(option);
    }

    /*change flag as value of select is change and passing select element to newflag function so that we will get value of select,value is key in countryList object so by using this value we can access value(country code) of key and put it in our custom flag api url*/

    dropdown.addEventListener("change", (e) => {
        newflag(e.target);
    })
}

function newflag(element) {
    let currencyCode = element.value;
    let countryCode = countryList[currencyCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let flagImage = element.parentElement.querySelector("img");
    flagImage.src = newSrc;
}

//convert currency rate of one country to another country
let updateResult = async () => {
    let amount = document.querySelector(".amount input");
    let amountValue = amount.value;

    //if we enter value less than 1 or leave input field empty value of input field set to 1
    if (amountValue === "" || amountValue < 1) {
        amountValue = 1;
        amount.value = 1;
    }
    const url = `${URL}&from=${fromCurr.value.toLowerCase()}&to=${toCurr.value.toLowerCase()}&amount=${amountValue}`;
    let response = await fetch(url);
    let data = await response.json();
    let result = data.result;
    p.innerText = `${amountValue} ${fromCurr.value} = ${result} ${toCurr.value}`;
}
//as we click on exchange rate button currency will be exchange into currency of other country
btn.addEventListener("click", async (e) => {
    e.preventDefault();
    updateResult();
})

