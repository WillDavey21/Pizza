let cart = JSON.parse(localStorage.getItem('cart')) || []

function updateCartUI() {
  const cartCount = document.querySelector('#cart-count')
  if (cartCount) cartCount.textContent = cart.length

  const cartItems = document.querySelector('#cart-items')
  const total = document.querySelector('#total')

  if (cartItems && total) {
    cartItems.innerHTML = ''
    let sum = 0

    cart.forEach(item => {
      const div = document.createElement('div')
      div.textContent = `${item.name} — ${item.price} грн`
      cartItems.appendChild(div)
      sum += item.price
    })

    total.textContent = sum
  }

  localStorage.setItem('cart', JSON.stringify(cart))
}

function updatePizza(id) {
  const sizeInput = document.querySelector(`#size-${id}`)
  const extraCheckbox = document.querySelector(`#extra-${id}`)
  const priceLabel = document.querySelector(`#price-${id}`)

  const size = parseInt(sizeInput.value)
  const extra = extraCheckbox.checked
  const newPrice = size + (extra ? 20 : 0)
  priceLabel.textContent = newPrice
}

function addCustomPizza(name) {
  const id = name.toLowerCase().replace(' ', '')
  const sizeInput = document.querySelector(`#size-${id}`)
  const extraCheckbox = document.querySelector(`#extra-${id}`)

  const size = parseInt(sizeInput.value)
  const extra = extraCheckbox.checked
  const price = size + (extra ? 20 : 0)

  const labelSize = size === 120 || size === 130 || size === 135 || size === 140 ? 'Мал.'
                  : size === 150 || size === 160 || size === 165 || size === 170 ? 'Сер.'
                  : 'Вел.'

  const fullName = `${name} (${labelSize}${extra ? ', з сиром' : ''})`

  cart.push({ name: fullName, price })
  updateCartUI()
  alert(`${fullName} додано до кошика!`)
}

document.querySelector('body').addEventListener('DOMContentLoaded', updateCartUI)
