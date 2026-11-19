const nav = document.getElementById('nav');
const secciones = document.querySelectorAll('main section');

// Menú generado a partir de los títulos
secciones.forEach(s => {
  const a = document.createElement('a');
  a.href = '#' + s.id;
  a.textContent = s.querySelector('h2').textContent;
  nav.appendChild(a);
});

// Buscador de temas
document.getElementById('buscar').addEventListener('input', e => {
  const q = e.target.value.toLowerCase();
  nav.querySelectorAll('a').forEach(a => {
    a.style.display = a.textContent.toLowerCase().includes(q) ? '' : 'none';
  });
});

// Tema claro / oscuro
const raiz = document.documentElement;
try { if (localStorage.getItem('tema') === 'oscuro') raiz.dataset.tema = 'oscuro'; } catch (e) {}
document.getElementById('tema').addEventListener('click', () => {
  const oscuro = raiz.dataset.tema === 'oscuro';
  raiz.dataset.tema = oscuro ? 'claro' : 'oscuro';
  try { localStorage.setItem('tema', raiz.dataset.tema); } catch (e) {}
});

// Barra de avance y enlace activo
const barra = document.getElementById('progreso');
const texto = document.getElementById('porcentaje');
function actualizar() {
  const max = document.documentElement.scrollHeight - innerHeight;
  const p = max > 0 ? Math.min(100, Math.round(scrollY / max * 100)) : 0;
  barra.style.width = p + '%';
  texto.textContent = p + ' % leído';
  let actual = '';
  secciones.forEach(s => { if (s.getBoundingClientRect().top < 150) actual = s.id; });
  nav.querySelectorAll('a').forEach(a => a.classList.toggle('activo', a.hash === '#' + actual));
}
addEventListener('scroll', actualizar);
actualizar();