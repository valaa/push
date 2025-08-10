(function() {
  const products = [
    { id: 1, name: 'Space Helmet', price: 49.99, image: 'Bubble-Nebula.jpg' },
    { id: 2, name: 'Moon Boots', price: 79.5, image: 'Bubble-Nebula.jpg' },
    { id: 3, name: 'Galactic T-shirt', price: 19.99, image: 'Bubble-Nebula.jpg' }
  ];

  let cart = JSON.parse(localStorage.getItem('cart') || '[]');

  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  function renderProducts() {
    const list = $('#product-list');
    list.empty();
    products.forEach(p => {
      const card = $('<div class="col s12 m4"></div>');
      const inner = $(
        '<div class="card product-card">' +
        '  <div class="card-image"><img src="' + p.image + '" alt="' + p.name + '"></div>' +
        '  <div class="card-content"><span class="card-title">' + p.name + '</span><p>$' + p.price.toFixed(2) + '</p></div>' +
        '  <div class="card-action"><a href="#" class="add-to-cart" data-id="' + p.id + '">Add to cart</a></div>' +
        '</div>'
      );
      card.append(inner);
      list.append(card);
    });
  }

  function renderCart() {
    const items = $('#cart-items');
    items.empty();
    let total = 0;
    cart.forEach((item, index) => {
      total += item.price;
      items.append(
        '<li class="collection-item">' +
        item.name + ' - $' + item.price.toFixed(2) +
        ' <a href="#" class="secondary-content remove-item" data-index="' + index + '"><i class="material-icons">close</i></a></li>'
      );
    });
    $('#cart-total').text('Total: $' + total.toFixed(2));
    $('#cart-count').text(cart.length);
  }

  $(document).on('click', '.add-to-cart', function(e) {
    e.preventDefault();
    const id = $(this).data('id');
    const product = products.find(p => p.id === id);
    if (product) {
      cart.push(product);
      saveCart();
      renderCart();
    }
  });

  $(document).on('click', '.remove-item', function(e) {
    e.preventDefault();
    const index = $(this).data('index');
    cart.splice(index, 1);
    saveCart();
    renderCart();
  });

  renderProducts();
  renderCart();
})();
