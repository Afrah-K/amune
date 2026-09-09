(function(){
  "use strict";
  var cursor = document.getElementById('cursor');
  var enabled = false;
  window.addEventListener('pointermove', function(e){
    if(e.pointerType && e.pointerType !== 'mouse') return;
    if(!enabled){
      enabled = true;
      document.documentElement.classList.add('has-custom-cursor');
      cursor.classList.add('visible');
    }
    cursor.style.setProperty('--cx', (e.clientX-11) + 'px');
    cursor.style.setProperty('--cy', (e.clientY-11) + 'px');
    cursor.style.transform = 'translate3d(' + (e.clientX-11) + 'px,' + (e.clientY-11) + 'px,0) scale(1)';
    var overHero = e.target.closest('.hero');
    cursor.classList.toggle('scanning', !!overHero);
  });

  var hero = document.querySelector('.hero');
  if(hero){
    function updateHeroPos(clientX, clientY){
      var rect = hero.getBoundingClientRect();
      hero.style.setProperty('--mx', (clientX - rect.left) + 'px');
      hero.style.setProperty('--my', (clientY - rect.top) + 'px');
    }
    hero.addEventListener('pointermove', function(e){ updateHeroPos(e.clientX, e.clientY); });
    hero.addEventListener('pointerenter', function(e){ hero.classList.add('is-scanning'); updateHeroPos(e.clientX, e.clientY); });
    hero.addEventListener('pointerleave', function(){ hero.classList.remove('is-scanning'); });
    hero.addEventListener('touchmove', function(e){
      if(e.touches && e.touches[0]){ hero.classList.add('is-scanning'); updateHeroPos(e.touches[0].clientX, e.touches[0].clientY); }
    }, {passive:true});
    hero.addEventListener('touchend', function(){ hero.classList.remove('is-scanning'); });
  }
})();
