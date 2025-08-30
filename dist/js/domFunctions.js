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

const updateWeatherLocationHeader = (msg) => {
  const locationHeader = document.getElementById('currentForecast__location')
  locationHeader.textContent = msg
}

const updateScreenReaderConfirmation = (msg) => {
  const confirmation = document.getElementById('confirmation')
  confirmation.textContent = msg
}
