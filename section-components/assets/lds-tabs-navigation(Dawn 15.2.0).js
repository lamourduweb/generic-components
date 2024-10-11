document.addEventListener("DOMContentLoaded", function() {
  const tabButtons = document.querySelectorAll('.lds-tabs__links button[data-tab]');
  const tabContents = document.querySelectorAll('.lds-tab__content');

  tabButtons.forEach(function(button) {
    button.addEventListener('click', function(e) {
      e.preventDefault(); // Empêche le défilement

      const tabId = this.getAttribute('data-tab');

      // Activer l'onglet cliqué et désactiver les autres
      tabButtons.forEach(function(tabButton) {
        tabButton.parentElement.classList.remove('active');
      });
      this.parentElement.classList.add('active');

      // Afficher le contenu de l'onglet correspondant et masquer les autres
      tabContents.forEach(function(tabContent) {
        if (tabContent.getAttribute('id') === tabId) {
          tabContent.classList.add('active');
        } else {
          tabContent.classList.remove('active');
        }
      });
    });
  });
    
  var skipLink = document.querySelector('.skip-to-description-link');
  var targetSection = document.getElementById('TabsDescription');

  if (skipLink !== null) {
    skipLink.addEventListener('click', function (event) {
      event.preventDefault();
      var scrollHeight = targetSection.offsetTop - 145;
      
      window.scrollTo({
        top: scrollHeight,
        behavior: 'smooth'
      });
    });
  }
});
