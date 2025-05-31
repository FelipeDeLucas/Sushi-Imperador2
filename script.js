// Filtro do cardápio
document.querySelectorAll('.filtro-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.filtro-btn').forEach(b => b.classList.remove('ativo'));
    this.classList.add('ativo');
    const categoria = this.dataset.categoria;
    document.querySelectorAll('.cardapio .item').forEach(item => {
      if (categoria === 'todos' || item.dataset.categoria === categoria) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// Modal de detalhes
document.querySelectorAll('.detalhes-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const item = this.closest('.item');
    item.classList.toggle('ativo');
  });
});

// Formulário de pedido (apenas exibe alerta)
document.querySelector('.pedido-form')?.addEventListener('submit', function(e) {
  e.preventDefault();
  alert('Pedido enviado! Entraremos em contato em breve.');
  this.reset();
});

 // Dark/Light mode toggle
    const btn = document.getElementById('toggle-theme');
    const icon = document.getElementById('theme-icon');
    function setTheme(dark) {
      document.body.classList.toggle('dark-mode', dark);
      icon.textContent = dark ? '☀️' : '🌙';
      localStorage.setItem('sushi-theme', dark ? 'dark' : 'light');
    }
    btn.addEventListener('click', () => {
      setTheme(!document.body.classList.contains('dark-mode'));
    });
    // Load theme from storage
    if (localStorage.getItem('sushi-theme') === 'dark') setTheme(true);