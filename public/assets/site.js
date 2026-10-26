(function(){
  "use strict";
  var reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* mega menu */
  var header=document.getElementById("header"), trigger=document.getElementById("megaTrigger"),
      mega=document.getElementById("mega"), link=trigger.querySelector("a"), t;
  var noHover=matchMedia("(hover: none)");
  function openMega(o){
    clearTimeout(t);
    header.classList.toggle("mega-open",o);
    link.setAttribute("aria-expanded",String(o));
  }
  function delayClose(){t=setTimeout(function(){openMega(false);},160);}
  [trigger,mega].forEach(function(el){
    el.addEventListener("mouseenter",function(){clearTimeout(t);openGuide(false);openMega(true);});
    el.addEventListener("mouseleave",delayClose);
  });
  link.addEventListener("click",function(e){
    if(noHover.matches){e.preventDefault();openGuide(false);openMega(!header.classList.contains("mega-open"));}
  });
  trigger.addEventListener("focusin",function(){openGuide(false);openMega(true);});
  trigger.addEventListener("focusout",function(e){if(!trigger.contains(e.relatedTarget)&&!mega.contains(e.relatedTarget))delayClose();});
  mega.querySelectorAll("a").forEach(function(a){a.addEventListener("click",function(){openMega(false);});});
  addEventListener("keydown",function(e){if(e.key==="Escape"){openMega(false);openGuide(false);}});

  /* travel guide dropdown */
  var guide=document.getElementById("guideTrigger"), guideLink=guide.querySelector("a"), gt;
  function openGuide(o){
    clearTimeout(gt);
    guide.classList.toggle("is-open",o);
    guideLink.setAttribute("aria-expanded",String(o));
  }
  guide.addEventListener("mouseenter",function(){openMega(false);openGuide(true);});
  guide.addEventListener("mouseleave",function(){gt=setTimeout(function(){openGuide(false);},160);});
  guide.addEventListener("focusin",function(){openMega(false);openGuide(true);});
  guide.addEventListener("focusout",function(e){if(!guide.contains(e.relatedTarget))openGuide(false);});
  guideLink.addEventListener("click",function(e){
    if(noHover.matches&&!guide.classList.contains("is-open")){e.preventDefault();openMega(false);openGuide(true);}
  });
  addEventListener("click",function(e){if(!guide.contains(e.target))openGuide(false);});

  /* enquiry forms: destinations load from the API, enquiries post to it */
  var COUNTRIES=["Afghanistan","Albania","Algeria","Andorra","Angola","Antigua and Barbuda","Argentina","Armenia","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan","Bolivia","Bosnia and Herzegovina","Botswana","Brazil","Brunei","Bulgaria","Burkina Faso","Burundi","Cabo Verde","Cambodia","Cameroon","Canada","Central African Republic","Chad","Chile","China","Colombia","Comoros","Congo","Costa Rica","Côte d'Ivoire","Croatia","Cuba","Cyprus","Czechia","Democratic Republic of the Congo","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Eswatini","Ethiopia","Fiji","Finland","France","Gabon","Gambia","Georgia","Germany","Ghana","Greece","Grenada","Guatemala","Guinea","Guinea-Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy","Jamaica","Japan","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Morocco","Mozambique","Myanmar","Namibia","Nauru","Nepal","Netherlands","New Zealand","Nicaragua","Niger","Nigeria","North Korea","North Macedonia","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Qatar","Romania","Russia","Rwanda","Saint Kitts and Nevis","Saint Lucia","Saint Vincent and the Grenadines","Samoa","San Marino","São Tomé and Príncipe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","Sudan","Suriname","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor-Leste","Togo","Tonga","Trinidad and Tobago","Tunisia","Türkiye","Turkmenistan","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Yemen","Zambia","Zimbabwe","Other"];
  document.querySelectorAll(".js-country").forEach(function(sel){
    COUNTRIES.forEach(function(c){var o=document.createElement("option");o.value=c;o.textContent=c;sel.appendChild(o);});
  });
  var tripCache={};
  function loadTrips(category){
    if(!tripCache[category]){
      tripCache[category]=fetch("/api/trips?category="+encodeURIComponent(category),{headers:{Accept:"application/json"}})
        .then(function(r){if(!r.ok)throw new Error("trips "+r.status);return r.json();})
        .catch(function(err){delete tripCache[category];throw err;});
    }
    return tripCache[category];
  }
  document.querySelectorAll(".js-eform").forEach(function(form){
    var type=form.querySelector(".js-type"), dest=form.querySelector(".js-dest"),
        err=form.querySelector(".eform__err"), req=0;
    function setDest(placeholder,list,custom,selected){
      dest.innerHTML="";
      var ph=document.createElement("option");ph.value="";ph.textContent=placeholder;dest.appendChild(ph);
      list.forEach(function(d){var o=document.createElement("option");o.value=d;o.textContent=d;dest.appendChild(o);});
      if(custom){var c=document.createElement("option");c.value=custom;c.textContent=custom;dest.appendChild(c);}
      dest.disabled=!list.length&&!custom;
      if(selected)dest.value=selected;
      if(!dest.value)dest.selectedIndex=0;
    }
    function fillDest(selected){
      var category=type.value, mine=++req;
      if(!category){setDest("Select travel type first",[],null);return;}
      setDest("Loading destinations",[],null);
      loadTrips(category).then(function(data){
        if(mine!==req)return;
        setDest("Select destination",data.trips.map(function(t){return t.title;}),data.custom,selected);
      }).catch(function(){
        if(mine!==req)return;
        /* the list could not be loaded: still let the visitor send an enquiry */
        setDest("Select destination",[],"Not sure yet");
      });
    }
    function showError(message){
      if(!err)return;
      err.textContent=message;err.hidden=!message;
    }
    type.addEventListener("change",function(){fillDest("");});
    if(type.value)fillDest(dest.getAttribute("data-selected")||"");

    form.addEventListener("submit",function(e){
      e.preventDefault();
      if(form.classList.contains("is-sending")||form.classList.contains("is-sent"))return;
      showError("");
      form.querySelectorAll(".is-invalid").forEach(function(el){el.classList.remove("is-invalid");});
      if(!form.checkValidity()){form.reportValidity();return;}
      var data={source:location.pathname};
      form.querySelectorAll("input[name],select[name],textarea[name]").forEach(function(el){data[el.name]=el.value;});
      form.classList.add("is-sending");
      var fallback="Sorry, your enquiry could not be sent. Please try again, or contact us directly.";
      fetch(form.getAttribute("action"),{method:"POST",
        headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(data)})
        .then(function(r){return r.json().catch(function(){return {};}).then(function(body){return {ok:r.ok&&body.ok,body:body};});})
        .then(function(res){
          form.classList.remove("is-sending");
          if(res.ok){
            form.classList.add("is-sent");
            form.querySelectorAll("input,select,textarea,button").forEach(function(el){el.disabled=true;});
            return;
          }
          var fields=res.body.fields||{};
          Object.keys(fields).forEach(function(name){
            var el=form.querySelector('[name="'+name+'"]');if(el)el.classList.add("is-invalid");
          });
          showError(res.body.error||fallback);
        })
        .catch(function(){form.classList.remove("is-sending");showError(fallback);});
    });
  });

  /* hero parallax and altimeter */
  var hero=document.querySelector(".hero"), heroMedia=document.getElementById("heroMedia"),
      alt=document.getElementById("altimeter"), altFill=document.getElementById("altFill"),
      altRead=document.getElementById("altRead"), tick=false;
  function onScroll(){
    var y=scrollY, hh=hero?hero.offsetHeight:600;
    if(!reduce&&heroMedia&&y<hh) heroMedia.style.transform="translate3d(0,"+(y*.28)+"px,0)";
    var max=document.documentElement.scrollHeight-innerHeight, p=max>0?Math.min(y/max,1):0;
    if(alt){
      alt.classList.toggle("is-on",y>hh*.6);
      altFill.style.height=(p*100).toFixed(2)+"%";
      altRead.textContent=Math.round(p*8611).toLocaleString("en-US")+" M";
    }
    tick=false;
  }
  addEventListener("scroll",function(){if(!tick){tick=true;requestAnimationFrame(onScroll);}},{passive:true});
  onScroll();

  /* drawer */
  var burger=document.getElementById("burger"), drawer=document.getElementById("drawer");
  function setDrawer(o){drawer.classList.toggle("is-open",o);drawer.setAttribute("aria-hidden",String(!o));
    burger.setAttribute("aria-expanded",String(o));document.body.style.overflow=o?"hidden":"";}
  burger.addEventListener("click",function(){setDrawer(true);});
  document.getElementById("drawerClose").addEventListener("click",function(){setDrawer(false);});
  drawer.querySelectorAll("a").forEach(function(a){a.addEventListener("click",function(){setDrawer(false);});});
  addEventListener("keydown",function(e){if(e.key==="Escape")setDrawer(false);});

  /* reveal */
  var rv=document.querySelectorAll(".rv");
  if("IntersectionObserver" in window && !reduce){
    var io=new IntersectionObserver(function(es){es.forEach(function(e,i){
      if(e.isIntersecting){var el=e.target;setTimeout(function(){el.classList.add("is-in");},i*60);io.unobserve(el);}
    });},{rootMargin:"0px 0px -10% 0px",threshold:.05});
    rv.forEach(function(el){io.observe(el);});
  } else rv.forEach(function(el){el.classList.add("is-in");});

  /* testimonials */
  var qs=document.querySelectorAll(".quote"), dots=document.querySelectorAll(".qdot"), qi=0, timer;
  if(qs.length){
  function show(i){qs[qi].classList.remove("is-live");dots[qi].classList.remove("is-live");
    qi=(i+qs.length)%qs.length;qs[qi].classList.add("is-live");dots[qi].classList.add("is-live");}
  function auto(){clearInterval(timer);if(!reduce)timer=setInterval(function(){show(qi+1);},7000);}
  dots.forEach(function(d,i){d.addEventListener("click",function(){show(i);auto();});});
  auto();
  }

  /* active nav: only in-page section links take part */
  var links=[].slice.call(document.querySelectorAll(".nav>span>a")).filter(function(a){
        var h=a.getAttribute("href");return h.charAt(0)==="#"&&h!=="#top";}),
      secs=links.map(function(a){return document.querySelector(a.getAttribute("href"));});
  if("IntersectionObserver" in window){
    var so=new IntersectionObserver(function(es){es.forEach(function(e){
      if(e.isIntersecting){links.forEach(function(l){l.classList.remove("is-active");});
        var i=secs.indexOf(e.target);if(i>-1)links[i].classList.add("is-active");}});},
      {rootMargin:"-45% 0px -50% 0px"});
    secs.forEach(function(s){if(s)so.observe(s);});
  }

  /* floating WhatsApp button: step aside while a form submit button is on screen, so it never covers it */
  var waf=document.getElementById("waFloat"), submits=document.querySelectorAll("form button[type=submit]");
  if(waf&&submits.length&&"IntersectionObserver" in window){
    var showing=new Set();
    var wo=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)showing.add(e.target);else showing.delete(e.target);});
      waf.classList.toggle("is-hidden",showing.size>0);},{rootMargin:"0px 0px -0px 0px"});
    submits.forEach(function(b){wo.observe(b);});
  }
})();




