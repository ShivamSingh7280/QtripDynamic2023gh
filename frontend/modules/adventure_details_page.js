import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL

  let advId = new URLSearchParams(search);
  return advId.get("adventure");

  // Place holder for functionality to work in the Stubs
}

//Implementation of fetch call with a paramterized input based on adventure ID

async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    let response = await fetch(
      config.backendEndpoint + `/adventures/detail?adventure=${adventureId}`
    );
    let data = await response.json();
    return data;
  } catch (e) {
    return null;
  }
  // Place holder for functionality to work in the Stubs
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  // document.getElementById("adventure-name").innerHTML = adventure.name;
  // document.getElementById("adventure-subtitle").innerHTML = adventure.subtitle;
  // let imagesCollection = adventure.images.map(imgUrl => `<img src=${imgUrl} class="activity-card-image" alt= ""/>`)
  // imagesCollection.forEach(imageTag => document.getElementById("photo-gallery").innerHTML += imageTag)
  // document.getElementById("adventure-content").innerHTML = adventure.content;

  document.getElementById("adventure-name").innerHTML = adventure.name;

  //Setting the subtitle
  document.getElementById("adventure-subtitle").innerHTML = adventure.subtitle;

  //Loading the images
  adventure.images.map((image) => {
    let ele = document.createElement("div");
    ele.className = "col-lg-12";
    ele.innerHTML = `
    <img
        src=${image}
        alt=""
        srcset=""
        class="activity-card-image pb-3 pb-md-0"
      />
          `;
    document.getElementById("photo-gallery").appendChild(ele);
  });

  //Setting the content
  document.getElementById("adventure-content").innerHTML = adventure.content;

  // console.log("adventure.image", adventure);
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  document.getElementById("photo-gallery").innerHTML = `
  <div id="carouselExampleIndicators" class="carousel slide">
  <div class="carousel-indicators" id="carousel-indicators">
  
    </div>
  <div class="carousel-inner" id = "carousel-inner">
  
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
`;

  images.forEach((image, imageIndex) => {
    let carouselItemDiv = document.createElement("div");
    let activeClass = imageIndex === 0 ? " active" : "";
    carouselItemDiv.className = `carousel-item${activeClass}`;
    carouselItemDiv.innerHTML = `
                              <img 
                              src = ${image}
                              alt = "image"
                              srcset =""
                              class = "activity-card-image" class = "d-block w-100 data-bs-interval="3000" pb-3 pb-md-0" />`;
    document.getElementById("carousel-inner").appendChild(carouselItemDiv);

    const indicator = `
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="${imageIndex}"
                  ${imageIndex === 0 ? 'class="active"' : ""}
                  aria-current="true"
                  aria-label="Slide ${imageIndex + 1}"></button>`;

    // console.log("indicator", indicator);

    document.getElementById("carousel-indicators").innerHTML += indicator;
  });
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  let reservationSoldOut = document.getElementById(
    "reservation-panel-sold-out"
  );
  let reservationAvailable = document.getElementById(
    "reservation-panel-available"
  );
  let displayCost = document.getElementById("reservation-person-cost");
  let reservationPanel = document.getElementById("reservation-panel-available");

  if (adventure.available === true) {
    //  console.log("available");

    reservationSoldOut.style.display = "none";
    reservationAvailable.style.display = "block";
    displayCost.textContent = adventure.costPerHead;
  } else {
    // console.log("available not");

    reservationSoldOut.style.display = "block";
    reservationPanel.style.display = "none";
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  document.getElementById("reservation-cost").innerHTML =
    adventure.costPerHead * persons;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the
  //  reservation fails, just show an alert with "Failed!".
  const form = document.getElementById("myForm");
  form.addEventListener("submit", SubmitEvent);
  async function SubmitEvent(event) {
    event.preventDefault();
    // console.log("event defatult");

    let data = {};
    let name = document.getElementById("name").value;
    let date = document.getElementById("date").value;
    let person = document.getElementById("person").value;

    data["name"] = name;
    data["date"] = date;
    data["person"] = person;
    data["adventure"] = adventure.id;

    let url = config.backendEndpoint + "/reservations/new";

    try {
      let response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

    //   response.then(() => {
    //       alert("Success!");
    //     })
    //     .catch(() => {
    //       alert("Failed!");
    //     });
    // } catch {
    //   alert("Error in API");
   
    
   if(response.ok){
    alert("Success!");
    window.location.reload();
   }else{
    alert("failed!");
   }
 } catch(error){
  alert("Error in outer catch" + error);
 }
 }
}

 







//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't

  if (adventure.reserved) {
    document.getElementById("reserved-banner").style.display = "block";
  } else {
    document.getElementById("reserved-banner").style.display = "none";
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
