;(function () {
  'use strict'

  /* build nav */
  var toc = document.querySelector('.toc-menu-content')
  var h2List = document.querySelectorAll('h2')
  for (var i = 0; i < h2List.length; i++) {
    var h2 = h2List[i]
    var item = document.createElement('li')
    item.classList = 'toc header'
    var link = document.createElement('a')
    link.innerText = h2.innerText
    link.href = '#' + getIdFromHeader(h2)
    link.classList = 'toc header-link'
    link.id = getIdFromHeader(h2) + '-link'
    item.appendChild(link)
    toc.appendChild(item)
  }

  /* enable highlighted toc */
  var referenceElement = document.querySelector('article').parentNode
  var lastActiveHeader
  window.addEventListener('scroll', onScroll)
  function onScroll () {
    var referencePoint = referenceElement.offsetTop
    var activeHeader
    for (var i = (h2List.length - 1); i >= 0; i--) {
      var hTop = h2List[i].getBoundingClientRect().top
      if (hTop < referencePoint) {
        activeHeader = h2List[i]
        break
      }
    }
    if (activeHeader && activeHeader !== lastActiveHeader) {
      var link = document.getElementById(getIdFromHeader(activeHeader) + '-link')
      link.classList.add('active')
      link.parentNode.classList.add('active')
      if (lastActiveHeader) {
        var oldLink = document.getElementById(getIdFromHeader(lastActiveHeader) + '-link')
        oldLink.classList.remove('active')
        oldLink.parentNode.classList.remove('active')
      }
      lastActiveHeader = activeHeader
    }
    if (lastActiveHeader && !activeHeader) {
      oldLink = document.getElementById(getIdFromHeader(lastActiveHeader) + '-link')
      oldLink.classList.remove('active')
      oldLink.parentNode.classList.remove('active')
      lastActiveHeader = undefined
    }
  }

  function getIdFromHeader (header) {
    return header.id
  }

  // set progress bar width to toolbar width
  function setProgressBarWidth () {
    document.querySelector('.progress-container').style.width = document.querySelector('.toolbar').offsetWidth + 'px'
    updateProgress()
  }
  setProgressBarWidth()
  window.onresize = function () { setProgressBarWidth() }

  // When the user scrolls the page, execute myFunction
  window.onscroll = function () { updateProgress() }

  function updateProgress () {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight
    var articleProportion = 1
    var scrolled = (winScroll / height) * articleProportion * 100
    document.getElementById('myBar').style.width = scrolled + '%'
  }
})()
