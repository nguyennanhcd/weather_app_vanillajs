export const setPlaceholderText = () => {
  const input = document.getElementById('searchBar__text')
  window.innerWidth < 400
    ? (input.placeholder = 'City, State, Country')
    : (input.placeholder = 'City, State, Country, or Zip Code')
}

export const addSpinner = (element) => {
  animateButton(element)
  setTimeout(animateButton, 1000, element)
}

const animateButton = (element) => {
  element.classList.toggle('none')
  element.nextElementSibling.classList.toggle('block')
  element.nextElementSibling.classList.toggle('none')
}

export const displayError = (headerMsg, srMsg) => {
  updateWeatherLocationHeader(headerMsg)
  updateScreenReaderConfirmation(srMsg)
}

export const displayApiError = (statusCode) => {
  const properMsg = toProperCase(statusCode.message)
  updateWeatherLocationHeader(properMsg)
  updateScreenReaderConfirmation(`${properMsg}. Please try again.`)
}

const toProperCase = (text) => {
  const words = text.split(' ')
  const properWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1)
  })
  return properWords.join(' ')
}

const updateWeatherLocationHeader = (msg) => {
  const locationHeader = document.getElementById('currentForecast__location')
  locationHeader.textContent = msg
}

export const updateScreenReaderConfirmation = (msg) => {
  const confirmation = document.getElementById('confirmation')
  confirmation.textContent = msg
}

export const updateDisplay = (weatherJson, locationObj) => {
  fadeDisplay()
  clearDisplay()
  const weatherClass = getWeatherClass(weatherJson.current.weather[0].icon)
  setBGImage(weatherClass)
  const screenReaderWeather = buildScreenReaderWeather(weatherJson, locationObj)
  updateScreenReaderConfirmation(screenReaderWeather)
  updateWeatherLocationHeader(locationObj.getName())
  // current conditions
  const ccArray = createCurrentConditionsDivs(
    weatherJson,
    locationObj.getUnit()
  )
  displayCurrentConditions(ccArray)
  setFocusOnSearch()
  fadeDisplay()
}

const fadeDisplay = () => {
  const cc = document.getElementById('currentForecast')
  cc.classList.toggle('zero-vis')
  cc.classList.toggle('fade-in')
  const sixDay = document.getElementById('dailyForecast')
  sixDay.classList.toggle('zero-vis')
  sixDay.classList.toggle('fade-in')
}

const clearDisplay = () => {
  const currentConditions = document.getElementById(
    'currentForecast__conditions'
  )
  deleteContents(currentConditions)
  const sixDayForecast = document.getElementById('dailyForecast__contents')
  deleteContents(sixDayForecast)
}

const deleteContents = (parentElement) => {
  let child = parentElement.lastElementChild
  while (child) {
    parentElement.removeChild(child)
    child = parentElement.lastElementChild
  }
}

const getWeatherClass = (icon) => {
  const firstTwoChars = icon.slice(0, 2)
  const lastChar = icon.slice(2)
  const weatherLookup = {
    '09': 'snow',
    10: 'rain',
    11: 'rain',
    13: 'snow',
    50: 'fog'
  }
  let weatherClass
  if (weatherLookup[firstTwoChars]) {
    weatherClass = weatherLookup[firstTwoChars]
  } else if (lastChar === 'd') {
    weatherClass = 'clouds'
  } else {
    weatherClass = 'night'
  }
  return weatherClass
}

const setBGImage = (weatherClass) => {
  document.documentElement.classList.add(weatherClass)
  document.documentElement.classList.forEach((img) => {
    if (img !== weatherClass) {
      document.documentElement.classList.remove(img)
    }
  })
}

const buildScreenReaderWeather = (weatherJson, locationObj) => {
  const location = locationObj.getName()
  const unit = locationObj.getUnit()
  const tempUnit = unit === 'imperial' ? 'F' : 'C'
  return `${weatherJson.current.weather[0].description} and ${Math.round(
    Number(weatherJson.current.temp)
  )}°${tempUnit} in ${location}`
}

