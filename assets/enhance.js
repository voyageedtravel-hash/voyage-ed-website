/* Voyage-Ed global enhancements v8 — +conversions */
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
    // Push the fixed nav below the marquee so they don't overlap
    var nav=document.querySelector('nav');
    if(nav){ nav.style.top='34px'; }
    document.documentElement.style.setProperty('--ve-mq-h','34px');
    // Add a style tag to offset nav.scrolled too
    if(!document.getElementById('ve-mq-offset')){
      var st=document.createElement('style'); st.id='ve-mq-offset';
      st.textContent='nav{top:34px!important}@media(max-width:768px){#ve-marquee{font-size:11px}nav{top:32px!important}}';
      document.head.appendChild(st);
    }
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
    s.textContent='#ve-marquee{position:fixed;top:0;left:0;right:0;z-index:1001;background:linear-gradient(90deg,#0a1530,#13265c,#0a1530);color:#f0c842;overflow:hidden;padding:8px 0;font-size:12.5px;font-weight:600;letter-spacing:.04em;border-bottom:1px solid rgba(201,150,26,.35);font-family:Raleway,system-ui,sans-serif;height:34px;box-sizing:border-box}#ve-marquee .ve-mq-track{display:inline-block;white-space:nowrap;animation:veMq 38s linear infinite}@keyframes veMq{to{transform:translateX(-50%)}}#ve-marquee span{margin:0 22px}#ve-marquee b{color:#fff}#ve-toast{position:fixed;bottom:84px;left:12px;z-index:9996;background:#fff;border:1px solid rgba(201,150,26,.3);border-radius:14px;padding:11px 14px;box-shadow:0 12px 36px rgba(10,21,48,.22);display:flex;align-items:center;gap:10px;max-width:290px;font-size:12.5px;color:#1a1a2e;transform:translateX(-120%);transition:transform .55s cubic-bezier(.22,1,.36,1);font-family:Raleway,system-ui,sans-serif}#ve-toast.ve-show{transform:translateX(0)}#ve-toast .ve-toast-ico{width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,#0d1b3e,#13265c);color:#f0c842;display:flex;align-items:center;justify-content:center;font-size:15px;flex-shrink:0}#ve-toast b{color:#0d1b3e}#ve-toast .ve-toast-x{margin-left:4px;cursor:pointer;color:#9aa3b5;font-size:15px;flex-shrink:0}#ve-toast br{display:none}#ve-toast div{line-height:1.45}@media(max-width:600px){#ve-toast{bottom:76px;left:8px;max-width:75vw;font-size:11.5px}}.g-reveal{opacity:0;transform:translateY(30px);transition:opacity .8s cubic-bezier(.22,1,.36,1),transform .8s cubic-bezier(.22,1,.36,1)}.g-reveal.g-in{opacity:1;transform:translateY(0)}html,body{overflow-x:hidden;max-width:100%}#ve-top{position:fixed;right:20px;width:46px;height:46px;border:none;border-radius:50%;background:linear-gradient(135deg,#0d1b3e,#162347);color:#c9a84c;font-size:20px;font-weight:700;cursor:pointer;box-shadow:0 8px 24px rgba(13,27,62,.35);opacity:0;visibility:hidden;transform:translateY(12px) scale(.8);transition:opacity .35s,transform .35s,visibility .35s;z-index:9996}#ve-top.show{opacity:1;visibility:visible;transform:translateY(0) scale(1)}#ve-top:hover{background:linear-gradient(135deg,#c9a84c,#e8c97a);color:#0d1b3e}#ve-readbar{position:fixed;top:0;left:0;height:3px;width:0;background:linear-gradient(90deg,#c9a84c,#e8c97a);z-index:10001;transition:width .1s linear;box-shadow:0 0 8px rgba(201,168,76,.6)}img{transition:opacity .5s ease}img:not(.ve-img-loaded){opacity:0}img.ve-img-loaded{opacity:1}';
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


  /* === 9. WORLD-CLASS POLISH — back-to-top, lazy fade, blog progress === */
  function initBackToTop(){
    if(document.getElementById('ve-top')) return;
    var btn = document.createElement('button');
    btn.id = 've-top';
    btn.setAttribute('aria-label','Back to top');
    btn.innerHTML = '\u2191';
    document.body.appendChild(btn);
    var hasBar = document.body.classList.contains('ve-has-bar');
    btn.style.bottom = hasBar ? '150px' : '92px';
    btn.onclick = function(){ window.scrollTo({top:0,behavior:'smooth'}); };
    var ticking=false;
    window.addEventListener('scroll',function(){
      if(ticking) return; ticking=true;
      requestAnimationFrame(function(){
        btn.classList.toggle('show', window.scrollY > 600);
        ticking=false;
      });
    },{passive:true});
  }
  function initLazyFade(){
    document.querySelectorAll('img').forEach(function(img){
      if(img.complete && img.naturalWidth>0){ img.classList.add('ve-img-loaded'); }
      else { img.addEventListener('load',function(){ img.classList.add('ve-img-loaded'); });
             img.addEventListener('error',function(){ img.classList.add('ve-img-loaded'); }); }
    });
  }
  function initBlogProgress(){
    if(!/\/blog\//.test(location.pathname)) return;
    if(document.getElementById('ve-readbar')) return;
    var bar = document.createElement('div'); bar.id='ve-readbar';
    document.body.appendChild(bar);
    window.addEventListener('scroll',function(){
      var h=document.documentElement;
      var pct=(h.scrollTop)/(h.scrollHeight-h.clientHeight)*100;
      bar.style.width=Math.min(Math.max(pct,0),100)+'%';
    },{passive:true});
  }


  /* ═══ EXIT-INTENT POPUP (catch leaving visitors → capture lead) ═══ */
  function initExitIntent(){
    var KEY = 'veExitShown';
    try { if(sessionStorage.getItem(KEY)) return; } catch(e){ return; }
    var shown = false;
    var armed = false;
    // Arm only after 12s so it doesn't annoy instant bouncers
    setTimeout(function(){ armed = true; }, 12000);

    function buildPopup(){
      var overlay = document.createElement('div');
      overlay.id = 've-exit';
      overlay.innerHTML =
        '<div class="ve-exit-card">' +
          '<button class="ve-exit-x" aria-label="Close">&times;</button>' +
          '<div class="ve-exit-badge">WAIT — DON\'T MISS THIS</div>' +
          '<h2>Get a FREE Trip Quote in 1 Hour ✈️</h2>' +
          '<p>Leave your number and our travel expert will send you the best package price — no obligation. We\'ve helped 10,000+ travellers from North India.</p>' +
          '<input id="ve-exit-name" type="text" placeholder="Your name" />' +
          '<input id="ve-exit-phone" type="tel" placeholder="Phone / WhatsApp number" />' +
          '<button id="ve-exit-btn" type="button">Get My Free Quote →</button>' +
          '<div id="ve-exit-msg"></div>' +
          '<div class="ve-exit-or">or <a href="https://wa.me/917009659048?text=Hi%20Voyage-Ed!%20I%20want%20a%20trip%20quote" target="_blank" rel="noopener">message us on WhatsApp</a></div>' +
        '</div>';
      document.body.appendChild(overlay);

      overlay.querySelector('.ve-exit-x').onclick = closePopup;
      overlay.onclick = function(e){ if(e.target===overlay) closePopup(); };
      document.getElementById('ve-exit-btn').onclick = submitExit;
    }

    function closePopup(){
      var o = document.getElementById('ve-exit');
      if(o){ o.style.opacity='0'; setTimeout(function(){ o.remove(); }, 250); }
    }

    function submitExit(){
      var name=(document.getElementById('ve-exit-name')||{}).value||'';
      var phone=(document.getElementById('ve-exit-phone')||{}).value||'';
      var msg=document.getElementById('ve-exit-msg'), btn=document.getElementById('ve-exit-btn');
      if(!name.trim()||!phone.trim()){ msg.style.color='#ffd2d2'; msg.textContent='Please enter your name and phone.'; return; }
      btn.disabled=true; btn.textContent='Sending...';
      var dest=(document.title||'').split('—')[0].split('|')[0].trim();
      // Create CRM deal
      fetch('https://voyage-crm.onrender.com/api/leads/webhook',{
        method:'POST',headers:{'Content-Type':'application/json'},
        body:JSON.stringify({clientName:name,contactNo:phone,destination:dest,source:'Website Exit Popup',remarks:'Exit-intent on '+location.pathname})
      }).catch(function(){});
      // Formspree backup
      fetch('https://formspree.io/f/xbdwrzaq',{
        method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},
        body:JSON.stringify({name:name,phone:phone,source:'Exit popup',page:location.href})
      }).catch(function(){});
      setTimeout(function(){
        msg.style.color='#b6f5c8'; msg.textContent='✓ Thank you! Our expert will call you shortly.';
        btn.textContent='Sent ✓';
        setTimeout(closePopup, 2200);
      }, 800);
    }

    function trigger(){
      if(shown || !armed) return;
      shown = true;
      try { sessionStorage.setItem(KEY,'1'); } catch(e){}
      buildPopup();
    }

    // Desktop: mouse leaves top of viewport (toward tabs/back)
    document.addEventListener('mouseout', function(e){
      if(!e.relatedTarget && e.clientY <= 5) trigger();
    });
    // Mobile: fast scroll-up after scrolling down = exit signal
    var lastY = window.scrollY, peak = 0;
    window.addEventListener('scroll', function(){
      var y = window.scrollY;
      if(y > peak) peak = y;
      if(peak > 600 && lastY - y > 60 && y < peak - 300) trigger();
      lastY = y;
    }, {passive:true});
  }


  /* ═══ GA4 CONVERSION TRACKING (WhatsApp, Call, Forms) ═══ */
  function initConversionTracking(){
    function track(name, params){
      try{ if(typeof gtag==='function') gtag('event', name, params||{}); }catch(e){}
    }
    // Track every WhatsApp click site-wide
    document.addEventListener('click', function(e){
      var a = e.target.closest && e.target.closest('a');
      if(!a) return;
      var href = a.getAttribute('href')||'';
      if(href.indexOf('wa.me')>-1){
        track('whatsapp_click', {link_url:href, page:location.pathname, event_category:'lead'});
      } else if(href.indexOf('tel:')===0){
        track('phone_click', {phone:href.replace('tel:',''), page:location.pathname, event_category:'lead'});
      } else if(href.indexOf('mailto:')===0){
        track('email_click', {page:location.pathname, event_category:'lead'});
      }
    }, true);
    // Track form submits (lead forms, exit popup, quick-lead)
    document.addEventListener('click', function(e){
      var b = e.target.closest && e.target.closest('button');
      if(!b) return;
      var id = b.id||'';
      if(id==='ql-btn') track('lead_form_submit', {form:'blog_quick_lead', page:location.pathname, event_category:'lead'});
      if(id==='ve-exit-btn') track('lead_form_submit', {form:'exit_popup', page:location.pathname, event_category:'lead'});
    }, true);
    // Scroll depth (75% = engaged reader)
    var fired75=false;
    window.addEventListener('scroll', function(){
      if(fired75) return;
      var d=(window.scrollY+window.innerHeight)/document.documentElement.scrollHeight;
      if(d>0.75){ fired75=true; track('scroll_75', {page:location.pathname}); }
    }, {passive:true});
  }

  function initBeautyPack(){
    if(document.getElementById('ve-beauty-css')) return;
    var s=document.createElement('style'); s.id='ve-beauty-css';
    s.textContent=`
/* ═══ VOYAGE-ED PREMIUM BEAUTY PACK ═══ */
::-webkit-scrollbar{width:10px}
::-webkit-scrollbar-track{background:#0d1b3e}
::-webkit-scrollbar-thumb{background:linear-gradient(180deg,#c9961a,#f0c842);border-radius:5px;border:2px solid #0d1b3e}
::-webkit-scrollbar-thumb:hover{background:#f0c842}
::selection{background:#c9961a;color:#fff}
::-moz-selection{background:#c9961a;color:#fff}
img{transition:transform .5s cubic-bezier(.2,.7,.2,1),filter .5s}
a:focus-visible,button:focus-visible{outline:2px solid #c9961a;outline-offset:3px;border-radius:4px}
.dcard-price b,.art-card-title{background:linear-gradient(90deg,#0d1b3e,#1a3060);-webkit-background-clip:text}
h1,h2{letter-spacing:.01em}
.cta-btn,.nav-cta,button[class*=btn]{transition:transform .25s cubic-bezier(.34,1.56,.64,1),box-shadow .25s!important}
.cta-btn:hover,.nav-cta:hover{transform:translateY(-3px) scale(1.02);box-shadow:0 12px 30px -8px rgba(201,150,26,.5)!important}
`;
    document.head.appendChild(s);
  }
  function initExitStyles(){
    if(document.getElementById('ve-exit-css')) return;
    var s=document.createElement('style'); s.id='ve-exit-css';
    s.textContent=`
#ve-exit{position:fixed;inset:0;background:rgba(10,21,48,.72);backdrop-filter:blur(4px);z-index:99999;display:flex;align-items:center;justify-content:center;padding:18px;opacity:1;transition:opacity .25s;animation:veExitIn .3s ease}
@keyframes veExitIn{from{opacity:0}to{opacity:1}}
.ve-exit-card{background:linear-gradient(150deg,#0d1b3e,#13265c 55%,#1a2f6e);color:#fff;max-width:420px;width:100%;border-radius:22px;padding:34px 30px;position:relative;box-shadow:0 30px 80px -20px rgba(0,0,0,.6);border:1px solid rgba(201,150,26,.3);animation:veCardIn .35s cubic-bezier(.2,.9,.3,1.2)}
@keyframes veCardIn{from{transform:translateY(24px) scale(.96);opacity:0}to{transform:none;opacity:1}}
.ve-exit-x{position:absolute;top:14px;right:16px;background:none;border:none;color:rgba(255,255,255,.6);font-size:30px;line-height:1;cursor:pointer;padding:0;width:32px;height:32px}
.ve-exit-x:hover{color:#fff}
.ve-exit-badge{display:inline-block;background:rgba(201,150,26,.18);color:#f0c842;font-size:11px;font-weight:800;letter-spacing:1.5px;padding:6px 12px;border-radius:20px;margin-bottom:14px}
.ve-exit-card h2{font-size:25px;line-height:1.2;margin:0 0 10px;color:#fff;font-family:var(--serif,'Playfair Display',serif)}
.ve-exit-card p{font-size:14px;line-height:1.55;color:rgba(255,255,255,.82);margin:0 0 18px}
.ve-exit-card input{width:100%;padding:13px 15px;border-radius:11px;border:none;margin-bottom:10px;font-size:15px;box-sizing:border-box;background:#fff;color:#0d1b3e}
#ve-exit-btn{width:100%;padding:15px;border-radius:11px;border:none;background:linear-gradient(135deg,#f0c842,#c9961a);color:#0d1b3e;font-weight:800;font-size:16px;cursor:pointer;transition:transform .15s}
#ve-exit-btn:hover{transform:translateY(-2px)}
#ve-exit-msg{font-size:13px;text-align:center;margin-top:10px;min-height:16px}
.ve-exit-or{text-align:center;font-size:13px;color:rgba(255,255,255,.6);margin-top:14px}
.ve-exit-or a{color:#f0c842;font-weight:600;text-decoration:none}
@media(max-width:480px){.ve-exit-card{padding:28px 22px}.ve-exit-card h2{font-size:22px}}
`;
    document.head.appendChild(s);
  }


  /* ═══ INTELLIGENT SITE SEARCH ═══ */
  var VE_INDEX = null;
  function loadSearchIndex(cb){
    if(VE_INDEX){ cb(VE_INDEX); return; }
    fetch('/assets/search-index.json').then(function(r){return r.json();}).then(function(d){
      VE_INDEX = d; cb(d);
    }).catch(function(){ cb([]); });
  }

  // Score a page against the query: higher = more relevant
  function scoreEntry(e, q, words){
    var hay = (e.t+' '+e.d+' '+e.k+' '+e.c).toLowerCase();
    var title = e.t.toLowerCase();
    var score = 0;
    // Exact phrase in title = huge boost
    if(title.indexOf(q) >= 0) score += 100;
    if(title.indexOf(q) === 0) score += 50; // starts with
    // Phrase anywhere
    if(hay.indexOf(q) >= 0) score += 30;
    // Each query word
    words.forEach(function(w){
      if(w.length < 2) return;
      if(title.indexOf(w) >= 0) score += 20;
      else if(hay.indexOf(w) >= 0) score += 8;
    });
    // Category boost: prefer Destination/Package over Guide for trip queries
    if(score > 0 && (e.c==='Destination'||e.c==='Package')) score += 5;
    return score;
  }

  function searchSite(q, cb){
    q = (q||'').trim().toLowerCase();
    if(q.length < 2){ cb([]); return; }
    var words = q.split(/\s+/);
    loadSearchIndex(function(idx){
      var scored = [];
      for(var i=0;i<idx.length;i++){
        var s = scoreEntry(idx[i], q, words);
        if(s > 0) scored.push({e:idx[i], s:s});
      }
      scored.sort(function(a,b){ return b.s - a.s; });
      cb(scored.slice(0, 8).map(function(x){ return x.e; }));
    });
  }

  function initSearch(){
    if(document.getElementById('ve-search-wrap')) return;
    // Build the search bar — floating trigger in the nav area
    var trigger = document.createElement('button');
    trigger.id = 've-search-trigger';
    trigger.setAttribute('aria-label','Search');
    trigger.innerHTML = '🔍';
    document.body.appendChild(trigger);

    var overlay = document.createElement('div');
    overlay.id = 've-search-wrap';
    overlay.innerHTML =
      '<div class="ve-search-box">' +
        '<div class="ve-search-inputrow">' +
          '<span class="ve-search-ic">🔍</span>' +
          '<input id="ve-search-input" type="text" placeholder="Search destinations, packages, guides..." autocomplete="off" />' +
          '<button class="ve-search-close" aria-label="Close">&times;</button>' +
        '</div>' +
        '<div id="ve-search-results"></div>' +
        '<div class="ve-search-hint">Try: <b>Georgia</b>, <b>Canada flights</b>, <b>honeymoon</b>, <b>Thailand cost</b></div>' +
      '</div>';
    document.body.appendChild(overlay);

    var input = document.getElementById('ve-search-input');
    var results = document.getElementById('ve-search-results');
    var open = function(){ overlay.classList.add('open'); setTimeout(function(){input.focus();},50); loadSearchIndex(function(){}); };
    var close = function(){ overlay.classList.remove('open'); input.value=''; results.innerHTML=''; };

    trigger.onclick = open;
    overlay.querySelector('.ve-search-close').onclick = close;
    overlay.onclick = function(e){ if(e.target===overlay) close(); };
    document.addEventListener('keydown', function(e){
      if((e.ctrlKey||e.metaKey) && e.key==='k'){ e.preventDefault(); open(); }
      if(e.key==='Escape') close();
    });

    var catIcon = {Destination:'📍',Package:'🧳',Guide:'📖',Flights:'✈️',Visa:'🛂',Education:'🎓'};
    var render = function(items){
      if(!input.value.trim()){ results.innerHTML=''; return; }
      if(!items.length){
        results.innerHTML = '<div class="ve-search-empty">No matches. Try a destination name, or <a href="https://wa.me/917009659048?text=Hi! I am looking for...">ask us on WhatsApp</a>.</div>';
        return;
      }
      results.innerHTML = items.map(function(e){
        return '<a class="ve-search-item" href="'+e.u+'">' +
          '<span class="ve-search-cat">'+(catIcon[e.c]||'📄')+'</span>' +
          '<span class="ve-search-txt"><b>'+e.t+'</b><small>'+(e.d||e.c)+'</small></span>' +
          '<span class="ve-search-go">→</span></a>';
      }).join('');
    };

    var debounce;
    input.oninput = function(){
      clearTimeout(debounce);
      var q = input.value;
      debounce = setTimeout(function(){ searchSite(q, render); }, 120);
    };
    // Enter → go to first result
    input.onkeydown = function(e){
      if(e.key==='Enter'){
        var first = results.querySelector('.ve-search-item');
        if(first) window.location.href = first.getAttribute('href');
      }
    };
  }


  function initSearchStyles(){
    if(document.getElementById("ve-search-css")) return;
    var s=document.createElement("style"); s.id="ve-search-css";
    s.textContent=`
#ve-search-trigger{position:fixed;top:130px;right:14px;z-index:9990;background:linear-gradient(135deg,#0d1b3e,#13265c);color:#f0c842;border:1px solid rgba(201,150,26,.3);border-radius:50%;width:46px;height:46px;font-size:19px;cursor:pointer;box-shadow:0 4px 16px rgba(10,21,48,.3);transition:transform .2s}
#ve-search-trigger:hover{transform:scale(1.08)}
#ve-search-wrap{position:fixed;inset:0;background:rgba(10,21,48,.6);backdrop-filter:blur(5px);z-index:99998;display:none;align-items:flex-start;justify-content:center;padding:80px 18px 18px}
#ve-search-wrap.open{display:flex;animation:veSearchIn .2s ease}
@keyframes veSearchIn{from{opacity:0}to{opacity:1}}
.ve-search-box{background:#fff;width:100%;max-width:580px;border-radius:18px;box-shadow:0 30px 80px -20px rgba(0,0,0,.5);overflow:hidden;animation:veSearchCard .25s cubic-bezier(.2,.9,.3,1.1)}
@keyframes veSearchCard{from{transform:translateY(-20px);opacity:0}to{transform:none;opacity:1}}
.ve-search-inputrow{display:flex;align-items:center;padding:6px 14px;border-bottom:1px solid #e8eef7}
.ve-search-ic{font-size:18px;opacity:.5}
#ve-search-input{flex:1;border:none;outline:none;padding:16px 12px;font-size:17px;color:#0d1b3e;background:transparent}
.ve-search-close{background:none;border:none;font-size:26px;color:#9aa7bd;cursor:pointer;padding:0 6px}
#ve-search-results{max-height:54vh;overflow-y:auto}
.ve-search-item{display:flex;align-items:center;gap:12px;padding:13px 18px;text-decoration:none;color:#0d1b3e;border-bottom:1px solid #f1f5fa;transition:background .12s}
.ve-search-item:hover{background:#f4f7fc}
.ve-search-cat{font-size:20px;flex-shrink:0}
.ve-search-txt{flex:1;min-width:0}
.ve-search-txt b{display:block;font-size:15px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ve-search-txt small{display:block;font-size:12px;color:#7e8aa0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-top:2px}
.ve-search-go{color:#c9961a;font-weight:700;flex-shrink:0}
.ve-search-empty{padding:24px 18px;text-align:center;color:#7e8aa0;font-size:14px}
.ve-search-empty a{color:#c9961a;font-weight:600}
.ve-search-hint{padding:13px 18px;font-size:12px;color:#9aa7bd;background:#f9fbfd;border-top:1px solid #f1f5fa}
.ve-search-hint b{color:#0d1b3e;font-weight:600}
@media(max-width:480px){#ve-search-wrap{padding:60px 12px 12px}#ve-search-trigger{width:42px;height:48px;font-size:18px}}
`;
    document.head.appendChild(s);
  }


  /* ═══ GA4 CONVERSION TRACKING (WhatsApp, calls, forms, leads) ═══ */
  function initConversionTracking(){
    function track(name, params){
      try{ if(typeof gtag==='function') gtag('event', name, params||{}); }catch(e){}
    }
    // 1. WhatsApp clicks (every wa.me link, incl. floating button)
    document.addEventListener('click', function(e){
      var a = e.target.closest && e.target.closest('a');
      if(!a) return;
      var href = a.getAttribute('href')||'';
      if(href.indexOf('wa.me')>-1){
        track('whatsapp_click', {page_path: location.pathname, link_text: (a.textContent||'').trim().slice(0,50)});
      } else if(href.indexOf('tel:')===0){
        track('phone_click', {page_path: location.pathname});
      } else if(href.indexOf('mailto:')===0){
        track('email_click', {page_path: location.pathname});
      }
    }, true);
    // 2. Lead form submits (quick-lead blog forms + exit popup + homepage form)
    document.addEventListener('click', function(e){
      var b = e.target.closest && e.target.closest('button');
      if(!b) return;
      var id = b.id||'';
      if(id==='ql-btn') track('generate_lead', {method:'blog_form', page_path: location.pathname});
      if(id==='ve-exit-btn') track('generate_lead', {method:'exit_popup', page_path: location.pathname});
    }, true);
    // 3. Native form submits
    document.addEventListener('submit', function(e){
      track('generate_lead', {method:'form', page_path: location.pathname});
    }, true);
    // 4. AI chat opened (engagement signal)
    var t=document.getElementById('ve-trigger');
    if(t) t.addEventListener('click', function(){ track('ai_chat_open', {page_path: location.pathname}); });
    // 5. Search used
    document.addEventListener('keydown', function(e){
      if(e.key==='Enter' && e.target && e.target.id==='ve-search-input'){
        track('site_search', {search_term: e.target.value.slice(0,60)});
      }
    }, true);
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
    initBackToTop();
    initLazyFade();
    initBlogProgress();
    initConversionTracking();
    initBeautyPack();
    initConversionTracking();
    initExitStyles();
    initExitIntent();
    initSearchStyles();
    initSearch();
  }
  if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',init);}
  else{init();}
})();
