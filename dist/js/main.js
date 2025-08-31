import CurrentLocation from './CurrentLocation.js'
import {
  addSpinner,
  displayError,
  updateScreenReaderConfirmation
} from './domFunctions.js'
import { setLocationObject, getHomeLocation } from './dataFunctions.js'

const currentLoc = new CurrentLocation()

const initApp = () => {
  // add listeners
  const geoButton = document.getElementById('getLocation')
  geoButton.addEventListener('click', getGeoWeather)
  const homeButton = document.getElementById('home')
  homeButton.addEventListener('click', loadWeather)
  const saveButton = document.getElementById('saveLocation')
  saveButton.addEventListener('click', saveLocation)
  // set up
  // load weather
}

document.addEventListener('DOMContentLoaded', initApp)

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

const loadWeather = (event) => {
  const savedLocation = getHomeLocation()
  if (!savedLocation && !event) return getGeoWeather()
  if (!savedLocation && event.type === 'click') {
    displayError(
      'No Home Location Saved.',
      'Sorry. Please save your home location first'
    )
  } else if (savedLocation && !event) {
    displayHomeLocationWeather(savedLocation)
  } else {
    const homeIcon = document.querySelector('.fa-home')
    addSpinner(homeIcon)
    displayHomeLocationWeather(savedLocation)
  }
}

const displayHomeLocationWeather = (home) => {
  if (typeof home === 'string') {
    const locationJson = JSON.parse(home)
    const myCoordsObj = {
      lat: locationJson.lat,
      lon: locationJson.lon,
      name: locationJson.name,
      unit: locationJson.unit
    }
    setLocationObject(currentLoc, myCoordsObj)
    updateDataAndDisplay(currentLoc)
  }
}

const saveLocation = () => {
  if (currentLoc.getLat() || currentLoc.getLon()) {
    const saveIcon = document.querySelector('.fa-save')
    addSpinner(saveIcon)
    const location = {
      lat: currentLoc.getLat(),
      lon: currentLoc.getLon(),
      name: currentLoc.getName(),
      unit: currentLoc.getUnit()
    }
    localStorage.setItem('defaultWeatherLocation', JSON.stringify(location))
    updateScreenReaderConfirmation(
      `Saved ${currentLoc.getName()} as home location`
    )
  }
}

const updateDataAndDisplay = async (locationObj) => {
  console.log(locationObj)
  // const weatherJson = await getWeatherFromCoords(locationObj)
  // if (weatherJson.cod && weatherJson.cod !== 200) {
  //   const errMsg = weatherJson.message
  //     ? weatherJson.message
  //     : 'Error getting weather'
  //   displayError(errMsg, errMsg)
  //   return
  // }
}
