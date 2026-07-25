// Đếm ngược Flash Sale (demo)
    let totalSeconds = 5*3600 + 42*60 + 10;
    const h = document.getElementById('cd-h');
    const m = document.getElementById('cd-m');
    const s = document.getElementById('cd-s');
    setInterval(() => {
      if(totalSeconds <= 0){ totalSeconds = 6*3600; }
      totalSeconds--;
      const hh = Math.floor(totalSeconds/3600);
      const mm = Math.floor((totalSeconds%3600)/60);
      const ss = totalSeconds%60;
      h.textContent = String(hh).padStart(2,'0');
      m.textContent = String(mm).padStart(2,'0');
      s.textContent = String(ss).padStart(2,'0');
    }, 1000);

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
