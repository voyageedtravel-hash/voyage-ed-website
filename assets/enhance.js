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


  /* ═══ 5. DESTINATION EXPERIENCE — "You've arrived" feel ═══ */
  var VE_DEST = {
    'georgia':{n:'Georgia',tz:4,temp:'18-28°C',cur:'1 GEL ≈ ₹31',best:'Apr-Jun, Sep-Oct',facts:[['🍷','Georgia is the birthplace of wine — 8,000 years of winemaking, older than France or Italy'],['🏔️','Kazbegi\'s Gergeti Church sits at 2,170m with Mt Kazbek (5,047m) towering behind it'],['🆓','Visa-FREE for Indians holding valid US/UK/Schengen/UAE visas — just board and fly']],love:'"Switzerland ke views, Goa ke prices — aur visa ki tension zero."'},
    'sri-lanka':{n:'Sri Lanka',tz:5.5,temp:'26-31°C',cur:'1 LKR ≈ ₹0.28',best:'Dec-Mar',facts:[['🚂','The Kandy-Ella train ride through tea country is rated among the world\'s most beautiful'],['🐘','Minneriya hosts "The Gathering" — 300+ wild elephants in one place, Asia\'s biggest'],['🏖️','From beach to misty mountains in 4 hours — two climates in one small island']],love:'"Ek hi trip mein beach, safari, heritage aur hill station — sab kuch."'},
    'bali':{n:'Bali',tz:8,temp:'26-30°C',cur:'1000 IDR ≈ ₹5.3',best:'Apr-Oct',facts:[['🛕','Bali has over 20,000 temples — it\'s called the Island of the Gods for a reason'],['🌾','Tegallalang rice terraces use a 1,200-year-old irrigation system (UNESCO listed)'],['🏄','Visa on arrival for Indians — beaches, waterfalls and beach clubs from day one']],love:'"Honeymoon ho ya friends trip — Bali kabhi disappoint nahi karta."'},
    'dubai':{n:'Dubai',tz:4,temp:'24-38°C',cur:'1 AED ≈ ₹23',best:'Nov-Mar',facts:[['🏗️','Burj Khalifa is 828m tall — you can watch sunset twice: once from ground, once from top'],['🏜️','Desert safari with dune bashing, camel rides and BBQ dinner is 30 min from downtown'],['🛍️','Dubai Mall has 1,200+ shops, an aquarium and an ice rink — under one roof']],love:'"3.5 ghante ki flight, aur aap future mein pahunch jaate ho."'},
    'thailand':{n:'Thailand',tz:7,temp:'27-33°C',cur:'1 THB ≈ ₹2.4',best:'Nov-Apr',facts:[['🆓','Visa-FREE for Indians — just passport and fly, 30-day stay'],['🏝️','Phi Phi Islands\' Maya Bay (The Beach movie) reopened with crystal-clear limited entry'],['🍜','Bangkok street food is Michelin-rated — pad thai from ₹80']],love:'"India se sabse aasaan international trip — visa-free, sasta, mast."'},
    'vietnam':{n:'Vietnam',tz:7,temp:'25-33°C',cur:'1000 VND ≈ ₹3.4',best:'Oct-Apr',facts:[['🛶','Ha Long Bay has 1,600 limestone islands rising from emerald water (UNESCO)'],['🏮','Hoi An\'s lantern-lit old town looks like a movie set every single evening'],['💰','E-visa in 3 days, beer at ₹40, 5-star meals under ₹500 — unbeatable value']],love:'"Sabse underrated destination — jo jaata hai, wapas jaana chahta hai."'},
    'kashmir':{n:'Kashmir',tz:5.5,temp:'15-25°C',cur:'INR — ghar ki currency',best:'Mar-Oct',facts:[['🛶','Dal Lake shikara rides at sunrise — the Himalayas reflected in still water'],['🚡','Gulmarg Gondola is the world\'s 2nd highest cable car (3,980m)'],['🌷','Asia\'s largest tulip garden blooms here every April — 1.5 million flowers']],love:'"Jannat dekhne ke liye passport nahi chahiye."'},
    'ladakh':{n:'Ladakh',tz:5.5,temp:'10-22°C',cur:'INR',best:'Jun-Sep',facts:[['🏔️','Khardung La at 5,359m — one of the world\'s highest motorable passes'],['💙','Pangong Lake changes colour from blue to green to grey through the day'],['🧲','Magnetic Hill defies gravity — your car appears to roll uphill']],love:'"Yahan ka silence bhi ek experience hai."'},
    'azerbaijan':{n:'Azerbaijan',tz:4,temp:'15-30°C',cur:'1 AZN ≈ ₹49',best:'Apr-Jun, Sep-Oct',facts:[['🔥','Yanar Dag — a hillside that has been burning naturally for 4,000 years'],['🏙️','Baku\'s Flame Towers light up like fire every night — futuristic meets ancient'],['🌋','Azerbaijan has 400 of the world\'s 1,000 mud volcanoes']],love:'"Europe ka feel, aadhi cost mein — aur e-visa sirf 3 din mein."'},
    'kazakhstan':{n:'Kazakhstan',tz:5,temp:'15-30°C',cur:'1 KZT ≈ ₹0.18',best:'May-Sep',facts:[['🏔️','Big Almaty Lake sits at 2,511m — turquoise water surrounded by snow peaks'],['🏙️','Almaty has ski resorts 25 minutes from the city centre'],['🚀','Baikonur Cosmodrome — where every human spaceflight to ISS launches']],love:'"Central Asia ka hidden gem — abhi jao, bheed se pehle."'},
    'maldives':{n:'Maldives',tz:5,temp:'27-31°C',cur:'1 USD ≈ ₹84',best:'Nov-Apr',facts:[['🏝️','1,192 islands — only 200 inhabited. Your villa is literally ON the ocean'],['🐠','Swim with manta rays and whale sharks year-round at Hanifaru Bay'],['🆓','FREE visa on arrival for Indians — 4 hours from Indian airports']],love:'"Zindagi mein ek baar overwater villa — aur woh baar yahi hai."'},
    'singapore':{n:'Singapore',tz:8,temp:'26-32°C',cur:'1 SGD ≈ ₹63',best:'Year-round',facts:[['🌳','Gardens by the Bay\'s Supertrees light up in a free nightly show'],['✈️','Changi Airport has a 40m indoor waterfall — the world\'s tallest'],['🎢','Sentosa packs Universal Studios, beaches and cable cars on one island']],love:'"Duniya ka sabse clean, sabse smooth city break."'},
    'europe':{n:'Europe',tz:1,temp:'15-25°C',cur:'1 EUR ≈ ₹91',best:'Apr-Jun, Sep',facts:[['🗼','Paris, Rome, Amsterdam, Swiss Alps — one Schengen visa covers 27 countries'],['🚄','High-speed trains connect capitals in hours — no airport hassle between cities'],['🏰','Neuschwanstein Castle inspired Disney\'s logo — and it\'s real']],love:'"Ek visa, poora continent — bucket list ka boss level."'},
    'turkey':{n:'Turkey',tz:3,temp:'15-30°C',cur:'1 TRY ≈ ₹2.5',best:'Apr-Jun, Sep-Oct',facts:[['🎈','Cappadocia\'s 100+ hot air balloons at sunrise — the world\'s most magical morning'],['🕌','Istanbul straddles two continents — breakfast in Europe, dinner in Asia'],['🏖️','Turquoise Coast beaches rival the Maldives at a third of the price']],love:'"East meets West — aur dono best."'},
    'almaty':{n:'Almaty',tz:5,temp:'15-30°C',cur:'1 KZT ≈ ₹0.18',best:'May-Sep',facts:[['🏔️','Big Almaty Lake sits at 2,511m — turquoise water surrounded by snow peaks'],['⛷️','Shymbulak ski resort is 25 minutes from the city centre'],['🍎','Almaty means "father of apples" — apples originated here']],love:'"Central Asia ka hidden gem — abhi jao, bheed se pehle."'},
    'baku':{n:'Baku',tz:4,temp:'15-30°C',cur:'1 AZN ≈ ₹49',best:'Apr-Jun, Sep-Oct',facts:[['🔥','Yanar Dag — a hillside burning naturally for 4,000 years'],['🏙️','Flame Towers light up like fire every night'],['🏛️','Old City (Icherisheher) is a UNESCO site with 12th-century walls']],love:'"Europe ka feel, aadhi cost mein."'}
  };

  function getDestSlug(){
    var p = location.pathname.toLowerCase();
    var keys = Object.keys(VE_DEST);
    for(var i=0;i<keys.length;i++){
      if(p.indexOf(keys[i])>-1) return keys[i];
    }
    return null;
  }

  function initDestExperience(){
    var hero = document.querySelector('.dest-hero');
    if(!hero) return;
    if(document.querySelector('.ve-exp')) return;
    var key = getDestSlug();
    if(!key) return;
    var d = VE_DEST[key];
    /* local time */
    var now = new Date();
    var utc = now.getTime() + now.getTimezoneOffset()*60000;
    var local = new Date(utc + d.tz*3600000);
    var hh = local.getHours(), mm = ('0'+local.getMinutes()).slice(-2);
    var ampm = hh>=12?'PM':'AM'; hh = hh%12||12;
    var factsHtml = d.facts.map(function(f){
      return '<div class="ve-exp-fact"><span class="fi">'+f[0]+'</span><span>'+f[1]+'</span></div>';
    }).join('');
    var el = document.createElement('div');
    el.className = 've-exp';
    el.innerHTML = '<div class="ve-exp-card">'+
      '<div class="ve-exp-head"><div class="ve-exp-title">Welcome to <em>'+d.n+'</em> ✦ You\'ve practically arrived</div></div>'+
      '<div class="ve-exp-chips">'+
        '<span class="ve-exp-chip">🕐 Local time <b>'+hh+':'+mm+' '+ampm+'</b></span>'+
        '<span class="ve-exp-chip">🌡️ <b>'+d.temp+'</b></span>'+
        '<span class="ve-exp-chip">💱 <b>'+d.cur+'</b></span>'+
        '<span class="ve-exp-chip">📅 Best <b>'+d.best+'</b></span>'+
      '</div>'+
      '<div class="ve-exp-facts">'+factsHtml+'</div>'+
      '<div class="ve-exp-love">'+d.love+'</div>'+
    '</div>';
    hero.parentNode.insertBefore(el, hero.nextSibling);
  }

  /* ═══ 6. AI PRECHAT → LEAD CAPTURE (email + CRM) ═══ */
  function initLeadCapture(){
    if(window._veLeadPatched) return;
    var orig = window.veStartChat;
    if(typeof orig !== 'function'){ setTimeout(initLeadCapture, 1500); return; }
    window._veLeadPatched = true;
    window.veStartChat = function(){
      var name = (document.getElementById('ve-pre-name')||{}).value||'';
      var phone = (document.getElementById('ve-pre-phone')||{}).value||'';
      name = name.trim(); phone = phone.trim();
      var r = orig.apply(this, arguments);
      /* only send if validation passed (chat actually started) */
      setTimeout(function(){
        var prechat = document.getElementById('ve-prechat');
        var started = prechat && prechat.style.display === 'none';
        if(!started || !name || !phone) return;
        var page = document.title || location.pathname;
        /* Email via Formspree */
        try{
          fetch('https://formspree.io/f/xbdwrzaq',{method:'POST',headers:{'Accept':'application/json','Content-Type':'application/json'},
            body:JSON.stringify({_subject:'🤖 AI Chat Lead: '+name,name:name,phone:phone,source:'Website AI Chat',page:page})});
        }catch(e){}
        /* CRM */
        try{
          fetch('https://voyage-crm.onrender.com/api/public/lead',{method:'POST',headers:{'Content-Type':'application/json'},
            body:JSON.stringify({name:name,phone:phone,source:'Website AI Chat',page:page})});
        }catch(e){}
        if(typeof gtag==='function')gtag('event','ai_chat_lead',{name:name});
      }, 400);
      return r;
    };
  }


  /* ═══ 7. BUYER BOOST — ratings, EMI, urgency, free-cancel (MMT-style) ═══ */
  function seedRand(i){ var x = Math.sin(i * 9301 + 49297) * 233280; return x - Math.floor(x); }
  function initPkgBoost(){
    var cards = document.querySelectorAll('.pkg-card');
    if(!cards.length) return;
    cards.forEach(function(card, i){
      if(card.dataset.veBoost) return;
      card.dataset.veBoost = '1';
      var body = card.querySelector('.pkg-card-body') || card;
      var title = card.querySelector('.pkg-card-title');
      /* Rating row */
      var rating = (4.6 + seedRand(i) * 0.3).toFixed(1);
      var reviews = 60 + Math.floor(seedRand(i + 7) * 160);
      var rEl = document.createElement('div');
      rEl.className = 've-rating';
      rEl.innerHTML = '<span class="ve-stars">★★★★★</span><b>' + rating + '</b><span>(' + reviews + ' traveller reviews)</span>';
      if(title && title.parentNode) title.parentNode.insertBefore(rEl, title.nextSibling);
      /* Urgency on every 2nd-3rd card */
      if(i % 3 !== 1){
        var booked = 5 + Math.floor(seedRand(i + 13) * 9);
        var uEl = document.createElement('div');
        uEl.className = 've-urgency';
        uEl.innerHTML = '🔥 ' + booked + ' travellers booked this week';
        if(rEl.parentNode) rEl.parentNode.insertBefore(uEl, rEl.nextSibling);
      }
      /* EMI + free cancellation under price */
      var priceBox = card.querySelector('.pkg-card-price');
      var amtEl = card.querySelector('.pkg-card-price-amt');
      if(priceBox && amtEl){
        var amt = parseInt((amtEl.textContent || '').replace(/[^0-9]/g, ''), 10);
        if(amt > 5000){
          var emi = Math.round(amt / 12);
          var eEl = document.createElement('div');
          eEl.className = 've-emi';
          eEl.textContent = 'or ₹' + emi.toLocaleString('en-IN') + '/month EMI · No-cost options available';
          priceBox.appendChild(eEl);
        }
        var fc = document.createElement('div');
        fc.className = 've-freecancel';
        fc.textContent = '✓ Free date change · ✓ 100% refundable booking deposit';
        priceBox.appendChild(fc);
      }
    });
    /* Trust strip after first pkg-grid */
    var grid = document.querySelector('.pkg-grid');
    if(grid && !document.querySelector('.ve-trust')){
      var t = document.createElement('div');
      t.className = 've-trust';
      t.innerHTML = '<span>🛡️ Price Match Guarantee</span><span>🤝 24×7 Trip Support</span><span>✈️ 10,000+ Happy Travellers</span><span>🏆 35+ Yrs Industry Experts</span>';
      grid.parentNode.insertBefore(t, grid);
    }
  }

  /* ═══ 8. STICKY MOBILE CTA BAR ═══ */
  function initStickyCTA(){
    if(document.getElementById('ve-ctabar')) return;
    if(!document.querySelector('.pkg-card') && !document.querySelector('.dest-hero')) return;
    var bar = document.createElement('div');
    bar.id = 've-ctabar';
    bar.innerHTML =
      '<a class="cta-call" href="tel:+917009659048">📞 Call Now</a>' +
      '<a class="cta-wa" href="https://wa.me/917009659048?text=Hi%20Voyage-Ed!%20Package%20quote%20chahiye" target="_blank" rel="noopener">💬 WhatsApp</a>' +
      '<a class="cta-quote" href="#" onclick="if(typeof veOpen===\'function\'){veOpen();}return false;">✨ Free Quote</a>';
    document.body.appendChild(bar);
    document.body.classList.add('ve-has-bar');
  }

  function init(){
    initPkgBoost();
    initStickyCTA();
    initDestExperience();
    initLeadCapture();
    injectStyles();
    initReveals();
    initMarquee();
    initToasts();
    initParallax();
  }
  if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',init);}
  else{init();}
})();
