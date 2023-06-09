import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try{
    let response = await fetch(config.backendEndpoint + `/reservations/`);
    let data = await response.json();
    return data;
  }catch(e){
    return null;
  }

  // Place holder for functionality to work in the Stubs
  // return null;
}



//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent
   
  if(reservations.length > 0) {
    document.getElementById("no-reservation-banner").style.display = "none";
    document.getElementById("reservation-table-parent").style.display = "block";
  } else{
    document.getElementById("no-reservation-banner").style.display = "block";
    document.getElementById("reservation-table-parent").style.display = "none";
  }
   
  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
  // console.log(reservations);
  // let emptyReservations = document.getElementById("no-reservation-banner");


  // date(date) {
  //   const bookingDate = new Date();
  //   let x = bookingDate.toLocaleDateString("en-IN",{
  //     year:"numeric",
  //     month:"long",
  //     date: "numeric",
  //   })
  //   return x;
  // }



  // time(reserve) {
  //   const bookingTime = new Date();
  //   let y = bookingTime.toLocaleDateString("en-IN", {
  //     hour:"numeric",
  //     minute:"numeric",
  //     second:"numeric",
  //     hour12:true,
  //   })
  //   return x + ", " + y;
  // }







  let reservationTable = document.getElementById("reservation-table");
  
  reservations.map((reserve) => {
  let reserveEle = document.createElement("tr");
  reserveEle.innerHTML = `
        <th scope = "row"> ${reserve.id} </th>
        <td>${reserve.name}</td> 
        <td>${reserve.adventureName}</td> 
        <td>${reserve.person}</td> 
        <td>${new Date(reserve.date).toLocaleDateString("en-IN")}</td> 
        <td>${reserve.price}</td> 
        <td>${new Date(reserve.time).toLocaleString('en-IN', {day:'numeric', month:'long', year:'numeric'}) + ", " + new Date(reserve.time).toLocaleTimeString().toLowerCase()}</td>
          <td><div class = "reservation-visit-button" id = ${reserve.id}>
          <a href = "../detail/?adventure=${reserve.adventure}"> Visit Adventure </a></div></td>`;

      
  reservationTable.appendChild(reserveEle);
  });
 
}

export { fetchReservations, addReservationToTable };
