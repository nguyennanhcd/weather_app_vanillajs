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
