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


// back to top button
var btn = $('#backtotop');

$(window).scroll(function() {
  if ($(window).scrollTop() > 300) {
    btn.addClass('show');
  } else {
    btn.removeClass('show');
  }
});

btn.on('click', function(e) {
  e.preventDefault();
  $('html, body').animate({scrollTop:0}, '300');
});





// For cookies modal
// $(window).on('load', function() {
//    $('#cookiesmodal1').modal('show');
// });
// $('#selectioncookies').click(function() {
//    $('#cookiesmodal1').modal('hide');
//    $('#selectioncookiesmodal').modal('show');
// });

// For Registermodal modal
$('.playnowme').click(function() {
   $('#emailregistermodal1').modal('show');
});
$('#yasstep2').click(function() {
   $('#emailregistermodal1').modal('hide');
   $('#emailregistermodal2').modal('show');
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
   url: 'https://apiv1.vio-v.com/online_players',
   method: 'GET',
   success: function(response) {
      $('#onlineplayers').html(response.online_players);
   },
   error: function() {
      $('p').html('Error: Unable to retrieve data');
   }
});

   

