/* ============================================================
   main.js — 标签页切换 + 滚动动画 + URL hash 同步
   ============================================================ */
(function () {
  'use strict';

  /* ────────────────────────────────────────────────
     标签页 (Tab) 组件
     ──────────────────────────────────────────────── */

  // 查找页面中所有的标签页组
  var tabGroups = document.querySelectorAll('.tabs');

  tabGroups.forEach(function (tabGroup) {
    var buttons = tabGroup.querySelectorAll('.tabs__btn');
    // 查找同级或后续的 tab-content
    var contentContainer = tabGroup.nextElementSibling;
    if (!contentContainer || !contentContainer.classList.contains('tab-content')) {
      // 也可能在 tabGroup 的父级之后
      contentContainer = tabGroup.parentElement.querySelector('.tab-content');
    }
    if (!contentContainer) return;

    var panes = contentContainer.querySelectorAll('.tab-pane');

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var tabName = btn.getAttribute('data-tab');

        // 更新按钮状态
        buttons.forEach(function (b) {
          b.classList.remove('tabs__btn--active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('tabs__btn--active');
        btn.setAttribute('aria-selected', 'true');

        // 更新面板
        panes.forEach(function (pane) {
          pane.classList.remove('tab-pane--active');
        });
        var target = contentContainer.querySelector('#tab-' + tabName);
        if (target) {
          target.classList.add('tab-pane--active');
        }

        // 更新 URL hash
        if (history.pushState) {
          history.pushState(null, null, '#' + tabName);
        }
      });
    });
  });

  /* ────────────────────────────────────────────────
     页面加载时根据 URL hash 激活对应标签
     ──────────────────────────────────────────────── */
  function activateTabFromHash() {
    var hash = window.location.hash.replace('#', '');
    if (!hash) return;

    tabGroups.forEach(function (tabGroup) {
      var buttons = tabGroup.querySelectorAll('.tabs__btn');
      var targetBtn = null;

      buttons.forEach(function (btn) {
        if (btn.getAttribute('data-tab') === hash) {
          targetBtn = btn;
        }
      });

      if (targetBtn) {
        targetBtn.click();
        // 滚动到标签所在 section
        var section = tabGroup.closest('.section');
        if (section) {
          setTimeout(function () {
            section.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      }
    });
  }
  activateTabFromHash();

  // 浏览器前进/后退时响应
  window.addEventListener('hashchange', activateTabFromHash);

  /* ────────────────────────────────────────────────
     滚动入场动画 (IntersectionObserver)
     ──────────────────────────────────────────────── */
  var revealElements = document.querySelectorAll('.reveal');

  if (revealElements.length > 0 && 'IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          // 出现后不再观察
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    });

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // 降级：不支持 IntersectionObserver 时直接显示
    revealElements.forEach(function (el) {
      el.classList.add('revealed');
    });
  }

  /* ────────────────────────────────────────────────
     平滑滚动（CSS smooth 已处理，此处分段增强）
     ──────────────────────────────────────────────── */

  // 点击锚链接时手动滚动（确保 scroll-padding-top 生效）
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var targetId = link.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
})();
