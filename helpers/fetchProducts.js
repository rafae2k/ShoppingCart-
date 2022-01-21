const fetchProducts = async (product) => {
  const productURL = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;

  try {
    const response = await fetch(productURL);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Produto não encontrado');
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
