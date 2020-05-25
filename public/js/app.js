const weatherForm = document.querySelector('form')
const inputElement = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const weatherImage = document.querySelector('#weather-icon')

// messageOne.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = inputElement.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            messageOne.textContent = `${data.error}`
        } else {
            console.log(data.image)
            messageOne.textContent = `${data.location}`
            messageTwo.textContent = `${data.response}`
            weatherImage.setAttribute('src', data.image)
            
        }
    })
})
})