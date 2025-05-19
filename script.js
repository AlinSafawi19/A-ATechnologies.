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

      const firstname = contactForm.querySelector('input[name="firstname"]');
      const lastname = contactForm.querySelector('input[name="lastname"]');
      const email = contactForm.querySelector('input[name="email"]');
      const service = contactForm.querySelector('select[name="service"]');
      const budget = contactForm.querySelector('input[name="budget"]');
      const projectDetails = contactForm.querySelector('textarea[name="project-details"]');
      const deadline = contactForm.querySelector('input[name="deadline"]');
      const hostingYes = contactForm.querySelector('input[name="hosting"][value="yes"]');
      const hostingNo = contactForm.querySelector('input[name="hosting"][value="no"]');
      const submitBtn = contactForm.querySelector('button[type="submit"]');

      function showWarning(message, field) {
        Swal.fire({
          icon: 'warning',
          text: message,
          timer: 2500,
          position: 'top-end',
          customClass: { popup: 'swal' },
          showConfirmButton: false,
          timerProgressBar: true
        });
        field.focus();
      }

      if (!firstname.value.trim()) {
        showWarning('Please enter your firstname.', firstname);
        return;
      }

      if (!lastname.value.trim()) {
        showWarning('Please enter your lastname.', lastname);
        return;
      }

      if (!email.value.trim()) {
        showWarning('Please enter your email.', email);
        return;
      }

      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(email.value.trim())) {
        showWarning('Please enter a valid email address.', email);
        return;
      }

      if (!service.value) {
        showWarning('Please select a service.', service);
        return;
      }

      if (!budget.value.trim() || Number(budget.value) < 1) {
        showWarning('Please enter a valid budget.', budget);
        return;
      }

      if (!projectDetails.value.trim()) {
        showWarning('Please describe your project.', projectDetails);
        return;
      }

      if (!deadline.value.trim()) {
        showWarning('Please enter your project timeline.', deadline);
        return;
      }

      if (!hostingYes.checked && !hostingNo.checked) {
        Swal.fire({
          icon: 'warning',
          text: 'Please select if you need hosting and email.',
          timer: 2500,
          position: 'top-end',
          customClass: { popup: 'swal' },
          showConfirmButton: false,
          timerProgressBar: true
        });
        hostingYes.focus();
        return;
      }

      submitBtn.disabled = true;
      submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i>`;


      fetch("https://api.airtable.com/v0/appwWxBWqcSL51NSQ/AA%20Technologies", {
        method: "POST",
        headers: {
          "Authorization": "Bearer patVwXbR9ZnaEp1TX.352999e3bbf9c0286db19ef4bfb6af227348c8b54d12c26774413c6102a9096d",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          fields: {
            Firstname: firstname.value.trim(),
            Lastname: lastname.value.trim(),
            Email: email.value.trim(),
            Service: service.value,
            Budget: Number(budget.value),
            ProjectDetails: projectDetails.value.trim(),
            Deadline: deadline.value.trim(),
            Hosting: hostingYes.checked ? 'Yes' : 'No',
            Phone: contactForm.querySelector('input[name="phone"]').value.trim() || 'N/A',
            Website: contactForm.querySelector('input[name="website"]').value.trim() || 'N/A',
            Notes: contactForm.querySelector('textarea[name="notes"]').value.trim() || 'N/A'
          }
        })
      })
        .then(response => response.json())
        .then(data => {
          submitBtn.innerHTML = `<i class="fas fa-paper-plane"></i> Send`;
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
          contactForm.reset();
          submitBtn.disabled = false;
        })
        .catch(err => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `<i class="fas fa-paper-plane"></i> Send`;
          Swal.fire({
            icon: 'error',
            text: 'Something went wrong. Please try again later.',
            timer: 10000,
            position: 'top-end',
            customClass: {
              popup: 'swal'
            },
            showConfirmButton: false,
            timerProgressBar: true
          });
          contactForm.reset();
          submitBtn.disabled = false;
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
  var parallaxservices = document.querySelector('.hero-section');
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

(function (d, t) {
  var v = d.createElement(t), s = d.getElementsByTagName(t)[0];
  v.onload = function () {
    window.voiceflow.chat.load({
      verify: { projectID: '68267aa3c6a18bbcfc972b58' },
      url: 'https://general-runtime.voiceflow.com',
      versionID: 'production',
      voice: {
        url: "https://runtime-api.voiceflow.com"
      }
    });
  }
  v.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs"; v.type = "text/javascript"; s.parentNode.insertBefore(v, s);
})(document, 'script');

document.getElementById('scroll-to-services').addEventListener('click', function () {
  const target = document.querySelector('.services-intro');
  if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
  }
});
