import CurrentLocation from './CurrentLocation.js'
import { addSpinner, displayError } from './domFunctions.js'
import { setLocationObject } from './dataFunctions.js'

const currentLoc = new CurrentLocation()

const initApp = () => {
  // add listeners
  const geoButton = document.getElementById('getLocation')
  geoButton.addEventListener('click', getGeoWeather)
  // set up
  // load weather
}

document.addEventListener('DOMContentLoaded', initApp)

const getGeoWeather = (event) => {
  if (event) {
    if (event.type === 'click') {
      const mapIcon = document.querySelector('.fa-map-marker-alt')
      addSpinner(mapIcon)
    }

    if (!navigator.geolocation) return geoError()
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError)
  }
}

const geoError = (errObj) => {
  const errMsg = errObj.message ? errObj.message : 'Geolocation not supported'
  displayError(errMsg, errMsg)
}

const geoSuccess = (position) => {
  const myCoordsObj = {
    lat: position.coords.latitude,
    lon: position.coords.longitude,
    name: `Lat: ${position.coords.latitude}, Lon: ${position.coords.longitude}`
  }
  // set location object
  setLocationObject(currentLoc, myCoordsObj)
  console.log(currentLoc)
  //update data and display
  updateDataAndDisplay(currentLoc)
}

const updateDataAndDisplay = async(locationObj)
