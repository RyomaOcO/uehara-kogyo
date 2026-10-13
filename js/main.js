(function () {
  // スマホ用メニューの開閉
  var menuBtn = document.getElementById('menuBtn');
  var gnav = document.getElementById('gnav');

  function setMenu(open) {
    gnav.classList.toggle('is-open', open);
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

  // ページ上部へ戻るボタン
  var pagetop = document.getElementById('pagetop');
  window.addEventListener('scroll', function () {
    pagetop.classList.toggle('is-show', window.scrollY > 600);
  }, { passive: true });

  // スクロールで要素をふわっと表示
  if (!('IntersectionObserver' in window)) return;

  var targets = document.querySelectorAll(
    '.section__title, .section__desc, .about__text, .num-card, .biz-card, .work-card, .strength-item, .flow-step, .recruit__inner, .company__inner'
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
