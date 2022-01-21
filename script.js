const cartItems = document.querySelector('.cart__items');

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

const handleAddToCart = async (sku) => {
  const items = document.querySelectorAll('.cart__items');
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

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  cartItems.removeChild(event.target);
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);

  cartItems.appendChild(li);

  return li;
}

const renderItems = async () => {
  const { results } = await fetchProducts('computador');
  results.forEach((product) => createProductItemElement(product));
};

window.onload = () => {
  renderItems();
};
