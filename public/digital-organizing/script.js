/* ============================================================
   Digital Organizing — OCD Experience
   Standalone JavaScript (no framework dependencies)
   ============================================================ */

(function () {
  'use strict';

  // --- Mobile menu toggle ---
  var menuBtn = document.getElementById('mobileMenuBtn');
  var mobileMenu = document.getElementById('mobileMenu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', function () {
      var isOpen = mobileMenu.classList.toggle('open');
      // Swap hamburger / X icon
      menuBtn.innerHTML = isOpen
        ? '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>'
        : '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>';
    });

    // Close menu when a link is clicked
    var menuLinks = mobileMenu.querySelectorAll('a');
    for (var i = 0; i < menuLinks.length; i++) {
      menuLinks[i].addEventListener('click', function () {
        mobileMenu.classList.remove('open');
        menuBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>';
      });
    }
  }

  // --- FAQ accordion ---
  var faqItems = document.querySelectorAll('.do-faq__item');

  for (var j = 0; j < faqItems.length; j++) {
    (function (item) {
      var questionBtn = item.querySelector('.do-faq__question');
      if (!questionBtn) return;

      questionBtn.addEventListener('click', function () {
        var isOpen = item.classList.contains('open');

        // Close all items first
        for (var k = 0; k < faqItems.length; k++) {
          faqItems[k].classList.remove('open');
        }

        // Toggle the clicked item
        if (!isOpen) {
          item.classList.add('open');
        }
      });
    })(faqItems[j]);
  }

  // --- Smooth scroll for anchor links (fallback for older browsers) ---
  var anchorLinks = document.querySelectorAll('a[href^="#"]');
  for (var m = 0; m < anchorLinks.length; m++) {
    anchorLinks[m].addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var navHeight = document.querySelector('.do-nav') ? document.querySelector('.do-nav').offsetHeight : 0;
        var targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  }

  // --- Nav background opacity on scroll ---
  var nav = document.querySelector('.do-nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        nav.style.background = 'rgba(15, 23, 42, 0.95)';
      } else {
        nav.style.background = 'rgba(15, 23, 42, 0.85)';
      }
    });
  }

})();
