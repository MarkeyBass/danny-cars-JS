// BACK GROUND

let car = {};

const secondHandCars = [];

const curentYear = new Date().getFullYear();

const numFormat = new Intl.NumberFormat('en');

function ifNumFormat (num) {
  if(typeof(num) == 'number') {
    return numFormat.format(num);
  } else {
    return num;
  }
}

function discount(price, year) {

  let dis = price; // discount price  
  let yearsOld = curentYear - year;

  if(yearsOld === 0) {
    car.discountPrice = "Sorry, no discount.";
  } else {

    for( let i = 0; i < yearsOld; i++){
      dis = dis * 0.9;
      
    }
    car.discountPrice = Math.ceil(dis);
  }
  
}

function addCar(brand, model, year, basePrice) {
  car.brand = brand;
  car.model = model;
  car.year = year;
  car.basePrice = basePrice;
  car.id = brand+model+year+basePrice;
  
  secondHandCars.push(car);
  discount(basePrice, year);

  // sorting by price
  secondHandCars.sort(function(a, b){return b.basePrice - a.basePrice});
  

  car = {};


  console.log(JSON.parse(JSON.stringify(secondHandCars)));  
}

addCar('Subaro', 'forester', 2013, 80000);

addCar('BMW', 'X1', 2015, 170000);

addCar('Ford', 'Focus', 2018, 90000);

addCar('Honda', 'Civic', 2019, 110000);

// DOM

let form = document.forms[0];
let brandInput = "";
let modelInput = "";
let yearInput = "";
let basePriceInput = "";

// Add car from input to array
document.onload = refreshTable(secondHandCars);
form.addEventListener("submit", tableCar);
function tableCar(e) {
  e.preventDefault();
  
  brandInput = form.elements["brand"].value;
  modelInput = form.elements["model"].value;
  yearInput = form.elements["year"].value;
  basePriceInput = form.elements["base-price"].value;
  
  if (brandInput === '' || modelInput === '' || yearInput === '' || yearInput < 1900 || yearInput > curentYear || basePriceInput === '' || basePriceInput < 1000 || basePriceInput > 10000000 ) {
    alert('Pleas enter all the values correctly');
  } else {
    addCar(brandInput, modelInput, yearInput, basePriceInput);
    refreshTable(secondHandCars);
  }

}


function deleteItem(id) {
  
  for(let i = 0; i < secondHandCars.length; i++) {
    if (secondHandCars[i].id == id) {
      secondHandCars.splice(i, 1);     
    } 
  }
  if (confirm ('Are you sure?')) {
    refreshTable(secondHandCars);
  }
}
 
// Display array on table
function refreshTable(secondHandCars) {

  const table = document.querySelector('#table');
  const tbody = document.querySelector('tbody');
  table.appendChild(tbody);
  tbody.innerHTML = '';

  for(let i = 0; i < secondHandCars.length; i++){

    const tr = document.createElement('tr');
    tr.className = 'table-primary';
    tbody.appendChild(tr);
    const tdBrand = document.createElement('td');
    tr.appendChild(tdBrand);
    const tdModel = document.createElement('td');
    tr.appendChild(tdModel);
    const tdYear = document.createElement('td');
    tr.appendChild(tdYear);
    const tdBasePrice = document.createElement('td');
    tr.appendChild(tdBasePrice);
    const tdDiscountPrice = document.createElement('td');
    tr.appendChild(tdDiscountPrice);
    
    const tdDeleteCar = document.createElement('td');
    tr.appendChild(tdDeleteCar);
    const deleteBtn = document.createElement('input');
       
    deleteBtn.className = 'btn btn-danger btn-sm';
    deleteBtn.id = secondHandCars[i].id;
    deleteBtn.value = 'delete';
    deleteBtn.type = 'button';

    deleteBtn.onclick = function (event) {
    deleteItem(secondHandCars[i].id);
    }
    tdDeleteCar.appendChild(deleteBtn);

    tdBrand.appendChild(document.createTextNode(secondHandCars[i].brand));
    tdModel.appendChild(document.createTextNode(secondHandCars[i].model));
    tdYear.appendChild(document.createTextNode(secondHandCars[i].year));
    tdBasePrice.appendChild(document.createTextNode(ifNumFormat(secondHandCars[i].basePrice)));
    tdDiscountPrice.appendChild(document.createTextNode(ifNumFormat(secondHandCars[i].discountPrice)));
  }

  // Empying the inputs
  form.elements["brand"].value = '';
  form.elements["model"].value = '';
  form.elements["year"].value = '';
  form.elements["base-price"].value = '';

}

// Sort by brand name

sort = document.querySelector("#sort-by-brand");
sort.addEventListener("keyup", filterCars);
function filterCars(e) {
   let text =  e.target.value.toLowerCase();
   let tbodyNodeList = document.querySelector('#tbody').rows;

   for(let i = 0; i < tbodyNodeList.length; i++) {
    const brandVal = tbodyNodeList[i].childNodes[0].textContent.toLowerCase();    
    if (brandVal.indexOf(text) != -1) {
      tbodyNodeList[i].style.display = "";
    } else {
      tbodyNodeList[i].style.display = "none";
    }
  }

 
}

// Clear all table info
const kill = document.getElementById('#kill-btn');
kill.onclick = function KillAllCarInfo(e) {
  let tbody = document.querySelector('tbody');
  if (confirm('Kill All? Are You Sure?')) {
      while(tbody.childNodes[0]) {
      tbody.removeChild(tbody.childNodes[0]);
    }
  }

}






