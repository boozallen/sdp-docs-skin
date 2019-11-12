;(function () {
  'use strict'

  tippy('.button.versions', {
    content: function content (reference) {
      var id = reference.getAttribute('data-template')
      var template = document.getElementById('tippy-popover-' + id)
      return template.innerHTML
    },
    trigger: 'click',
    placement: 'bottom',
    interactive: 'true',
    distance: 1,
    offset: '-40, 5',
    theme: 'versions',
    arrow: false,
  })



})()
