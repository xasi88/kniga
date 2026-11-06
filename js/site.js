// Появление разделов при прокрутке и кнопка «Купить книгу» внизу экрана на телефоне
(function () {
  var reveal = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    reveal.forEach(function (el) { el.classList.add('seen'); });
    return;
  }

  var io = new IntersectionObserver(function (items) {
    items.forEach(function (it) {
      if (it.isIntersecting) {
        it.target.classList.add('seen');
        io.unobserve(it.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px' });
  reveal.forEach(function (el) { io.observe(el); });

  // Кнопка видна, когда первый экран и раздел «Где купить» ушли с экрана
  var dock = document.querySelector('.dock');
  var hero = document.querySelector('.hero');
  var buy = document.getElementById('buy');
  if (!dock || !hero || !buy) return;
  var seen = { hero: true, buy: false };
  var watch = new IntersectionObserver(function (items) {
    items.forEach(function (it) {
      seen[it.target === hero ? 'hero' : 'buy'] = it.isIntersecting;
    });
    var on = !seen.hero && !seen.buy;
    dock.classList.toggle('on', on);
    dock.setAttribute('aria-hidden', on ? 'false' : 'true');
    dock.tabIndex = on ? 0 : -1;
  });
  watch.observe(hero);
  watch.observe(buy);
})();
