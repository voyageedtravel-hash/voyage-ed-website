/* Voyage-Ed global enhancements */
(function(){
  /* Auto-tag cards & sections for scroll reveal */
  var els=document.querySelectorAll('.pkg-card,.dest-card,article,.tcard,[class*="grid"]>a,[class*="grid"]>div');
  var count=0;
  els.forEach(function(el){
    if(count>80)return;
    var r=el.getBoundingClientRect();
    if(r.top>window.innerHeight){el.classList.add('g-reveal');count++;}
  });
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('g-in');io.unobserve(e.target);}});
  },{threshold:.1,rootMargin:'0px 0px -30px 0px'});
  document.querySelectorAll('.g-reveal').forEach(function(el){io.observe(el);});
})();
