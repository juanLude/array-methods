const main = document.getElementById('main'); 
const addUserBtn = document.getElementById('add-user');
const dobuleBtn = document.getElementById('double');
const showBillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

// Fetch random user and add money

getRandomUser();
getRandomUser();
getRandomUser();
async function getRandomUser(){
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();

    const user = data.results[0];  
    
    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    }
    addData(newUser);
}

// add new object to data array
function addData(obj){
    data.push(obj);
    updateDOM();
}

// double money
function doubleMoney(){
    data = data.map(user => {
        return { ...user, money: user.money * 2 };
    });
    updateDOM();
}
// sort users by richest
function sortByRichest(){
    data.sort((a,b) => b.money - a.money);
    updateDOM();
}
// showBillionaiers
function showBillionaiers(){
    data = data.filter(item => item.money > 1000000);
    console.log('hola');
    updateDOM();
}
function calculateWealth(){
    const wealth = data.reduce((acc, user) => acc+=user.money, 0);
    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)} </strong></h3>`;
    main.appendChild(wealthEl);
    
}
function updateDOM(providedData = data){
    // clear main div
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';
    providedData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`
        main.appendChild(element)
    })
}
// Format number as money
function formatMoney(number){
    return '$ ' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Event listeners
addUserBtn.addEventListener('click', getRandomUser);
dobuleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showBillionairesBtn.addEventListener('click', showBillionaiers);
calculateWealthBtn.addEventListener('click', calculateWealth);