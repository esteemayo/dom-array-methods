const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionaireBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

// fetch random user and add money
async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api/');
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);
}

// double money
function doubleMoney() {
  data = data.map((item) => {
    return { ...item, money: item.money * 2 };
  });

  updateDOM();
}

// filter only millionaires
function showMillionaires() {
  data = data.filter((item) => item.money >= 1000000);
  updateDOM();
}

// sort by richest
function sortByRichest() {
  data.sort((a, b) => b.money - a.money);
  updateDOM();
}

// calculate wealth
function calculateWealth() {
  const wealth = data
    .map((item) => item.money)
    .reduce((acc, cur) => (acc += cur), 0);

  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
    wealth
  )}</strong></h3>`;

  main.appendChild(wealthEl);
}

// add new obj to data arr
function addData(obj) {
  data.push(obj);

  updateDOM();
}

// update DOM
function updateDOM(providedData = data) {
  // clear main div
  main.innerHTML = '<h2><strong>Person</strong>wealth</h2>';

  providedData.forEach((item) => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong>${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}

// format number as money
function formatMoney(number) {
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// event listener
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
showMillionaireBtn.addEventListener('click', showMillionaires);
sortBtn.addEventListener('click', sortByRichest);
calculateWealthBtn.addEventListener('click', calculateWealth);
