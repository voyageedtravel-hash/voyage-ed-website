/* =========================================================================
   VOYAGE-ED — STATIC SEO PAGE GENERATOR (v2)
   ========================================================================= */
const fs   = require("fs");
const path = require("path");

const ROOT     = __dirname;
const SRC_DIR  = path.resolve(ROOT, "..", "voyage-ed-original", "voyage-ed-site");
const DIST_DIR = process.env.DIST_DIR || path.resolve(ROOT, "dist-v2");
const SITE_URL = "https://voyage-ed.com";

const VOYAGE_PACKAGES = require(path.resolve(ROOT, "build", "packages-data.js"));

function slugify(s){
  return String(s||"")
    .toLowerCase()
    .replace(/[''""()·•]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}
function esc(s){
  if(s === undefined || s === null) return "";
  return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
}
const attrEsc = esc;
function jsonStr(s){ return JSON.stringify(String(s||"")); }
function fmtINR(n){ return "₹" + Number(n).toLocaleString("en-IN"); }
function metaTrunc(s, max){
  s = String(s||"").replace(/\s+/g, " ").trim();
  if(s.length <= max) return s;
  return s.slice(0, max - 1).replace(/[,;:\s][^,;:\s]*$/, "") + "…";
}
function regionLabel(d){ return d.region === "domestic" ? "Domestic" : "International"; }
function regionPage(d){ return d.region === "domestic" ? "domestic.html" : "international.html"; }
function destURL(slug){ return "/" + slug + "-packages.html"; }
function pkgURL(destSlug, pkgSlug){ return "/" + destSlug + "-packages/" + pkgSlug + ".html"; }

function pkgSlugUnique(seen, pkg, fallbackIdx){
  const base = pkg.title || ("package-"+(fallbackIdx+1));
  const variants = [
    base,
    pkg.label ? base + " " + pkg.label : null,
    pkg.hotel_category ? base + " " + pkg.hotel_category : null,
    (pkg.label && pkg.hotel_category) ? base + " " + pkg.label + " " + pkg.hotel_category : null,
  ].filter(Boolean);
  for(const v of variants){
    const s = slugify(v);
    if(!seen[s]){ seen[s] = true; return s; }
  }
  let s = slugify(base), n = 2;
  while(seen[s + "-" + n]) n++;
  seen[s + "-" + n] = true;
  return s + "-" + n;
}

const TOPTAG = `<div class="toptag">✦ India's One-Stop Travel Partner &nbsp;|&nbsp; Best Flight Deals to Canada · UK · USA · Australia · NZ &nbsp;|&nbsp; Call <a href="tel:+917009659048">+91 7009 659 048</a> ✦</div>`;

const NAV = `<nav>
  <a href="/index.html" class="nav-logo" aria-label="Voyage-Ed Travels — Home">
    <img src="/logo.png" alt="Voyage-Ed Travels" width="180" height="46"/>
  </a>
  <button class="hamburger" onclick="this.classList.toggle('active');document.querySelector('nav ul').classList.toggle('open')" aria-label="Menu"><span></span><span></span><span></span></button>
  <ul>
    <li><a href="/index.html">Home</a></li>
    <li><a href="/travel.html">Travel</a></li>
    <li><a href="/domestic.html">Domestic</a></li>
    <li><a href="/international.html">International</a></li>
    <li><a href="/visa.html">Visa</a></li>
    <li><a href="/education.html">Education</a></li>
    <li><a href="#" class="ncta" onclick="veOpen();return false">Enquire Now</a></li>
  </ul>
</nav>`;

const FOOTER = `<footer class="ft">
  <div class="ft-grid">
    <div>
      <a href="/index.html" class="ft-logo"><img src="/logo.png" alt="Voyage-Ed Travels" width="160" height="42"/></a>
      <p class="ft-tag">Voyage-Ed Travels — your trusted partner for bespoke journeys across the world. Backed by 35+ years of combined leadership across GDS, OTAs &amp; Travel Management Companies.</p>
      <p style="font-size:.85rem;line-height:1.7"><strong style="color:var(--gold-l)">📞</strong> <a href="tel:+917009659048" style="color:rgba(255,255,255,.85);border-bottom:1px solid var(--gold)">+91 7009 659 048</a><br>
      <strong style="color:var(--gold-l)">✉</strong> <a href="mailto:Enquiry@voyage-ed.com" style="color:rgba(255,255,255,.85);border-bottom:1px solid var(--gold)">Enquiry@voyage-ed.com</a></p>
    </div>
    <div><h4 class="ft-h">Travel</h4>
      <ul class="ft-list"><li><a href="/domestic.html">Domestic</a></li><li><a href="/international.html">International</a></li><li><a href="/visa.html">Visa Services</a></li><li><a href="/travel.html">Flight Deals</a></li></ul></div>
    <div><h4 class="ft-h">Company</h4>
      <ul class="ft-list"><li><a href="/index.html">About Us</a></li><li><a href="/education.html">Education</a></li><li><a href="#" onclick="veOpen();return false">Contact</a></li></ul></div>
    <div><h4 class="ft-h">Top Destinations</h4>
      <ul class="ft-list"><li><a href="/bali-packages.html">Bali</a></li><li><a href="/maldives-packages.html">Maldives</a></li><li><a href="/dubai-abu-dhabi-packages.html">Dubai</a></li><li><a href="/kashmir-packages.html">Kashmir</a></li></ul></div>
  </div>
  <div class="ft-bot">
    <div>© 2026 Voyage-Ed Travels. All rights reserved.</div>
    <div>Bespoke Journeys · Practical Training</div>
  </div>
</footer>`;

const ENQUIRY_MODAL = `<div class="ve-overlay" id="veOverlay" role="dialog" aria-modal="true" onclick="if(event.target===this)veClose()">
  <div class="ve-modal">
    <div class="ve-head">
      <button type="button" class="ve-close" onclick="veClose()">&times;</button>
      <div class="ve-tag" id="veTag">Travel Enquiry</div>
      <div class="ve-title" id="veTitle">Plan Your <em>Journey</em></div>
      <div class="ve-sub" id="veSub">Share a few details and a senior planner will be in touch within 24 hours.</div>
    </div>
    <div class="ve-body">
      <form id="veForm" action="https://formspree.io/f/xbdwrzaq" method="POST" novalidate>
        <input type="hidden" name="_subject" value="New Voyage-Ed Enquiry"/>
        <input type="hidden" name="enquiry_type" id="veEnquiryType" value="General Enquiry"/>
        <input type="hidden" name="destination" id="veDestination" value=""/>
        <input type="hidden" name="package_variant" id="vePackageVariant" value=""/>
        <input type="hidden" name="page_source" id="vePageSource" value=""/>
        <input type="text" name="_gotcha" style="display:none" tabindex="-1" autocomplete="off"/>
        <div class="ve-field"><label for="veName">Full Name <span class="req">*</span></label><input type="text" id="veName" name="name" required minlength="2" placeholder="Your full name"/></div>
        <div class="ve-row">
          <div class="ve-field"><label for="veEmail">Email <span class="req">*</span></label><input type="email" id="veEmail" name="email" required placeholder="you@example.com"/></div>
          <div class="ve-field"><label for="vePhone">Phone <span class="req">*</span></label><input type="tel" id="vePhone" name="phone" required pattern="[0-9+\\s\\-]{8,18}" placeholder="+91 9XXXX XXXXX"/></div>
        </div>
        <div class="ve-row">
          <div class="ve-field"><label for="veTravellers">Travellers</label><select id="veTravellers" name="travellers"><option value="">Select…</option><option>1</option><option>2</option><option>3-4</option><option>5-8</option><option>9+</option></select></div>
          <div class="ve-field"><label for="veDate">Approx. Travel Date</label><input type="date" id="veDate" name="travel_date"/></div>
        </div>
        <div class="ve-field"><label for="veMsg">Message <span class="req">*</span></label><textarea id="veMsg" name="message" required minlength="10"></textarea></div>
        <button class="ve-btn" type="submit" id="veSubmit">Send Enquiry →</button>
        <div class="ve-status" id="veStatus" role="status"></div>
        <div class="ve-altcontact">Or reach us directly: <a href="tel:+917009659048">+91 7009 659 048</a> · <a href="mailto:Enquiry@voyage-ed.com">Enquiry@voyage-ed.com</a></div>
      </form>
    </div>
  </div>
</div>`;

function headBlock(opts){
  const title = opts.title || "Voyage-Ed Travels";
  const desc  = metaTrunc(opts.description || "", 160);
  const canon = opts.canonical;
  const img   = opts.image || (SITE_URL + "/logo.png");
  const type  = opts.type || "website";
  const jsonldArr = (opts.jsonld||[]).filter(Boolean);
  const jsonldHtml = jsonldArr.map(o => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join("\n");
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0,viewport-fit=cover"/>
<title>${esc(title)}</title>
<meta name="description" content="${attrEsc(desc)}"/>
<link rel="canonical" href="${attrEsc(canon)}"/>
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"/>
<meta name="theme-color" content="#0d1b3e"/>
<meta name="format-detection" content="telephone=no"/>
<meta property="og:type" content="${attrEsc(type)}"/>
<meta property="og:site_name" content="Voyage-Ed Travels"/>
<meta property="og:title" content="${attrEsc(title)}"/>
<meta property="og:description" content="${attrEsc(desc)}"/>
<meta property="og:url" content="${attrEsc(canon)}"/>
<meta property="og:image" content="${attrEsc(img)}"/>
<meta property="og:locale" content="en_IN"/>
<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:title" content="${attrEsc(title)}"/>
<meta name="twitter:description" content="${attrEsc(desc)}"/>
<meta name="twitter:image" content="${attrEsc(img)}"/>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link rel="preconnect" href="https://images.unsplash.com" crossorigin/>
<link rel="dns-prefetch" href="https://videos.pexels.com"/>
<link rel="preload" as="image" href="${attrEsc(img)}" fetchpriority="high"/>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400;1,600&family=Raleway:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
<link rel="stylesheet" href="/assets/site.css"/>
${opts.extraHead || ""}
${jsonldHtml}
</head>
<body>
${TOPTAG}
${NAV}
`;
}

const COMMON_SCRIPTS = `<script>
(function(){
  function htmlEsc(s){if(!s) return "";return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");}
  var overlay=document.getElementById('veOverlay');
  var statusEl=document.getElementById('veStatus');
  var titleEl=document.getElementById('veTitle');
  var tagEl=document.getElementById('veTag');
  var subEl=document.getElementById('veSub');
  var msgEl=document.getElementById('veMsg');
  var destHid=document.getElementById('veDestination');
  var typeHid=document.getElementById('veEnquiryType');
  var pageHid=document.getElementById('vePageSource');
  var varHid=document.getElementById('vePackageVariant');
  var form=document.getElementById('veForm');
  var btn=document.getElementById('veSubmit');
  if(pageHid) pageHid.value=(location.pathname||'/')+(location.search||'');
  window.veOpen=function(opts){
    opts=opts||{};
    var dest=opts.destination||(window.PAGE_DEST||'');
    var variant=opts.variant||(window.PAGE_VARIANT||'');
    if(titleEl) titleEl.innerHTML=dest?'Plan Your Trip to <em>'+htmlEsc(dest)+'</em>':'Plan Your <em>Journey</em>';
    if(tagEl)   tagEl.textContent=dest?'Destination Enquiry':'Travel Enquiry';
    if(subEl)   subEl.textContent=dest?'Share a few details about your '+dest+' trip and a senior planner will be in touch within 24 hours.':'Share a few details and a senior planner will be in touch within 24 hours.';
    if(msgEl)   msgEl.placeholder=dest?"I'd like to plan a trip to "+dest+'. Type of holiday, dates, group size, anything specific…':'Tell us about your trip — type of holiday, any specific cities or experiences…';
    if(destHid) destHid.value=dest;
    if(typeHid) typeHid.value=opts.enquiryType||(dest?'Destination Enquiry':'General Enquiry');
    if(varHid)  varHid.value=variant;
    if(statusEl){statusEl.className='ve-status';statusEl.textContent='';}
    if(btn){btn.disabled=false;btn.innerHTML='Send Enquiry →';}
    if(overlay){overlay.classList.add('show');document.body.classList.add('ve-modal-open');}
    setTimeout(function(){var n=document.getElementById('veName');if(n)n.focus();},200);
  };
  window.veClose=function(){if(overlay){overlay.classList.remove('show');document.body.classList.remove('ve-modal-open');}};
  document.addEventListener('keydown',function(e){if(e.key==='Escape' && overlay && overlay.classList.contains('show'))veClose();});
  if(form){
    form.addEventListener('submit',function(e){
      e.preventDefault();
      statusEl.className='ve-status';statusEl.textContent='';
      btn.disabled=true;btn.innerHTML='Sending…';
      fetch(form.action,{method:'POST',body:new FormData(form),headers:{'Accept':'application/json'}})
        .then(function(r){
          if(r.ok){form.reset();statusEl.className='ve-status show success';statusEl.textContent='✓ Thank you! A senior planner will be in touch within 24 hours.';btn.disabled=false;btn.innerHTML='Sent ✓';setTimeout(function(){btn.innerHTML='Send Another →';},2500);}
          else throw new Error('Failed');
        }).catch(function(){
          statusEl.className='ve-status show error';statusEl.textContent='✗ Could not send. Please call +91 7009 659 048.';btn.disabled=false;btn.innerHTML='Send Enquiry →';
        });
    });
  }
  window.sideSubmit=function(e){
    e.preventDefault();
    var f=e.target;var b=f.querySelector('.side-btn');var s=f.querySelector('.side-status');
    var orig=b.getAttribute('data-orig')||'Send Enquiry →';
    b.disabled=true;b.innerHTML='Sending…';s.className='side-status';s.textContent='';
    var fd=new FormData(f);
    fd.append('_subject','New Voyage-Ed Package Enquiry');
    fd.append('enquiry_type','Package Page Sidebar');
    if(window.PAGE_DEST) fd.append('destination',window.PAGE_DEST);
    if(window.PAGE_VARIANT) fd.append('package_variant',window.PAGE_VARIANT);
    fd.append('page_source',location.pathname+location.search);
    fd.append('message','Sidebar quote request for '+(window.PAGE_DEST||'package')+(window.PAGE_VARIANT?' ('+window.PAGE_VARIANT+')':''));
    fetch('https://formspree.io/f/xbdwrzaq',{method:'POST',body:fd,headers:{'Accept':'application/json'}})
      .then(function(r){
        if(r.ok){f.reset();s.className='side-status show success';s.textContent='✓ Thank you! A planner will reach out within 24 hours.';b.innerHTML='Sent ✓';setTimeout(function(){b.innerHTML=orig;b.disabled=false;},2500);}
        else throw new Error('Failed');
      }).catch(function(){s.className='side-status show error';s.textContent='✗ Could not send. Please call +91 7009 659 048.';b.innerHTML=orig;b.disabled=false;});
    return false;
  };
  document.querySelectorAll('nav ul a').forEach(function(a){
    a.addEventListener('click',function(){
      var h=document.querySelector('.hamburger');if(h)h.classList.remove('active');
      var ul=document.querySelector('nav ul');if(ul)ul.classList.remove('open');
    });
  });
  document.addEventListener('error',function(e){
    if(e.target.tagName==='IMG'){
      var img=e.target;if(img.dataset.retried)return;img.dataset.retried='1';
      var hero=document.querySelector('.dest-hero-bg,.pkg-hero-bg');
      if(hero){var bg=hero.style.backgroundImage;var m=bg.match(/url\\(['"]?([^'"\\)]+)/);if(m)img.src=m[1];}
    }
  },true);
})();
</script>`;

const FOOTER_BLOCK = `${FOOTER}
${ENQUIRY_MODAL}
${COMMON_SCRIPTS}
</body>
</html>`;

function renderDestinationPage(slug, dest, pkgSlugList){
  const name      = dest.name;
  const country   = dest.country || "";
  const tagline   = dest.tagline || "";
  const heroImg   = dest.hero_image || "";
  const startFrom = dest.starting_price ? fmtINR(dest.starting_price) : "";
  const canon     = SITE_URL + destURL(slug);
  const region    = regionLabel(dest);
  const regPage   = regionPage(dest);
  const pkgCount  = (dest.packages||[]).length;

  const title = `${name} Tour Packages from India ${startFrom?'— Starting '+startFrom:''} | Voyage-Ed Travels`.replace(/\s+/g,' ').trim();
  const desc  = `Book ${name} tour packages from India${startFrom? ' starting '+startFrom+' per person':''}. ${pkgCount}+ curated itineraries, flights, hotels & sightseeing. ${tagline}`;

  const breadcrumbLD = {
    "@context":"https://schema.org","@type":"BreadcrumbList",
    "itemListElement":[
      {"@type":"ListItem","position":1,"name":"Home","item":SITE_URL+"/"},
      {"@type":"ListItem","position":2,"name":region,"item":SITE_URL+"/"+regPage},
      {"@type":"ListItem","position":3,"name":name+" Packages","item":canon}
    ]
  };
  const placeLD = {
    "@context":"https://schema.org","@type":"TouristDestination",
    "name":name,"description":tagline,"url":canon,"image":heroImg,
    "address": country ? {"@type":"PostalAddress","addressCountry":country} : undefined,
    "touristType":(dest.ideal_for||[]).join(", ")
  };
  const itemListLD = {
    "@context":"https://schema.org","@type":"ItemList",
    "itemListElement":(dest.packages||[]).map((p,i)=>({
      "@type":"ListItem","position":i+1,
      "url":SITE_URL+pkgURL(slug, pkgSlugList[i]),
      "name":p.title
    }))
  };
  const faqLD = (dest.faqs && dest.faqs.length) ? {
    "@context":"https://schema.org","@type":"FAQPage",
    "mainEntity":dest.faqs.map(f=>({
      "@type":"Question","name":f.q,
      "acceptedAnswer":{"@type":"Answer","text":f.a}
    }))
  } : null;

  let html = headBlock({
    title, description: desc, canonical: canon,
    image: heroImg, type: "website",
    jsonld:[breadcrumbLD, placeLD, itemListLD, faqLD]
  });

  html += `<section class="dest-hero">
    <div class="dest-hero-bg" style="background-image:url('${attrEsc(heroImg)}')" role="img" aria-label="${attrEsc(name+' — '+tagline)}"></div>`;
  if(dest.hero_youtube){
    const yt = esc(dest.hero_youtube);
    html += `<div class="dest-hero-yt-wrap"><iframe class="dest-hero-yt" src="https://www.youtube.com/embed/${yt}?autoplay=1&mute=1&loop=1&playlist=${yt}&controls=0&showinfo=0&modestbranding=1&playsinline=1&rel=0" allow="autoplay; encrypted-media" allowfullscreen title="${attrEsc(name+' video')}"></iframe></div>`;
  } else if(dest.hero_video){
    html += `<video class="dest-hero-video" autoplay muted loop playsinline preload="none" poster="${attrEsc(heroImg)}" onerror="this.style.display='none'"><source src="${attrEsc(dest.hero_video)}" type="video/mp4"></video>`;
  }
  html += `<div class="dest-hero-overlay"></div>
    <div class="dest-hero-inner">
      <nav class="dest-breadcrumb" aria-label="Breadcrumb"><a href="/index.html">Home</a><span>/</span><a href="/${regPage}">${region}</a><span>/</span>${esc(name)}</nav>
      <h1 class="dest-title">${esc(name)} Tour Packages</h1>
      <p class="dest-tagline">${esc(tagline)}</p>
      <div class="dest-meta-row">`;
  if(dest.best_time)      html += `<div class="pkg-meta">📅 Best: ${esc(dest.best_time)}</div>`;
  if(country)             html += `<div class="pkg-meta">📍 ${esc(country)}</div>`;
  if(dest.starting_price) html += `<div class="pkg-meta">💰 Starting ${esc(startFrom)}</div>`;
  html += `</div>
    </div>
  </section>`;

  html += `<main class="pkg-list-section">
    <div class="pkg-list-tag">Choose Your Package</div>
    <h2 class="pkg-list-h">${pkgCount} ${esc(name)} <em>Holiday Packages</em></h2>
    <p class="pkg-list-sub">Curated ${esc(name)} travel packages from India. Compare durations, hotel categories and prices. Every itinerary is fully customisable — flights, hotels, sightseeing and visa assistance handled by our travel experts.</p>
    <div class="pkg-grid">`;
  (dest.packages||[]).forEach((pkg, i)=>{
    const cat = pkg.hotel_category || "Standard";
    const badgeCls = cat.toLowerCase();
    const pkgSlug = pkgSlugList[i];
    const href = pkgURL(slug, pkgSlug);
    html += `<article class="pkg-card">
      <a href="${attrEsc(href)}" aria-label="${attrEsc(pkg.title)}">
        <div class="pkg-card-img" style="background-image:url('${attrEsc(pkg.thumbnail||heroImg)}')" role="img" aria-label="${attrEsc(pkg.title)}">
          <span class="pkg-card-badge ${esc(badgeCls)}">${esc(pkg.label||cat)}</span>
        </div>
      </a>
      <div class="pkg-card-body">
        <h3 class="pkg-card-title"><a href="${attrEsc(href)}" style="color:inherit">${esc(pkg.title||(name.toUpperCase()+' TOUR PACKAGE - '+pkg.duration))}</a></h3>`;
    if(pkg.city_combo){
      html += `<div class="pkg-card-cities"><span class="pkg-card-cities-icon">📍</span><span class="pkg-card-cities-text">${esc(pkg.city_combo)}</span></div>`;
    }
    if(pkg.quick_inclusions && pkg.quick_inclusions.length){
      html += `<ul class="pkg-card-incs">`;
      pkg.quick_inclusions.forEach(q=>{ html += `<li>${esc(q)}</li>`; });
      html += `</ul>`;
    }
    html += `<div class="pkg-card-price">
        <span class="pkg-card-price-label">Starting from</span>
        <span class="pkg-card-price-amt">${esc(fmtINR(pkg.price))}</span>
        <span class="pkg-card-price-per">/Person</span>
      </div>
      <a href="${attrEsc(href)}" class="pkg-card-cta">Explore Package <span class="pkg-card-cta-arrow">→</span></a>
    </div>
    </article>`;
  });
  html += `</div>
  </main>`;

  if(dest.highlights && dest.highlights.length){
    html += `<section class="pkg-list-section" style="padding-top:0">
      <div class="pkg-list-tag">Trip Highlights</div>
      <h2 class="pkg-list-h">Why Choose <em>${esc(name)}</em>?</h2>
      <div class="hl-grid">`;
    dest.highlights.forEach(h => { html += `<div class="hl-item">${esc(h)}</div>`; });
    html += `</div></section>`;
  }

  if(dest.faqs && dest.faqs.length){
    html += `<section class="pkg-list-section" style="padding-top:0">
      <div class="pkg-list-tag">FAQ</div>
      <h2 class="pkg-list-h">Frequently Asked Questions about ${esc(name)}</h2>
      <div class="faq-list">`;
    dest.faqs.forEach((f,i)=>{
      const open = i===0?' open':'';
      html += `<div class="faq-item${open}">
        <div class="faq-q" onclick="this.parentElement.classList.toggle('open')">${esc(f.q)}<span class="faq-toggle">+</span></div>
        <div class="faq-a"><div class="faq-a-inner">${esc(f.a)}</div></div>
      </div>`;
    });
    html += `</div></section>`;
  }

  if(dest.starting_price){
    html += `<div class="mobile-bar" id="mobileBar">
      <div class="mobile-bar-price"><span class="mobile-bar-label">Starting from</span><span class="mobile-bar-amt">${esc(startFrom)}</span></div>
      <button class="mobile-bar-btn" onclick="veOpen({destination:${jsonStr(name)}})">Enquire →</button>
    </div>`;
  }

  html += `<script>window.PAGE_DEST=${jsonStr(name)};</script>\n` + FOOTER_BLOCK;
  return html;
}

function renderPackagePage(slug, dest, pkg, i, allPkgs, pkgSlugList){
  const name     = dest.name;
  const country  = dest.country || "";
  const pkgSlug  = (pkgSlugList && pkgSlugList[i]) || slugify(pkg.title||("package-"+(i+1)));
  const canon    = SITE_URL + pkgURL(slug, pkgSlug);
  const heroImg  = pkg.thumbnail || dest.hero_image || "";
  const region   = regionLabel(dest);
  const regPage  = regionPage(dest);
  const priceFmt = fmtINR(pkg.price);

  const title = `${pkg.title} | ${name} Holiday Package — ${priceFmt} | Voyage-Ed`;
  const desc  = `${pkg.title} from ${priceFmt} per person. ${pkg.duration||""}. ${pkg.city_combo||""}. Inclusions: ${(pkg.quick_inclusions||[]).slice(0,4).join(", ")}. Book with Voyage-Ed Travels.`;

  const breadcrumbLD = {
    "@context":"https://schema.org","@type":"BreadcrumbList",
    "itemListElement":[
      {"@type":"ListItem","position":1,"name":"Home","item":SITE_URL+"/"},
      {"@type":"ListItem","position":2,"name":region,"item":SITE_URL+"/"+regPage},
      {"@type":"ListItem","position":3,"name":name+" Packages","item":SITE_URL+destURL(slug)},
      {"@type":"ListItem","position":4,"name":pkg.title,"item":canon}
    ]
  };
  const productLD = {
    "@context":"https://schema.org","@type":"Product",
    "name":pkg.title,
    "description":(pkg.title+" — "+(pkg.duration||"")+" tour package to "+name+". "+(dest.tagline||"")).trim(),
    "image":heroImg,
    "brand":{"@type":"Brand","name":"Voyage-Ed Travels"},
    "category":"Tour Package",
    "offers":{
      "@type":"Offer","price":pkg.price,"priceCurrency":"INR",
      "availability":"https://schema.org/InStock","url":canon,
      "seller":{"@type":"TravelAgency","name":"Voyage-Ed Travels","url":SITE_URL}
    }
  };
  const tripLD = {
    "@context":"https://schema.org","@type":"TouristTrip",
    "name":pkg.title,
    "description":pkg.title+" — "+(pkg.duration||"")+" itinerary.",
    "url":canon,"image":heroImg,
    "touristType":(dest.ideal_for||[]).join(", "),
    "itinerary":(pkg.itinerary||[]).map(d=>({
      "@type":"Place","name":"Day "+d.day+": "+d.title,"description":d.description
    })),
    "offers":{"@type":"Offer","price":pkg.price,"priceCurrency":"INR"}
  };
  const faqLD = (dest.faqs && dest.faqs.length) ? {
    "@context":"https://schema.org","@type":"FAQPage",
    "mainEntity":dest.faqs.map(f=>({
      "@type":"Question","name":f.q,
      "acceptedAnswer":{"@type":"Answer","text":f.a}
    }))
  } : null;

  let html = headBlock({
    title, description: desc, canonical: canon, image: heroImg, type: "product",
    jsonld:[breadcrumbLD, productLD, tripLD, faqLD]
  });

  html += `<section class="pkg-hero">
    <div class="pkg-hero-bg" style="background-image:url('${attrEsc(heroImg)}')" role="img" aria-label="${attrEsc(pkg.title)}"></div>
    <div class="pkg-hero-inner">
      <nav class="pkg-breadcrumb" aria-label="Breadcrumb"><a href="/index.html">Home</a><span>/</span><a href="/${regPage}">${region}</a><span>/</span><a href="${attrEsc(destURL(slug))}">${esc(name)}</a><span>/</span>${esc(pkg.duration||"")}</nav>
      <h1 class="pkg-title">${esc(pkg.title)}</h1>
      <div class="pkg-meta-row">`;
  if(pkg.duration)        html += `<div class="pkg-meta">📅 ${esc(pkg.duration)}</div>`;
  if(pkg.hotel_category)  html += `<div class="pkg-meta">🏨 ${esc(pkg.hotel_category)}</div>`;
  if(dest.best_time)      html += `<div class="pkg-meta">☀ Best: ${esc(dest.best_time)}</div>`;
  if(country)             html += `<div class="pkg-meta">📍 ${esc(country)}</div>`;
  html += `</div>
      <div class="pkg-cta-row">
        <div class="pkg-price-box"><div class="pkg-price-label">Starting From</div><div class="pkg-price-amt">${esc(priceFmt)}<small>per person on twin sharing</small></div></div>
        <button class="pkg-cta-btn" onclick="veOpen({destination:${jsonStr(name)},variant:${jsonStr(pkg.label+' — '+pkg.duration)}})">Get a Quote →</button>
        <a href="tel:+917009659048" class="pkg-cta-btn-out">📞 Call Us</a>
      </div>
    </div>
  </section>`;

  if(dest.info_strip){
    const s = dest.info_strip;
    html += `<div class="info-strip"><div class="info-strip-inner">`;
    if(s.currency)    html += `<div class="info-item"><span class="info-label">Currency</span><span class="info-value">${esc(s.currency)}</span></div>`;
    if(s.visa && dest.region === "international") html += `<div class="info-item"><span class="info-label">Visa</span><span class="info-value">${esc(s.visa)}</span></div>`;
    if(s.flight_time) html += `<div class="info-item"><span class="info-label">Flight Time</span><span class="info-value">${esc(s.flight_time)}</span></div>`;
    if(s.language)    html += `<div class="info-item"><span class="info-label">Language</span><span class="info-value">${esc(s.language)}</span></div>`;
    html += `</div></div>`;
  }

  html += `<div class="pkg-body"><main class="pkg-main">`;

  if(dest.highlights && dest.highlights.length){
    html += `<section class="pkg-sec">
      <div class="pkg-sec-tag">Trip Highlights</div>
      <h2 class="pkg-sec-title">What Makes <em>${esc(name)}</em> Special</h2>
      <div class="hl-grid">`;
    dest.highlights.forEach(h=>{ html += `<div class="hl-item">${esc(h)}</div>`; });
    html += `</div></section>`;
  }

  if(pkg.hotels){
    html += `<section class="pkg-sec">
      <div class="pkg-sec-tag">Hotel Category — ${esc(pkg.hotel_category||"")}</div>
      <h2 class="pkg-sec-title">Where You'll <em>Stay</em></h2>
      <div class="hl-grid"><div class="hl-item" style="background:#fdf6e9;border-left-color:var(--gold)">${esc(pkg.hotels)}</div></div>
    </section>`;
  }

  if(pkg.itinerary && pkg.itinerary.length){
    html += `<section class="pkg-sec">
      <div class="pkg-sec-tag">Day-Wise Plan</div>
      <h2 class="pkg-sec-title">Your <em>Itinerary</em></h2>
      <p class="pkg-sec-sub">Tap any day to view detailed activities, sightseeing and meals. Every day is fully customisable.</p>
      <div class="itin-list">`;
    pkg.itinerary.forEach((d,j)=>{
      const op = j===0?' open':'';
      html += `<article class="itin-day${op}">
        <div class="itin-head" onclick="this.parentElement.classList.toggle('open')">
          <div class="itin-day-num"><small>DAY</small>${esc(d.day)}</div>
          <h3 class="itin-title">${esc(d.title)}</h3>
          <div class="itin-toggle">+</div>
        </div>
        <div class="itin-body"><div class="itin-body-inner">${esc(d.description)}`;
      if(d.meals && d.meals !== "—") html += `<div class="itin-meals">${esc(d.meals)}</div>`;
      html += `</div></div>
      </article>`;
    });
    html += `</div></section>`;
  }

  if((pkg.inclusions && pkg.inclusions.length) || (pkg.exclusions && pkg.exclusions.length)){
    html += `<section class="pkg-sec">
      <div class="pkg-sec-tag">What's Covered</div>
      <h2 class="pkg-sec-title">Inclusions & <em>Exclusions</em></h2>
      <div class="ie-grid">`;
    if(pkg.inclusions && pkg.inclusions.length){
      html += `<div class="ie-col inc"><h3>✓ What's Included</h3><ul class="ie-list">`;
      pkg.inclusions.forEach(x=>{ html += `<li>${esc(x)}</li>`; });
      html += `</ul></div>`;
    }
    if(pkg.exclusions && pkg.exclusions.length){
      html += `<div class="ie-col exc"><h3>✕ Not Included</h3><ul class="ie-list">`;
      pkg.exclusions.forEach(x=>{ html += `<li>${esc(x)}</li>`; });
      html += `</ul></div>`;
    }
    html += `</div></section>`;
  }

  if(dest.region === "international" && dest.visa_info){
    const vi = dest.visa_info;
    html += `<section class="pkg-sec">
      <div class="pkg-sec-tag">Visa Requirements</div>
      <h2 class="pkg-sec-title">Visa Information for <em>${esc(name)}</em></h2>
      <div class="visa-card">
        <div class="visa-icon">🛂</div>
        <div class="visa-content">
          <h3>Entry Requirements for Indian Passport Holders</h3>`;
    if(vi.rule)       html += `<div class="visa-rule">${esc(vi.rule)}</div>`;
    html += `<div class="visa-row">`;
    if(vi.fee)        html += `<div class="visa-row-item"><span class="visa-row-label">Visa Fee</span><span class="visa-row-val">${esc(vi.fee)}</span></div>`;
    if(vi.processing) html += `<div class="visa-row-item"><span class="visa-row-label">Processing Time</span><span class="visa-row-val">${esc(vi.processing)}</span></div>`;
    html += `</div>`;
    if(vi.notes)      html += `<div class="visa-notes"><strong>Important:</strong> ${esc(vi.notes)}</div>`;
    html += `</div></div></section>`;
  }

  if(dest.gallery && dest.gallery.length){
    html += `<section class="pkg-sec">
      <div class="pkg-sec-tag">Photo Gallery</div>
      <h2 class="pkg-sec-title">A Glimpse of <em>${esc(name)}</em></h2>
      <div class="gal-grid">`;
    dest.gallery.forEach(g => { html += `<div class="gal-item"><img src="${attrEsc(g)}" loading="lazy" decoding="async" alt="${attrEsc(name+' travel photo')}" width="800" height="500"/></div>`; });
    html += `</div></section>`;
  }

  if(dest.faqs && dest.faqs.length){
    html += `<section class="pkg-sec">
      <div class="pkg-sec-tag">Frequently Asked</div>
      <h2 class="pkg-sec-title">Questions & <em>Answers</em></h2>
      <div class="faq-list">`;
    dest.faqs.forEach((f,j)=>{
      const op = j===0?' open':'';
      html += `<div class="faq-item${op}">
        <div class="faq-q" onclick="this.parentElement.classList.toggle('open')">${esc(f.q)}<span class="faq-toggle">+</span></div>
        <div class="faq-a"><div class="faq-a-inner">${esc(f.a)}</div></div>
      </div>`;
    });
    html += `</div></section>`;
  }

  if(allPkgs.length > 1){
    html += `<section class="pkg-sec" style="text-align:center;background:var(--cream);padding:2.5rem 1.5rem;border-radius:10px">
      <div class="pkg-sec-tag">Other Options</div>
      <h2 class="pkg-sec-title" style="margin-bottom:1rem">Explore <em>${allPkgs.length - 1}</em> more ${esc(name)} packages</h2>
      <a href="${attrEsc(destURL(slug))}" class="pkg-cta-btn" style="display:inline-block;text-decoration:none">View All ${esc(name)} Packages →</a>
    </section>`;
  }

  html += `</main>`;

  html += `<aside class="pkg-side"><div class="side-card">
    <div class="side-tag">Plan This Trip</div>
    <div class="side-title">Get a Quote for ${esc(name)}</div>
    <div style="font-size:.78rem;color:var(--gray);margin-bottom:1rem;padding:.5rem .7rem;background:var(--cream);border-radius:5px">${esc(pkg.duration||"")} · ${esc(pkg.hotel_category||"Package")}</div>
    <form class="side-form" onsubmit="return sideSubmit(event)">
      <div class="sf-field"><label>Name *</label><input type="text" name="name" required placeholder="Your name"/></div>
      <div class="sf-field"><label>Email *</label><input type="email" name="email" required placeholder="you@example.com"/></div>
      <div class="sf-field"><label>Phone *</label><input type="tel" name="phone" required pattern="[0-9+\\s\\-]{8,18}" placeholder="+91 9XXXX XXXXX"/></div>
      <div class="sf-field"><label>Travel Date</label><input type="date" name="travel_date"/></div>
      <div class="sf-field"><label>Travellers</label><select name="travellers"><option value="">Select…</option><option>1</option><option>2</option><option>3-4</option><option>5-8</option><option>9+</option></select></div>
      <button type="submit" class="side-btn" data-orig="Send Enquiry →">Send Enquiry →</button>
      <div class="side-status"></div>
    </form>
    <div class="side-alt">Prefer to talk?<br><a href="tel:+917009659048">+91 7009 659 048</a></div>
  </div></aside>`;

  html += `</div>`;

  html += `<div class="mobile-bar" id="mobileBar">
    <div class="mobile-bar-price"><span class="mobile-bar-label">Starting from</span><span class="mobile-bar-amt">${esc(priceFmt)}</span></div>
    <button class="mobile-bar-btn" onclick="veOpen({destination:${jsonStr(name)},variant:${jsonStr(pkg.label+' — '+pkg.duration)}})">Enquire →</button>
  </div>`;

  html += `<script>window.PAGE_DEST=${jsonStr(name)};window.PAGE_VARIANT=${jsonStr(pkg.label+' — '+pkg.duration)};</script>\n` + FOOTER_BLOCK;
  return html;
}

function ensureDir(p){ fs.mkdirSync(p, { recursive:true }); }
function write(p, c){ ensureDir(path.dirname(p)); fs.writeFileSync(p, c, "utf8"); }

console.log("Generating SEO static pages -> " + DIST_DIR);

const destSlugs = Object.keys(VOYAGE_PACKAGES);
let destPagesCount = 0;
let pkgPagesCount  = 0;
const sitemapUrls = [];
const redirectMap = [];

sitemapUrls.push({ loc: SITE_URL+"/index.html",          priority:"1.0", changefreq:"weekly" });
sitemapUrls.push({ loc: SITE_URL+"/international.html",  priority:"0.9", changefreq:"weekly" });
sitemapUrls.push({ loc: SITE_URL+"/domestic.html",       priority:"0.9", changefreq:"weekly" });
sitemapUrls.push({ loc: SITE_URL+"/travel.html",         priority:"0.8", changefreq:"monthly" });
sitemapUrls.push({ loc: SITE_URL+"/visa.html",           priority:"0.8", changefreq:"monthly" });
sitemapUrls.push({ loc: SITE_URL+"/education.html",      priority:"0.7", changefreq:"monthly" });

destSlugs.forEach(slug => {
  const dest = VOYAGE_PACKAGES[slug];
  if(!dest.packages || !dest.packages.length){
    console.log("  (skip empty) " + slug);
    return;
  }
  const seenSlugs = {};
  const pkgSlugList = dest.packages.map((p,i) => pkgSlugUnique(seenSlugs, p, i));

  const destHtml = renderDestinationPage(slug, dest, pkgSlugList);
  write(path.join(DIST_DIR, slug + "-packages.html"), destHtml);
  destPagesCount++;
  sitemapUrls.push({ loc: SITE_URL+destURL(slug), priority:"0.85", changefreq:"weekly" });
  redirectMap.push({ from: "/package.html?id="+slug, to: destURL(slug) });

  dest.packages.forEach((pkg, i) => {
    const pkgSlug = pkgSlugList[i];
    const html = renderPackagePage(slug, dest, pkg, i, dest.packages, pkgSlugList);
    write(path.join(DIST_DIR, slug + "-packages", pkgSlug + ".html"), html);
    pkgPagesCount++;
    sitemapUrls.push({ loc: SITE_URL+pkgURL(slug,pkgSlug), priority:"0.75", changefreq:"weekly" });
    redirectMap.push({ from: "/package.html?id="+slug+"&p="+(i+1), to: pkgURL(slug,pkgSlug) });
  });

  console.log("  ok " + slug + ": 1 dest + " + dest.packages.length + " pkg pages");
});

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.map(u=>`  <url><loc>${u.loc}</loc><changefreq>${u.changefreq}</changefreq><priority>${u.priority}</priority></url>`).join("\n")}
</urlset>
`;
write(path.join(DIST_DIR,"sitemap.xml"), sitemap);

const robots = `User-agent: *
Allow: /
Disallow: /package.html

User-agent: Googlebot
Allow: /
Disallow: /package.html

User-agent: Bingbot
Allow: /
Disallow: /package.html

Sitemap: ${SITE_URL}/sitemap.xml
`;
write(path.join(DIST_DIR,"robots.txt"), robots);

const netlifyRedirects = redirectMap.map(r => `${r.from}  ${r.to}  301!`).join("\n") + "\n";
write(path.join(DIST_DIR,"_redirects"), netlifyRedirects);

const htaccess = `# Voyage-Ed SEO — 301 redirects from legacy query-string URLs to new clean URLs
RewriteEngine On

RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

${redirectMap.map(r => {
  const m = r.from.match(/^\/package\.html\?id=([^&]+)(?:&p=(\d+))?$/);
  if(!m) return "";
  const id = m[1], p = m[2];
  const condition = p
    ? `RewriteCond %{QUERY_STRING} ^id=${id}&p=${p}$`
    : `RewriteCond %{QUERY_STRING} ^id=${id}$`;
  return `${condition}\nRewriteRule ^package\\.html$ ${r.to}? [L,R=301]`;
}).filter(Boolean).join("\n")}

RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^([a-z0-9-]+-packages)$ $1.html [L]

RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^([a-z0-9-]+-packages)/([a-z0-9-]+)$ $1/$2.html [L]

<IfModule mod_headers.c>
  <FilesMatch "\\.(css|js|jpg|jpeg|png|webp|svg|woff2)$">
    Header set Cache-Control "max-age=31536000, public, immutable"
  </FilesMatch>
  <FilesMatch "\\.html$">
    Header set Cache-Control "max-age=3600, public"
  </FilesMatch>
</IfModule>

<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript image/svg+xml
</IfModule>
`;
write(path.join(DIST_DIR,".htaccess"), htaccess);

const legacy = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<meta name="robots" content="noindex,follow"/>
<title>Redirecting… | Voyage-Ed Travels</title>
<link rel="canonical" href="${SITE_URL}/index.html"/>
<script src="/packages-data.js"></script>
<script>
(function(){
  function slug(s){return String(s||'').toLowerCase().replace(/[''""()·•]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');}
  function pkgSlugUnique(seen, pkg, idx){
    var base = pkg.title || ("package-"+(idx+1));
    var variants = [base, pkg.label?base+" "+pkg.label:null, pkg.hotel_category?base+" "+pkg.hotel_category:null, (pkg.label&&pkg.hotel_category)?base+" "+pkg.label+" "+pkg.hotel_category:null].filter(Boolean);
    for(var i=0;i<variants.length;i++){var s=slug(variants[i]);if(!seen[s]){seen[s]=true;return s;}}
    var s=slug(base),n=2;while(seen[s+"-"+n])n++;seen[s+"-"+n]=true;return s+"-"+n;
  }
  var qs=new URL(location.href).searchParams;
  var id=(qs.get('id')||'').toLowerCase().trim();
  var p=qs.get('p');
  if(!id){location.replace('/index.html');return;}
  if(p && window.VOYAGE_PACKAGES && window.VOYAGE_PACKAGES[id]){
    var d=window.VOYAGE_PACKAGES[id];
    var idx=parseInt(p,10)-1;
    if(d.packages && d.packages[idx]){
      var seen={};
      var slugs=d.packages.map(function(pp,ii){return pkgSlugUnique(seen,pp,ii);});
      location.replace('/'+id+'-packages/'+slugs[idx]+'.html');
      return;
    }
  }
  location.replace('/'+id+'-packages.html');
})();
</script>
<meta http-equiv="refresh" content="0; url=/index.html"/>
</head>
<body>
<p style="font-family:sans-serif;padding:2rem">Redirecting to the new SEO-friendly page…
<br><a href="/index.html">Click here if you are not redirected.</a></p>
</body>
</html>
`;
write(path.join(DIST_DIR,"package.html"), legacy);

const ORIG_PAGES = ["index.html","domestic.html","international.html","travel.html","visa.html","education.html"];
ORIG_PAGES.forEach(name => {
  const srcPath = path.join(SRC_DIR, name);
  if(!fs.existsSync(srcPath)){ console.log("skip missing "+name); return; }
  let html = fs.readFileSync(srcPath,"utf8");
  html = html.replace(/package\.html\?id=([a-z0-9-]+)&p=(\d+)/g, (m, id, p) => {
    const d = VOYAGE_PACKAGES[id];
    if(d && d.packages && d.packages[+p-1]){
      const seen = {};
      const slugs = d.packages.map((pp, ii) => pkgSlugUnique(seen, pp, ii));
      return id + "-packages/" + slugs[+p-1] + ".html";
    }
    return id + "-packages.html";
  });
  html = html.replace(/package\.html\?id=([a-z0-9-]+)/g, (m, id) => id + "-packages.html");
  write(path.join(DIST_DIR,name), html);
});

ensureDir(path.join(DIST_DIR, "assets"));
fs.copyFileSync(path.join(SRC_DIR,"logo.png"), path.join(DIST_DIR,"logo.png"));
fs.copyFileSync(path.join(SRC_DIR,"packages-data.js"), path.join(DIST_DIR,"packages-data.js"));
const cssSrc = path.resolve(ROOT, "dist", "assets", "site.css");
if(fs.existsSync(cssSrc)){
  fs.copyFileSync(cssSrc, path.join(DIST_DIR, "assets", "site.css"));
}

console.log("\nGenerated:");
console.log("  " + destPagesCount + " destination pages");
console.log("  " + pkgPagesCount + " package detail pages");
console.log("  1 sitemap.xml (" + sitemapUrls.length + " URLs)");
console.log("  1 robots.txt");
console.log("  1 _redirects (Netlify, " + redirectMap.length + " rules)");
console.log("  1 .htaccess (Apache, " + redirectMap.length + " rules)");
console.log("  1 legacy package.html (JS-redirect fallback)");
console.log("  " + ORIG_PAGES.length + " top-level pages with rewritten internal links");
console.log("\nDone.");