const setFocusOnSearch = () => {
  const searchInput = document.getElementById('searchBar__text')
  searchInput.focus()
}

const createCurrentConditionsDivs = (weatherObj, unit) => {
  const tempUnit = unit === 'imperial' ? 'F' : 'C'
  const windUnit = unit === 'imperial' ? 'mph' : 'm/s'
  const icon = createMainImgDiv(
    weatherObj.current.weather[0].icon,
    weatherObj.current.weather[0].description
  )

  const temp = createElem(
    'div',
    'temp',
    `${Math.round(Number(weatherObj.current.temp))}°`
  )
  const properDesc = toProperCase(weatherObj.current.weather[0].description)
  const desc = createElem('div', 'desc', properDesc)
  const feels = createElem(
    'div',
    'feels',
    `Feels Like ${Math.round(Number(weatherObj.current.feels_like))}°`
  )
  const maxTemp = createElem(
    'div',
    'maxtemp',
    `High ${Math.round(Number(weatherObj.daily[0].temp.max))}°`
  )
  const minTemp = createElem(
    'div',
    'mintemp',
    `Low ${Math.round(Number(weatherObj.daily[0].temp.min))}°`
  )

  const humidity = createElem(
    'div',
    'humidity',
    `Humidity ${weatherObj.current.humidity}%`
  )
  const wind = createElem(
    'div',
    'wind',
    `Wind ${Math.round(Number(weatherObj.current.wind_speed))} ${windUnit}`
  )
  return [icon, temp, desc, feels, maxTemp, minTemp, humidity, wind]
}

const createMainImgDiv = (icon, altText) => {
  const iconDiv = createElem('div', 'icon')
  iconDiv.id = 'icon'
  const falcon = translateIconToFontAwesome(icon)
  falcon.ariaHidden = true
  falcon.title = altText
  iconDiv.appendChild(falcon)
  return iconDiv
}

const createElem = (elemType, divClassName, divText, unit) => {
  const div = document.createElement(elemType)
  div.className = divClassName
  if (divText) {
    div.textContent = divText
  }
  if (divClassName === 'temp') {
    const unitDiv = document.createElement('div')
    unitDiv.classList.add('unit')
    unitDiv.textContent = unit
    div.appendChild(unitDiv)
  }
  return div
}

const translateIconToFontAwesome = (icon) => {
  const i = document.createElement('i')
  const firstTwoChars = icon.slice(0, 2)
  const lastChar = icon.slice(2)
  switch (firstTwoChars) {
    case '01':
      if (lastChar === 'd') {
        i.classList.add('far', 'fa-sun')
      } else {
        i.classList.add('far', 'fa-moon')
      }
      break
    case '02':
      if (lastChar === 'd') {
        i.classList.add('fas', 'fa-cloud-sun')
      } else {
        i.classList.add('fas', 'fa-cloud-moon')
      }
      break
    case '03':
      i.classList.add('fas', 'fa-cloud')
      break
    case '04':
      i.classList.add('fas', 'fa-cloud-meatball')
      break
    case '09':
      i.classList.add('fas', 'fa-cloud-rain')
      break
    case '10':
      if (lastChar === 'd') {
        i.classList.add('fas', 'fa-cloud-sun-rain')
      } else {
        i.classList.add('fas', 'fa-cloud-moon-rain')
      }
      break
    case '11':
      i.classList.add('fas', 'fa-poo-storm')
      break
    case '13':
      i.classList.add('far', 'fa-snowflake')
      break
    case '50':
      i.classList.add('fas', 'fa-smog')
      break
    default:
      i.classList.add('far', 'fa-question-circle')
  }
  return i
}

const displayCurrentConditions = (currentConditionsArray) => {
  const ccContainer = document.getElementById('current Forecast_conditions')
  currentConditionsArray.forEach((cc) => {
    ccContainer.appendChild(cc)
  })
}
