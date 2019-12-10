;(function () {
  'use strict'

  // init
  var versionButtons = document.querySelectorAll('.button.versions')
  for (var i = 0; i < versionButtons.length; i++) {
    var component = versionButtons[i].getAttribute('component')
    var pinnedVersion = localStorage.getItem(component + '-pinned-version')
    if (pinnedVersion) {
      pinnedVersion = pinnedVersion.trim()
    }
    if (pinnedVersion) {
      versionButtons[i].innerText = pinnedVersion
      versionButtons[i].style.display = 'inline-block'
      document.getElementById('nav-' + component + '-' + pinnedVersion).style.display = 'inline-block'
    } else {
      var latestVersion = versionButtons[i].innerText.trim()
      versionButtons[i].style.display = 'inline-block'
      localStorage.setItem(component + '-pinned-version', latestVersion.trim())
      document.getElementById('nav-' + component + '-' + latestVersion).style.display = 'inline-block'
    }
  }

  // initialize tippy

  tippy('.button.versions', {
    content: function content (reference) {
      var id = reference.getAttribute('data-template')
      var template = document.getElementById('tippy-popover-' + id)
      return template.innerHTML
    },
    onShown: function (instance) {
      var versionOptions = instance.popper.querySelectorAll('div.version-option')
      for (var i = 0; i < versionOptions.length; i++) {
        versionOptions[i].addEventListener('click', changeVersions)
      }
    },
    trigger: 'click',
    placement: 'bottom',
    interactive: 'true',
    distance: 1,
    offset: '-40, 5',
    theme: 'versions',
    arrow: false,
  })

  function changeVersions (event) {
    var target = event.target
    var component = target.getAttribute('component')
    var version = target.getAttribute('version')
    var button = document.getElementById('versions-button-' + component)
    var oldVersion = button.innerText.trim()
    // change button text to new version and close tooltip
    button.innerText = version.trim()
    button._tippy.hide()
    // store new pinned version for page refresh
    localStorage.setItem(component + '-pinned-version', version.trim())
    // hide old table of contents for component and show new one
    document.getElementById('nav-' + component + '-' + oldVersion).style.display = 'none'
    document.getElementById('nav-' + component + '-' + version).style.display = 'inline-block'
  }
})()
