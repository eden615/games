var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $("header").outerHeight();
$(window).scroll(function (event) {
  didScroll = true;
});
setInterval(function () {
  if (didScroll) {
    hasScrolled();
    didScroll = false;
  }
}, 0);

function hasScrolled() {
  var st = $(this).scrollTop();

  if (Math.abs(lastScrollTop - st) <= delta) return;

  if (st > lastScrollTop && st > navbarHeight) {
    // Scroll Down
    if (st > 56) {
      $("#slide-menu-set")
        .removeClass("slide-menu-set slide-menu-set-fixed")
        .addClass("slide-menu-set slide-menu-set-fixed fix_on");
    }
  } else {
    // Scroll up
    if (st <= 56) {
      if (st + $(window).height() < $(document).height()) {
        $("#slide-menu-set")
          .removeClass("slide-menu-set slide-menu-set-fixed fix_on")
          .addClass("slide-menu-set slide-menu-set-fixed");
      }
    }
  }
  lastScrollTop = st;
}
