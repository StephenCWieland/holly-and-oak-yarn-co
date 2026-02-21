// Holly & Oak Yarn Co. — navigation, gallery lightbox, back-to-top

document.addEventListener('DOMContentLoaded', function () {
  // Smooth scroll for in-page links
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var id = this.getAttribute('href');
      if (id === '#') return;
      var target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        var isPlanVisit = anchor.id === 'hero-cta';
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (isPlanVisit) {
          var card = document.querySelector('.contact-card');
          if (card) {
            setTimeout(function () {
              card.classList.add('is-highlighted');
              setTimeout(function () { card.classList.remove('is-highlighted'); }, 1200);
            }, 500);
          }
        }
      }
    });
  });

  // Gallery lightbox
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = lightbox && lightbox.querySelector('.lightbox-content img');
  var lightboxClose = lightbox && lightbox.querySelector('.lightbox-close');
  var galleryItems = document.querySelectorAll('[data-gallery]');

  function openLightbox(src, alt) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = alt || 'Gallery image';
    lightbox.removeAttribute('hidden');
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    lightboxClose.focus();
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('hidden', '');
    document.body.style.overflow = '';
  }

  if (galleryItems.length) {
    galleryItems.forEach(function (item) {
      var img = item.querySelector('img');
      if (!img || img.style.display === 'none') return;
      item.setAttribute('tabindex', '0');
      item.addEventListener('click', function () {
        openLightbox(img.src, img.alt);
      });
      item.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(img.src, img.alt);
        }
      });
    });
  }

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lightbox.classList.contains('is-open')) {
        closeLightbox();
      }
    });
  }

  // Hero: click to open in lightbox (except when clicking the CTA link)
  var heroBlock = document.querySelector('[data-hero]');
  if (heroBlock) {
    var heroImg = heroBlock.querySelector('img');
    if (heroImg && heroImg.style.display !== 'none') {
      heroBlock.addEventListener('click', function (e) {
        if (e.target.closest('a')) return;
        openLightbox(heroImg.src, heroImg.alt);
      });
    }
    if (!heroImg || !heroImg.complete || heroImg.naturalWidth === 0) {
      heroBlock.classList.add('hero-image-failed');
    }
    heroImg && heroImg.addEventListener('error', function () {
      heroBlock.classList.add('hero-image-failed');
    });
  }

  // Back to top
  var backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    function onScroll() {
      if (window.scrollY > 400) {
        backToTop.classList.add('is-visible');
      } else {
        backToTop.classList.remove('is-visible');
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
