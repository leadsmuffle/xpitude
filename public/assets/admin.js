(function () {
  "use strict";
  /* ask before anything destructive */
  document.querySelectorAll("form[data-confirm]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      if (!window.confirm(form.getAttribute("data-confirm"))) e.preventDefault();
    });
  });
  /* the status menu in the enquiries table saves as soon as it changes */
  document.querySelectorAll(".js-autosubmit").forEach(function (el) {
    el.addEventListener("change", function () { el.form.submit(); });
  });
})();
