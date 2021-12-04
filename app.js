const tbody = document.querySelector('tbody')
const h1 = document.querySelector('h1')

const toastBody = document.querySelector('div#liveToast div div.toast-body')
const toastLiveExample = document.getElementById('liveToast')

document.addEventListener('click', (evt) => {
  const textCopied = evt.target.parentElement.dataset.macAddress

  const options = {
    animatio: true,
    delay: 1000
  }

  if (evt.target.parentElement.dataset.macAddress) {
    const toast = new bootstrap.Toast(toastLiveExample, options)
    navigator.clipboard.writeText(textCopied)
    toastBody.innerText = `${textCopied} copied to clipboard`
    toast.show()
  }
})

h1.addEventListener('click', (evt) => {
  const lat = 123
  const lon = 543
  const data = {lat, lon}

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }

  fetch('http://localhost:3000/post', options)
  .then(res => res.json())
  .then(macList => {
    tbody.innerHTML = ""
    for(const [index, mac] of macList.entries()) {
      tbody.innerHTML += `
          <tr data-mac-address="${mac.mac_address}">
            <th scope="row">${index+1}</th>
            <td>${mac.mac_address}</td>
            <td>${mac.name}</td>
          </tr>
      `
    }
  })
})

fetch(`https://almaduri-mac-address-api.herokuapp.com/getmacs`)
  .then(res => res.json())
  .then(macList => {
    for(const [index, mac] of macList.entries()) {
      tbody.innerHTML += `
          <tr data-mac-address="${mac.mac_address}">
            <th scope="row">${index+1}</th>
            <td>${mac.mac_address}</td>
            <td>${mac.name}</td>
          </tr>
      `
    }
  })