/* blog post page: reading progress, "In this story" highlight, a lightbox for every photo, and the copy link button */
(function(){
  var bar=document.getElementById("bpBar"), bodies=[].slice.call(document.querySelectorAll(".bp-body")), body=bodies[0], end=bodies[bodies.length-1];
  if(!bar||!body)return;
  // reading progress: from the top of the article to its end
  function progress(){var t=body.getBoundingClientRect().top,b=end.getBoundingClientRect().bottom,h=b-t-window.innerHeight*.6;var p=h>0?Math.min(1,Math.max(0,-t/h)):1;bar.style.width=(p*100).toFixed(1)+"%";}
  window.addEventListener("scroll",progress,{passive:true});window.addEventListener("resize",progress);progress();
  // "In this story": the section in view is shown in red
  var heads=[].slice.call(document.querySelectorAll(".bp-body h2[id]")), links=[].slice.call(document.querySelectorAll(".bp-toc a"));
  function mark(){var cur=null;heads.forEach(function(h){if(h.getBoundingClientRect().top<140)cur=h.id;});
    links.forEach(function(a){a.classList.toggle("is-active",a.getAttribute("href")==="#"+cur);});}
  if(heads.length){window.addEventListener("scroll",mark,{passive:true});mark();}
  links.forEach(function(a){a.addEventListener("click",function(){var d=a.closest("details");if(d)d.open=false;});});
  // lightbox: the photos in the text and the gallery, in page order, with arrows, Esc, arrow keys and swipe
  var box=document.getElementById("lbox"), items=[].slice.call(document.querySelectorAll("[data-lb]"));
  if(box&&items.length){
    var img=box.querySelector("img"), cap=box.querySelector("figcaption"), i=0, last=null;
    var show=function(n){i=(n+items.length)%items.length;var a=items[i];img.src=a.getAttribute("href");img.alt=a.getAttribute("data-alt")||"";
      cap.textContent=(a.getAttribute("data-alt")||"")+"  ·  "+(i+1)+" / "+items.length;};
    var open=function(n){last=document.activeElement;show(n);box.hidden=false;document.body.style.overflow="hidden";box.querySelector(".lbox__close").focus();};
    var close=function(){box.hidden=true;document.body.style.overflow="";if(last)last.focus();};
    items.forEach(function(a,n){a.addEventListener("click",function(e){e.preventDefault();open(n);});});
    box.querySelector(".lbox__close").addEventListener("click",close);
    box.querySelector(".lbox__nav--prev").addEventListener("click",function(){show(i-1);});
    box.querySelector(".lbox__nav--next").addEventListener("click",function(){show(i+1);});
    box.addEventListener("click",function(e){if(e.target===box)close();});
    document.addEventListener("keydown",function(e){if(box.hidden)return;
      if(e.key==="Escape")close();else if(e.key==="ArrowLeft")show(i-1);else if(e.key==="ArrowRight")show(i+1);});
    var x0=null;
    box.addEventListener("touchstart",function(e){x0=e.touches[0].clientX;},{passive:true});
    box.addEventListener("touchend",function(e){if(x0===null)return;var dx=e.changedTouches[0].clientX-x0;if(Math.abs(dx)>40)show(i+(dx<0?1:-1));x0=null;});
  }
  // copy the link to this story
  var copy=document.querySelector(".bp-copy"), ok=document.querySelector(".bp-share__ok");
  if(copy)copy.addEventListener("click",function(){var url=copy.getAttribute("data-url");
    var done=function(){if(ok)ok.textContent="Link copied.";setTimeout(function(){if(ok)ok.textContent="";},2500);};
    if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(url).then(done,function(){if(ok)ok.textContent=url;});
    else if(ok)ok.textContent=url;});
})();


