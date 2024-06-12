document.addEventListener('DOMContentLoaded', () => {
        // Check if the user has already accepted cookies
        if (!localStorage.getItem('cookiesAccepted')) {
            // Show the cookie banner
            document.getElementById('cookie-banner').style.display = 'block';
        }
    
        // Add event listener to the "Got it!" button
        document.getElementById('accept-cookies').addEventListener('click', function() {
            // Hide the cookie banner
            document.getElementById('cookie-banner').style.display = 'none';
            // Set a flag in local storage to remember that the user has accepted cookies
            localStorage.setItem('cookiesAccepted', 'true');
        });
    });
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}