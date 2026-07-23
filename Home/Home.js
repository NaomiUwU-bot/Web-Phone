    // Lọc sản phẩm theo thương hiệu
    const tabs = document.querySelectorAll('#filterTabs button');
    const cards = document.querySelectorAll('#productGrid .product-card');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const filter = tab.dataset.filter;
        cards.forEach(card => {
          card.style.display = (filter === 'all' || card.dataset.brand === filter) ? 'flex' : 'none';
        });
      });
    });

    // Toggle yêu thích
    document.querySelectorAll('.wish-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        btn.classList.toggle('active');
        btn.textContent = btn.classList.contains('active') ? '♥' : '♡';
      });
    });


    // Them Header va Footer
    fetch("../Components/Header.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("header").innerHTML = data;
    });

    fetch("../Components/Footer.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("footer").innerHTML = data;
    });

    