/* travel guide articles: a lightbox for the photos in the text, with arrows, Esc, arrow keys and swipe */
(function(){
  var art=document.querySelector(".gprose"), box=document.getElementById("lbox");
  if(!art||!box)return;
  var items=[].slice.call(art.querySelectorAll("[data-lb]"));
  if(!items.length)return;
  var img=box.querySelector("img"), cap=box.querySelector("figcaption"), i=0, last=null;
  var show=function(n){i=(n+items.length)%items.length;var a=items[i];img.src=a.getAttribute("href");img.alt=a.getAttribute("data-alt")||"";
    cap.textContent=(a.getAttribute("data-alt")||"")+"  ·  "+(i+1)+" / "+items.length;};
  var open=function(n){last=document.activeElement;show(n);box.hidden=false;document.body.style.overflow="hidden";box.querySelector(".lbox__close").focus();};
  var close=function(){box.hidden=true;document.body.style.overflow="";if(last)last.focus();};
  items.forEach(function(a,n){a.addEventListener("click",function(e){e.preventDefault();open(n);});});
  box.querySelector(".lbox__close").addEventListener("click",close);
  box.querySelector(".lbox__nav--prev").addEventListener("click",function(){show(i-1);});
  box.querySelector(".lbox__nav--next").addEventListener("click",function(){show(i+1);});
  box.addEventListener("click",function(e){if(e.target===box)close();});
  document.addEventListener("keydown",function(e){if(box.hidden)return;
    if(e.key==="Escape")close();else if(e.key==="ArrowLeft")show(i-1);else if(e.key==="ArrowRight")show(i+1);});
  var x0=null;
  box.addEventListener("touchstart",function(e){x0=e.touches[0].clientX;},{passive:true});
  box.addEventListener("touchend",function(e){if(x0===null)return;var dx=e.changedTouches[0].clientX-x0;if(Math.abs(dx)>40)show(i+(dx<0?1:-1));x0=null;});
})();


