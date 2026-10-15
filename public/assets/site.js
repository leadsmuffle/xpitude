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


/* blog post gallery: equal grid, and a lightbox with arrows, Esc, arrow keys and swipe */
(function(){
  var grid=document.getElementById("bgalGrid"), box=document.getElementById("lbox");
  if(!grid||!box)return;
  var items=[].slice.call(grid.querySelectorAll(".bgal__item")), img=box.querySelector("img"), cap=box.querySelector("figcaption"), i=0, last=null;
  function show(n){i=(n+items.length)%items.length;var a=items[i];img.src=a.getAttribute("href");img.alt=a.getAttribute("data-alt");
    cap.textContent=a.getAttribute("data-alt")+"  ·  "+(i+1)+" / "+items.length;}
  function open(n){last=document.activeElement;show(n);box.hidden=false;document.body.style.overflow="hidden";box.querySelector(".lbox__close").focus();}
  function close(){box.hidden=true;document.body.style.overflow="";if(last)last.focus();}
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
