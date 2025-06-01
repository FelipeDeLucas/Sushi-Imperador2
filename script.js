// Menu mobile acessível
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.getElementById('nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', function () {
    const expanded = navLinks.classList.toggle('ativo');
    navToggle.setAttribute('aria-expanded', expanded);
  });
}

// Tema claro/escuro com persistência
const themeBtn = document.getElementById('toggle-theme');
const themeIcon = document.getElementById('theme-icon');
function setTheme(dark) {
  document.body.classList.toggle('dark-mode', dark);
  if (themeIcon) themeIcon.textContent = dark ? '☀️' : '🌙';
  localStorage.setItem('sushi-theme', dark ? 'dark' : 'light');
}
if (themeBtn && themeIcon) {
  // Inicializa tema salvo
  const saved = localStorage.getItem('sushi-theme');
  setTheme(saved === 'dark');
  themeBtn.addEventListener('click', () => {
    setTheme(!document.body.classList.contains('dark-mode'));
  });
}

// Filtro do cardápio acessível
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
      item.style.display = (categoria === 'todos' || item.dataset.categoria === categoria) ? '' : 'none';
    });
  });
});

// Modal de detalhes com overlay e acessibilidade
let overlay = document.querySelector('.modal-overlay');
if (!overlay) {
  overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  document.body.appendChild(overlay);
}
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
// Fechar modal com ESC
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    document.querySelectorAll('.item').forEach(i => i.classList.remove('ativo'));
    overlay.classList.remove('ativo');
  }
});

// Formulário de pedido (exemplo simples)
document.querySelector('.pedido-form')?.addEventListener('submit', function (e) {
  e.preventDefault();
  alert('Pedido enviado! Entraremos em contato em breve.');
  this.reset();
});

// Botão voltar ao topo
const btnTopo = document.getElementById('voltar-topo');
window.addEventListener('scroll', () => {
  if (btnTopo) btnTopo.style.display = window.scrollY > 300 ? 'block' : 'none';
});
if (btnTopo) {
  btnTopo.addEventListener('click', () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  });
}