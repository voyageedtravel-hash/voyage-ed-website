/* Voyage-Ed global enhancements v4 */
(function(){
  'use strict';

  /* ═══ 1. SCROLL REVEALS ═══ */
  function initReveals(){
    var els=document.querySelectorAll('.pkg-card,.dest-card,.dcard,.ccard,article,.tcard,.art-card,.wcard');
    var count=0;
    els.forEach(function(el){
      if(count>80)return;
      var r=el.getBoundingClientRect();
      if(r.top>window.innerHeight){el.classList.add('g-reveal');count++;}
    });
    if(!('IntersectionObserver' in window)){document.querySelectorAll('.g-reveal').forEach(function(el){el.classList.add('g-in');});return;}
    var io=new IntersectionObserver(function(es){
      es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('g-in');io.unobserve(e.target);}});
    },{threshold:.08,rootMargin:'0px 0px -20px 0px'});
    document.querySelectorAll('.g-reveal').forEach(function(el){io.observe(el);});
  }

  /* ═══ 2. GOLD OFFERS MARQUEE (top of every page) ═══ */
  function initMarquee(){
    if(document.getElementById('ve-marquee'))return;
    var deals=[
      '🇬🇪 <b>Georgia</b> 6D visa-free from <b>₹45,000</b>',
      '🇹🇭 <b>Thailand</b> visa-free from <b>₹35,000</b>',
      '🇦🇪 <b>Dubai</b> 5D from <b>₹32,000</b>',
      '🇮🇩 <b>Bali</b> 6D from <b>₹38,000</b>',
      '🇨🇦 <b>Canada flights</b> return from <b>₹55,000</b> — Price Match Guarantee',
      '🇻🇳 <b>Vietnam</b> 7D from <b>₹42,000</b>',
      '🏔️ <b>Kashmir</b> 5D from <b>₹8,499</b>',
      '📞 Call <b>+91 70096 59048</b> for instant quotes'
    ];
    var track='<span>'+deals.join('</span><span>✦</span><span>')+'</span>';
    var bar=document.createElement('div');
    bar.id='ve-marquee';
    bar.innerHTML='<div class="ve-mq-track">'+track+track+'</div>';
    document.body.insertBefore(bar,document.body.firstChild);
  }

  /* ═══ 3. SOCIAL PROOF TOASTS ═══ */
  function initToasts(){
    try{
      if(sessionStorage.getItem('veToastDone'))return;
    }catch(e){return;}
    var msgs=[
      ['Simran','Mohali','Georgia package ₹45,000'],
      ['Rahul','Chandigarh','Canada flight enquiry'],
      ['Priya & Karan','Panchkula','Bali honeymoon ₹85,000'],
      ['Harpreet','Ludhiana','Thailand group tour'],
      ['Aman','Zirakpur','Dubai 5D package'],
      ['Neha','Kharar','Vietnam 7D package']
    ];
    var idx=0,shown=0;
    var toast=document.createElement('div');
    toast.id='ve-toast';
    document.body.appendChild(toast);
    function show(){
      if(shown>=3){try{sessionStorage.setItem('veToastDone','1');}catch(e){}return;}
      var m=msgs[Math.floor(Math.random()*msgs.length)];
      toast.innerHTML='<div class="ve-toast-ico">✈️</div><div><b>'+m[0]+'</b> from '+m[1]+' enquired about<br/><b>'+m[2]+'</b> · just now</div><div class="ve-toast-x" onclick="this.parentElement.classList.remove(\'ve-show\');try{sessionStorage.setItem(\'veToastDone\',1)}catch(e){}">✕</div>';
      toast.classList.add('ve-show');
      shown++;
      setTimeout(function(){toast.classList.remove('ve-show');},6000);
      if(shown<3)setTimeout(show,22000);
    }
    setTimeout(show,9000);
  }

  /* ═══ 4. LIGHT PARALLAX on hero backgrounds ═══ */
  function initParallax(){
    var hero=document.querySelector('.dest-hero,.pkg-hero,.hero');
    if(!hero)return;
    var bg=hero.querySelector('.dest-hero-bg,.pkg-hero-bg,.hero-img');
    if(!bg)return;
    var ticking=false;
    window.addEventListener('scroll',function(){
      if(ticking)return;
      ticking=true;
      requestAnimationFrame(function(){
        var y=window.scrollY;
        if(y<900)bg.style.transform='translateY('+(y*0.25)+'px) scale(1.05)';
        ticking=false;
      });
    },{passive:true});
  }


  /* Self-injected styles (work on every page incl. homepage) */
  function injectStyles(){
    if(document.getElementById('ve-enhance-styles'))return;
    var s=document.createElement('style');
    s.id='ve-enhance-styles';
    s.textContent='#ve-marquee{position:relative;z-index:50;background:linear-gradient(90deg,#0a1530,#13265c,#0a1530);color:#f0c842;overflow:hidden;padding:9px 0;font-size:12.5px;font-weight:600;letter-spacing:.04em;border-bottom:1px solid rgba(201,150,26,.35);font-family:Raleway,system-ui,sans-serif}#ve-marquee .ve-mq-track{display:inline-block;white-space:nowrap;animation:veMq 38s linear infinite}@keyframes veMq{to{transform:translateX(-50%)}}#ve-marquee span{margin:0 22px}#ve-marquee b{color:#fff}#ve-toast{position:fixed;bottom:84px;left:12px;z-index:9996;background:#fff;border:1px solid rgba(201,150,26,.3);border-radius:14px;padding:11px 14px;box-shadow:0 12px 36px rgba(10,21,48,.22);display:flex;align-items:center;gap:10px;max-width:290px;font-size:12.5px;color:#1a1a2e;transform:translateX(-120%);transition:transform .55s cubic-bezier(.22,1,.36,1);font-family:Raleway,system-ui,sans-serif}#ve-toast.ve-show{transform:translateX(0)}#ve-toast .ve-toast-ico{width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,#0d1b3e,#13265c);color:#f0c842;display:flex;align-items:center;justify-content:center;font-size:15px;flex-shrink:0}#ve-toast b{color:#0d1b3e}#ve-toast .ve-toast-x{margin-left:4px;cursor:pointer;color:#9aa3b5;font-size:15px;flex-shrink:0}#ve-toast br{display:none}#ve-toast div{line-height:1.45}@media(max-width:600px){#ve-toast{bottom:76px;left:8px;max-width:75vw;font-size:11.5px}}.g-reveal{opacity:0;transform:translateY(30px);transition:opacity .8s cubic-bezier(.22,1,.36,1),transform .8s cubic-bezier(.22,1,.36,1)}.g-reveal.g-in{opacity:1;transform:translateY(0)}html,body{overflow-x:hidden;max-width:100%}';
    document.head.appendChild(s);
  }

  function init(){
    injectStyles();
    initReveals();
    initMarquee();
    initToasts();
    initParallax();
  }
  if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',init);}
  else{init();}
})();
