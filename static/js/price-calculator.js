(() => {
  const quantityInput = document.getElementById('qty');
  const resultOutput = document.getElementById('res');

  function getPriceInKopecks(quantity) {
    const discountSteps = Math.floor(Math.max(0, quantity - 10000) / 1000);
    return Math.max(695, 1000 - discountSteps * 5);
  }

  function formatPrice(amount) {
    return amount.toLocaleString('ru-RU', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  function updatePrice() {
    const quantity = Math.floor(Number(quantityInput.value));

    if (!Number.isFinite(quantity) || quantity < 1) {
      resultOutput.textContent = '\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043a\u043e\u043b\u0438\u0447\u0435\u0441\u0442\u0432\u043e';
      return;
    }

    const unitPrice = getPriceInKopecks(quantity);
    const totalPrice = quantity * unitPrice;
    resultOutput.replaceChildren(
      document.createTextNode('\u0426\u0435\u043d\u0430 \u0437\u0430 1 \u0448\u0442.: '),
      createPriceElement(unitPrice),
      document.createTextNode(' \u00b7 \u0421\u0443\u043c\u043c\u0430: '),
      createPriceElement(totalPrice)
    );
  }

  function createPriceElement(priceInKopecks) {
    const price = document.createElement('b');
    price.textContent = formatPrice(priceInKopecks / 100) + ' \u20bd';
    return price;
  }

  quantityInput.addEventListener('input', updatePrice);
  updatePrice();
})();