/* our services detail pages: one lightbox for the photos in the text, the itinerary and the gallery */
(function(){
  var page=document.querySelector(".xdetail"), box=document.getElementById("lbox");
  if(!page||!box)return;
  var items=[].slice.call(page.querySelectorAll("[data-lb]"));
  if(!items.length)return;
  var img=box.querySelector("img"), cap=box.querySelector("figcaption"), i=0, last=null;
  var show=function(n){i=(n+items.length)%items.length;var a=items[i];img.src=a.getAttribute("href");img.alt=a.getAttribute("data-alt")||"";
    cap.textContent=(a.getAttribute("data-alt")||"")+"  ·  "+(i+1)+" / "+items.length;};
  var open=function(n){last=document.activeElement;show(n);box.hidden=false;document.body.style.overflow="hidden";box.querySelector(".lbox__close").focus();};
  var close=function(){box.hidden=true;document.body.style.overflow="";if(last)last.focus();};
  items.forEach(function(a,n){a.addEventListener("click",function(e){e.preventDefault();open(n);});});
  box.querySelector(".lbox__close").addEventListener("click",close);
  box.querySelector(".lbox__nav--prev").addEventListener("click",function(){show(i-1);});
  box.querySelector(".lbox__nav--next").addEventListener("click",function(){show(i+1);});
  box.addEventListener("click",function(e){if(e.target===box)close();});
  document.addEventListener("keydown",function(e){if(box.hidden)return;
    if(e.key==="Escape")close();else if(e.key==="ArrowLeft")show(i-1);else if(e.key==="ArrowRight")show(i+1);});
  var x0=null;
  box.addEventListener("touchstart",function(e){x0=e.touches[0].clientX;},{passive:true});
  box.addEventListener("touchend",function(e){if(x0===null)return;var dx=e.changedTouches[0].clientX-x0;if(Math.abs(dx)>40)show(i+(dx<0?1:-1));x0=null;});
})();

