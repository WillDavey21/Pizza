let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartUI() {

  const countElements = document.querySelectorAll('#cart-count');
  countElements.forEach(el => el.textContent = cart.length);

  const cartItems = document.querySelector('#cart-items');
  const total = document.querySelector('#total');

  if (cartItems && total) {
    cartItems.innerHTML = '';
    let sum = 0;

    cart.forEach(item => {
      const div = document.createElement('div');
      div.textContent = `${item.name} — ${item.price} грн`;
      cartItems.appendChild(div);
      sum += item.price;
    });

    total.textContent = sum;

    if (cart.length > 0) {
      const clearBtn = document.createElement('button');
      clearBtn.textContent = 'Очистити кошик';
      clearBtn.style.marginTop = '20px';
      clearBtn.onclick = () => {
        if (confirm('Очистити всі товари з кошика?')) {
          clearCart();
        }
      };
      cartItems.appendChild(clearBtn);
    }
  }

  localStorage.setItem('cart', JSON.stringify(cart));
}

function updatePizza(id) {
  const sizeInput = document.querySelector(`#size-${id}`);
  const extraCheckbox = document.querySelector(`#extra-${id}`);
  const priceLabel = document.querySelector(`#price-${id}`);

  const size = parseInt(sizeInput.value);
  const extra = extraCheckbox.checked;
  const newPrice = size + (extra ? 20 : 0);
  priceLabel.textContent = newPrice;
}

function addCustomPizza(name) {
 const nameToId = {
  'Маргарита': 'margarita',
  'Пепероні': 'peperoni',
  'Овочева': 'veggie',
  'Грибна': 'mushroom',
  'Гавайська': 'hawaii',
  '4 сири': 'cheese'
};

  const id = nameToId[name];
  const sizeInput = document.querySelector(`#size-${id}`);
  const extraCheckbox = document.querySelector(`#extra-${id}`);

  const size = parseInt(sizeInput.value);
  const extra = extraCheckbox.checked;
  const price = size + (extra ? 20 : 0);

  const labelSize = (size <= 140) ? 'Мал.' : (size <= 170) ? 'Сер.' : 'Вел.';
  const fullName = `${name} (${labelSize}${extra ? ', з сиром' : ''})`;

  cart.push({ name: fullName, price });
  updateCartUI();
  alert(`${fullName} додано до кошика`);
}

function clearCart() {
  cart = [];
  updateCartUI();
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartUI();

  const form = document.querySelector('#order-form');
  if (form) {
    const fields = ['#first-name', '#last-name', '#email', '#phone', '#street', '#house', '#flat'];

    fields.forEach(selector => {
      const input = document.querySelector(selector);
      input.addEventListener('input', () => {
        input.style.border = input.checkValidity() ? '' : '2px solid red';
      });
    });

    form.addEventListener('submit', e => {
      e.preventDefault();

      let valid = true;
      fields.forEach(selector => {
        const input = document.querySelector(selector);
        if (!input.checkValidity()) {
          input.style.border = '2px solid red';
          valid = false;
        } else {
          input.style.border = '';
        }
      });

      if (!valid) {
        alert('Будь ласка, заповніть усі поля коректно');
        return;
      }

      const name = document.querySelector('#first-name').value.trim();
      const address = `${document.querySelector('#street').value.trim()}, буд. ${document.querySelector('#house').value.trim()}, кв. ${document.querySelector('#flat').value.trim()}`;

      alert(`Дякуємо, ${name}! Ваше замовлення буде доставлено на: ${address}`);

      clearCart();
      form.reset();
    });
  }
});


