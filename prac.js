const userTab =document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const userContainer = document.querySelector(".weather-container");

const grantAccessContainer = document.querySelector(".grant-location-container");
const searchForm = document.querySelector("[data-searchForm]");
const loadingScreen = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".user-info-container");
const errorscreens = document.querySelector(".errorscreen");

let oldTab =userTab;
const API_KEY ="d1845658f92b31c64bd94f06f7188c9c";
oldTab.classList.add('current-tab');

function switchTab(newTab){
    if(newTab !=oldTab){
        oldTab.classList.remove("current-tab"); 
        oldTab =newTab;
        oldTab.classList.add("current-tab");
       if(!searchForm.classList.contains("active")) {
            //kya search form wala container is invisible, if yes then make it visible
            userInfoContainer.classList.remove("active");
            grantAccessContainer.classList.remove("active");
            searchForm.classList.add("active");
        }
        else {
            //main pehle search wale tab pr tha, ab your weather tab visible karna h 
            searchForm.classList.remove("active");
            userInfoContainer.classList.remove("active");
            //ab main your weather tab me aagya hu, toh weather bhi display karna poadega, so let's check local storage first
            //for coordinates, if we haved saved them there.
            getfromSessionStorage();
        }
    }
}
userTab.addEventListener("click",() =>{
    switchTab(userTab)
});
searchTab.addEventListener("click", () =>{
    switchTab(searchTab)
});
function getfromSessionStorage(){
    const localCoordinates =sessionStorage.getItem("user-coordinates");
    if(!localCoordinates){
        grantAccessButton.classList.add("active")
    }
    else{
        const coordinates =JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
    }
}

async function fetchUserWeatherInfo(coordinates){
    const {lat,lon} =coordinates;
    grantAccessButton.classList.remove("active");
    loadingScreen.classList.add("active");
    try{
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
          );
        const  data = await response.json();

        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);        
    }
    catch(err){

    }
}
const grantAccessButton =document.querySelector("[data-grantAccess");
grantAccessButton.addEventListener("click",getLocation);

function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }
  
  function showPosition(position) {
   const usercoordinates ={
    lat:position.coords.latitude,
    lon: position.coords.longitude,
   }
    sessionStorage.setItem("user-coordinates" ,JSON.stringify(usercoordinates));
    fetchUserWeatherInfo(usercoordinates);
  }

  const searchInput =document.querySelector("[data-searchInput");
  searchForm.addEventListener("submit",(e) =>{
    e.preventDefault;
    let cityName =searchInput.value;
    fetchUserWeatherInfo(cityName);
  })

  async function fetchUserWeatherInfo(city){
    loadingScreen.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantAccessContainer.classList.remove("active");   
    try{
        let response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
          );
          if(!response.ok){
            loadingScreen.classList.remove("active");
            
          } 
    }
    catch(err){

    }
  }