/* blog post: the "From the trail" carousel. It moves one photo at a time with the arrows, a swipe or every 3.5 s, loops
   without an end, pauses while the mouse is over it, and does not move by itself when the visitor prefers reduced motion. */
(function(){
  [].slice.call(document.querySelectorAll("[data-carousel]")).forEach(function(car){
    var track=car.querySelector(".bp-car__track"), slides=[].slice.call(track.children), n=slides.length, k=3;
    if(n<3)return;
    // copies of the first and last photos at each end, so the row never runs out; a copy opens its photo in the lightbox
    var copy=function(s){var c=s.cloneNode(true);c.removeAttribute("data-lb");c.setAttribute("aria-hidden","true");c.setAttribute("tabindex","-1");
      c.addEventListener("click",function(e){e.preventDefault();s.click();});return c;};
    for(var j=0;j<k;j++)track.appendChild(copy(slides[j]));
    for(j=0;j<k;j++)track.insertBefore(copy(slides[n-1-j]),track.firstChild);
    var i=k, step=0, busy=false, timer=null, hover=false;
    var reduce=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var measure=function(){step=track.children[0].getBoundingClientRect().width+(parseFloat(getComputedStyle(track).columnGap)||0);};
    var place=function(anim){if(!anim)track.style.transition="none";track.style.transform="translateX("+(-i*step)+"px)";if(!anim){void track.offsetWidth;track.style.transition="";}};
    // after a move onto a copy, jump to the same photo in the real row without animation
    var settle=function(){busy=false;if(i>=n+k){i-=n;place(false);}else if(i<k){i+=n;place(false);}};
    var go=function(d){if(busy)return;busy=true;i+=d;place(true);
      if(!parseFloat(getComputedStyle(track).transitionDuration))settle();else setTimeout(function(){if(busy)settle();},800);};
    track.addEventListener("transitionend",function(e){if(e.target===track&&busy)settle();});
    var stop=function(){clearInterval(timer);timer=null;};
    var start=function(){stop();if(reduce||hover||document.hidden)return;timer=setInterval(function(){go(1);},3500);};
    car.querySelector(".bp-car__btn--prev").addEventListener("click",function(){go(-1);});
    car.querySelector(".bp-car__btn--next").addEventListener("click",function(){go(1);});
    car.addEventListener("pointerenter",function(e){if(e.pointerType==="mouse"){hover=true;stop();}});
    car.addEventListener("pointerleave",function(e){if(e.pointerType==="mouse"){hover=false;start();}});
    // swipe: a sideways swipe moves one photo and is not taken as a tap on the photo
    var x0=null, swiped=0;
    car.addEventListener("touchstart",function(e){x0=e.touches[0].clientX;stop();},{passive:true});
    car.addEventListener("touchend",function(e){if(x0!==null){var dx=e.changedTouches[0].clientX-x0;if(Math.abs(dx)>40){go(dx<0?1:-1);swiped=Date.now();}}x0=null;start();});
    car.addEventListener("click",function(e){if(Date.now()-swiped<500){e.preventDefault();e.stopPropagation();}},true);
    document.addEventListener("visibilitychange",function(){if(document.hidden)stop();else start();});
    window.addEventListener("resize",function(){measure();place(false);});
    measure();place(false);start();
  });
})();

/* footer: "More" in the Travel Guide column opens the rest of the guides below it, and "Less" closes them */
(function(){
  var btn=document.querySelector(".fmore");if(!btn)return;
  var list=document.getElementById(btn.getAttribute("aria-controls")),label=btn.querySelector(".fmore__t");
  btn.addEventListener("click",function(){
    var open=btn.getAttribute("aria-expanded")!=="true";
    btn.setAttribute("aria-expanded",open?"true":"false");label.textContent=open?"Less":"More";
    list.inert=!open;list.style.maxHeight=open?list.scrollHeight+"px":"0px";
  });
})();

/* Tables: any table not already inside a scroll box gets one, so a wide table scrolls sideways on its own instead of the page */
(function(){
  document.querySelectorAll("table").forEach(function(t){
    if(t.closest(".tscroll"))return;
    var w=document.createElement("div");w.className="tscroll";t.parentNode.insertBefore(w,t);w.appendChild(t);
  });
})();
