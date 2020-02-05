;(function () {
    'use strict'
    // <i class="material-icons mdc-icon-button search" tabindex="0" role="button">search</i>
    var codeBlocks = document.querySelectorAll('.doc .listingblock code')
    var copyIcon = document.createElement('i')
    copyIcon.classList = 'material-icons codeCopyButton'
    copyIcon.innerText = 'file_copy'
    for (var i = 0; i < codeBlocks.length; i++) {
      var icon = copyIcon.cloneNode(true)
      icon.addEventListener('mouseover', function (event) {
        console.log(event.target)
      })
      codeBlocks[i].insertBefore(icon, codeBlocks[i].childNodes[0])
    }
  
    /*global ClipboardJS*/
    var clipboard = new ClipboardJS('.material-icons.codeCopyButton', {
      text: function (target) { return target.parentNode.innerText },
    })
  
    clipboard.on('success', function (e) {
      e.trigger._tippy.setContent('copied!')
    })
  
    tippy.delegate('.doc .listingblock code', {
      target: '.material-icons.codeCopyButton',
      content: 'copy to clipboard',
      animation: 'shift-away',
      theme: 'clipboard',
      delay: [500, 0],
      placement: 'bottom',
      hideOnClick: false,
      onHidden: function (instance) {
        instance.setContent('copy to clipboard')
      },
    })
  })()
  