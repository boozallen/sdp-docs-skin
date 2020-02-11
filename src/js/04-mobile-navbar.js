document.addEventListener('DOMContentLoaded', function () {
  // Hide navbar on mobile
  if (window.innerWidth <= 1024) {
    var navContainer = document.querySelector('div.nav-container')
    navContainer.classList.add('hide')
  }

  // Add event listeners to hamburger icons
  var navbarToggles = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0)
  if (navbarToggles.length === 0) return
  navbarToggles.forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.stopPropagation()
      el.classList.toggle('is-active')
      document.getElementById(el.dataset.target).classList.toggle('is-active')
      document.documentElement.classList.toggle('is-clipped--navbar')
    })
  })
})


window.addEventListener('resize', function () {
  // Only expand/unhide elements on resize if search isn't open
  var searchTopBar = document.querySelector('.mdc-top-app-bar__row.sdp-top-app-bar__search')
  if (searchTopBar.classList.contains('hide')) {
    // Unhide main content
    var mainContainer = document.querySelector('main')
    if (mainContainer.classList.contains('hide')) {
      mainContainer.classList.remove('hide')
    }

    // Expand navbar if window is resized from mobile to desktop
    var navContainer = document.querySelector('div.nav-container')
    if (window.innerWidth > 1024) {
      if (navContainer.classList.contains('hide')) {
        navContainer.classList.remove('hide')
      }
    }
  }

  // Hide navbar if window is resized from desktop to mobile
  if (window.innerWidth < 1025) {
    if (!navContainer.classList.contains('hide')) {
      navContainer.classList.add('hide')
    }
  }
});
