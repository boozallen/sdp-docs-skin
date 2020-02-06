;(function () {
  'use strict'

  //header 
  mdc.topAppBar.MDCTopAppBar.attachTo(document.querySelector('.mdc-top-app-bar'))

  // search buttons
  mdc.textField.MDCTextField.attachTo(document.querySelector('.mdc-text-field.search'))
  var searchIcon = document.querySelector('.mdc-icon-button.search')
  mdc.iconButton.MDCIconButtonToggle.attachTo(searchIcon)
  searchIcon.addEventListener('click', function(){
    var searchTextBox = this.nextElementSibling
    if(searchTextBox.classList.contains('expanded')){
      searchTextBox.classList.remove('expanded')
    } else {
      searchTextBox.classList.add('expanded')
    }
  })

  // nav 
  /// version select box
  var select = document.querySelectorAll('.select-version')
  for(var i = 0; i < select.length; i++){
    var s = select[i]
    s.addEventListener('change', function(event){
      var component = this.getAttribute('data-component')
      var version = this.options[this.selectedIndex].value
      var showSelector = 'div[data-component="' + component + '"][data-version="' + version + '"]'
      var hideSelector = 'div[data-component="' + component + '"]:not(.hide)'
      var navShow = document.querySelector(showSelector)
      var navHide = document.querySelector(hideSelector)
      navShow.classList.remove('hide')
      navHide.classList.add('hide')
    })

    // Disable select if there is only one version
    if (s.options.length === 1) {
      s.classList.add('single-version');
      s.disabled = true;
    }
  }

  /// nav-tree
  var x = document.querySelectorAll('.nav-item .material-icons'); 
  for(var i = 0; i < x.length; i++){
    mdc.ripple.MDCRipple.attachTo(x[i])
    x[i].addEventListener('click', function(event){
      var item = event.target
      var panel = item.parentElement.nextElementSibling
      if(item.classList.contains('expanded')){
        item.classList.remove('expanded')
        panel.classList.add('hide')
      } else{
        item.classList.add('expanded')
        panel.classList.remove('hide')
      }
    })
  }

  // toolbar menu button 
  var navToggle = document.getElementById('toolbar-nav-toggle')
  mdc.iconButton.MDCIconButtonToggle.attachTo(navToggle)
  navToggle.addEventListener('click', function(){
    var navContainer = document.querySelector('div.nav-container')
    if(navContainer.classList.contains('hide')){
      navContainer.classList.remove('hide')
    } else{
      navContainer.classList.add('hide')
    }
  })

})()
