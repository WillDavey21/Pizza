let cart = JSON.parse(localStorage.getItem('cart')) || []

function updateCartUI() {
  const cartCountElements = document.querySelectorAll('#cart-count')
  cartCountElements.forEach(el => el.textContent = cart.length)

  const cartItems = document.querySelector('#cart-items')
  const total = document.querySelector('#total')

  if (cartItems && total) {
    cartItems.innerHTML = ''
    let sum = 0

    cart.forEach((item, index) => {
      const div = document.createElement('div')
      div.textContent = `${item.name} — ${item.price} грн`
      cartItems.appendChild(div)
      sum += item.price
    })

    total.textContent = sum

    
    const clearBtn = document.createElement('button')
    clearBtn.textContent = 'Очистити кошик'
    clearBtn.style.marginTop = '20px'
    clearBtn.style.background = '#ccc'
    clearBtn.style.border = 'none'
    clearBtn.style.padding = '10px 16px'
    clearBtn.style.borderRadius = '6px'
    clearBtn.style.cursor = 'pointer'
    clearBtn.onclick = () => {
      if (confirm('Очистити всі товари з кошика?')) {
        clearCart()
      }
    }

    cartItems.appendChild(clearBtn)
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
  const nameToId = {
    'Маргарита': 'margarita',
    'Пепероні': 'peperoni',
    'Овочева': 'veggie',
    'Грибна': 'mushroom'
  }

  const id = nameToId[name]
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
  alert(`${fullName} додано до кошика`)
}

function clearCart() {
  cart = []
  updateCartUI()
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartUI()

  const form = document.querySelector('#order-form')
  if (form) {
    const fieldSelectors = [
      '#first-name',
      '#last-name',
      '#email',
      '#phone',
      '#street',
      '#house',
      '#flat'
    ]

   
    fieldSelectors.forEach(selector => {
      const input = document.querySelector(selector)
      input.addEventListener('input', () => {
        if (!input.checkValidity()) {
          input.style.border = '2px solid red'
        } else {
          input.style.border = ''
        }
      })
    })

    form.addEventListener('submit', function (e) {
      e.preventDefault()

      let valid = true

      fieldSelectors.forEach(selector => {
        const input = document.querySelector(selector)
        if (!input.checkValidity()) {
          input.style.border = '2px solid red'
          valid = false
        } else {
          input.style.border = ''
        }
      })

      if (!valid) {
        alert('Будь ласка, заповніть усі поля коректно')
        return
      }

      const name = document.querySelector('#first-name').value.trim()
      const address = `${document.querySelector('#street').value.trim()}, буд. ${document.querySelector('#house').value.trim()}, кв. ${document.querySelector('#flat').value.trim()}`

      alert(`Дякуємо, ${name}! Ваше замовлення буде доставлено на: ${address}`)

      clearCart()
      form.reset()
    })
  }
})

