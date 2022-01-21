const fetchItem = async (id) => {
  const productId = `https://api.mercadolibre.com/items/${id}`;

  try {
    const response = await fetch(productId);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Produto não encontrado');
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
