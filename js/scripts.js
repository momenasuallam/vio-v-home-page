const navbarMenu = document.getElementById("menu");
const burgerMenu = document.getElementById("burger");
const headerMenu = document.getElementById("header");

// Toggle Navbar Menu on Burger Click
if (burgerMenu && navbarMenu) {
  burgerMenu.addEventListener("click", () => {
    burgerMenu.classList.toggle("is-active");
    navbarMenu.classList.toggle("is-active");
  });
}

// Closed Navbar Menu on Links Click
document.querySelectorAll(".menu-link").forEach((link) => {
  link.addEventListener("click", () => {
    burgerMenu.classList.remove("is-active");
    navbarMenu.classList.remove("is-active");
  });
});

// Fixed Navbar Menu on Window Resize
window.addEventListener("resize", () => {
  if (window.innerWidth >= 769) {
    if (navbarMenu.classList.contains("is-active")) {
      navbarMenu.classList.remove("is-active");
    }
  }
});

// add blur bg class when scrol navbar
$(window).on("scroll", function () {
  if ($(window).scrollTop() > 50) {
    $("#header").addClass("scrollbg");
  } else {
    // remove the class if the user scrolls back to the top
    $("#header").removeClass("scrollbg");
  }
});

  // Get all the links in the navbar
  const navbarLinks = $('.menu a');

  // Add a scroll event listener to the window
  $(window).scroll(function() {
    // Get the current scroll position
    const currentPosition = $(this).scrollTop();

    // Loop through each link in the navbar
    navbarLinks.each(function() {
      // Get the ID of the corresponding section on the page
      const sectionID = $(this).attr('href');

      // Get the offset of the section from the top of the page
      const sectionOffset = $(sectionID).offset().top;

      // Check if the section is visible in the viewport
      if (sectionOffset <= currentPosition && sectionOffset + $(sectionID).outerHeight() > currentPosition) {
        // If the section is visible, highlight the corresponding link in the navbar
        $('.navbar .active').removeClass('active');
        $(this).addClass('active');
      }
    });
  });








// back to top button
var btn = $("#backtotop");

$(window).scroll(function () {
  if ($(window).scrollTop() > 300) {
    btn.addClass("show");
  } else {
    btn.removeClass("show");
  }
});

btn.on("click", function (e) {
  e.preventDefault();
  $("html, body").animate({ scrollTop: 0 }, "300");
});

// For cookies modal
$(".opencookiesmodal").click(function () {
  $("#cookiesmodal1").show();
});
$("#selectioncookies").click(function () {
  $(".showfirstcookiesdata").hide();
  $(".showsecondcookiesdata").show();
});

// Check if cookies have been accepted
if (document.cookie.indexOf("cookiesAccepted=true") > -1) {
  // Cookies have been accepted, hide the popup
  document.getElementById("cookiesmodal1").style.display = "none";
} else {
  // Cookies have not been accepted, show the popup
  document.getElementById("cookiesmodal1").style.display = "block";
}

// Set cookies when user accepts them
document
  .getElementById("accept-cookies")
  .addEventListener("click", function () {
    // Set cookies to expire in 30 days
    var expires = new Date();
    expires.setTime(expires.getTime() + 30 * 24 * 60 * 60 * 1000);
    document.cookie =
      "cookiesAccepted=true;expires=" + expires.toUTCString() + ";path=/";

    // Hide the popup
    document.getElementById("cookiesmodal1").style.display = "none";
  });

document
  .getElementById("selectionacceptcookies")
  .addEventListener("click", function () {
    // Set cookies to expire in 30 days
    var expires = new Date();
    expires.setTime(expires.getTime() + 30 * 24 * 60 * 60 * 1000);
    document.cookie =
      "cookiesAccepted=true;expires=" + expires.toUTCString() + ";path=/";

    // Hide the popup
    document.getElementById("cookiesmodal1").style.display = "none";
  });

// For Registermodal modal
$(".playnowme").click(function () {
  $("#emailregistermodal1").modal("show");
});
$("#yasstep2").click(function () {
  $("#step1email").hide();
  $("#step2email").show();
});

// Instagram API
async function getInstagramPosts() {
  try {
    const response = await fetch("https://apiv1.vio-v.com/instagram");
    const data = await response.json();
    const posts = data.postings;
    const instagramPosts = document.getElementById("instagram-posts");
    posts.forEach((post) => {
      instagramPosts.innerHTML += `
               <div class="instagram-post" id="instagram-post">
                   <a href="${post.url}">
                       <img src=${post.image} alt="">
                   </a>
               </div>
           `;
    });
  } catch (err) {
    console.error("Error getting Instagram posts:", err);
  }
}

getInstagramPosts();

//  For online players
$.ajax({
  url: "https://apiv1.vio-v.com/online_players",
  method: "GET",
  success: function (response) {
    $("#onlineplayers").html(response.online_players);
  },
  error: function () {
    $("p").html("Error: Unable to retrieve data");
  },
});

// for email API
$(document).ready(function () {
  // Reset reCAPTCHA widget
  function resetRecaptcha() {
    grecaptcha.reset();
  }

  // Send email function
  function sendEmail() {
    // Get form data
    var email = $("#email").val();
    var captcha = grecaptcha.getResponse();

    // Make API call
    $.ajax({
      url: "https://apiv1.vio-v.com/send_email",
      type: "GET",
      data: {
        email: email,
        captcha: captcha,
      },
      success: function (response) {
        console.log("succes response", response);
        console.log("succes message response", response.message);

        // Check if email was sent successfully
        if (response.success) {
          // Reset form and reCAPTCHA widget
          $("#email-form")[0].reset();
          resetRecaptcha();

          // Show success message
          $("#response-msg").html(response.message);
        } else {
          // Show error message
          $("#response-msg").html(response.message);
          resetRecaptcha();
        }
      },
      error: function (xhr, status, error) {
        console.log("xhr", xhr, "status", status, "error", error);
        // Show error message
        $("#response-msg").html(response.error);
      },
    });
  }

  $("#email").addClass("erroremail");
      $("#submit-btn").addClass("errorbtn");
  $("#email-form").submit(function (event) {
    event.preventDefault();
    var email = $("#email").val();
    var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      $("#response-msg").html("Please enter a valid email address.");
      $("#email").addClass("erroremail");
      $("#submit-btn").addClass("errorbtn");
    } else {
      $("#response-msg").html("");
      $("#email").removeClass("erroremail");
      $("#submit-btn").removeClass("errorbtn");
      // AJAX call to submit form goes here
      // Submit form event
      $("#email-form").submit(function (event) {
        event.preventDefault();

        // Check if reCAPTCHA is validated
        if (grecaptcha.getResponse().length === 0) {
          // Show error message
          $("#response-msg").html("Please complete the reCAPTCHA.");

          // Reset reCAPTCHA widget
          resetRecaptcha();
        } else {
          // Send email
          sendEmail();
        }
      });
    }
  });
});
