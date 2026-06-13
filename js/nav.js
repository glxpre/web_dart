/* ============================================================
   nav.js — 导航栏交互
   - 滚动时导航阴影
   - 移动端汉堡菜单
   - IntersectionObserver 高亮当前 Section
   ============================================================ */
(function () {
  'use strict';

  const nav = document.getElementById('nav');
  const hamburger = nav.querySelector('.nav__hamburger');
  const menu = nav.querySelector('.nav__menu');
  const links = nav.querySelectorAll('.nav__link');

  // 动态创建遮罩层
  let overlay = document.querySelector('.nav__overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'nav__overlay';
    document.body.appendChild(overlay);
  }

  /* ── 滚动阴影 ── */
  function onScroll() {
    if (window.scrollY > 50) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  // 初始检查
  onScroll();

  /* ── 汉堡菜单切换 ── */
  function openMenu() {
    menu.classList.add('nav__menu--open');
    overlay.classList.add('nav__overlay--open');
    hamburger.classList.add('nav__hamburger--active');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    menu.classList.remove('nav__menu--open');
    overlay.classList.remove('nav__overlay--open');
    hamburger.classList.remove('nav__hamburger--active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', function () {
    if (menu.classList.contains('nav__menu--open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // 点击遮罩关闭
  overlay.addEventListener('click', closeMenu);

  // 点击导航链接关闭
  links.forEach(function (link) {
    link.addEventListener('click', function () {
      if (menu.classList.contains('nav__menu--open')) {
        closeMenu();
      }
    });
  });

  // ESC 关闭
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu.classList.contains('nav__menu--open')) {
      closeMenu();
    }
  });

  /* ── IntersectionObserver：高亮当前 Section ── */
  const sections = [];
  const sectionIds = ['info', 'system', 'members'];
  sectionIds.forEach(function (id) {
    const el = document.getElementById(id);
    if (el) sections.push(el);
  });

  if (sections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          links.forEach(function (link) {
            link.classList.remove('nav__link--active');
            if (link.getAttribute('href') === '#' + id) {
              link.classList.add('nav__link--active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }
})();
