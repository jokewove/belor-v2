/* ============================================================
   BÉLOR — application logic
   ============================================================ */
(function(){
  'use strict';
  const $ = (s,c=document)=>c.querySelector(s);
  const $$ = (s,c=document)=>[...c.querySelectorAll(s)];
  const fmt = n => CURRENCY+Math.round(n).toLocaleString('en-US');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let io;

  /* ---------- Loader (robust: never block the page) ---------- */
  (function(){
    const l=$('#loader'); if(!l)return;
    let done=false;
    const hide=()=>{if(done)return;done=true;l.classList.add('hide');};
    // hide as soon as DOM + a short beat; do NOT wait for video/CDN to finish
    if(document.readyState==='complete'||document.readyState==='interactive'){setTimeout(hide,400);}
    else{document.addEventListener('DOMContentLoaded',()=>setTimeout(hide,400));}
    window.addEventListener('load',hide);
    setTimeout(hide,1800); // hard fallback
  })();

  /* ---------- Theme ---------- */
  const THEME_KEY='belor-theme';
  const root=document.documentElement;
  function setTheme(t){root.setAttribute('data-theme',t);try{localStorage.setItem(THEME_KEY,t);}catch(e){}syncThemeIcons(t);}
  function syncThemeIcons(t){$$('.theme-toggle').forEach(b=>b.setAttribute('aria-pressed',t==='dark'));}
  (function initTheme(){
    let saved=null;try{saved=localStorage.getItem(THEME_KEY);}catch(e){}
    const t=saved||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');
    root.setAttribute('data-theme',t);syncThemeIcons(t);
  })();
  document.addEventListener('click',e=>{
    const t=e.target.closest('.theme-toggle');
    if(t){setTheme(root.getAttribute('data-theme')==='dark'?'light':'dark');}
  });

  /* ---------- Navbar scroll ---------- */
  const nav=$('.nav');
  if(nav){
    const onScroll=()=>nav.classList.toggle('scrolled',scrollY>20);
    onScroll(); addEventListener('scroll',onScroll,{passive:true});
  }

  /* ---------- Mobile menu ---------- */
  const ham=$('.hamburger'), mm=$('.mobile-menu');
  function toggleMenu(open){
    if(!mm)return;
    mm.classList.toggle('open',open);
    if(ham)ham.classList.toggle('open',open);
    document.body.style.overflow=open?'hidden':'';
  }
  if(ham)ham.addEventListener('click',()=>toggleMenu(!mm.classList.contains('open')));
  const mmClose=$('.mm-close'); if(mmClose)mmClose.addEventListener('click',()=>toggleMenu(false));
  if(mm)$$('a',mm).forEach(a=>a.addEventListener('click',()=>toggleMenu(false)));

  /* ---------- Search ---------- */
  const searchPanel=$('.search-panel'), searchInput=$('#searchInput'),
        searchResults=$('.search-results'), searchHint=$('.search-hint'),
        searchClear=$('.search-clear');
  function openSearch(open){
    if(!searchPanel)return;
    searchPanel.classList.toggle('open',open);
    if(open){setTimeout(()=>searchInput&&searchInput.focus(),200);}
  }
  $$('.search-toggle').forEach(b=>b.addEventListener('click',()=>openSearch(!searchPanel.classList.contains('open'))));
  function runSearch(q){
    q=q.trim().toLowerCase();
    if(searchClear)searchClear.classList.toggle('show',q.length>0);
    if(!q){searchResults.innerHTML='';searchHint.style.display='block';searchHint.textContent='Start typing to search clothes, shirts, jeans and more.';return;}
    const res=PRODUCTS.filter(p=>(p.name+' '+p.cat+' '+p.sub).toLowerCase().includes(q)).slice(0,8);
    if(!res.length){searchResults.innerHTML='';searchHint.style.display='block';searchHint.textContent='No results for “'+q+'”. Try another term.';return;}
    searchHint.style.display='none';
    searchResults.innerHTML=res.map(p=>`<a class="sr-card" href="${p.cat}.html"><img loading="lazy" src="${p.img}" alt="${p.name}"><p>${p.name}</p><span>${fmt(p.price)}</span></a>`).join('');
  }
  if(searchInput)searchInput.addEventListener('input',e=>runSearch(e.target.value));
  if(searchClear)searchClear.addEventListener('click',()=>{searchInput.value='';runSearch('');searchInput.focus();});
  addEventListener('keydown',e=>{if(e.key==='Escape'){openSearch(false);closeCart();closeFavs();openProfile(false);closeModal();}});

  /* ---------- Cart ---------- */
  const CART_KEY='belor-cart';
  let cart=[];try{cart=JSON.parse(localStorage.getItem(CART_KEY)||'[]');}catch(e){}
  const cartDrawer=$('.cart-drawer:not(.fav-drawer):not(.profile-drawer)'), cartItemsEl=$('.cart-items'),
        cartSubEl=$('#cartSubtotal'), overlay=$('.overlay'), cartFoot=$('.cart-foot', cartDrawer||document);
  const favDrawer=$('.fav-drawer'), favItemsEl=$('.fav-items');
  const profileDrawer=$('.profile-drawer'), profileBody=$('.profile-body');
  let onCartChange=null;                          // checkout page hooks in here

  /* ---------- Delivery (options live in data.js) ---------- */
  const DEL_KEY='belor-delivery';
  let delivery=(DELIVERY_OPTIONS[0]||{}).id;
  try{const d=localStorage.getItem(DEL_KEY);if(DELIVERY_OPTIONS.some(o=>o.id===d))delivery=d;}catch(e){}
  function deliveryFee(sub){
    const o=DELIVERY_OPTIONS.find(x=>x.id===delivery)||{fee:0};
    if(!sub)return 0;
    if(FREE_DELIVERY_OVER>0&&sub>=FREE_DELIVERY_OVER)return 0;
    return o.fee;
  }
  function renderDelivery(sub,box){
    box=box||$('#coDelivery'); if(!box)return;
    const free=FREE_DELIVERY_OVER>0&&sub>=FREE_DELIVERY_OVER;
    box.innerHTML=DELIVERY_OPTIONS.map(o=>`<label class="dopt${o.id===delivery?' sel':''}"><span><input type="radio" name="delivery" value="${o.id}" ${o.id===delivery?'checked':''}> ${o.label}<small>${o.note||''}</small></span><b>${(free||!o.fee)?'Free':fmt(o.fee)}</b></label>`).join('')
      +(FREE_DELIVERY_OVER>0&&!free?`<p class="dnote">Free delivery on orders over ${fmt(FREE_DELIVERY_OVER)}</p>`:'');
  }
  document.addEventListener('change',e=>{
    if(e.target.name==='delivery'){delivery=e.target.value;try{localStorage.setItem(DEL_KEY,delivery);}catch(err){}renderCart();if(onCartChange)onCartChange();}
  });
  function saveCart(){try{localStorage.setItem(CART_KEY,JSON.stringify(cart));}catch(e){}renderCart();updateCartCount();if(onCartChange)onCartChange();}
  function updateCartCount(){
    const n=cart.reduce((s,i)=>s+i.qty,0);
    $$('.cart-count').forEach(c=>{c.textContent=n;c.classList.toggle('show',n>0);});
  }
  function addToCart(id,size,color,stay){
    const p=PRODUCTS.find(x=>x.id===id); if(!p)return;
    size=size||(p.sizes[0]||'One');
    color=color||p.variants[0].hex;
    const ex=cart.find(i=>i.id===id&&i.size===size&&(i.color||p.variants[0].hex)===color);
    if(ex)ex.qty++; else cart.push({id,size,color,qty:1});
    saveCart(); if(!stay)openCart(true); toast(p.name+' added to bag');
  }
  function changeQty(idx,d){
    cart[idx].qty+=d; if(cart[idx].qty<=0)cart.splice(idx,1); saveCart();
  }
  function removeItem(idx){cart.splice(idx,1);saveCart();}
  function renderCart(){
    if(!cartItemsEl)return;
    let sub=0;
    if(!cart.length){
      cartItemsEl.innerHTML='<div class="cart-empty">Your bag is empty.<br><a href="index.html" class="btn btn-primary" data-shop>Shop items</a></div>';
    } else {
      cartItemsEl.innerHTML=cart.map((i,idx)=>{
        const p=PRODUCTS.find(x=>x.id===i.id); if(!p)return'';
        sub+=p.price*i.qty;
        const v=p.variants.find(x=>x.hex===i.color)||p.variants[0];
        return `<div class="cart-item"><img src="${v.img}" alt="${p.name} in ${v.name}"><div><div class="ci-name">${p.name}</div><div class="ci-meta">Size ${i.size} · ${v.name}</div><div class="ci-qty"><button data-q="${idx}" data-d="-1" aria-label="Decrease">−</button><span>${i.qty}</span><button data-q="${idx}" data-d="1" aria-label="Increase">+</button></div></div><div class="ci-right"><div class="ci-price">${fmt(p.price*i.qty)}</div><button class="ci-remove" data-r="${idx}">Remove</button></div></div>`;
      }).join('');
    }
    if(cartSubEl)cartSubEl.textContent=fmt(sub);
    if(cartFoot)cartFoot.style.display=cart.length?'':'none';
  }
  if(cartItemsEl)cartItemsEl.addEventListener('click',e=>{
    const q=e.target.closest('[data-q]'), r=e.target.closest('[data-r]');
    if(q)changeQty(+q.dataset.q,+q.dataset.d);
    if(r)removeItem(+r.dataset.r);
  });
  function openCart(open){
    if(!cartDrawer)return;
    if(open&&favDrawer)favDrawer.classList.remove('open');
    if(open&&profileDrawer)profileDrawer.classList.remove('open');
    cartDrawer.classList.toggle('open',open);
    overlay.classList.toggle('show',open);
    document.body.style.overflow=open?'hidden':'';
  }
  function closeCart(){openCart(false);}
  $$('.cart-toggle').forEach(b=>b.addEventListener('click',()=>openCart(true)));
  const cartClose=$('.cart-close'); if(cartClose)cartClose.addEventListener('click',closeCart);
  if(overlay)overlay.addEventListener('click',()=>{closeCart();closeFavs();openProfile(false);closeModal();});

  /* ---------- Favourites drawer ---------- */
  function openFavs(open){
    if(!favDrawer)return;
    if(open){closeCart();if(profileDrawer)profileDrawer.classList.remove('open');}
    favDrawer.classList.toggle('open',open);
    overlay.classList.toggle('show',open);
    document.body.style.overflow=open?'hidden':'';
  }
  function closeFavs(){openFavs(false);}
  function renderFavs(){
    const items=wish.map(id=>PRODUCTS.find(x=>x.id===id)).filter(Boolean);
    $$('.fav-count').forEach(c=>{c.textContent=items.length;c.classList.toggle('show',items.length>0);});
    $$('.fav-count-text').forEach(c=>c.textContent=items.length);
    if(!favItemsEl)return;
    if(!items.length){favItemsEl.innerHTML='<div class="cart-empty">No favourites yet.<br>Tap the heart on any product to save it here.<br><a href="index.html" class="btn btn-primary" data-shop>Shop items</a></div>';return;}
    favItemsEl.innerHTML=items.map(p=>{
      const price=p.old?`<s>${fmt(p.old)}</s> ${fmt(p.price)}`:fmt(p.price);
      return `<div class="fav-item"><img src="${p.img}" alt="${p.name}" data-quick="${p.id}" title="Quick view"><div><div class="fi-name">${p.name}</div><div class="fi-meta">${p.sub}</div><div class="fi-price">${price}</div><button class="btn btn-primary fi-add" data-fav-add="${p.id}">Add to Cart</button></div><button class="fi-remove" data-wish="${p.id}" aria-label="Remove from favourites">Remove</button></div>`;
    }).join('');
  }
  $$('.fav-toggle').forEach(b=>b.addEventListener('click',()=>openFavs(true)));
  const favClose=$('.fav-close'); if(favClose)favClose.addEventListener('click',closeFavs);
  const checkout=$('#checkoutBtn');
  if(checkout)checkout.addEventListener('click',()=>{
    if(!cart.length)return;
    if(/checkout\.html$/.test(location.pathname)){closeCart();return;}   // already on the checkout page
    location.href='checkout.html';
  });

  /* ---------- Toast ---------- */
  let toastTimer;
  const toastEl=$('#toast');
  function toast(msg){
    if(!toastEl)return;
    toastEl.textContent=msg;toastEl.classList.add('show');
    clearTimeout(toastTimer);toastTimer=setTimeout(()=>toastEl.classList.remove('show'),2600);
  }

  /* ---------- Product card builder ---------- */
  function cardHTML(p){
    const colors=p.colors.map(c=>`<i style="background:${c}"></i>`).join('');
    const badge=p.badge?`<span class="pc-badge ${p.old?'sale':''}">${p.badge}</span>`:'';
    const price=p.old?`<span class="old">${fmt(p.old)}</span>${fmt(p.price)}`:fmt(p.price);
    return `<article class="product-card reveal" data-id="${p.id}">
      <div class="pc-media">
        ${badge}
        <button class="pc-wish" data-wish="${p.id}" aria-label="Add to wishlist"><svg viewBox="0 0 24 24"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg></button>
        <img class="main" loading="lazy" src="${p.img}" alt="${p.name}">
        <img class="alt" loading="lazy" src="${p.alt}" alt="${p.name} alternate view">
        <div class="pc-quick"><button class="btn btn-primary" data-add="${p.id}">Add to Bag</button><button class="btn btn-outline pc-quickbtn" data-quick="${p.id}" aria-label="Quick view">Quick View</button></div>
      </div>
      <div class="pc-body">
        <span class="pc-cat">${p.sub}</span>
        <h3 class="pc-name">${p.name}</h3>
        <div class="pc-foot"><div class="pc-price">${price}</div><div class="pc-colors">${colors}</div></div>
      </div>
    </article>`;
  }

  /* ---------- Wishlist ---------- */
  const WISH_KEY='belor-wish';
  let wish=[];try{wish=JSON.parse(localStorage.getItem(WISH_KEY)||'[]');}catch(e){}
  function toggleWish(id){
    id=+id;
    const i=wish.indexOf(id);
    if(i>-1)wish.splice(i,1); else wish.push(id);
    try{localStorage.setItem(WISH_KEY,JSON.stringify(wish));}catch(e){}
    syncWish();
  }
  function syncWish(){$$('.pc-wish').forEach(b=>b.classList.toggle('active',wish.includes(+b.dataset.wish)));renderFavs();}

  /* ---------- Quick view modal ---------- */
  const modal=$('#quickModal'), modalBox=$('.modal-box');
  let modalSize=null, modalId=null, modalColor=null;
  function openModal(id){
    const p=PRODUCTS.find(x=>x.id===+id); if(!p||!modal)return;
    modalId=p.id; modalSize=p.sizes[0]; modalColor=p.variants[0].hex;
    const v0=p.variants[0];
    const price=p.old?`<span class="old" style="text-decoration:line-through;color:var(--text-soft);font-size:1rem;margin-right:8px">${fmt(p.old)}</span>${fmt(p.price)}`:fmt(p.price);
    modalBox.innerHTML=`<div class="m-gallery"><img class="m-main" id="mMain" src="${v0.img}" alt="${p.name} in ${v0.name}"></div>
      <div class="modal-info">
        <span class="pc-cat">${p.sub}</span>
        <h3>${p.name}</h3>
        <div class="m-price">${price}</div>
        <p>A BÉLOR signature piece, crafted from premium materials with a refined, modern silhouette. Designed for an elevated everyday wardrobe.</p>
        <div class="m-label">Size</div>
        <div class="m-sizes">${p.sizes.map((s,i)=>`<button class="${i===0?'sel':''}" data-size="${s}">${s}</button>`).join('')}</div>
        <button class="btn btn-primary" id="modalAdd" style="width:100%;justify-content:center">Add to Bag</button>
        <div class="m-label m-colorlabel">Colour: <b id="mColorName">${v0.name}</b></div>
        <div class="m-thumbs" role="group" aria-label="Colour variants">${p.variants.map((v,k)=>`<button class="${k===0?'sel':''}" data-color="${v.hex}" aria-label="${v.name}" title="${v.name}"><img src="${v.img}" alt="${v.name}"><i style="background:${v.hex}"></i></button>`).join('')}</div>
      </div>`;
    modal.classList.add('show'); document.body.style.overflow='hidden';
  }
  function setModalColor(hex){
    const p=PRODUCTS.find(x=>x.id===modalId); if(!p)return;
    const v=p.variants.find(x=>x.hex===hex); if(!v)return;
    modalColor=hex;
    $$('[data-color]',modal).forEach(b=>b.classList.toggle('sel',b.dataset.color===hex));
    const nm=$('#mColorName',modal); if(nm)nm.textContent=v.name;
    const main=$('#mMain',modal); if(!main)return;
    main.classList.add('swap');
    setTimeout(()=>{main.src=v.img;main.alt=p.name+' in '+v.name;main.classList.remove('swap');},180);
  }
  function closeModal(){if(modal){modal.classList.remove('show');if(!(cartDrawer&&cartDrawer.classList.contains('open'))&&!(favDrawer&&favDrawer.classList.contains('open'))&&!(profileDrawer&&profileDrawer.classList.contains('open')))document.body.style.overflow='';}}
  if(modal){
    modal.addEventListener('click',e=>{
      if(e.target===modal||e.target.closest('.modal-close')){closeModal();return;}
      const sz=e.target.closest('[data-size]');
      if(sz){modalSize=sz.dataset.size;$$('[data-size]',modal).forEach(b=>b.classList.remove('sel'));sz.classList.add('sel');}
      const col=e.target.closest('[data-color]');
      if(col){setModalColor(col.dataset.color);}
      if(e.target.closest('#modalAdd')){addToCart(modalId,modalSize,modalColor);closeModal();}
    });
  }

  /* ---------- Delegated product interactions ---------- */
  document.addEventListener('click',e=>{
    const q=e.target.closest('[data-quick]');
    const w=e.target.closest('[data-wish]');
    const a=e.target.closest('[data-add]');
    const fa=e.target.closest('[data-fav-add]');
    const sh=e.target.closest('[data-shop]');
    if(q){openModal(q.dataset.quick);}
    if(w){toggleWish(w.dataset.wish);}
    if(a){addToCart(+a.dataset.add);}
    if(fa){
      addToCart(+fa.dataset.favAdd,null,null,true);
      fa.textContent='Added ✓'; setTimeout(()=>{fa.textContent='Add to Cart';},1400);
    }
    if(e.target.closest('[data-open-favs]')){openFavs(true);}
    if(e.target.closest('[data-open-profile]')){openProfile(true);}
    if(e.target.closest('[data-open-cart]')){closeFavs();openCart(true);}
    if(sh){
      // "Shop items": go to the landing page (or scroll to its shop sections if already there)
      if(/(^|\/)(index\.html)?$/.test(location.pathname)){
        e.preventDefault();closeCart();closeFavs();
        const t=$('#categories'); if(t)t.scrollIntoView({behavior:reduce?'auto':'smooth'}); else scrollTo(0,0);
      }
    }
  });

  /* ---------- Render product grids ---------- */
  function renderGrid(el,list){el.innerHTML=list.map(cardHTML).join('');observeReveals();syncWish();}

  // Home: mixed sections (different categories shuffled together on every visit)
  function shuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
  function mixPick(list,n){                       // round-robin across product types so no two neighbours repeat
    const groups={};
    shuffle(list).forEach(p=>{const k=p.cat+'|'+p.sub;(groups[k]=groups[k]||[]).push(p);});
    const keys=shuffle(Object.keys(groups)), out=[];
    while(out.length<n&&keys.some(k=>groups[k].length)){
      for(const k of keys){if(groups[k].length&&out.length<n)out.push(groups[k].shift());}
    }
    return out;
  }
  const taken=new Set();                          // avoid showing the same product in two home sections
  function pickMixed(list,n){
    const fresh=list.filter(p=>!taken.has(p.id));
    const out=mixPick(fresh.length>=n?fresh:list,n);
    out.forEach(p=>taken.add(p.id));
    return out;
  }
  const featuredEl=$('#featuredGrid');
  if(featuredEl)renderGrid(featuredEl,pickMixed(PRODUCTS.filter(p=>p.badge==='New'),10));
  const lookEl=$('#lookGrid');
  if(lookEl){
    const one=f=>{const p=shuffle(PRODUCTS.filter(x=>f(x)&&!taken.has(x.id)))[0];if(p)taken.add(p.id);return p;};
    renderGrid(lookEl,[one(p=>p.cat==='men'&&p.sub==='Shirts'),one(p=>p.cat==='men'&&p.sub==='Trousers'),one(p=>p.sub==='Footwear'),one(p=>p.sub==='Ties'),one(p=>p.sub==='Belts')].filter(Boolean));
  }
  const saleEl=$('#saleGrid');
  if(saleEl)renderGrid(saleEl,pickMixed(PRODUCTS.filter(p=>p.old>0),10));
  const popularEl=$('#popularGrid');
  if(popularEl)renderGrid(popularEl,pickMixed(PRODUCTS,10));

  // Home: hero slider (slides come from SLIDES in data.js)
  const heroEl=$('#heroSlider');
  if(heroEl&&typeof SLIDES!=='undefined'&&SLIDES.length){
    const track=$('.hs-track',heroEl), dotsEl=$('.hs-dots',heroEl);
    track.innerHTML=SLIDES.map((s,i)=>`<div class="hs-slide${i===0?' active':''}" role="group" aria-roledescription="slide" aria-label="${i+1} of ${SLIDES.length}">
      ${s.video?`<video muted loop playsinline ${i===0?'autoplay':''} src="${s.video}" poster="${s.img||''}"></video>`:`<img src="${s.img}" alt="" ${i===0?'':'loading="lazy"'}>`}
      <div class="hs-overlay"></div>
      <div class="container hs-content">
        ${s.eyebrow?`<span class="eyebrow">${s.eyebrow}</span>`:''}
        <h2 class="h-bebas">${s.title}</h2>
        ${s.text?`<p class="tag">${s.text}</p>`:''}
        ${s.cta?`<a href="${s.href||'#'}" class="btn btn-ghost">${s.cta} <span class="ar">→</span></a>`:''}
      </div></div>`).join('');
    dotsEl.innerHTML=SLIDES.map((_,i)=>`<button class="${i===0?'active':''}" aria-label="Go to slide ${i+1}"></button>`).join('');
    const slides=$$('.hs-slide',heroEl), dots=$$('button',dotsEl);
    let cur=0,timer=null;
    const go=n=>{
      cur=(n+slides.length)%slides.length;
      slides.forEach((sl,i)=>{sl.classList.toggle('active',i===cur);const v=$('video',sl);if(v){if(i===cur)v.play().catch(()=>{});else v.pause();}});
      dots.forEach((d,i)=>d.classList.toggle('active',i===cur));
    };
    const stop=()=>clearInterval(timer);
    const play=()=>{stop();if(reduce||slides.length<2)return;timer=setInterval(()=>go(cur+1),(typeof SLIDER_INTERVAL!=='undefined'?SLIDER_INTERVAL:5000));};
    $('.hs-arrow.prev',heroEl).addEventListener('click',()=>{go(cur-1);play();});
    $('.hs-arrow.next',heroEl).addEventListener('click',()=>{go(cur+1);play();});
    dots.forEach((d,i)=>d.addEventListener('click',()=>{go(i);play();}));
    heroEl.addEventListener('mouseenter',stop); heroEl.addEventListener('mouseleave',play);
    document.addEventListener('visibilitychange',()=>document.hidden?stop():play());
    let sx=null;
    heroEl.addEventListener('touchstart',e=>{sx=e.touches[0].clientX;},{passive:true});
    heroEl.addEventListener('touchend',e=>{if(sx===null)return;const dx=e.changedTouches[0].clientX-sx;if(Math.abs(dx)>50){go(cur+(dx<0?1:-1));play();}sx=null;});
    play();
  }
  // Home categories
  const catGridEl=$('#catGrid');
  if(catGridEl){
    catGridEl.innerHTML=CATEGORIES.map((c,i)=>`<a class="cat-card reveal ${i===0?'wide':''}" href="${c.key}.html" data-d="${i%4}"><img loading="lazy" src="${c.img}" alt="${c.name}"><div class="cat-info"><h3>${c.name}</h3><span>${c.desc} <b class="ar">→</b></span></div></a>`).join('');
  }

  /* ---------- Category page (grid + filters) ---------- */
  const catPage=$('#catalog');
  if(catPage){
    const CAT=catPage.dataset.cat;
    let base=CAT==='all'?PRODUCTS.slice():PRODUCTS.filter(p=>p.cat===CAT);
    const PAGE=24;
    const state={size:'all',color:'all',avail:'all',sort:'featured',limit:PAGE};
    const sortSel=$('#sortSel'), sizeSel=$('#sizeSel'), colorSel=$('#colorSel'), availSel=$('#availSel');
    const countEl=$('#resultCount');

    // populate size + color options
    if(sizeSel){
      const sizes=[...new Set(base.flatMap(p=>p.sizes))];
      sizes.forEach(s=>sizeSel.insertAdjacentHTML('beforeend',`<option value="${s}">${s}</option>`));
    }
    const COLORNAMES=COLOR_NAMES; // defined in data.js
    if(colorSel){
      const cols=[...new Set(base.flatMap(p=>p.colors))];
      cols.forEach(c=>colorSel.insertAdjacentHTML('beforeend',`<option value="${c}">${COLORNAMES[c]||c}</option>`));
    }
    function apply(keep){
      if(!keep)state.limit=PAGE;
      let list=base.filter(p=>
        (state.size==='all'||p.sizes.includes(state.size)) &&
        (state.color==='all'||p.colors.includes(state.color)) &&
        (state.avail==='all'||(state.avail==='sale'?p.old>0:true))
      );
      if(state.sort==='low')list.sort((a,b)=>a.price-b.price);
      else if(state.sort==='high')list.sort((a,b)=>b.price-a.price);
      else if(state.sort==='new')list.sort((a,b)=>(b.badge==='New')-(a.badge==='New'));
      const grid=$('#catalogGrid');
      if(!list.length){grid.innerHTML='<div class="empty-state"><b>No pieces found</b>Try adjusting your filters.</div>';}
      else renderGrid(grid,list.slice(0,state.limit));
      let more=$('#loadMore');
      if(!more){grid.insertAdjacentHTML('afterend','<div class="load-more"><button class="btn btn-outline" id="loadMore">Load more</button></div>');more=$('#loadMore');more.addEventListener('click',()=>{state.limit+=PAGE;apply(true);});}
      more.parentElement.style.display=list.length>state.limit?'':'none';
      if(countEl)countEl.textContent=(list.length>state.limit?'Showing '+state.limit+' of ':'')+list.length+' item'+(list.length!==1?'s':'');
    }
    if(sortSel)sortSel.addEventListener('change',e=>{state.sort=e.target.value;apply();});
    if(sizeSel)sizeSel.addEventListener('change',e=>{state.size=e.target.value;apply();});
    if(colorSel)colorSel.addEventListener('change',e=>{state.color=e.target.value;apply();});
    if(availSel)availSel.addEventListener('change',e=>{state.avail=e.target.value;apply();});
    // quick chips
    $$('.chip').forEach(ch=>ch.addEventListener('click',()=>{
      $$('.chip').forEach(c=>c.classList.remove('active'));ch.classList.add('active');
      const f=ch.dataset.filter;
      base=(f==='all'||!f)?(CAT==='all'?PRODUCTS.slice():PRODUCTS.filter(p=>p.cat===CAT)):(CAT==='all'?PRODUCTS.filter(p=>p.sub===f):PRODUCTS.filter(p=>p.cat===CAT&&p.sub===f));
      apply();
    }));
    apply();
  }

  /* ---------- Newsletter ---------- */
  $$('.news-form').forEach(f=>f.addEventListener('submit',e=>{
    e.preventDefault();
    const inp=$('input',f);
    if(inp&&inp.value){toast('Welcome to BÉLOR — you’re subscribed');inp.value='';}
  }));

  /* ---------- Scroll reveal (IntersectionObserver) ---------- */
  function observeReveals(){
    const items=$$('.reveal:not(.in)');
    if(reduce||!('IntersectionObserver'in window)){items.forEach(i=>i.classList.add('in'));return;}
    if(!io){
      io=new IntersectionObserver((entries)=>{
        entries.forEach(en=>{if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target);}});
      },{threshold:.08,rootMargin:'0px 0px 10% 0px'});
    }
    items.forEach(i=>io.observe(i));
    // safety: guarantee visibility even if observer never fires
    setTimeout(()=>items.forEach(i=>i.classList.add('in')),2500);
  }
  observeReveals();

  /* ---------- GSAP enhancements (optional, loaded via CDN) ---------- */
  if(window.gsap && !reduce){
    gsap.registerPlugin(ScrollTrigger);
    // Hero text staggered entrance
    const heroEls=$$('.hero [data-anim]');
    if(heroEls.length){
      gsap.from(heroEls,{y:40,opacity:0,duration:1.2,ease:'power3.out',stagger:.12,delay:.3});
    }
    // Parallax on promo image
    $$('.promo img, .page-hero.has-img img').forEach(im=>{
      gsap.to(im,{yPercent:14,ease:'none',scrollTrigger:{trigger:im,start:'top bottom',end:'bottom top',scrub:true}});
    });
  } else {
    // fallback hero entrance via CSS class
    const h=$('.hero'); if(h)h.classList.add('ready');
  }

  /* ---------- Lenis smooth scroll (optional) ---------- */
  if(window.Lenis && !reduce){
    const lenis=new Lenis({duration:1.1,easing:t=>Math.min(1,1.001-Math.pow(2,-10*t))});
    function raf(time){lenis.raf(time);requestAnimationFrame(raf);}
    requestAnimationFrame(raf);
    if(window.ScrollTrigger)lenis.on('scroll',ScrollTrigger.update);
  }


  /* ---------- Small helpers for forms ---------- */
  const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const load=(k,d)=>{try{const v=JSON.parse(localStorage.getItem(k));return v==null?d:v;}catch(e){return d;}};
  const store=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v));}catch(e){}};
  const field=(name,label,val,type)=>`<label class="field"><span>${label}</span><input name="${name}" type="${type||'text'}" value="${esc(val)}" autocomplete="${name}"></label>`;
  const validEmail=v=>/^\S+@\S+\.\S+$/.test((v||'').trim());

  /* ---------- Profile (saved in this browser only) ---------- */
  const PROFILE_KEY='belor-profile', ORDERS_KEY='belor-orders';
  let profile=load(PROFILE_KEY,null), editingProfile=false;
  function openProfile(open){
    if(!profileDrawer)return;
    if(open){closeCart();closeFavs();editingProfile=false;renderProfile();}
    profileDrawer.classList.toggle('open',open);
    overlay.classList.toggle('show',open);
    document.body.style.overflow=open?'hidden':'';
  }
  function renderProfile(){
    $$('.profile-toggle').forEach(b=>b.classList.toggle('has-profile',!!profile));
    if(!profileBody)return;
    if(!profile||editingProfile){
      const v=profile||{};
      profileBody.innerHTML=`<form id="profileForm" novalidate>
        <p class="pf-lead">${profile?'Update your details.':'Save your details once and check out faster.'}</p>
        ${field('name','Full name',v.name)}${field('email','Email',v.email,'email')}${field('phone','Phone',v.phone,'tel')}
        ${field('address','Street address',v.address)}${field('city','City',v.city)}
        <p class="form-err" id="pfErr" role="alert"></p>
        <button class="btn btn-primary" type="submit">Save profile</button>
        ${profile?'<button class="btn btn-outline" type="button" data-profile-cancel>Cancel</button>':''}
      </form>`;
      return;
    }
    const orders=load(ORDERS_KEY,[]);
    const nFav=wish.filter(id=>PRODUCTS.some(p=>p.id===id)).length;
    profileBody.innerHTML=`<div class="pf-hello"><div class="pf-avatar">${esc((profile.name||'?').trim().charAt(0).toUpperCase())}</div><div><b>${esc(profile.name)}</b><span>${esc(profile.email)}</span></div></div>
      <div class="pf-details">${[profile.phone,profile.address,profile.city].filter(Boolean).map(esc).join('<br>')||'<i>No address saved yet.</i>'}</div>
      <div class="pf-actions"><button class="btn btn-outline" data-profile-edit>Edit details</button><button class="btn btn-outline" data-open-favs>My favourites (${nFav})</button><button class="btn btn-outline" data-open-cart>My bag</button></div>
      <h4 class="pf-h">Recent orders</h4>
      ${orders.length?'<ul class="pf-orders">'+orders.slice(0,5).map(o=>`<li><b>${esc(o.id)}</b><span>${esc(o.date)}</span><span>${fmt(o.total)}</span></li>`).join('')+'</ul>':'<p class="pf-none">No orders yet.</p>'}
      <button class="pf-clear" data-profile-clear>Clear my profile</button>`;
  }
  $$('.profile-toggle').forEach(b=>b.addEventListener('click',()=>openProfile(true)));
  const profileClose=$('.profile-close'); if(profileClose)profileClose.addEventListener('click',()=>openProfile(false));
  document.addEventListener('click',e=>{
    if(e.target.closest('[data-profile-edit]')){editingProfile=true;renderProfile();}
    if(e.target.closest('[data-profile-cancel]')){editingProfile=false;renderProfile();}
    if(e.target.closest('[data-profile-clear]')){profile=null;try{localStorage.removeItem(PROFILE_KEY);}catch(err){}renderProfile();toast('Profile cleared');}
  });
  document.addEventListener('submit',e=>{
    if(e.target.id!=='profileForm')return;
    e.preventDefault();
    const v=Object.fromEntries(new FormData(e.target).entries());
    const err=$('#pfErr');
    if(!(v.name||'').trim()){err.textContent='Please enter your name.';return;}
    if(!validEmail(v.email)){err.textContent='Please enter a valid email.';return;}
    profile={name:v.name.trim(),email:v.email.trim(),phone:(v.phone||'').trim(),address:(v.address||'').trim(),city:(v.city||'').trim()};
    store(PROFILE_KEY,profile);editingProfile=false;renderProfile();toast('Profile saved');
  });

  /* ---------- Checkout page (checkout.html) ---------- */
  const coPage=$('#checkoutPage');
  if(coPage){
    const main=$('#coMain'), summary=$('#coSummary'), grid=$('.co-grid'), done=$('#coDone');
    const p0=profile||{};
    main.innerHTML=`<form id="coForm" novalidate>
      <h3 class="co-h">Contact</h3>
      <div class="co-row">${field('name','Full name',p0.name)}${field('phone','Phone',p0.phone,'tel')}</div>
      ${field('email','Email',p0.email,'email')}
      <h3 class="co-h">Delivery address</h3>
      ${field('address','Street address',p0.address)}${field('city','City',p0.city)}
      <h3 class="co-h">Delivery method</h3>
      <div class="cart-delivery" id="coDelivery"></div>
      <h3 class="co-h">Payment</h3>
      <label class="dopt sel"><span><input type="radio" name="pay" value="cod" checked> Cash on delivery<small>Pay when your order arrives</small></span></label>
      <label class="dopt dis"><span><input type="radio" name="pay" value="online" disabled> Online payment<small>Coming soon</small></span></label>
      <label class="co-save"><input type="checkbox" id="coSave" checked> Save these details to my profile</label>
      <p class="form-err" id="coErr" role="alert"></p>
    </form>`;
    function subtotal(){return cart.reduce((t,i)=>{const p=PRODUCTS.find(x=>x.id===i.id);return t+(p?p.price*i.qty:0);},0);}
    function coRefresh(){
      if(!cart.length&&!coPage.classList.contains('placed')){
        grid.innerHTML='<div class="cart-empty" style="grid-column:1/-1">Your bag is empty.<br><a href="index.html" class="btn btn-primary" data-shop>Shop items</a></div>';return;
      }
      if(!summary||!$('#coDelivery'))return;
      const sub=subtotal(), fee=deliveryFee(sub);
      renderDelivery(sub);
      const lines=cart.map(i=>{
        const p=PRODUCTS.find(x=>x.id===i.id); if(!p)return'';
        const v=p.variants.find(x=>x.hex===i.color)||p.variants[0];
        return `<div class="co-line"><img src="${v.img}" alt="${esc(p.name)}"><div><b>${esc(p.name)}</b><span>Size ${esc(i.size)} · ${esc(v.name)} · Qty ${i.qty}</span></div><em>${fmt(p.price*i.qty)}</em></div>`;
      }).join('');
      summary.innerHTML=`<h3 class="co-h">Order summary</h3>${lines}
        <div class="cart-sub"><span>Subtotal</span><b>${fmt(sub)}</b></div>
        <div class="cart-sub"><span>Delivery</span><b>${fee?fmt(fee):'Free'}</b></div>
        <div class="cart-sub cart-total"><span>Total</span><b>${fmt(sub+fee)}</b></div>
        <button class="btn btn-primary" type="submit" form="coForm">Place order <span class="ar">→</span></button>
        <button class="co-edit" type="button" data-open-cart>Edit bag</button>`;
    }
    onCartChange=coRefresh;
    coRefresh();
    document.addEventListener('submit',e=>{
      if(e.target.id!=='coForm')return;
      e.preventDefault();
      const v=Object.fromEntries(new FormData(e.target).entries());
      const opt=DELIVERY_OPTIONS.find(o=>o.id===delivery)||{};
      const err=$('#coErr'); let msg='';
      if(!(v.name||'').trim())msg='Please enter your name.';
      else if(!validEmail(v.email))msg='Please enter a valid email.';
      else if(((v.phone||'').match(/\d/g)||[]).length<7)msg='Please enter a valid phone number.';
      else if(opt.address!==false&&(!(v.address||'').trim()||!(v.city||'').trim()))msg='Please enter your delivery address and city.';
      err.textContent=msg;
      if(msg){err.scrollIntoView({block:'center',behavior:reduce?'auto':'smooth'});return;}
      const sub=subtotal(), total=sub+deliveryFee(sub);
      const order={id:'BEL-'+Date.now().toString(36).toUpperCase().slice(-6),date:new Date().toLocaleDateString(),total,method:opt.label||'',count:cart.reduce((t,i)=>t+i.qty,0)};
      store(ORDERS_KEY,[order].concat(load(ORDERS_KEY,[])).slice(0,10));
      if($('#coSave').checked){profile={name:v.name.trim(),email:v.email.trim(),phone:v.phone.trim(),address:(v.address||'').trim(),city:(v.city||'').trim()};store(PROFILE_KEY,profile);renderProfile();}
      coPage.classList.add('placed');
      cart=[];saveCart();
      grid.hidden=true;
      done.hidden=false;
      done.innerHTML=`<div class="co-ok">&#10003;</div><h2 class="h-oswald">Thank you, ${esc(v.name.trim().split(' ')[0])}!</h2>
        <p>Your order <b>${esc(order.id)}</b> has been placed (${fmt(order.total)}, ${esc(order.method)}).<br>We will contact you on ${esc(v.phone.trim())} to confirm it.</p>
        <a class="btn btn-primary" href="index.html">Continue shopping</a>`;
      scrollTo(0,0);
    });
  }

  /* ---------- Init ---------- */
  renderCart();updateCartCount();renderFavs();renderProfile();
  if(searchInput)runSearch('');
})();
