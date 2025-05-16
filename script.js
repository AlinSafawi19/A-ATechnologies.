document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll('nav ul li a');
  const currentPath = window.location.pathname;
  const contactForm = document.getElementById("contact-form");
  const hamburger = document.querySelector('.hamburger');
  const navList = document.querySelector('nav ul');

  // Add hamburger click handler
  if (hamburger) {
    hamburger.addEventListener('click', function () {
      navList.classList.toggle('active');
    });
  }

  links.forEach(link => {
    const linkPath = link.getAttribute('href').replace(/\/$/, '');
    const normalizedCurrentPath = currentPath.replace(/\/$/, '');

    link.classList.remove('active');

    if (linkPath === '') {
      // Home link should only be active if current path is empty or '/'
      if (normalizedCurrentPath === '') {
        link.classList.add('active');
      }
    } else {
      // For other links, check if current path starts with linkPath
      if (normalizedCurrentPath === linkPath || normalizedCurrentPath.startsWith(linkPath + '/')) {
        link.classList.add('active');
      }
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

      var Airtable = require('airtable');
      var base = new Airtable({ apiKey: 'patVwXbR9ZnaEp1TX.352999e3bbf9c0286db19ef4bfb6af227348c8b54d12c26774413c6102a9096d' }).base('appwWxBWqcSL51NSQ');

      base('AA Technologies').create([
        {
          "fields": {
            "Name": name.value.trim(),
            "Email": email.value.trim(),
            "Message": message.value.trim()
          }
        }
      ], { typecast: true }, function (err, records) {
        if (err) {
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
          return;
        }
        records.forEach(function (record) {
          Swal.fire({
            icon: 'success',
            html: `
              <p><strong>Your message was sent successfully!</strong></p>
              <p>We'll get back to you shortly.</p>
              <p>In the meantime, feel free to <a href="mailto:aa_techpartners@outlook.com" target="_blank">contact us</a> or <a href="https://calendly.com/your-booking-link" target="_blank">book a meeting</a>.</p>
            `,
            timer: 8000,
            position: 'top-end',
            customClass: {
              popup: 'swal'
            },
            showConfirmButton: false,
            timerProgressBar: true
          });
        });
      });

    });
  }
});

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
  var parallaxabout = document.querySelector('.parallax-about');
  var parallaxquote = document.querySelector('.quote-parallax');
  var parallaxservices = document.querySelector('.hero-services');
  var parallaxindex = document.querySelector('.hero-section');

  if (parallaxabout) {  // Check if the element exists
    parallaxabout.style.backgroundPosition = 'center ' + (scrollPosition * 0.5) + 'px';
  } else if (parallaxquote) {
    parallaxquote.style.backgroundPosition = 'center ' + (scrollPosition * 0.5) + 'px';
  } else if (parallaxservices) {
    parallaxservices.style.backgroundPosition = 'center ' + (scrollPosition * 0.5) + 'px';
  } else if (parallaxindex) {
    parallaxindex.style.backgroundPosition = 'center ' + (scrollPosition * 0.5) + 'px';
  }
});

const scrollUpButton = document.getElementById('scroll-up');

window.addEventListener('scroll', function () {
  if (window.scrollY > 100) {
    scrollUpButton.style.display = 'flex';
  } else {
    scrollUpButton.style.display = 'none';
  }
});

scrollUpButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

  (function(d, t) {
      var v = d.createElement(t), s = d.getElementsByTagName(t)[0];
      v.onload = function() {
        window.voiceflow.chat.load({
          verify: { projectID: '68267aa3c6a18bbcfc972b58' },
          url: 'https://general-runtime.voiceflow.com',
          versionID: 'production'
        });
      }
      v.src = "https://cdn.voiceflow.com/widget/bundle.mjs"; v.type = "text/javascript"; s.parentNode.insertBefore(v, s);
  })(document, 'script');
