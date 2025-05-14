document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll('nav ul li a');
  const currentPage = window.location.pathname.split("/").pop();

  links.forEach(link => {
    // Remove 'active' class from all links first
    link.classList.remove('active');

    // Add 'active' class to the current page's link
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });
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

emailjs.init("DNKL5Eeim93uS2_Qx");

document.getElementById("contact-form").addEventListener("submit", function (event) {
  event.preventDefault();
  var form = this;
  const user_id = "DNKL5Eeim93uS2_Qx";

  // Send the form without the logo attachment
  emailjs.sendForm('service_cvttpdm', 'template_a7kti6r', form, user_id)
    .then(function () {
      alert('Message sent successfully!');
      form.reset();
    })
    .catch(function (error) {
      alert('Error sending message: ' + error);
    });
});
