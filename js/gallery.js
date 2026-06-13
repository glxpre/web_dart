/* ============================================================
   gallery.js — 队员照片墙 + 灯箱
   - 数据驱动渲染队员卡片
   - 灯箱弹出、切换、关闭
   ============================================================ */
(function () {
  'use strict';

  /* ────────────────────────────────────────────────
     队员数据
     - photo: images/members/ 下的文件名或外部 URL（空字符串显示首字母头像）
     - 添加新队员：在对应赛季的数组中新增一条记录即可
     - TODO: 补充更多队员信息（姓名、职责、赛季、座右铭、照片）
     ──────────────────────────────────────────────── */
  var members = [
    // ====== 2025-2026 赛季 ======
    {
      name: '丁瑞',
      role: '机械结构',
      season: '2025-2026 赛季',
      photo: 'images/members/ding-rui.jpg',
      quote: '精益求精，造最稳的发射架。'
    },
    {
      name: '王泽惠',
      role: '电控',
      season: '2025-2026 赛季',
      photo: 'images/members/wang-zehui.png',
      quote: '让每一发都精准命中。'
    }
    // TODO: 继续添加更多队员...
  ];

  /* ── 渲染照片墙 ── */
  var grid = document.getElementById('members-grid');
  if (!grid) return;

  // 按赛季分组
  var seasons = {};
  members.forEach(function (m) {
    if (!seasons[m.season]) {
      seasons[m.season] = [];
    }
    seasons[m.season].push(m);
  });

  // 按赛季倒序渲染
  var seasonKeys = Object.keys(seasons).sort().reverse();
  var memberIndex = 0; // 全局索引，用于灯箱导航

  seasonKeys.forEach(function (season) {
    // 赛季标题
    var seasonHeader = document.createElement('div');
    seasonHeader.className = 'members-season';
    seasonHeader.textContent = season;
    grid.appendChild(seasonHeader);

    // 队员卡片
    seasons[season].forEach(function (m, i) {
      var card = document.createElement('div');
      card.className = 'member-card reveal';
      card.setAttribute('data-index', memberIndex);

      // 照片或占位
      var photoHtml;
      if (m.photo) {
        photoHtml = '<img src="' + m.photo + '" alt="' + m.name + '" class="member-card__photo" loading="lazy">';
      } else {
        var initial = m.name.charAt(0);
        photoHtml = '<div class="member-card__photo member-card__photo--placeholder">' + initial + '</div>';
      }

      card.innerHTML =
        photoHtml +
        '<h3 class="member-card__name">' + m.name + '</h3>' +
        '<p class="member-card__role">' + m.role + '</p>' +
        '<p class="member-card__season">' + m.season + '</p>' +
        '<p class="member-card__quote">"' + m.quote + '"</p>';

      card.addEventListener('click', function () {
        var idx = parseInt(this.getAttribute('data-index'), 10);
        openLightbox(idx);
      });

      grid.appendChild(card);
      memberIndex++;
    });
  });

  /* ── 灯箱逻辑 ── */
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightbox-img');
  var lightboxInfo = document.getElementById('lightbox-info');
  var currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    var m = members[index];

    if (m.photo) {
      lightboxImg.src = m.photo;
      lightboxImg.alt = m.name;
      lightboxImg.style.display = '';
      // 隐藏无照片占位符
      var wrapper = lightbox.querySelector('.lightbox__image-wrapper');
      var placeholder = wrapper.querySelector('.lightbox__placeholder');
      if (placeholder) {
        placeholder.style.display = 'none';
      }
    } else {
      // 无照片：显示占位
      lightboxImg.src = '';
      lightboxImg.alt = m.name + '（无照片）';
      lightboxImg.style.display = 'none';
      // 在 image-wrapper 中加文字占位
      var wrapper = lightbox.querySelector('.lightbox__image-wrapper');
      var placeholder = wrapper.querySelector('.lightbox__placeholder');
      if (!placeholder) {
        placeholder = document.createElement('div');
        placeholder.className = 'lightbox__placeholder';
        wrapper.appendChild(placeholder);
      }
      placeholder.style.display = 'flex';
      placeholder.textContent = m.name.charAt(0);
    }

    lightboxInfo.innerHTML =
      '<p class="lightbox__name">' + m.name + '</p>' +
      '<p class="lightbox__role">' + m.role + '</p>' +
      '<p class="lightbox__season">' + m.season + '</p>' +
      '<p class="lightbox__quote">"' + m.quote + '"</p>';

    lightbox.classList.add('lightbox--open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('lightbox--open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    // 恢复图片显示
    lightboxImg.style.display = '';
    var placeholder = lightbox.querySelector('.lightbox__placeholder');
    if (placeholder) {
      placeholder.style.display = 'none';
    }
  }

  function prevMember() {
    currentIndex = (currentIndex - 1 + members.length) % members.length;
    openLightbox(currentIndex);
  }

  function nextMember() {
    currentIndex = (currentIndex + 1) % members.length;
    openLightbox(currentIndex);
  }

  // 关闭按钮
  lightbox.querySelector('.lightbox__close').addEventListener('click', closeLightbox);

  // 点击遮罩关闭
  lightbox.querySelector('.lightbox__overlay').addEventListener('click', closeLightbox);

  // 上下张
  lightbox.querySelector('.lightbox__prev').addEventListener('click', prevMember);
  lightbox.querySelector('.lightbox__next').addEventListener('click', nextMember);

  // 键盘操作
  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('lightbox--open')) return;
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowLeft') {
      prevMember();
    } else if (e.key === 'ArrowRight') {
      nextMember();
    }
  });

  // 移动端滑动
  var touchStartX = 0;
  lightbox.addEventListener('touchstart', function (e) {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  lightbox.addEventListener('touchend', function (e) {
    var diff = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        prevMember();
      } else {
        nextMember();
      }
    }
  });
})();
