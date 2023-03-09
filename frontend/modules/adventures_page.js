
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  let cityId = new URLSearchParams(search);
  return cityId.get("city");
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    let res = await fetch(config.backendEndpoint + `/adventures?city=${city}`)
    let data = await res.json();
    return data;
  } catch {
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM

  // Getting connected with out html div as a div parent by id
  let rowDiv = document.getElementById("data");
  adventures.forEach((adventure) => {
    // creating new div for out fetched data.
    let dataDiv = document.createElement("div");
    // creating bootstrap grid class for our data 
    dataDiv.className = "col-6 col-lg-3 mb-4";
    // creating elements using innerHTML for our Card
    dataDiv.innerHTML = `
    <a href = "detail/?adventure=${adventure.id}" id=${adventure.id}>

    
      <div class = "activity-card">
          
         <div class = "category-banner"> ${adventure.category}</div>

  
         <img class = "activity-card img" class ="image-responsive" src = "${adventure.image}"/>
            
            <div class = "d-flex flex-wrap justify-content-between w-100 p-2">
           <h5> ${adventure.name} </h5>
            <p>  ₹ ${adventure.costPerHead} </p>
           </div> 

  
          <div class = "d-flex flex-wrap justify-content-between w-100 p-2 adventureDuration ">
            <h5 > Duration </h5>
            <p> ${adventure.duration} Hours </p>
           </div>  
         </div>
         </a>`;
    rowDiv.appendChild(dataDiv);
  });
}




  //Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
  
  function filterByDuration(list, low, high) {
    // TODO: MODULE_FILTERS
    // 1. Filter adventures based on Duration and return filtered list

    // First method
    // let filteredTime = list.filter((adventure) => {
    //   if(adventure.duration > low && adventure.duration <= high)
    //   return true;
    // });   
    // return filteredTime;

  //  same code but in one line
    return list.filter(adventure => adventure.duration > low && adventure.duration <= high);
  }



  //Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
  
  function filterByCategory(list, categoryList) {
    // TODO: MODULE_FILTERS
    // 1. Filter adventures based on their Category and return filtered list

    // First method
    //  return list.filter(adventure =>{
    //    return categoryList.includes(adventure.category);
    //  });

      // same code but in one line
     return list.filter(adventure => categoryList.includes(adventure.category));
  }

  // filters object looks like this filters = { duration: "", category: [] };

  //Implementation of combined filter function that covers the following cases :
  // 1. Filter by duration only
  // 2. Filter by category only
  // 3. Filter by duration and category together

  function filterFunction(list, filters) {
    // TODO: MODULE_FILTERS
    // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
    // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
    let filteredList = list;
    // Place holder for functionality to work in the Stubs
    
    // for duration
    // we are using for parseInt here just to make sure we processed through the integer value.

    if(filters.duration !== null && filters.duration !== ""){
      const[low,high]  =  filters.duration.split("-");
      filteredList = filterByDuration(list, parseInt(low), parseInt(high));
    }

    // for duration
    // We are giving parameter 'filteredList' here because we don't want our category to again go on 
    // the list and then do the all the stuffs again.
    //  filters.category is the categoryList we are giving it directly

   if(filters.category !== null && filters.category.length !== 0){
    filteredList = filterByCategory(filteredList, filters.category);
   }

    return filteredList;
  }

  //Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
  function saveFiltersToLocalStorage(filters) {
    // TODO: MODULE_FILTERS
    // 1. Store the filters as a String to localStorage
    localStorage.setItem("filters", JSON.stringify(filters));
    return true;
  }

  //Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
  function getFiltersFromLocalStorage() {
    // TODO: MODULE_FILTERS
    // 1. Get the filters from localStorage and return String read as an object
    let filteredString =  localStorage.getItem("filters");
    // Place holder for functionality to work in the Stubs
    if(filteredString !== null){
      return JSON.parse(filteredString);
    }
    return null;
  }

  //Implementation of DOM manipulation to add the following filters to DOM :
  // 1. Update duration filter with correct value
  // 2. Update the category pills on the DOM

  function generateFilterPillsAndUpdateDOM(filters) {
    // TODO: MODULE_FILTERS
    document.getElementById("category-list").textContent = "";
    // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
    let pillList = document.getElementById("category-list");

    filters.category.forEach((category) => {  
    let pillDiv = document.createElement("div");
    pillDiv.className = "category-filter";
    pillDiv.innerHTML = 
                        `<div> ${category} </div>`;
    pillList.appendChild(pillDiv);
  });
}


  export {
    getCityFromURL,
    fetchAdventures,
    addAdventureToDOM,
    filterByDuration,
    filterByCategory,
    filterFunction,
    saveFiltersToLocalStorage,
    getFiltersFromLocalStorage,
    generateFilterPillsAndUpdateDOM,
  };
