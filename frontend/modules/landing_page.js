import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try{
  let cityData = await fetch(`${config.backendEndpoint}/cities` );
  let jsonData = await cityData.json();
  // console.log(jsonData);
  return jsonData;
  }catch{
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  // Taking a div which makes the row. 
  let rowDiv = document.getElementById("data");
  // Creating a div in which we will store all our image text and description.
  let dataDiv = document.createElement("div");
  dataDiv.className = "col-6 col-lg-3 mb-4";
  dataDiv.innerHTML = `
  <a href = "pages/adventures/?city=${id}" id=${id}>
  <div class = "tile">
  <img src = ${image} alt = ${id}/>
    <div class = "tile-text text-white text-center">
    <h5> ${city} </h5>
    <p> ${description} </p>
    </div>
   </div>
  </a>`;
  rowDiv.appendChild(dataDiv);  
  } 

export { init, fetchCities, addCityToDOM };
