// Navbar responsiva (hambúrguer)
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.getElementById('nav-links');
if (navToggle) {
  navToggle.addEventListener('click', function () {
    const expanded = navLinks.classList.toggle('ativo');
    navToggle.setAttribute('aria-expanded', expanded);
  });
}

// Filtro do cardápio
document.querySelectorAll('.filtro-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    document.querySelectorAll('.filtro-btn').forEach(b => {
      b.classList.remove('ativo');
      b.setAttribute('aria-selected', 'false');
    });
    this.classList.add('ativo');
    this.setAttribute('aria-selected', 'true');
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

// Modal de detalhes com overlay
const overlay = document.createElement('div');
overlay.className = 'modal-overlay';
document.body.appendChild(overlay);

document.querySelectorAll('.detalhes-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    const item = this.closest('.item');
    document.querySelectorAll('.item').forEach(i => i.classList.remove('ativo'));
    item.classList.add('ativo');
    overlay.classList.add('ativo');
    // Foco acessível
    setTimeout(() => {
      item.querySelector('.detalhes-modal .fechar-modal').focus();
    }, 100);
  });
});
document.querySelectorAll('.fechar-modal').forEach(btn => {
  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    this.closest('.item').classList.remove('ativo');
    overlay.classList.remove('ativo');
  });
});
overlay.addEventListener('click', () => {
  document.querySelectorAll('.item').forEach(i => i.classList.remove('ativo'));
  overlay.classList.remove('ativo');
});

// Formulário de pedido (apenas exibe alerta)
document.querySelector('.pedido-form')?.addEventListener('submit', function (e) {
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
if (localStorage.getItem('sushi-theme') === 'dark') setTheme(true);

// Botão voltar ao topo
const voltarTopo = document.getElementById('voltar-topo');
window.addEventListener('scroll', () => {
  if (window.scrollY > 200) {
    voltarTopo.style.display = 'block';
  } else {
    voltarTopo.style.display = 'none';
  }
});
voltarTopo.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});