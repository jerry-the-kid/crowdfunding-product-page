const cta = document.querySelector('.cta');
const body = document.querySelector('body');
const logo = document.querySelector('.logo');
const navbar = document.querySelector('.navbar');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const overlay1 = document.querySelector('.overlay--1');
const btnMain = document.querySelector('.btn--big');
const modalClose = document.querySelector('.modal__close');
const modalBoxes = document.querySelectorAll('.modal__box');
const checkContainer = document.querySelectorAll('.modal__check');
const modalContainer = document.querySelector('.modal-container');
const btnActiveContainer = document.querySelectorAll('.btn--active');
const bookmarkIcon = document.querySelector('.bookmark-section__icon');
const inputBoxContainer = document.querySelectorAll('.modal__input-box');
const bookmarkIconBox = document.querySelector('.bookmark-section__icon-box');
const successModal = document.querySelector('.success-modal');
const navItems = document.querySelector('.navbar__items');
const hamburger = document.querySelector('.hamburger');
// Navbar Handler

// console.log(navItems.style.maxHeight);
const navbarFunction = function () {
  const handleMouseEvent = function (e, opacity) {
    if (e.target.classList.contains('navbar__link')) {
      const link = e.target;
      const links = link.closest('.navbar').querySelectorAll('.navbar__link');
      links.forEach(element => {
        if (element !== link) {
          element.style.opacity = this;
        }
      });
    }
  };

  const toggleNavbar = function () {
    if (navItems.style.maxHeight) {
      navItems.style.maxHeight = null;
      hamburger.src = 'images/icon-hamburger.svg';
    } else {
      navItems.style.maxHeight = navItems.scrollHeight + 'px';
      hamburger.src = 'images/icon-close-menu.svg';
    }

    overlay1.classList.toggle('hidden');
    body.classList.toggle('no-scrolling');
  };

  hamburger.addEventListener('click', function () {
    toggleNavbar();
  });

  document.querySelectorAll('.navbar__link').forEach(link =>
    link.addEventListener('click', function () {
      toggleNavbar();
    })
  );

  overlay1.addEventListener('click', function () {
    toggleNavbar();
  });

  navbar.addEventListener('mouseover', handleMouseEvent.bind(0.5));

  navbar.addEventListener('mouseout', handleMouseEvent.bind(1));
};

//Bookmark handle
const bookmarkFunction = function () {
  const checkTextContent = function (value) {
    if (value === 'Bookmark') {
      bookmarkIconBox.textContent = 'Bookmarked';
      bookmarkIconBox.style.color = 'hsl(176, 72%, 28%)';
    } else if (value === 'Bookmarked') {
      bookmarkIconBox.textContent = 'Bookmark';
      bookmarkIconBox.style.color = 'hsl(0, 0%, 48%)';
    }
  };

  const toggleBookmark = function () {
    bookmarkIcon.querySelector('circle').classList.toggle('fill-green');
    bookmarkIcon.querySelector('path').classList.toggle('fill-white');
    checkTextContent(bookmarkIconBox.textContent);
  };

  bookmarkIcon.addEventListener('click', toggleBookmark);
  bookmarkIconBox.addEventListener('click', toggleBookmark);
};

//Form Handler
const modalFunction = function () {
  const toggleFunction = function () {
    modalContainer.classList.toggle('hidden');
    setTimeout(() => modal.classList.toggle('modal-up'), 100);
    body.classList.toggle('no-scrolling');
    reset();
  };

  const toggleSuccessModal = function () {
    overlay.classList.toggle('hidden');
    successModal.classList.toggle('hidden');
    setTimeout(() => successModal.classList.toggle('success-modal-up'), 100);
    body.classList.toggle('no-scrolling');
  };

  const reset = function () {
    inputBoxContainer.forEach(e => e.classList.remove('active'));
    checkContainer.forEach(e => e.setAttribute('aria-checked', false));
    modalBoxes.forEach(e => e.classList.remove('border-active'));
  };

  const toggleCheck = function (node, target) {
    if (node.classList.contains('active'))
      target.setAttribute('aria-checked', true);
    if (!node.classList.contains('active'))
      target.setAttribute('aria-checked', false);
  };

  const focusInputBox = function (input) {
    input.focus();
    const val = input.value;
    input.value = '';
    input.value = val;
  };

  const active = function (targetBox) {
    if (targetBox.classList.contains('disable')) return;

    const inputBox = targetBox.querySelector('.modal__input-box');
    const check = targetBox.querySelector('.modal__check');
    const input = targetBox.querySelector('.modal__input');
    const modalBox = targetBox.closest('.modal__box');

    reset();

    modalBox.classList.add('border-active');
    inputBox.classList.add('active');
    toggleCheck(inputBox, check);
    focusInputBox(input);
  };

  modal.addEventListener('click', function (e) {
    const targetBox = e.target.closest('.modal__box');
    if (!targetBox) return;
    active(targetBox);
  });

  modal.addEventListener('click', function (e) {
    const targetBtn = e.target.closest('.modal__btn');
    if (!targetBtn) return;
    const number = targetBtn.dataset.btn;

    const parentBtn = targetBtn.parentNode;
    const input = parentBtn.querySelector('.modal__input');

    if (+input.value < +input.min) {
      alert(`Pledge ${input.min} or more. Please try again`);
    }
    if (+input.value >= +input.min) {
      toggleFunction();
      toggleSuccessModal();

      if (number) {
        const text = document.querySelector(`.left--${number}`);
        const html = `${text.textContent.slice(0, -4) - 1}<span>left</span>`;
        text.innerHTML = html;
      }
    }
  });

  btnMain.addEventListener('click', function () {
    toggleFunction();
    modalContainer.scrollTop = 0;
  });
  modalClose.addEventListener('click', toggleFunction);
  modalContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('modal-container')) toggleFunction();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modalContainer.classList.contains('hidden'))
      toggleFunction();
    if (e.key === 'Escape' && !successModal.classList.contains('hidden'))
      toggleSuccessModal();
  });

  btnActiveContainer.forEach(btn =>
    btn.addEventListener('click', function (e) {
      toggleFunction();
      const targetBox = document.querySelector(
        `.modal__box--${e.target.dataset.modal}`
      );
      active(targetBox);
    })
  );

  // document.querySelector('.logo').addEventListener('click', toggleSuccessModal);
  overlay.addEventListener('click', function () {
    if (!successModal.classList.contains('hidden')) toggleSuccessModal();
  });

  document.querySelector('.got-it').addEventListener('click', function () {
    toggleSuccessModal();
  });
};

navbarFunction();
bookmarkFunction();
modalFunction();
