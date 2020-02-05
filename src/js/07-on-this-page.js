;(function () {
  'use strict'

  // create table of contents 
  var headers = document.querySelector('.doc .contents').querySelectorAll('h1, h2, h3, h4, h5, h6')
  var toc = document.getElementById('toc')
  for(var i = 0; i < headers.length; i++){
      var header = headers[i]        
      var li = document.createElement('li')
      li.classList.add('toc-item')
      li.classList.add(header.tagName)
      li.innerText = header.innerText 
      li.setAttribute('headerId', header.getAttribute('id'))
      li.addEventListener('click', function() {
          var h, id = this.getAttribute('headerId')
          if(id != 'null'){ h = document.getElementById(id) } 
          else { h = document.querySelector('h1') }
          window.scroll({
              top: h.offsetTop + 30, // 30 to account for fixed header height 
              left: 0,
              behavior: 'smooth'
          })
          h.classList.add('toc-highlight')
          setTimeout(function(){ h.classList.remove('toc-highlight') }, 2000)
      })
      toc.appendChild(li)
  }

  // enable highlighted toc
  var referenceElement = document.querySelector('article').parentNode
  window.addEventListener('scroll', function () {
    var activeHeader, lastActiveHeader = document.querySelector('.toc-item.active')
    var referencePoint = referenceElement.offsetTop + 108.1 
    for (var i = (headers.length - 1); i >= 0; i--) {
      var hTop = headers[i].getBoundingClientRect().top
      if (hTop < referencePoint) {
        var activeId = headers[i].getAttribute('id')
        activeHeader = document.querySelector('.toc-item[headerId="' + activeId + '"]')
        break
      }
    }

    // there is currently an active header and it has changed
    if(activeHeader && activeHeader !== lastActiveHeader){
      activeHeader.classList.add('active')
      if(lastActiveHeader){
        lastActiveHeader.classList.remove('active')
      }
    }
  })

})()
  