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




$(document).ready(function() {
  // get the navbar element and all menu items
  var navbar = $(".menu");
  var menuItems = navbar.find(".menu-link");

  // handle scrolling events
  $(window).scroll(function() {
    // get the current scroll position
    var scrollPos = $(document).scrollTop();

    // loop through each menu item
    menuItems.each(function() {
      // get the href attribute and corresponding section element
      var href = $(this).attr("href");
      var section = $(href);

      // if the section element exists and its top offset is above the navbar
      if (section.length && section.offset().top - navbar.outerHeight() <= scrollPos) {
        // highlight the corresponding menu item
        menuItems.removeClass("active");
        $(this).addClass("active");
      }
    });
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
          $("#email").addClass("erroremail");
          $("#submit-btn").addClass("errorbtn");

          // Show success message
          $("#response-msg").html(response.message);
        } else {
          // Show error message
          $("#response-msg").html(response.message);
          resetRecaptcha();
          $("#email").removeClass("erroremail");
          $("#submit-btn").removeClass("errorbtn");
        }
      },
      error: function (xhr, status, error) {
        console.log("xhr", xhr, "status", status, "error", error);
        // Show error message
        $("#response-msg").html(response.error);
      },
    });
  }

  // function to validate email format
  function isValidEmail(email) {
    // use a regular expression to validate email format
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  $("#email").addClass("erroremail");
  $("#submit-btn").addClass("errorbtn");

    // select the email input field and form
    var emailInput = $('input[name="email"]');
    var form = $("#email-form");
  
    // add a keyup event listener to the email input field
    emailInput.keyup(function() {
      // get the email value from the input field
      var email = $(this).val();
  
      // check if the email is empty or incorrect format
      if (email === '' || !isValidEmail(email)) {
        // add red color to the email input field
        $(this).addClass("erroremail");
        $("#submit-btn").addClass("errorbtn");
        // $("#response-msg").html("Please enter a valid email address.");
        // disable form submission
        form.prop('disabled', true);
      } else {
        // remove red color from the email input field
        $(this).removeClass("erroremail");
        $("#submit-btn").removeClass("errorbtn");
        // $("#response-msg").html("");
        // enable form submission
        form.prop('disabled', false);
      }
    });
  
    // add a submit event listener to the form
    form.submit(function(event) {
      // prevent default form submission
      event.preventDefault();
  
      // get the email value from the input field
      var email = emailInput.val();
  
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
  
  
  
});
