const cartItems = document.querySelector('.cart__items');
const totalPrice = document.querySelector('.total-price');
let total = 0;

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function getPriceFromProductItem(item) {
  const regex = /(?<=PRICE:\s\$)[\dA-Z](.*)/;
  return item.innerText.match(regex)[0] * 1;
}

const updateSumTotalCost = (ItemPrice) => {
  total += ItemPrice;
  totalPrice.innerText = total;
};

const updateSubTotalCost = (ItemPrice) => {
  total -= ItemPrice;
  totalPrice.innerText = total;
};

function cartItemClickListener(event) {
  updateSubTotalCost(getPriceFromProductItem(event.target));
  cartItems.removeChild(event.target);
  saveCartItems(cartItems.innerHTML);
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);

  cartItems.appendChild(li);

  saveCartItems(cartItems.innerHTML);
  updateSumTotalCost(getPriceFromProductItem(li));

  return li;
}

const handleAddToCart = async (sku) => {
  const item = await fetchItem(sku);
  createCartItemElement(item);
};

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const items = document.querySelector('.items');
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));

  const addItem = createCustomElement(
    'button',
    'item__add',
    'Adicionar ao carrinho!',
  );
  addItem.addEventListener('click', () => handleAddToCart(sku));
  section.appendChild(addItem);
  items.appendChild(section);

  return section;
}

const renderItems = async () => {
  const { results } = await fetchProducts('computador');
  results.forEach((product) => createProductItemElement(product));
};

const handleCartLocalStorage = () => {
  cartItems.innerHTML = getSavedCartItems('cartItems');
  const li = document.querySelectorAll('.cart__item');
  li.forEach((item) => {
    item.addEventListener('click', cartItemClickListener);
    updateSumTotalCost(getPriceFromProductItem(item));
  });
};

window.onload = () => {
  handleCartLocalStorage();
  renderItems();
};
