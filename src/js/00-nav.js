;(function () {
  'use strict'

  // expand nav to show current page
  var currentPageItem = Array.from(document.querySelectorAll('.is-current-page')).pop().parentNode
  expandParents(currentPageItem)

  function expandParents(element) {
    var panel = element.parentNode
    if(!panel.matches(".nav-children-panel")){
        return 
    }
    var parentHeader = panel.previousElementSibling
    panel.classList.remove('hide')
    parentHeader.querySelector('.material-icons').classList.add('expanded')
    expandParents(parentHeader)
  }  

  // persist version selections
  var select = document.querySelectorAll('.select-version')
  var versionVar = "sdp-docs-versions"
  var versions = getVersions()

  if (!versions){
    versions = {}
    for(var i = 0; i < select.length; i++){
      versions[select[i].getAttribute('data-component')] = 0 
    }
    setVersions(versions)
  } else { 
    Object.entries(versions).forEach(function(component){
      var componentName = component[0]
      var componentVersionIndex = component[1] 
      var componentSelectVersion = document.querySelector('select[data-component="' + componentName + '"]')
      componentSelectVersion.selectedIndex = componentVersionIndex
      var componentVersion = componentSelectVersion.options[componentVersionIndex].value
      setComponentVersion(componentName, componentVersion)
    })
  }

  function setVersions(versions){
    return window.localStorage.setItem(versionVar, JSON.stringify(versions))
  }

  function getVersions(){
    return JSON.parse(window.localStorage.getItem(versionVar))
  }

  function setComponentVersion(component, version){
    var showSelector = '.nav-container div[data-component="' + component + '"][data-version="' + version + '"]'
    var hideSelector = '.nav-container div[data-component="' + component + '"]:not(.hide)'
    var navShow = document.querySelector(showSelector)
    var navHide = document.querySelector(hideSelector)
    navHide.classList.add('hide')
    navShow.classList.remove('hide')
  }

  for(var i = 0; i < select.length; i++){
    var s = select[i]
    s.addEventListener('change', function(event){
      var component = this.getAttribute('data-component')
      var versionIndex = this.selectedIndex
      var version = this.options[versionIndex].value
      var versions = getVersions()
      versions[component] = versionIndex
      setVersions(versions)
      setComponentVersion(component, version)
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
    // Toggle navigation and main content together
    var mainContainer = document.querySelector('main')
    var navContainer = document.querySelector('div.nav-container')
    if(navContainer.classList.contains('hide')){
      mainContainer.classList.add('hide')
      navContainer.classList.remove('hide')

    } else{
      mainContainer.classList.remove('hide')
      navContainer.classList.add('hide')
    }
  })

})()
