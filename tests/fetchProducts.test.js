require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  it('1. Teste se fetchProducts é uma função', () => {
    expect.assertions(1);
    expect(fetchProducts instanceof Function).toBe(true);
  });
  it('2. Execute a função fetchProducts com o argumento "computador" e teste se fetch foi chamada', async () => {
    expect.assertions(1);
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
  it('3. Ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint https://api.mercadolibre.com/sites/MLB/search?q=computador', async () => {
    expect.assertions(1);
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(url);
  });
  it('4. O retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch, que já está importado no arquivo.', async () => {
    expect.assertions(1);
    await expect(fetchProducts('computador')).resolves.toBe(computadorSearch);
  });
  it('5. Ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url.', async () => {
    expect.assertions(1);
    try {
      await fetchProducts();
    } catch (error) {
      expect(error).toEqual(new Error('Produto não encontrado'));
    }
  });
});
