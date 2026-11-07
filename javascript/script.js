document.addEventListener('DOMContentLoaded', function () {
  const header = document.querySelector('header');
  const menuToggle = document.querySelector('.menu-toggle');
  const navigation = document.getElementById('primary-navigation');

  if (header && menuToggle && navigation) {
    const menuLabel = menuToggle.querySelector('.menu-toggle-label');
    const setMenuOpen = isOpen => {
      header.classList.toggle('menu-open', isOpen);
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      if (menuLabel) {
        menuLabel.textContent = isOpen ? 'Close' : 'Menu';
      }
    };

    header.classList.add('has-mobile-menu');
    menuToggle.addEventListener('click', () => {
      setMenuOpen(menuToggle.getAttribute('aria-expanded') !== 'true');
    });

    navigation.addEventListener('click', event => {
      if (event.target.closest('a')) {
        setMenuOpen(false);
      }
    });

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && header.classList.contains('menu-open')) {
        setMenuOpen(false);
        menuToggle.focus();
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 700) {
        setMenuOpen(false);
      }
    });
  }

  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    const updateBackToTop = () => {
      backToTop.hidden = window.scrollY <= 200;
    };
    window.addEventListener('scroll', updateBackToTop, { passive: true });
    updateBackToTop();
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const emailUser = 'info.jazhieldesigns';
  const emailDomain = 'gmail.com';
  const fullEmail = `${emailUser}@${emailDomain}`;

  ['footer-email', 'privacy-email-1', 'privacy-email-2', 'contact-email'].forEach(id => {
    const emailLink = document.getElementById(id);
    if (emailLink) {
      emailLink.href = `mailto:${fullEmail}`;
      emailLink.textContent = fullEmail;
    }
  });

  const contactPhoneLink = document.getElementById('contact-phone');
  if (contactPhoneLink) {
    const phone = ['704', '561', '1937'];
    contactPhoneLink.href = `tel:${phone.join('')}`;
    contactPhoneLink.textContent = phone.join(' ');
  }

  const loadableImages = document.querySelectorAll('.hero-art img, .gallery img, .service-image');
  loadableImages.forEach(img => {
    const finishLoading = loaded => {
      img.classList.remove('image-loading');
      img.classList.add(loaded ? 'image-loaded' : 'image-load-error');
    };

    img.addEventListener('load', () => finishLoading(true), { once: true });
    img.addEventListener('error', () => finishLoading(false), { once: true });

    if (img.complete) {
      finishLoading(img.naturalWidth > 0);
    } else {
      img.classList.add('image-loading');
    }
  });

  const galleryImages = document.querySelectorAll('.gallery img');
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modalImg');
  const modalClose = document.getElementById('modalClose');
  const modalDesc = document.getElementById('modalDesc');
  let lastFocusedImage = null;

  if (galleryImages.length > 0 && modal && modalImg && modalClose) {
    const openGalleryImage = img => {
      lastFocusedImage = img;
      modalImg.src = img.src;
      modalImg.alt = img.alt;
      if (modalDesc) {
        modalDesc.textContent = img.getAttribute('data-description') || '';
      }
      modal.setAttribute('aria-hidden', 'false');
      modal.classList.add('active');
      modalClose.focus();
    };

    const closeGalleryImage = () => {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
      modalImg.src = '';
      modalImg.alt = '';
      if (modalDesc) {
        modalDesc.textContent = '';
      }
      if (lastFocusedImage && lastFocusedImage.isConnected) {
        lastFocusedImage.focus();
      }
    };

    galleryImages.forEach(img => {
      img.addEventListener('click', () => openGalleryImage(img));
      img.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openGalleryImage(img);
        }
      });
    });

    modalClose.addEventListener('click', closeGalleryImage);

    modal.addEventListener('click', event => {
      if (event.target === modal) {
        closeGalleryImage();
      }
    });

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && modal.classList.contains('active')) {
        closeGalleryImage();
      }
    });
  }

  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const animatedElements = document.querySelectorAll('.animated-fadein, .animated-fadein-slow, .animated-slideup');
    if (animatedElements.length > 0) {
      document.body.classList.add('motion-enabled');
      const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      });
      animatedElements.forEach(element => revealObserver.observe(element));
    }
  }
});
