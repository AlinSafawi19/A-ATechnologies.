/** @type {any} */
const emailjs = window.emailjs;

// Initialize EmailJS
emailjs.init("DNKL5Eeim93uS2_Qx");

document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll('nav ul li a');
  const currentPage = window.location.pathname.split("/").pop();
  const contactForm = document.getElementById("contact-form");

  links.forEach(link => {
    // Remove 'active' class from all links first
    link.classList.remove('active');

    // Add 'active' class to the current page's link
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const name = document.querySelector('input[name="name"]');
      const email = document.querySelector('input[name="email"]');
      const message = document.querySelector('textarea[name="message"]');

      if (!name.value.trim()) {
        Swal.fire({
          icon: 'warning',
          text: 'Please enter your name.',
          timer: 2000,
          position: 'top-end',
          customClass: {
            popup: 'swal'
          },
          showConfirmButton: false,
          timerProgressBar: true
        });
        name.focus();
        return;
      }

      if (!email.value.trim()) {
        Swal.fire({
          icon: 'warning',
          text: 'Please enter your email.',
          timer: 2000,
          position: 'top-end',
          customClass: {
            popup: 'swal'
          },
          showConfirmButton: false,
          timerProgressBar: true
        });
        email.focus();
        return;
      }

      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(email.value)) {
        Swal.fire({
          icon: 'warning',
          text: 'Please enter a valid email address.',
          timer: 2000,
          position: 'top-end',
          customClass: {
            popup: 'swal'
          },
          showConfirmButton: false,
          timerProgressBar: true
        });
        email.focus();
        return;
      }

      if (!message.value.trim()) {
        Swal.fire({
          icon: 'warning',
          text: 'Please enter your message.',
          timer: 2000,
          position: 'top-end',
          customClass: {
            popup: 'swal'
          },
          showConfirmButton: false,
          timerProgressBar: true
        });
        message.focus();
        return;
      }

      var form = this;
      const user_id = "DNKL5Eeim93uS2_Qx";

      // Send the form without the logo attachment
      emailjs.sendForm('service_cvttpdm', 'template_a7kti6r', form, user_id)
        .then(function () {
          Swal.fire({
            icon: 'success',
            text: 'Message sent successfully!',
            timer: 1000,
            position: 'top-end',
            customClass: {
              popup: 'swal'
            },
            showConfirmButton: false,
            timerProgressBar: true
          });
          form.reset();
        })
        .catch(function () {
          Swal.fire({
            icon: 'error',
            text: 'Please try again. If the issue persists, contact us at aa_techpartners@outlook.com or call one of these numbers +961 7 692 9993 | +961 7 188 2088.',
            timer: 10000,
            position: 'top-end',
            customClass: {
              popup: 'swal'
            },
            showConfirmButton: false,
            timerProgressBar: true
          });
        });
    });
  }
});

function toggleMenu() {
  const navList = document.querySelector('nav ul');
  navList.classList.toggle('active');
}

// Close the menu if a click is detected outside of it
document.addEventListener('click', function (event) {
  const navList = document.querySelector('nav ul');
  const hamburger = document.querySelector('.hamburger');

  // Check if the click was outside of the menu and the hamburger icon
  if (!navList.contains(event.target) && !hamburger.contains(event.target)) {
    navList.classList.remove('active');
  }
});

document.addEventListener('scroll', function () {
  var scrollPosition = window.scrollY;
  var parallax = document.querySelector('.parallax-about');

  if (parallax) {  // Check if the element exists
    parallax.style.backgroundPosition = 'center ' + (scrollPosition * 0.5) + 'px';
  }
});