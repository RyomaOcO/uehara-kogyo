(function () {
  var header = document.getElementById('header');
  var pagetop = document.getElementById('pagetop');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // スマホ用メニューの開閉
  var menuBtn = document.getElementById('menuBtn');
  var gnav = document.getElementById('gnav');

  function setMenu(open) {
    gnav.classList.toggle('is-open', open);
    header.classList.toggle('is-menu-open', open);
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    menuBtn.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
    document.body.style.overflow = open ? 'hidden' : '';
  }

  menuBtn.addEventListener('click', function () {
    setMenu(!gnav.classList.contains('is-open'));
  });

  gnav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () { setMenu(false); });
  });

  // スクロールでヘッダーを白背景に・ページトップボタンを表示
  function onScroll() {
    header.classList.toggle('is-scrolled', window.scrollY > 40);
    pagetop.classList.toggle('is-show', window.scrollY > 600);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // スクロールで要素をふわっと表示
  if (reduceMotion || !('IntersectionObserver' in window)) return;

  var targets = document.querySelectorAll(
    '.heading, .lead, .about__text, .about__photo, .numbers li, .service-item, .strength-item, .work-card, .flow-step, .recruit__inner, .company__inner, .contact__tel'
  );
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px' });

  targets.forEach(function (el) {
    el.classList.add('js-fade');
    observer.observe(el);
  });
})();
