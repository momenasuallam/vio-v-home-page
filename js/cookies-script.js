$(document).ready(function() {


  // Check if marketing cookies are already accepted
  var marketingCookiesAccepted = getCookie("marketingCookiesAccepted");
  if (marketingCookiesAccepted == "true") {
    $("#marketingCookiesCheckbox").prop("checked", true);
    console.log("Marketing cookies accepted from previous visit.");
    activateGoogleTagScript();
  } else {
    console.log("Marketing cookies not accepted from previous visit.");
  }

  // Accept all cookies button
  $("#accept-cookies").click(function() {
    setCookie("marketingCookiesAccepted", true, 365);
    $("#marketingCookiesCheckbox").prop("checked", true);
    console.log("All cookies accepted.");
    activateGoogleTagScript();
  });

  // Save button
  $("#selectionacceptcookies").click(function() {
    var marketingCookiesAccepted = $("#marketingCookiesCheckbox").is(":checked");
    if (marketingCookiesAccepted) {
      setCookie("marketingCookiesAccepted", true, 365);
      console.log("Marketing cookies accepted and saved.");
      activateGoogleTagScript();
    } else {
      setCookie("marketingCookiesAccepted", false, 365);
      console.log("Marketing cookies not accepted and saved.");
      removeGoogleTagScript();
    }
  });

  // Activate Google Tag Script
  function activateGoogleTagScript() {
    console.log("Google Tag Script activated.");
    // Code to activate Google Tag Script
    $("head").append("<script id='google-tag-script' src='https://www.googletagmanager.com/gtag/js?id=G-25WV5DWL9V'></script> <script> window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-25WV5DWL9V'); </script>");
  }

  // Remove Google Tag Script
  function removeGoogleTagScript() {
    console.log("Google Tag Script removed.");
    // Code to remove Google Tag Script
    $('script[src="https://www.googletagmanager.com/gtag/js?id=G-25WV5DWL9V"]').remove();
  }

  // Set cookie
  function setCookie(name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";

    // Hide the popup
    document.getElementById("cookiesmodal1").style.display = "none";
  }

  // Get cookie
  function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  // Delete cookie
  function deleteCookie(name) {
    document.cookie = name + "=; Max-Age=-99999999;";
  }
});