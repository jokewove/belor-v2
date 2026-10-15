/* BÉLOR — product catalog (shared across all pages) */
const U = 'https://images.unsplash.com/';
const img = (id,w=900)=>`${U}${id}?auto=format&fit=crop&w=${w}&q=70`;

/* ============================================================
   STORE SETTINGS  (change these any time)
   ============================================================ */
const CURRENCY = '$';                 // e.g. 'Rs ' or '$'

// Delivery options shown on the checkout page. fee = price in your currency.
// address:true means the customer must enter a delivery address.
// Change a fee here and the cart updates everywhere.
const DELIVERY_OPTIONS = [
  {id:'home',   label:'Home delivery', note:'2-4 working days', fee:10, address:true},
  {id:'pickup', label:'Store pickup',  note:'Ready in 24 hours', fee:0, address:false}
];
const FREE_DELIVERY_OVER = 0;         // orders above this amount get free delivery. 0 = turned off

/* ============================================================
   HOME PAGE SLIDER  (sale / ads banners)
   Add, remove or edit slides. Fields:
     img      picture (Unsplash id via img('photo-...') or 'assets/img/banner1.jpg')
     video    optional: 'assets/video/sale.mp4'  (then img is used as the poster)
     eyebrow  small text above the title        title  big headline
     text     short line                        cta + href  button text and link
   ============================================================ */
const SLIDER_INTERVAL = 5000;         // milliseconds between slides
const SLIDES = [
  {img:img('photo-1539533018447-63fcce2678e3',1800), eyebrow:'Season Sale', title:'UP TO 40% OFF', text:'Shirts, trousers, shoes and more. Limited time only.', cta:'Shop the sale', href:'men.html'},
  {img:img('photo-1483985988355-763728e1935b',1800), eyebrow:'New Arrivals', title:'THE NEW EDIT', text:'Fresh pieces for him, her and the little ones.', cta:'Shop new in', href:'other.html'},
  {img:img('photo-1542272604-787c3835535d',1800), eyebrow:'Denim Week', title:'BUY 2, SAVE 15%', text:'Premium denim in every fit. Offer ends soon.', cta:'Shop jeans', href:'jeans.html'},
  {img:img('photo-1519238263530-99bdd11df2ea',1800), eyebrow:'Kids Collection', title:'SOFT & PLAYFUL', text:'Gentle fabrics for the youngest members of the family.', cta:'Shop kids', href:'kids.html'}
];

const PRODUCTS = [
  // id, name, category(men/women/kids/jeans/other), sub, price, old, sizes, colors, badge, img, alt
  {id:1, name:'Tailored Wool Overcoat', cat:'men', sub:'Outerwear', price:420, old:0, sizes:['S','M','L','XL'], colors:['#18283B','#242424','#A38655'], badge:'New', img:img('photo-1591047139829-d91aecb6caea'), alt:img('photo-1593032465175-481ac7f401a0')},
  {id:2, name:'Oxford Cotton Shirt', cat:'men', sub:'Shirts', price:95, old:0, sizes:['S','M','L','XL'], colors:['#FFFFFF','#18283B','#DED7CD'], badge:'', img:img('photo-1596755094514-f87e34085b2c'), alt:img('photo-1603252109303-2751441dd157')},
  {id:3, name:'Slim Fit Chino Trousers', cat:'men', sub:'Trousers', price:120, old:150, sizes:['30','32','34','36'], colors:['#242424','#A38655','#DED7CD'], badge:'Sale', img:img('photo-1473966968600-fa801b869a1a'), alt:img('photo-1594633312681-425c7b97ccd1')},
  {id:4, name:'Merino Knit Sweater', cat:'men', sub:'Knitwear', price:165, old:0, sizes:['S','M','L','XL'], colors:['#18283B','#A38655','#242424'], badge:'', img:img('photo-1434389677669-e08b4cac3105'), alt:img('photo-1516257984-b1b4d707412e')},
  {id:5, name:'Structured Blazer', cat:'men', sub:'Tailoring', price:380, old:0, sizes:['S','M','L','XL'], colors:['#242424','#18283B'], badge:'New', img:img('photo-1507003211169-0a1dd7228f2d'), alt:img('photo-1521572163474-6864f9cf17ab')},
  {id:6, name:'Linen Resort Shirt', cat:'men', sub:'Shirts', price:110, old:0, sizes:['S','M','L','XL'], colors:['#FFFFFF','#DED7CD','#A38655'], badge:'', img:img('photo-1602810318383-e386cc2a3ccf'), alt:img('photo-1620012253295-c15cc3e65df4')},

  {id:7, name:'Silk Slip Midi Dress', cat:'women', sub:'Dresses', price:290, old:0, sizes:['XS','S','M','L'], colors:['#A38655','#242424','#18283B'], badge:'New', img:img('photo-1595777457583-95e059d581b8'), alt:img('photo-1572804013309-59a88b7e92f1')},
  {id:8, name:'Cashmere Wrap Coat', cat:'women', sub:'Outerwear', price:510, old:640, sizes:['XS','S','M','L'], colors:['#DED7CD','#A38655','#242424'], badge:'Sale', img:img('photo-1539533018447-63fcce2678e3'), alt:img('photo-1548624313-0396c75e4b1a')},
  {id:9, name:'Pleated Satin Skirt', cat:'women', sub:'Skirts', price:180, old:0, sizes:['XS','S','M','L'], colors:['#18283B','#A38655'], badge:'', img:img('photo-1583496661160-fb5886a0aaaa'), alt:img('photo-1551803091-e20673f15770')},
  {id:10, name:'Oversized Poplin Blouse', cat:'women', sub:'Shirts', price:130, old:0, sizes:['XS','S','M','L'], colors:['#FFFFFF','#DED7CD'], badge:'', img:img('photo-1554568218-0f1715e72254'), alt:img('photo-1485968579580-b6d095142e6e')},
  {id:11, name:'Ribbed Knit Dress', cat:'women', sub:'Dresses', price:220, old:0, sizes:['XS','S','M','L'], colors:['#242424','#A38655','#18283B'], badge:'New', img:img('photo-1515372039744-b8f02a3ae446'), alt:img('photo-1566174053879-31528523f8ae')},
  {id:12, name:'Tailored Wide Trousers', cat:'women', sub:'Trousers', price:195, old:0, sizes:['XS','S','M','L'], colors:['#18283B','#242424','#DED7CD'], badge:'', img:img('photo-1594633313593-bab3825d0caf'), alt:img('photo-1551232864-3f0890e580d9')},

  {id:13, name:'Kids Knit Cardigan', cat:'kids', sub:'Knitwear', price:68, old:0, sizes:['2Y','4Y','6Y','8Y'], colors:['#A38655','#DED7CD','#18283B'], badge:'New', img:img('photo-1519238263530-99bdd11df2ea'), alt:img('photo-1543854704-78335e38c62e')},
  {id:14, name:'Little Denim Jacket', cat:'kids', sub:'Outerwear', price:72, old:90, sizes:['2Y','4Y','6Y','8Y'], colors:['#18283B','#242424'], badge:'Sale', img:img('photo-1518831959646-742c3a14ebf7'), alt:img('photo-1476234251651-f353703a034d')},
  {id:15, name:'Cotton Play Tee', cat:'kids', sub:'Shirts', price:34, old:0, sizes:['2Y','4Y','6Y','8Y'], colors:['#FFFFFF','#A38655','#DED7CD'], badge:'', img:img('photo-1522771930-78848d9293e8'), alt:img('photo-1503944583220-79d8926ad5e2')},
  {id:16, name:'Soft Jogger Set', cat:'kids', sub:'Sets', price:58, old:0, sizes:['2Y','4Y','6Y','8Y'], colors:['#242424','#DED7CD'], badge:'', img:img('photo-1514090458221-65bb69cf63e6'), alt:img('photo-1560506840-ec148e82a604')},

  {id:17, name:'Selvedge Straight Jeans', cat:'jeans', sub:'Straight', price:160, old:0, sizes:['28','30','32','34','36'], colors:['#18283B','#242424'], badge:'New', img:img('photo-1542272604-787c3835535d'), alt:img('photo-1541099649105-f69ad21f3246')},
  {id:18, name:'Vintage Wash Slim Jeans', cat:'jeans', sub:'Slim', price:140, old:175, sizes:['28','30','32','34'], colors:['#242424','#18283B','#DED7CD'], badge:'Sale', img:img('photo-1584370848010-d7fe6bc767ec'), alt:img('photo-1475178626620-a4d074967452')},
  {id:19, name:'High-Rise Wide Jeans', cat:'jeans', sub:'Wide', price:155, old:0, sizes:['24','26','28','30'], colors:['#18283B','#242424'], badge:'', img:img('photo-1551537482-f2075a1d41f2'), alt:img('photo-1555689502-c4b22d76c56f')},
  {id:20, name:'Relaxed Tapered Denim', cat:'jeans', sub:'Tapered', price:150, old:0, sizes:['30','32','34','36'], colors:['#242424','#A38655'], badge:'', img:img('photo-1565084888279-aca607ecce0c'), alt:img('photo-1604176354204-9268737828e4')},

  {id:21, name:'Grain Leather Tote', cat:'other', sub:'Accessories', price:340, old:0, sizes:['One'], colors:['#A38655','#242424','#18283B'], badge:'New', img:img('photo-1584917865442-de89df76afd3'), alt:img('photo-1591561954557-26941169b49e')},
  {id:22, name:'Minimal Leather Sneaker', cat:'other', sub:'Footwear', price:220, old:0, sizes:['39','40','41','42','43'], colors:['#FFFFFF','#242424'], badge:'', img:img('photo-1549298916-b41d501d3772'), alt:img('photo-1600185365483-26d7a4cc7519')},
  {id:23, name:'Cashmere Scarf', cat:'other', sub:'Accessories', price:95, old:120, sizes:['One'], colors:['#A38655','#DED7CD','#18283B'], badge:'Sale', img:img('photo-1601924994987-69e26d50dc26'), alt:img('photo-1520903920243-00d872a2d1c9')},
  {id:24, name:'Structured Felt Hat', cat:'other', sub:'Accessories', price:130, old:0, sizes:['One'], colors:['#242424','#A38655'], badge:'', img:img('photo-1529958030586-3aae4ca485ff'), alt:img('photo-1514327605112-b887c0e61c0a')},

  /* ---------- SHIRTS (40) ---------- */
  {id:25, name:'Studio Twill Shirt', cat:'men', sub:'Shirts', price:170, old:0, sizes:['S', 'M', 'L', 'XL'], colors:['#FFFFFF', '#A38655', '#C9B79C', '#9CA68A'], badge:'New', art:'shirt'},
  {id:26, name:'Refined Overshirt', cat:'men', sub:'Shirts', price:120, old:0, sizes:['S', 'M', 'L', 'XL'], colors:['#FFFFFF', '#C9B79C', '#9DB4C8'], badge:'', art:'shirt'},
  {id:27, name:'Premium Overshirt', cat:'men', sub:'Shirts', price:115, old:0, sizes:['S', 'M', 'L', 'XL'], colors:['#6B6A4A', '#9DB4C8', '#A38655'], badge:'', art:'shirt'},
  {id:28, name:'Garment-Dyed Oxford Shirt', cat:'men', sub:'Shirts', price:95, old:0, sizes:['S', 'M', 'L', 'XL'], colors:['#9DB4C8', '#6D2E3A', '#C9B79C', '#18283B'], badge:'', art:'shirt'},
  {id:29, name:'Crisp Flannel Shirt', cat:'men', sub:'Shirts', price:100, old:125, sizes:['S', 'M', 'L', 'XL'], colors:['#FFFFFF', '#6D2E3A', '#A38655', '#9DB4C8'], badge:'Sale', art:'shirt'},
  {id:30, name:'Weekend Camp-Collar Shirt', cat:'men', sub:'Shirts', price:150, old:0, sizes:['S', 'M', 'L', 'XL'], colors:['#9DB4C8', '#6D2E3A', '#242424'], badge:'', art:'shirt'},
  {id:31, name:'Fine-Gauge Oxford Shirt', cat:'men', sub:'Shirts', price:175, old:0, sizes:['S', 'M', 'L', 'XL'], colors:['#FFFFFF', '#9DB4C8', '#DED7CD', '#A38655'], badge:'', art:'shirt'},
  {id:32, name:'Structured Camp-Collar Shirt', cat:'men', sub:'Shirts', price:170, old:0, sizes:['S', 'M', 'L', 'XL'], colors:['#9CA68A', '#9DB4C8', '#A38655'], badge:'', art:'shirt'},
  {id:33, name:'Lightweight Camp-Collar Shirt', cat:'men', sub:'Shirts', price:165, old:0, sizes:['S', 'M', 'L', 'XL'], colors:['#DED7CD', '#A38655', '#18283B'], badge:'', art:'shirt'},
  {id:34, name:'Studio Overshirt', cat:'men', sub:'Shirts', price:90, old:0, sizes:['S', 'M', 'L', 'XL'], colors:['#DED7CD', '#9DB4C8', '#6D2E3A', '#242424'], badge:'', art:'shirt'},
  {id:35, name:'Urban Twill Shirt', cat:'men', sub:'Shirts', price:140, old:0, sizes:['S', 'M', 'L', 'XL'], colors:['#18283B', '#242424', '#DED7CD'], badge:'', art:'shirt'},
  {id:36, name:'Urban Poplin Shirt', cat:'men', sub:'Shirts', price:125, old:0, sizes:['S', 'M', 'L', 'XL'], colors:['#FFFFFF', '#18283B', '#6B6A4A'], badge:'', art:'shirt'},
  {id:37, name:'Premium Linen Shirt', cat:'men', sub:'Shirts', price:95, old:0, sizes:['S', 'M', 'L', 'XL'], colors:['#A38655', '#6D2E3A', '#6B6A4A'], badge:'New', art:'shirt'},
  {id:38, name:'Maison Linen Shirt', cat:'men', sub:'Shirts', price:140, old:0, sizes:['S', 'M', 'L', 'XL'], colors:['#18283B', '#6D2E3A', '#9DB4C8'], badge:'', art:'shirt'},
  {id:39, name:'Fine-Gauge Poplin Shirt', cat:'men', sub:'Shirts', price:155, old:0, sizes:['S', 'M', 'L', 'XL'], colors:['#C9B79C', '#DED7CD', '#A38655', '#6B6A4A'], badge:'', art:'shirt'},
  {id:40, name:'Studio Oxford Shirt', cat:'men', sub:'Shirts', price:135, old:170, sizes:['S', 'M', 'L', 'XL'], colors:['#DED7CD', '#18283B', '#A38655', '#242424'], badge:'Sale', art:'shirt'},
  {id:41, name:'Heritage Linen Shirt', cat:'men', sub:'Shirts', price:90, old:0, sizes:['S', 'M', 'L', 'XL'], colors:['#C9B79C', '#18283B', '#6D2E3A'], badge:'', art:'shirt'},
  {id:42, name:'Garment-Dyed Linen Shirt', cat:'men', sub:'Shirts', price:155, old:0, sizes:['S', 'M', 'L', 'XL'], colors:['#242424', '#C9B79C', '#18283B', '#A38655'], badge:'', art:'shirt'},
  {id:43, name:'Classic Camp-Collar Shirt', cat:'men', sub:'Shirts', price:95, old:0, sizes:['S', 'M', 'L', 'XL'], colors:['#C9B79C', '#9DB4C8', '#18283B'], badge:'New', art:'shirt'},
  {id:44, name:'Fine-Gauge Camp-Collar Shirt', cat:'men', sub:'Shirts', price:165, old:0, sizes:['S', 'M', 'L', 'XL'], colors:['#9DB4C8', '#6D2E3A', '#FFFFFF'], badge:'', art:'shirt'},
  {id:45, name:'Structured Satin Shirt', cat:'women', sub:'Shirts', price:95, old:0, sizes:['XS', 'S', 'M', 'L'], colors:['#18283B', '#C9B79C', '#9CA68A'], badge:'New', art:'shirt'},
  {id:46, name:'Textured Cotton Shirt', cat:'women', sub:'Shirts', price:175, old:0, sizes:['XS', 'S', 'M', 'L'], colors:['#C9B79C', '#A38655', '#18283B'], badge:'', art:'shirt'},
  {id:47, name:'Pure Cotton Shirt', cat:'women', sub:'Shirts', price:190, old:0, sizes:['XS', 'S', 'M', 'L'], colors:['#242424', '#18283B', '#C9B79C'], badge:'', art:'shirt'},
  {id:48, name:'Crisp Poplin Blouse', cat:'women', sub:'Shirts', price:95, old:0, sizes:['XS', 'S', 'M', 'L'], colors:['#9CA68A', '#9DB4C8', '#18283B'], badge:'', art:'shirt'},
  {id:49, name:'Pure Linen Shirt', cat:'women', sub:'Shirts', price:160, old:200, sizes:['XS', 'S', 'M', 'L'], colors:['#9DB4C8', '#6B6A4A', '#18283B'], badge:'Sale', art:'shirt'},
  {id:50, name:'Lightweight Tie-Neck Blouse', cat:'women', sub:'Shirts', price:140, old:0, sizes:['XS', 'S', 'M', 'L'], colors:['#C9B79C', '#242424', '#9DB4C8'], badge:'', art:'shirt'},
  {id:51, name:'Noir Relaxed Shirt', cat:'women', sub:'Shirts', price:110, old:0, sizes:['XS', 'S', 'M', 'L'], colors:['#FFFFFF', '#A38655', '#C9B79C', '#6D2E3A'], badge:'', art:'shirt'},
  {id:52, name:'Resort Linen Shirt', cat:'women', sub:'Shirts', price:165, old:0, sizes:['XS', 'S', 'M', 'L'], colors:['#9CA68A', '#242424', '#9DB4C8', '#6D2E3A'], badge:'', art:'shirt'},
  {id:53, name:'Essential Relaxed Shirt', cat:'women', sub:'Shirts', price:115, old:0, sizes:['XS', 'S', 'M', 'L'], colors:['#242424', '#DED7CD', '#6D2E3A'], badge:'', art:'shirt'},
  {id:54, name:'Maison Cotton Shirt', cat:'women', sub:'Shirts', price:110, old:0, sizes:['XS', 'S', 'M', 'L'], colors:['#A38655', '#DED7CD', '#18283B', '#FFFFFF'], badge:'', art:'shirt'},
  {id:55, name:'Textured Poplin Blouse', cat:'women', sub:'Shirts', price:85, old:0, sizes:['XS', 'S', 'M', 'L'], colors:['#FFFFFF', '#9DB4C8', '#6B6A4A'], badge:'', art:'shirt'},
  {id:56, name:'Resort Poplin Blouse', cat:'women', sub:'Shirts', price:175, old:0, sizes:['XS', 'S', 'M', 'L'], colors:['#9DB4C8', '#A38655', '#242424', '#6B6A4A'], badge:'', art:'shirt'},
  {id:57, name:'Classic Oxford Shirt', cat:'kids', sub:'Shirts', price:60, old:0, sizes:['2Y', '4Y', '6Y', '8Y'], colors:['#242424', '#6B6A4A', '#FFFFFF', '#6D2E3A'], badge:'', art:'shirt'},
  {id:58, name:'Atelier Oxford Shirt', cat:'kids', sub:'Shirts', price:55, old:0, sizes:['2Y', '4Y', '6Y', '8Y'], colors:['#9DB4C8', '#18283B', '#6D2E3A'], badge:'', art:'shirt'},
  {id:59, name:'Structured Play Shirt', cat:'kids', sub:'Shirts', price:70, old:0, sizes:['2Y', '4Y', '6Y', '8Y'], colors:['#FFFFFF', '#18283B', '#6B6A4A', '#6D2E3A'], badge:'', art:'shirt'},
  {id:60, name:'Weekend Button-Up Shirt', cat:'kids', sub:'Shirts', price:80, old:0, sizes:['2Y', '4Y', '6Y', '8Y'], colors:['#9DB4C8', '#FFFFFF', '#6B6A4A'], badge:'', art:'shirt'},
  {id:61, name:'Everyday Oxford Shirt', cat:'kids', sub:'Shirts', price:75, old:0, sizes:['2Y', '4Y', '6Y', '8Y'], colors:['#9DB4C8', '#FFFFFF', '#6B6A4A'], badge:'', art:'shirt'},
  {id:62, name:'Urban Cotton Shirt', cat:'kids', sub:'Shirts', price:75, old:0, sizes:['2Y', '4Y', '6Y', '8Y'], colors:['#A38655', '#9DB4C8', '#DED7CD'], badge:'', art:'shirt'},
  {id:63, name:'Minimal Poplin Shirt', cat:'kids', sub:'Shirts', price:45, old:0, sizes:['2Y', '4Y', '6Y', '8Y'], colors:['#A38655', '#DED7CD', '#9CA68A'], badge:'', art:'shirt'},
  {id:64, name:'Noir Poplin Shirt', cat:'kids', sub:'Shirts', price:35, old:0, sizes:['2Y', '4Y', '6Y', '8Y'], colors:['#9CA68A', '#18283B', '#C9B79C'], badge:'New', art:'shirt'},

  /* ---------- PANTS (40) ---------- */
  {id:65, name:'Atelier Drawstring Pants', cat:'men', sub:'Pants', price:165, old:0, sizes:['S', 'M', 'L', 'XL'], colors:['#242424', '#18283B', '#9CA68A', '#DED7CD'], badge:'', art:'pants'},
  {id:66, name:'Fine-Gauge Jogger Pants', cat:'men', sub:'Pants', price:150, old:0, sizes:['S', 'M', 'L', 'XL'], colors:['#242424', '#C9B79C', '#18283B', '#6B6A4A'], badge:'', art:'pants'},
  {id:67, name:'Urban Drawstring Pants', cat:'men', sub:'Pants', price:150, old:190, sizes:['S', 'M', 'L', 'XL'], colors:['#C9B79C', '#6B6A4A', '#9CA68A'], badge:'Sale', art:'pants'},
  {id:68, name:'Tailored Drawstring Pants', cat:'men', sub:'Pants', price:115, old:0, sizes:['S', 'M', 'L', 'XL'], colors:['#242424', '#6B6A4A', '#DED7CD', '#18283B'], badge:'', art:'pants'},
  {id:69, name:'Refined Cotton Pants', cat:'men', sub:'Pants', price:135, old:170, sizes:['S', 'M', 'L', 'XL'], colors:['#9CA68A', '#18283B', '#C9B79C', '#6B6A4A'], badge:'Sale', art:'pants'},
  {id:70, name:'Textured Jogger Pants', cat:'men', sub:'Pants', price:130, old:0, sizes:['S', 'M', 'L', 'XL'], colors:['#C9B79C', '#18283B', '#9CA68A'], badge:'New', art:'pants'},
  {id:71, name:'Studio Drawstring Pants', cat:'men', sub:'Pants', price:95, old:0, sizes:['S', 'M', 'L', 'XL'], colors:['#DED7CD', '#6B6A4A', '#C9B79C', '#242424'], badge:'', art:'pants'},
  {id:72, name:'Weekend Jogger Pants', cat:'men', sub:'Pants', price:95, old:120, sizes:['S', 'M', 'L', 'XL'], colors:['#9CA68A', '#C9B79C', '#242424'], badge:'Sale', art:'pants'},
  {id:73, name:'Structured Cargo Pants', cat:'men', sub:'Pants', price:155, old:0, sizes:['S', 'M', 'L', 'XL'], colors:['#9CA68A', '#DED7CD', '#18283B', '#242424'], badge:'', art:'pants'},
  {id:74, name:'Structured Cotton Pants', cat:'men', sub:'Pants', price:125, old:0, sizes:['S', 'M', 'L', 'XL'], colors:['#242424', '#9CA68A', '#C9B79C'], badge:'New', art:'pants'},
  {id:75, name:'Heritage Utility Pants', cat:'men', sub:'Pants', price:140, old:0, sizes:['S', 'M', 'L', 'XL'], colors:['#6B6A4A', '#18283B', '#242424'], badge:'', art:'pants'},
  {id:76, name:'Essential Utility Pants', cat:'men', sub:'Pants', price:140, old:0, sizes:['S', 'M', 'L', 'XL'], colors:['#242424', '#DED7CD', '#18283B', '#6B6A4A'], badge:'', art:'pants'},
  {id:77, name:'Soft-Touch Track Pants', cat:'men', sub:'Pants', price:180, old:0, sizes:['S', 'M', 'L', 'XL'], colors:['#DED7CD', '#18283B', '#C9B79C', '#242424'], badge:'', art:'pants'},
  {id:78, name:'Signature Pull-On Pants', cat:'men', sub:'Pants', price:150, old:0, sizes:['S', 'M', 'L', 'XL'], colors:['#DED7CD', '#18283B', '#C9B79C', '#9CA68A'], badge:'New', art:'pants'},
  {id:79, name:'Tailored Cargo Pants', cat:'men', sub:'Pants', price:95, old:120, sizes:['S', 'M', 'L', 'XL'], colors:['#242424', '#DED7CD', '#9CA68A'], badge:'Sale', art:'pants'},
  {id:80, name:'Garment-Dyed Cotton Pants', cat:'men', sub:'Pants', price:165, old:0, sizes:['S', 'M', 'L', 'XL'], colors:['#C9B79C', '#DED7CD', '#9CA68A'], badge:'', art:'pants'},
  {id:81, name:'Crisp Pull-On Pants', cat:'men', sub:'Pants', price:150, old:0, sizes:['S', 'M', 'L', 'XL'], colors:['#9CA68A', '#C9B79C', '#6B6A4A', '#DED7CD'], badge:'', art:'pants'},
  {id:82, name:'Garment-Dyed Jogger Pants', cat:'men', sub:'Pants', price:110, old:0, sizes:['S', 'M', 'L', 'XL'], colors:['#C9B79C', '#DED7CD', '#9CA68A', '#242424'], badge:'', art:'pants'},
  {id:83, name:'Fine-Gauge Track Pants', cat:'men', sub:'Pants', price:80, old:100, sizes:['S', 'M', 'L', 'XL'], colors:['#C9B79C', '#18283B', '#9CA68A', '#6B6A4A'], badge:'Sale', art:'pants'},
  {id:84, name:'Lightweight Drawstring Pants', cat:'men', sub:'Pants', price:180, old:0, sizes:['S', 'M', 'L', 'XL'], colors:['#C9B79C', '#9CA68A', '#242424'], badge:'', art:'pants'},
  {id:85, name:'Structured Lounge Pants', cat:'women', sub:'Pants', price:110, old:0, sizes:['XS', 'S', 'M', 'L'], colors:['#6B6A4A', '#18283B', '#242424'], badge:'New', art:'pants'},
  {id:86, name:'Heritage Jogger Pants', cat:'women', sub:'Pants', price:105, old:0, sizes:['XS', 'S', 'M', 'L'], colors:['#9CA68A', '#242424', '#6B6A4A', '#C9B79C'], badge:'', art:'pants'},
  {id:87, name:'Relaxed Wide-Leg Pants', cat:'women', sub:'Pants', price:160, old:0, sizes:['XS', 'S', 'M', 'L'], colors:['#6B6A4A', '#18283B', '#242424', '#9CA68A'], badge:'', art:'pants'},
  {id:88, name:'Minimal Pull-On Pants', cat:'women', sub:'Pants', price:85, old:0, sizes:['XS', 'S', 'M', 'L'], colors:['#9CA68A', '#18283B', '#DED7CD'], badge:'New', art:'pants'},
  {id:89, name:'Fine-Gauge Drawstring Pants', cat:'women', sub:'Pants', price:190, old:0, sizes:['XS', 'S', 'M', 'L'], colors:['#C9B79C', '#6B6A4A', '#18283B'], badge:'', art:'pants'},
  {id:90, name:'Tailored Parachute Pants', cat:'women', sub:'Pants', price:140, old:0, sizes:['XS', 'S', 'M', 'L'], colors:['#C9B79C', '#DED7CD', '#242424', '#9CA68A'], badge:'', art:'pants'},
  {id:91, name:'Brushed Pull-On Pants', cat:'women', sub:'Pants', price:145, old:0, sizes:['XS', 'S', 'M', 'L'], colors:['#DED7CD', '#6B6A4A', '#18283B'], badge:'', art:'pants'},
  {id:92, name:'Slim-Fit Wide-Leg Pants', cat:'women', sub:'Pants', price:140, old:0, sizes:['XS', 'S', 'M', 'L'], colors:['#DED7CD', '#18283B', '#9CA68A'], badge:'', art:'pants'},
  {id:93, name:'Urban Cargo Pants', cat:'women', sub:'Pants', price:90, old:110, sizes:['XS', 'S', 'M', 'L'], colors:['#DED7CD', '#18283B', '#6B6A4A'], badge:'Sale', art:'pants'},
  {id:94, name:'Brushed Drawstring Pants', cat:'women', sub:'Pants', price:105, old:0, sizes:['XS', 'S', 'M', 'L'], colors:['#242424', '#18283B', '#9CA68A'], badge:'', art:'pants'},
  {id:95, name:'Minimal Cargo Pants', cat:'women', sub:'Pants', price:185, old:230, sizes:['XS', 'S', 'M', 'L'], colors:['#242424', '#DED7CD', '#6B6A4A'], badge:'Sale', art:'pants'},
  {id:96, name:'Washed Jogger Pants', cat:'women', sub:'Pants', price:115, old:0, sizes:['XS', 'S', 'M', 'L'], colors:['#9CA68A', '#C9B79C', '#242424'], badge:'', art:'pants'},
  {id:97, name:'Pure Play Pants', cat:'kids', sub:'Pants', price:85, old:0, sizes:['2Y', '4Y', '6Y', '8Y'], colors:['#18283B', '#DED7CD', '#9CA68A', '#6B6A4A'], badge:'', art:'pants'},
  {id:98, name:'Crisp Jogger Pants', cat:'kids', sub:'Pants', price:45, old:0, sizes:['2Y', '4Y', '6Y', '8Y'], colors:['#C9B79C', '#6B6A4A', '#DED7CD', '#9CA68A'], badge:'', art:'pants'},
  {id:99, name:'Studio Play Pants', cat:'kids', sub:'Pants', price:75, old:95, sizes:['2Y', '4Y', '6Y', '8Y'], colors:['#18283B', '#C9B79C', '#9CA68A', '#DED7CD'], badge:'Sale', art:'pants'},
  {id:100, name:'Classic Play Pants', cat:'kids', sub:'Pants', price:85, old:0, sizes:['2Y', '4Y', '6Y', '8Y'], colors:['#242424', '#DED7CD', '#C9B79C', '#6B6A4A'], badge:'', art:'pants'},
  {id:101, name:'Weekend Soft Pants', cat:'kids', sub:'Pants', price:75, old:0, sizes:['2Y', '4Y', '6Y', '8Y'], colors:['#9CA68A', '#6B6A4A', '#242424'], badge:'', art:'pants'},
  {id:102, name:'Refined Play Pants', cat:'kids', sub:'Pants', price:60, old:0, sizes:['2Y', '4Y', '6Y', '8Y'], colors:['#242424', '#6B6A4A', '#18283B'], badge:'', art:'pants'},
  {id:103, name:'Cloud Play Pants', cat:'kids', sub:'Pants', price:45, old:0, sizes:['2Y', '4Y', '6Y', '8Y'], colors:['#DED7CD', '#6B6A4A', '#242424'], badge:'', art:'pants'},
  {id:104, name:'Maison Play Pants', cat:'kids', sub:'Pants', price:85, old:0, sizes:['2Y', '4Y', '6Y', '8Y'], colors:['#9CA68A', '#C9B79C', '#242424'], badge:'', art:'pants'},

  /* ---------- TROUSERS (40) ---------- */
  {id:105, name:'Maison Chino Trousers', cat:'men', sub:'Trousers', price:240, old:0, sizes:['S', 'M', 'L', 'XL'], colors:['#6D2E3A', '#C9B79C', '#242424'], badge:'', art:'trousers'},
  {id:106, name:'Garment-Dyed Linen Trousers', cat:'men', sub:'Trousers', price:195, old:0, sizes:['S', 'M', 'L', 'XL'], colors:['#18283B', '#6B6A4A', '#242424', '#C9B79C'], badge:'New', art:'trousers'},
  {id:107, name:'Maison Slim Trousers', cat:'men', sub:'Trousers', price:210, old:0, sizes:['S', 'M', 'L', 'XL'], colors:['#6B6A4A', '#6D2E3A', '#242424', '#18283B'], badge:'', art:'trousers'},
  {id:108, name:'Resort Wool Trousers', cat:'men', sub:'Trousers', price:185, old:230, sizes:['S', 'M', 'L', 'XL'], colors:['#18283B', '#C9B79C', '#242424'], badge:'Sale', art:'trousers'},
  {id:109, name:'Refined Slim Trousers', cat:'men', sub:'Trousers', price:240, old:0, sizes:['S', 'M', 'L', 'XL'], colors:['#6B6A4A', '#18283B', '#242424', '#C9B79C'], badge:'', art:'trousers'},
  {id:110, name:'Structured Linen Trousers', cat:'men', sub:'Trousers', price:120, old:0, sizes:['S', 'M', 'L', 'XL'], colors:['#6D2E3A', '#18283B', '#242424', '#DED7CD'], badge:'', art:'trousers'},
  {id:111, name:'Essential Pleated Trousers', cat:'men', sub:'Trousers', price:155, old:0, sizes:['S', 'M', 'L', 'XL'], colors:['#242424', '#6D2E3A', '#DED7CD', '#6B6A4A'], badge:'', art:'trousers'},
  {id:112, name:'Refined Wool Trousers', cat:'men', sub:'Trousers', price:190, old:0, sizes:['S', 'M', 'L', 'XL'], colors:['#DED7CD', '#18283B', '#C9B79C', '#242424'], badge:'', art:'trousers'},
  {id:113, name:'Minimal Linen Trousers', cat:'men', sub:'Trousers', price:190, old:240, sizes:['S', 'M', 'L', 'XL'], colors:['#C9B79C', '#6B6A4A', '#242424'], badge:'Sale', art:'trousers'},
  {id:114, name:'Slim-Fit Pleated Trousers', cat:'men', sub:'Trousers', price:140, old:0, sizes:['S', 'M', 'L', 'XL'], colors:['#6B6A4A', '#C9B79C', '#6D2E3A', '#242424'], badge:'', art:'trousers'},
  {id:115, name:'Studio Straight Trousers', cat:'men', sub:'Trousers', price:115, old:0, sizes:['S', 'M', 'L', 'XL'], colors:['#C9B79C', '#6D2E3A', '#242424'], badge:'', art:'trousers'},
  {id:116, name:'Garment-Dyed Straight Trousers', cat:'men', sub:'Trousers', price:130, old:0, sizes:['S', 'M', 'L', 'XL'], colors:['#18283B', '#242424', '#C9B79C'], badge:'', art:'trousers'},
  {id:117, name:'Classic Straight Trousers', cat:'men', sub:'Trousers', price:110, old:140, sizes:['S', 'M', 'L', 'XL'], colors:['#242424', '#18283B', '#6D2E3A'], badge:'Sale', art:'trousers'},
  {id:118, name:'Signature Linen Trousers', cat:'men', sub:'Trousers', price:145, old:0, sizes:['S', 'M', 'L', 'XL'], colors:['#6D2E3A', '#6B6A4A', '#18283B', '#C9B79C'], badge:'', art:'trousers'},
  {id:119, name:'Crisp Chino Trousers', cat:'men', sub:'Trousers', price:155, old:0, sizes:['S', 'M', 'L', 'XL'], colors:['#6D2E3A', '#18283B', '#242424', '#6B6A4A'], badge:'', art:'trousers'},
  {id:120, name:'Heritage Pleated Trousers', cat:'men', sub:'Trousers', price:250, old:0, sizes:['S', 'M', 'L', 'XL'], colors:['#6D2E3A', '#DED7CD', '#242424', '#6B6A4A'], badge:'', art:'trousers'},
  {id:121, name:'Relaxed Wool Trousers', cat:'men', sub:'Trousers', price:120, old:150, sizes:['S', 'M', 'L', 'XL'], colors:['#6D2E3A', '#6B6A4A', '#242424'], badge:'Sale', art:'trousers'},
  {id:122, name:'Weekend Linen Trousers', cat:'men', sub:'Trousers', price:210, old:0, sizes:['S', 'M', 'L', 'XL'], colors:['#C9B79C', '#6B6A4A', '#242424'], badge:'', art:'trousers'},
  {id:123, name:'Textured Tailored Trousers', cat:'men', sub:'Trousers', price:190, old:0, sizes:['S', 'M', 'L', 'XL'], colors:['#C9B79C', '#18283B', '#6B6A4A', '#242424'], badge:'', art:'trousers'},
  {id:124, name:'Minimal Wool Trousers', cat:'men', sub:'Trousers', price:200, old:0, sizes:['S', 'M', 'L', 'XL'], colors:['#6D2E3A', '#C9B79C', '#6B6A4A'], badge:'', art:'trousers'},
  {id:125, name:'Relaxed Cigarette Trousers', cat:'women', sub:'Trousers', price:130, old:0, sizes:['XS', 'S', 'M', 'L'], colors:['#242424', '#6B6A4A', '#DED7CD'], badge:'New', art:'trousers'},
  {id:126, name:'Atelier Wide Trousers', cat:'women', sub:'Trousers', price:155, old:0, sizes:['XS', 'S', 'M', 'L'], colors:['#C9B79C', '#242424', '#6B6A4A'], badge:'', art:'trousers'},
  {id:127, name:'Soft-Touch Wide Trousers', cat:'women', sub:'Trousers', price:245, old:0, sizes:['XS', 'S', 'M', 'L'], colors:['#18283B', '#C9B79C', '#242424', '#DED7CD'], badge:'', art:'trousers'},
  {id:128, name:'Refined Linen Trousers', cat:'women', sub:'Trousers', price:220, old:275, sizes:['XS', 'S', 'M', 'L'], colors:['#6D2E3A', '#242424', '#18283B'], badge:'Sale', art:'trousers'},
  {id:129, name:'Modern Pleated Trousers', cat:'women', sub:'Trousers', price:245, old:0, sizes:['XS', 'S', 'M', 'L'], colors:['#C9B79C', '#18283B', '#DED7CD'], badge:'', art:'trousers'},
  {id:130, name:'Everyday Wool Trousers', cat:'women', sub:'Trousers', price:235, old:0, sizes:['XS', 'S', 'M', 'L'], colors:['#242424', '#DED7CD', '#6B6A4A'], badge:'', art:'trousers'},
  {id:131, name:'Maison High-Waist Trousers', cat:'women', sub:'Trousers', price:210, old:0, sizes:['XS', 'S', 'M', 'L'], colors:['#C9B79C', '#242424', '#DED7CD', '#18283B'], badge:'', art:'trousers'},
  {id:132, name:'Textured Wool Trousers', cat:'women', sub:'Trousers', price:250, old:310, sizes:['XS', 'S', 'M', 'L'], colors:['#6D2E3A', '#18283B', '#C9B79C'], badge:'Sale', art:'trousers'},
  {id:133, name:'Crisp Pleated Trousers', cat:'women', sub:'Trousers', price:200, old:250, sizes:['XS', 'S', 'M', 'L'], colors:['#DED7CD', '#C9B79C', '#6D2E3A'], badge:'Sale', art:'trousers'},
  {id:134, name:'Fine-Gauge Wool Trousers', cat:'women', sub:'Trousers', price:185, old:0, sizes:['XS', 'S', 'M', 'L'], colors:['#C9B79C', '#DED7CD', '#6D2E3A'], badge:'', art:'trousers'},
  {id:135, name:'Essential Wide Trousers', cat:'women', sub:'Trousers', price:165, old:205, sizes:['XS', 'S', 'M', 'L'], colors:['#18283B', '#242424', '#C9B79C', '#DED7CD'], badge:'Sale', art:'trousers'},
  {id:136, name:'Crisp Linen Trousers', cat:'women', sub:'Trousers', price:215, old:0, sizes:['XS', 'S', 'M', 'L'], colors:['#242424', '#6B6A4A', '#DED7CD', '#6D2E3A'], badge:'', art:'trousers'},
  {id:137, name:'Crisp Smart Trousers', cat:'kids', sub:'Trousers', price:55, old:70, sizes:['2Y', '4Y', '6Y', '8Y'], colors:['#6D2E3A', '#6B6A4A', '#DED7CD', '#C9B79C'], badge:'Sale', art:'trousers'},
  {id:138, name:'Noir Smart Trousers', cat:'kids', sub:'Trousers', price:110, old:0, sizes:['2Y', '4Y', '6Y', '8Y'], colors:['#6B6A4A', '#242424', '#DED7CD'], badge:'', art:'trousers'},
  {id:139, name:'Garment-Dyed Pleated Trousers', cat:'kids', sub:'Trousers', price:65, old:0, sizes:['2Y', '4Y', '6Y', '8Y'], colors:['#18283B', '#242424', '#DED7CD', '#6B6A4A'], badge:'', art:'trousers'},
  {id:140, name:'Noir Chino Trousers', cat:'kids', sub:'Trousers', price:85, old:0, sizes:['2Y', '4Y', '6Y', '8Y'], colors:['#242424', '#6D2E3A', '#DED7CD'], badge:'', art:'trousers'},
  {id:141, name:'Brushed Cotton Trousers', cat:'kids', sub:'Trousers', price:60, old:0, sizes:['2Y', '4Y', '6Y', '8Y'], colors:['#C9B79C', '#242424', '#18283B'], badge:'', art:'trousers'},
  {id:142, name:'Fine-Gauge School Trousers', cat:'kids', sub:'Trousers', price:85, old:0, sizes:['2Y', '4Y', '6Y', '8Y'], colors:['#DED7CD', '#18283B', '#242424', '#6D2E3A'], badge:'', art:'trousers'},
  {id:143, name:'Cloud Tailored Trousers', cat:'kids', sub:'Trousers', price:110, old:0, sizes:['2Y', '4Y', '6Y', '8Y'], colors:['#6B6A4A', '#6D2E3A', '#18283B', '#DED7CD'], badge:'New', art:'trousers'},
  {id:144, name:'Soft-Touch Smart Trousers', cat:'kids', sub:'Trousers', price:95, old:0, sizes:['2Y', '4Y', '6Y', '8Y'], colors:['#C9B79C', '#6B6A4A', '#DED7CD', '#6D2E3A'], badge:'New', art:'trousers'},

  /* ---------- POLO T-SHIRTS (40) ---------- */
  {id:145, name:'Pure Jersey Polo', cat:'men', sub:'Polo T-Shirts', price:105, old:0, sizes:['S', 'M', 'L', 'XL'], colors:['#6D2E3A', '#18283B', '#9CA68A'], badge:'New', art:'polo'},
  {id:146, name:'Resort Jersey Polo', cat:'men', sub:'Polo T-Shirts', price:55, old:0, sizes:['S', 'M', 'L', 'XL'], colors:['#C9B79C', '#18283B', '#6B6A4A', '#FFFFFF'], badge:'', art:'polo'},
  {id:147, name:'Pure Merino Polo', cat:'men', sub:'Polo T-Shirts', price:65, old:0, sizes:['S', 'M', 'L', 'XL'], colors:['#FFFFFF', '#DED7CD', '#9DB4C8'], badge:'', art:'polo'},
  {id:148, name:'Essential Jersey Polo', cat:'men', sub:'Polo T-Shirts', price:125, old:0, sizes:['S', 'M', 'L', 'XL'], colors:['#A38655', '#FFFFFF', '#9CA68A'], badge:'', art:'polo'},
  {id:149, name:'Textured Pique Polo', cat:'men', sub:'Polo T-Shirts', price:70, old:90, sizes:['S', 'M', 'L', 'XL'], colors:['#18283B', '#242424', '#C9B79C'], badge:'Sale', art:'polo'},
  {id:150, name:'Maison Jersey Polo', cat:'men', sub:'Polo T-Shirts', price:75, old:0, sizes:['S', 'M', 'L', 'XL'], colors:['#9DB4C8', '#9CA68A', '#18283B', '#6D2E3A'], badge:'', art:'polo'},
  {id:151, name:'Noir Knit Polo', cat:'men', sub:'Polo T-Shirts', price:55, old:0, sizes:['S', 'M', 'L', 'XL'], colors:['#DED7CD', '#FFFFFF', '#6D2E3A', '#A38655'], badge:'', art:'polo'},
  {id:152, name:'Urban Pique Polo', cat:'men', sub:'Polo T-Shirts', price:75, old:95, sizes:['S', 'M', 'L', 'XL'], colors:['#A38655', '#242424', '#6D2E3A'], badge:'Sale', art:'polo'},
  {id:153, name:'Essential Textured Polo', cat:'men', sub:'Polo T-Shirts', price:80, old:0, sizes:['S', 'M', 'L', 'XL'], colors:['#18283B', '#A38655', '#FFFFFF', '#9DB4C8'], badge:'', art:'polo'},
  {id:154, name:'Slim-Fit Jersey Polo', cat:'men', sub:'Polo T-Shirts', price:130, old:0, sizes:['S', 'M', 'L', 'XL'], colors:['#9DB4C8', '#18283B', '#FFFFFF'], badge:'', art:'polo'},
  {id:155, name:'Minimal Textured Polo', cat:'men', sub:'Polo T-Shirts', price:85, old:0, sizes:['S', 'M', 'L', 'XL'], colors:['#A38655', '#DED7CD', '#6D2E3A'], badge:'New', art:'polo'},
  {id:156, name:'Fine-Gauge Pique Polo', cat:'men', sub:'Polo T-Shirts', price:55, old:0, sizes:['S', 'M', 'L', 'XL'], colors:['#6B6A4A', '#9CA68A', '#A38655', '#FFFFFF'], badge:'', art:'polo'},
  {id:157, name:'Lightweight Textured Polo', cat:'men', sub:'Polo T-Shirts', price:65, old:0, sizes:['S', 'M', 'L', 'XL'], colors:['#A38655', '#FFFFFF', '#9CA68A', '#DED7CD'], badge:'New', art:'polo'},
  {id:158, name:'Everyday Pique Polo', cat:'men', sub:'Polo T-Shirts', price:105, old:0, sizes:['S', 'M', 'L', 'XL'], colors:['#18283B', '#FFFFFF', '#242424', '#9DB4C8'], badge:'', art:'polo'},
  {id:159, name:'Weekend Performance Polo', cat:'men', sub:'Polo T-Shirts', price:75, old:0, sizes:['S', 'M', 'L', 'XL'], colors:['#18283B', '#6B6A4A', '#9CA68A'], badge:'', art:'polo'},
  {id:160, name:'Tailored Merino Polo', cat:'men', sub:'Polo T-Shirts', price:125, old:0, sizes:['S', 'M', 'L', 'XL'], colors:['#C9B79C', '#9CA68A', '#6D2E3A', '#FFFFFF'], badge:'', art:'polo'},
  {id:161, name:'Cloud Pique Polo', cat:'men', sub:'Polo T-Shirts', price:65, old:0, sizes:['S', 'M', 'L', 'XL'], colors:['#6D2E3A', '#C9B79C', '#FFFFFF', '#9DB4C8'], badge:'', art:'polo'},
  {id:162, name:'Urban Jersey Polo', cat:'men', sub:'Polo T-Shirts', price:80, old:0, sizes:['S', 'M', 'L', 'XL'], colors:['#FFFFFF', '#9CA68A', '#18283B', '#DED7CD'], badge:'', art:'polo'},
  {id:163, name:'Tailored Jersey Polo', cat:'men', sub:'Polo T-Shirts', price:60, old:0, sizes:['S', 'M', 'L', 'XL'], colors:['#FFFFFF', '#DED7CD', '#242424'], badge:'', art:'polo'},
  {id:164, name:'Textured Performance Polo', cat:'men', sub:'Polo T-Shirts', price:80, old:0, sizes:['S', 'M', 'L', 'XL'], colors:['#C9B79C', '#9DB4C8', '#A38655'], badge:'New', art:'polo'},
  {id:165, name:'Brushed Fitted Polo', cat:'women', sub:'Polo T-Shirts', price:80, old:0, sizes:['XS', 'S', 'M', 'L'], colors:['#242424', '#FFFFFF', '#6B6A4A', '#A38655'], badge:'', art:'polo'},
  {id:166, name:'Signature Merino Polo', cat:'women', sub:'Polo T-Shirts', price:80, old:0, sizes:['XS', 'S', 'M', 'L'], colors:['#9DB4C8', '#FFFFFF', '#C9B79C', '#18283B'], badge:'', art:'polo'},
  {id:167, name:'Essential Merino Polo', cat:'women', sub:'Polo T-Shirts', price:130, old:0, sizes:['XS', 'S', 'M', 'L'], colors:['#6D2E3A', '#6B6A4A', '#DED7CD'], badge:'', art:'polo'},
  {id:168, name:'Crisp Cropped Polo', cat:'women', sub:'Polo T-Shirts', price:80, old:0, sizes:['XS', 'S', 'M', 'L'], colors:['#6D2E3A', '#242424', '#9CA68A'], badge:'', art:'polo'},
  {id:169, name:'Minimal Cropped Polo', cat:'women', sub:'Polo T-Shirts', price:80, old:0, sizes:['XS', 'S', 'M', 'L'], colors:['#A38655', '#9DB4C8', '#9CA68A'], badge:'', art:'polo'},
  {id:170, name:'Signature Jersey Polo', cat:'women', sub:'Polo T-Shirts', price:85, old:105, sizes:['XS', 'S', 'M', 'L'], colors:['#18283B', '#6D2E3A', '#9DB4C8', '#242424'], badge:'Sale', art:'polo'},
  {id:171, name:'Slim-Fit Cropped Polo', cat:'women', sub:'Polo T-Shirts', price:65, old:80, sizes:['XS', 'S', 'M', 'L'], colors:['#6B6A4A', '#FFFFFF', '#242424', '#6D2E3A'], badge:'Sale', art:'polo'},
  {id:172, name:'Studio Fitted Polo', cat:'women', sub:'Polo T-Shirts', price:100, old:0, sizes:['XS', 'S', 'M', 'L'], colors:['#DED7CD', '#6D2E3A', '#9DB4C8'], badge:'', art:'polo'},
  {id:173, name:'Modern Cropped Polo', cat:'women', sub:'Polo T-Shirts', price:125, old:0, sizes:['XS', 'S', 'M', 'L'], colors:['#DED7CD', '#C9B79C', '#242424', '#18283B'], badge:'', art:'polo'},
  {id:174, name:'Signature Fitted Polo', cat:'women', sub:'Polo T-Shirts', price:60, old:0, sizes:['XS', 'S', 'M', 'L'], colors:['#242424', '#6D2E3A', '#6B6A4A', '#18283B'], badge:'', art:'polo'},
  {id:175, name:'Slim-Fit Fitted Polo', cat:'women', sub:'Polo T-Shirts', price:125, old:0, sizes:['XS', 'S', 'M', 'L'], colors:['#FFFFFF', '#C9B79C', '#6D2E3A', '#18283B'], badge:'', art:'polo'},
  {id:176, name:'Crisp Merino Polo', cat:'women', sub:'Polo T-Shirts', price:110, old:0, sizes:['XS', 'S', 'M', 'L'], colors:['#A38655', '#6B6A4A', '#FFFFFF', '#18283B'], badge:'', art:'polo'},
  {id:177, name:'Cloud School Polo', cat:'kids', sub:'Polo T-Shirts', price:30, old:0, sizes:['2Y', '4Y', '6Y', '8Y'], colors:['#6D2E3A', '#18283B', '#C9B79C'], badge:'', art:'polo'},
  {id:178, name:'Everyday School Polo', cat:'kids', sub:'Polo T-Shirts', price:35, old:0, sizes:['2Y', '4Y', '6Y', '8Y'], colors:['#DED7CD', '#9CA68A', '#242424'], badge:'', art:'polo'},
  {id:179, name:'Soft-Touch Knit Polo', cat:'kids', sub:'Polo T-Shirts', price:35, old:0, sizes:['2Y', '4Y', '6Y', '8Y'], colors:['#DED7CD', '#6D2E3A', '#C9B79C', '#9CA68A'], badge:'', art:'polo'},
  {id:180, name:'Resort Cotton Polo', cat:'kids', sub:'Polo T-Shirts', price:25, old:0, sizes:['2Y', '4Y', '6Y', '8Y'], colors:['#FFFFFF', '#6D2E3A', '#C9B79C'], badge:'', art:'polo'},
  {id:181, name:'Soft-Touch Pique Polo', cat:'kids', sub:'Polo T-Shirts', price:55, old:70, sizes:['2Y', '4Y', '6Y', '8Y'], colors:['#242424', '#6D2E3A', '#C9B79C', '#9CA68A'], badge:'Sale', art:'polo'},
  {id:182, name:'Premium Knit Polo', cat:'kids', sub:'Polo T-Shirts', price:30, old:40, sizes:['2Y', '4Y', '6Y', '8Y'], colors:['#6B6A4A', '#6D2E3A', '#FFFFFF'], badge:'Sale', art:'polo'},
  {id:183, name:'Noir Cotton Polo', cat:'kids', sub:'Polo T-Shirts', price:50, old:60, sizes:['2Y', '4Y', '6Y', '8Y'], colors:['#242424', '#18283B', '#9DB4C8', '#C9B79C'], badge:'Sale', art:'polo'},
  {id:184, name:'Weekend Knit Polo', cat:'kids', sub:'Polo T-Shirts', price:30, old:0, sizes:['2Y', '4Y', '6Y', '8Y'], colors:['#DED7CD', '#C9B79C', '#6B6A4A'], badge:'', art:'polo'},

  /* ---------- SHOES (40) ---------- */
  {id:185, name:'Essential Low-Top Sneaker', cat:'other', sub:'Footwear', price:255, old:0, sizes:['39', '40', '41', '42', '43', '44'], colors:['#DED7CD', '#C9B79C', '#18283B'], badge:'', art:'shoe'},
  {id:186, name:'Tailored Runner', cat:'other', sub:'Footwear', price:210, old:0, sizes:['39', '40', '41', '42', '43', '44'], colors:['#C9B79C', '#6B6A4A', '#DED7CD'], badge:'', art:'shoe'},
  {id:187, name:'Signature Suede Sneaker', cat:'other', sub:'Footwear', price:180, old:0, sizes:['39', '40', '41', '42', '43', '44'], colors:['#C9B79C', '#18283B', '#FFFFFF', '#DED7CD'], badge:'', art:'shoe'},
  {id:188, name:'Resort Low-Top Sneaker', cat:'other', sub:'Footwear', price:200, old:0, sizes:['39', '40', '41', '42', '43', '44'], colors:['#6B6A4A', '#DED7CD', '#C9B79C', '#18283B'], badge:'', art:'shoe'},
  {id:189, name:'Classic Slip-On Sneaker', cat:'other', sub:'Footwear', price:255, old:0, sizes:['39', '40', '41', '42', '43', '44'], colors:['#DED7CD', '#FFFFFF', '#18283B'], badge:'', art:'shoe'},
  {id:190, name:'Premium Canvas Sneaker', cat:'other', sub:'Footwear', price:145, old:0, sizes:['39', '40', '41', '42', '43', '44'], colors:['#242424', '#C9B79C', '#18283B', '#FFFFFF'], badge:'', art:'shoe'},
  {id:191, name:'Premium Runner', cat:'other', sub:'Footwear', price:125, old:0, sizes:['39', '40', '41', '42', '43', '44'], colors:['#FFFFFF', '#6B6A4A', '#242424'], badge:'', art:'shoe'},
  {id:192, name:'Crisp Leather Sneaker', cat:'other', sub:'Footwear', price:260, old:0, sizes:['39', '40', '41', '42', '43', '44'], colors:['#6B6A4A', '#DED7CD', '#242424', '#FFFFFF'], badge:'', art:'shoe'},
  {id:193, name:'Lightweight Canvas Sneaker', cat:'other', sub:'Footwear', price:310, old:0, sizes:['39', '40', '41', '42', '43', '44'], colors:['#6B6A4A', '#FFFFFF', '#DED7CD'], badge:'', art:'shoe'},
  {id:194, name:'Modern Suede Sneaker', cat:'other', sub:'Footwear', price:320, old:0, sizes:['39', '40', '41', '42', '43', '44'], colors:['#18283B', '#242424', '#DED7CD', '#6B6A4A'], badge:'', art:'shoe'},
  {id:195, name:'Tailored Canvas Sneaker', cat:'other', sub:'Footwear', price:235, old:0, sizes:['39', '40', '41', '42', '43', '44'], colors:['#FFFFFF', '#C9B79C', '#6B6A4A'], badge:'New', art:'shoe'},
  {id:196, name:'Cloud Low-Top Sneaker', cat:'other', sub:'Footwear', price:285, old:0, sizes:['39', '40', '41', '42', '43', '44'], colors:['#FFFFFF', '#242424', '#18283B', '#6B6A4A'], badge:'', art:'shoe'},
  {id:197, name:'Crisp Slip-On Sneaker', cat:'other', sub:'Footwear', price:215, old:0, sizes:['39', '40', '41', '42', '43', '44'], colors:['#FFFFFF', '#DED7CD', '#C9B79C'], badge:'', art:'shoe'},
  {id:198, name:'Cloud Court Trainer', cat:'other', sub:'Footwear', price:185, old:0, sizes:['39', '40', '41', '42', '43', '44'], colors:['#242424', '#DED7CD', '#C9B79C'], badge:'', art:'shoe'},
  {id:199, name:'Studio Low-Top Sneaker', cat:'other', sub:'Footwear', price:205, old:0, sizes:['39', '40', '41', '42', '43', '44'], colors:['#DED7CD', '#18283B', '#242424', '#C9B79C'], badge:'', art:'shoe'},
  {id:200, name:'Structured Low-Top Sneaker', cat:'other', sub:'Footwear', price:160, old:0, sizes:['39', '40', '41', '42', '43', '44'], colors:['#242424', '#DED7CD', '#6B6A4A', '#FFFFFF'], badge:'', art:'shoe'},
  {id:201, name:'Textured Leather Sneaker', cat:'other', sub:'Footwear', price:205, old:255, sizes:['39', '40', '41', '42', '43', '44'], colors:['#242424', '#DED7CD', '#18283B'], badge:'Sale', art:'shoe'},
  {id:202, name:'Slim-Fit Minimal Trainer', cat:'other', sub:'Footwear', price:175, old:0, sizes:['39', '40', '41', '42', '43', '44'], colors:['#C9B79C', '#DED7CD', '#FFFFFF'], badge:'', art:'shoe'},
  {id:203, name:'Heritage Low-Top Sneaker', cat:'other', sub:'Footwear', price:320, old:0, sizes:['39', '40', '41', '42', '43', '44'], colors:['#242424', '#18283B', '#C9B79C', '#6B6A4A'], badge:'', art:'shoe'},
  {id:204, name:'Heritage Court Trainer', cat:'other', sub:'Footwear', price:295, old:370, sizes:['39', '40', '41', '42', '43', '44'], colors:['#242424', '#FFFFFF', '#C9B79C'], badge:'Sale', art:'shoe'},
  {id:205, name:'Relaxed Slip-On Sneaker', cat:'other', sub:'Footwear', price:195, old:0, sizes:['39', '40', '41', '42', '43', '44'], colors:['#FFFFFF', '#242424', '#18283B', '#DED7CD'], badge:'New', art:'shoe'},
  {id:206, name:'Essential Runner', cat:'other', sub:'Footwear', price:220, old:275, sizes:['39', '40', '41', '42', '43', '44'], colors:['#C9B79C', '#18283B', '#DED7CD', '#FFFFFF'], badge:'Sale', art:'shoe'},
  {id:207, name:'Minimal Runner', cat:'other', sub:'Footwear', price:270, old:0, sizes:['39', '40', '41', '42', '43', '44'], colors:['#FFFFFF', '#242424', '#6B6A4A'], badge:'New', art:'shoe'},
  {id:208, name:'Urban Runner', cat:'other', sub:'Footwear', price:265, old:0, sizes:['39', '40', '41', '42', '43', '44'], colors:['#C9B79C', '#FFFFFF', '#6B6A4A'], badge:'', art:'shoe'},
  {id:209, name:'Heritage Runner', cat:'other', sub:'Footwear', price:200, old:250, sizes:['39', '40', '41', '42', '43', '44'], colors:['#FFFFFF', '#18283B', '#242424'], badge:'Sale', art:'shoe'},
  {id:210, name:'Brushed Slip-On Sneaker', cat:'other', sub:'Footwear', price:255, old:0, sizes:['39', '40', '41', '42', '43', '44'], colors:['#242424', '#6B6A4A', '#C9B79C'], badge:'', art:'shoe'},
  {id:211, name:'Resort Minimal Trainer', cat:'other', sub:'Footwear', price:280, old:0, sizes:['39', '40', '41', '42', '43', '44'], colors:['#6B6A4A', '#DED7CD', '#18283B'], badge:'', art:'shoe'},
  {id:212, name:'Fine-Gauge Slip-On Sneaker', cat:'other', sub:'Footwear', price:140, old:0, sizes:['39', '40', '41', '42', '43', '44'], colors:['#242424', '#FFFFFF', '#DED7CD'], badge:'', art:'shoe'},
  {id:213, name:'Pure Suede Sneaker', cat:'other', sub:'Footwear', price:300, old:0, sizes:['39', '40', '41', '42', '43', '44'], colors:['#DED7CD', '#FFFFFF', '#6B6A4A', '#18283B'], badge:'New', art:'shoe'},
  {id:214, name:'Maison Canvas Sneaker', cat:'other', sub:'Footwear', price:250, old:310, sizes:['39', '40', '41', '42', '43', '44'], colors:['#DED7CD', '#FFFFFF', '#C9B79C', '#18283B'], badge:'Sale', art:'shoe'},
  {id:215, name:'Lightweight Minimal Trainer', cat:'other', sub:'Footwear', price:130, old:0, sizes:['39', '40', '41', '42', '43', '44'], colors:['#6B6A4A', '#DED7CD', '#18283B', '#C9B79C'], badge:'', art:'shoe'},
  {id:216, name:'Structured Slip-On Sneaker', cat:'other', sub:'Footwear', price:305, old:0, sizes:['39', '40', '41', '42', '43', '44'], colors:['#DED7CD', '#6B6A4A', '#18283B', '#242424'], badge:'New', art:'shoe'},
  {id:217, name:'Garment-Dyed Canvas Sneaker', cat:'other', sub:'Footwear', price:160, old:0, sizes:['39', '40', '41', '42', '43', '44'], colors:['#18283B', '#242424', '#FFFFFF', '#C9B79C'], badge:'', art:'shoe'},
  {id:218, name:'Brushed Leather Sneaker', cat:'other', sub:'Footwear', price:275, old:0, sizes:['39', '40', '41', '42', '43', '44'], colors:['#C9B79C', '#6B6A4A', '#18283B', '#FFFFFF'], badge:'', art:'shoe'},
  {id:219, name:'Crisp Runner', cat:'other', sub:'Footwear', price:170, old:0, sizes:['39', '40', '41', '42', '43', '44'], colors:['#6B6A4A', '#FFFFFF', '#C9B79C'], badge:'', art:'shoe'},
  {id:220, name:'Studio Runner', cat:'other', sub:'Footwear', price:225, old:0, sizes:['39', '40', '41', '42', '43', '44'], colors:['#C9B79C', '#18283B', '#DED7CD', '#242424'], badge:'', art:'shoe'},
  {id:221, name:'Pure Leather Sneaker', cat:'other', sub:'Footwear', price:265, old:330, sizes:['39', '40', '41', '42', '43', '44'], colors:['#6B6A4A', '#DED7CD', '#18283B', '#FFFFFF'], badge:'Sale', art:'shoe'},
  {id:222, name:'Everyday Slip-On Sneaker', cat:'other', sub:'Footwear', price:280, old:0, sizes:['39', '40', '41', '42', '43', '44'], colors:['#DED7CD', '#FFFFFF', '#18283B', '#C9B79C'], badge:'', art:'shoe'},
  {id:223, name:'Slim-Fit Runner', cat:'other', sub:'Footwear', price:190, old:0, sizes:['39', '40', '41', '42', '43', '44'], colors:['#FFFFFF', '#6B6A4A', '#242424', '#DED7CD'], badge:'', art:'shoe'},
  {id:224, name:'Urban Suede Sneaker', cat:'other', sub:'Footwear', price:315, old:0, sizes:['39', '40', '41', '42', '43', '44'], colors:['#C9B79C', '#DED7CD', '#18283B', '#6B6A4A'], badge:'New', art:'shoe'},

  /* ---------- TIES (40) ---------- */
  {id:225, name:'Atelier Jacquard Tie', cat:'other', sub:'Ties', price:85, old:0, sizes:['One'], colors:['#242424', '#6D2E3A', '#A38655', '#18283B'], badge:'', art:'tie'},
  {id:226, name:'Pure Silk Tie', cat:'other', sub:'Ties', price:50, old:0, sizes:['One'], colors:['#6B6A4A', '#9DB4C8', '#6D2E3A', '#A38655'], badge:'', art:'tie'},
  {id:227, name:'Lightweight Linen Tie', cat:'other', sub:'Ties', price:95, old:0, sizes:['One'], colors:['#6B6A4A', '#A38655', '#18283B'], badge:'', art:'tie'},
  {id:228, name:'Noir Silk Tie', cat:'other', sub:'Ties', price:80, old:0, sizes:['One'], colors:['#6B6A4A', '#A38655', '#242424'], badge:'', art:'tie'},
  {id:229, name:'Relaxed Knit Tie', cat:'other', sub:'Ties', price:35, old:0, sizes:['One'], colors:['#242424', '#6D2E3A', '#A38655', '#9DB4C8'], badge:'New', art:'tie'},
  {id:230, name:'Textured Jacquard Tie', cat:'other', sub:'Ties', price:75, old:0, sizes:['One'], colors:['#6D2E3A', '#9DB4C8', '#18283B', '#6B6A4A'], badge:'', art:'tie'},
  {id:231, name:'Weekend Grenadine Tie', cat:'other', sub:'Ties', price:60, old:0, sizes:['One'], colors:['#18283B', '#6D2E3A', '#9DB4C8'], badge:'', art:'tie'},
  {id:232, name:'Studio Linen Tie', cat:'other', sub:'Ties', price:85, old:0, sizes:['One'], colors:['#18283B', '#A38655', '#6D2E3A'], badge:'', art:'tie'},
  {id:233, name:'Textured Linen Tie', cat:'other', sub:'Ties', price:65, old:0, sizes:['One'], colors:['#6D2E3A', '#A38655', '#9DB4C8', '#18283B'], badge:'New', art:'tie'},
  {id:234, name:'Relaxed Jacquard Tie', cat:'other', sub:'Ties', price:85, old:0, sizes:['One'], colors:['#A38655', '#18283B', '#6B6A4A'], badge:'', art:'tie'},
  {id:235, name:'Crisp Linen Tie', cat:'other', sub:'Ties', price:40, old:0, sizes:['One'], colors:['#18283B', '#6B6A4A', '#6D2E3A'], badge:'New', art:'tie'},
  {id:236, name:'Weekend Satin Tie', cat:'other', sub:'Ties', price:75, old:0, sizes:['One'], colors:['#9DB4C8', '#6B6A4A', '#6D2E3A', '#18283B'], badge:'', art:'tie'},
  {id:237, name:'Minimal Jacquard Tie', cat:'other', sub:'Ties', price:95, old:0, sizes:['One'], colors:['#6D2E3A', '#6B6A4A', '#242424'], badge:'', art:'tie'},
  {id:238, name:'Premium Jacquard Tie', cat:'other', sub:'Ties', price:85, old:0, sizes:['One'], colors:['#9DB4C8', '#A38655', '#6D2E3A', '#6B6A4A'], badge:'New', art:'tie'},
  {id:239, name:'Fine-Gauge Satin Tie', cat:'other', sub:'Ties', price:95, old:0, sizes:['One'], colors:['#6D2E3A', '#9DB4C8', '#6B6A4A'], badge:'New', art:'tie'},
  {id:240, name:'Signature Satin Tie', cat:'other', sub:'Ties', price:35, old:0, sizes:['One'], colors:['#9DB4C8', '#242424', '#6D2E3A'], badge:'', art:'tie'},
  {id:241, name:'Studio Wool Tie', cat:'other', sub:'Ties', price:75, old:0, sizes:['One'], colors:['#6D2E3A', '#6B6A4A', '#9DB4C8'], badge:'', art:'tie'},
  {id:242, name:'Minimal Linen Tie', cat:'other', sub:'Ties', price:80, old:0, sizes:['One'], colors:['#9DB4C8', '#6B6A4A', '#18283B', '#A38655'], badge:'New', art:'tie'},
  {id:243, name:'Crisp Silk Tie', cat:'other', sub:'Ties', price:90, old:0, sizes:['One'], colors:['#9DB4C8', '#A38655', '#18283B'], badge:'', art:'tie'},
  {id:244, name:'Premium Knit Tie', cat:'other', sub:'Ties', price:55, old:0, sizes:['One'], colors:['#6B6A4A', '#18283B', '#6D2E3A'], badge:'', art:'tie'},
  {id:245, name:'Weekend Knit Tie', cat:'other', sub:'Ties', price:65, old:0, sizes:['One'], colors:['#A38655', '#9DB4C8', '#18283B', '#6B6A4A'], badge:'New', art:'tie'},
  {id:246, name:'Pure Knit Tie', cat:'other', sub:'Ties', price:45, old:0, sizes:['One'], colors:['#A38655', '#242424', '#18283B'], badge:'', art:'tie'},
  {id:247, name:'Garment-Dyed Grenadine Tie', cat:'other', sub:'Ties', price:70, old:0, sizes:['One'], colors:['#242424', '#6D2E3A', '#A38655'], badge:'', art:'tie'},
  {id:248, name:'Premium Linen Tie', cat:'other', sub:'Ties', price:75, old:0, sizes:['One'], colors:['#242424', '#9DB4C8', '#6B6A4A'], badge:'', art:'tie'},
  {id:249, name:'Lightweight Jacquard Tie', cat:'other', sub:'Ties', price:65, old:0, sizes:['One'], colors:['#6D2E3A', '#18283B', '#242424', '#A38655'], badge:'New', art:'tie'},
  {id:250, name:'Studio Jacquard Tie', cat:'other', sub:'Ties', price:80, old:0, sizes:['One'], colors:['#9DB4C8', '#A38655', '#18283B'], badge:'', art:'tie'},
  {id:251, name:'Resort Wool Tie', cat:'other', sub:'Ties', price:85, old:0, sizes:['One'], colors:['#6B6A4A', '#18283B', '#A38655', '#9DB4C8'], badge:'New', art:'tie'},
  {id:252, name:'Relaxed Linen Tie', cat:'other', sub:'Ties', price:65, old:0, sizes:['One'], colors:['#9DB4C8', '#6D2E3A', '#6B6A4A', '#242424'], badge:'', art:'tie'},
  {id:253, name:'Tailored Linen Tie', cat:'other', sub:'Ties', price:90, old:0, sizes:['One'], colors:['#9DB4C8', '#6D2E3A', '#242424', '#18283B'], badge:'', art:'tie'},
  {id:254, name:'Structured Jacquard Tie', cat:'other', sub:'Ties', price:75, old:0, sizes:['One'], colors:['#18283B', '#6B6A4A', '#242424', '#9DB4C8'], badge:'', art:'tie'},
  {id:255, name:'Brushed Grenadine Tie', cat:'other', sub:'Ties', price:50, old:60, sizes:['One'], colors:['#18283B', '#6D2E3A', '#6B6A4A'], badge:'Sale', art:'tie'},
  {id:256, name:'Premium Grenadine Tie', cat:'other', sub:'Ties', price:50, old:0, sizes:['One'], colors:['#242424', '#6B6A4A', '#6D2E3A'], badge:'', art:'tie'},
  {id:257, name:'Signature Knit Tie', cat:'other', sub:'Ties', price:45, old:0, sizes:['One'], colors:['#A38655', '#242424', '#9DB4C8'], badge:'', art:'tie'},
  {id:258, name:'Pure Wool Tie', cat:'other', sub:'Ties', price:95, old:0, sizes:['One'], colors:['#A38655', '#6D2E3A', '#9DB4C8', '#18283B'], badge:'New', art:'tie'},
  {id:259, name:'Premium Wool Tie', cat:'other', sub:'Ties', price:80, old:0, sizes:['One'], colors:['#18283B', '#9DB4C8', '#A38655'], badge:'', art:'tie'},
  {id:260, name:'Crisp Knit Tie', cat:'other', sub:'Ties', price:95, old:120, sizes:['One'], colors:['#9DB4C8', '#6D2E3A', '#18283B'], badge:'Sale', art:'tie'},
  {id:261, name:'Refined Jacquard Tie', cat:'other', sub:'Ties', price:85, old:0, sizes:['One'], colors:['#18283B', '#6B6A4A', '#A38655', '#242424'], badge:'New', art:'tie'},
  {id:262, name:'Slim-Fit Jacquard Tie', cat:'other', sub:'Ties', price:70, old:90, sizes:['One'], colors:['#18283B', '#A38655', '#6D2E3A'], badge:'Sale', art:'tie'},
  {id:263, name:'Everyday Wool Tie', cat:'other', sub:'Ties', price:50, old:0, sizes:['One'], colors:['#6D2E3A', '#18283B', '#242424'], badge:'New', art:'tie'},
  {id:264, name:'Refined Satin Tie', cat:'other', sub:'Ties', price:40, old:50, sizes:['One'], colors:['#242424', '#9DB4C8', '#18283B'], badge:'Sale', art:'tie'},

  /* ---------- BELTS (40) ---------- */
  {id:265, name:'Urban Dress Belt', cat:'other', sub:'Belts', price:130, old:0, sizes:['85', '90', '95', '100', '105'], colors:['#C9B79C', '#A38655', '#242424'], badge:'', art:'belt'},
  {id:266, name:'Slim-Fit Casual Belt', cat:'other', sub:'Belts', price:80, old:0, sizes:['85', '90', '95', '100', '105'], colors:['#5B3A29', '#A38655', '#18283B'], badge:'', art:'belt'},
  {id:267, name:'Slim-Fit Woven Belt', cat:'other', sub:'Belts', price:120, old:0, sizes:['85', '90', '95', '100', '105'], colors:['#242424', '#A38655', '#5B3A29', '#18283B'], badge:'New', art:'belt'},
  {id:268, name:'Tailored Woven Belt', cat:'other', sub:'Belts', price:145, old:0, sizes:['85', '90', '95', '100', '105'], colors:['#18283B', '#5B3A29', '#A38655', '#C9B79C'], badge:'New', art:'belt'},
  {id:269, name:'Garment-Dyed Leather Belt', cat:'other', sub:'Belts', price:110, old:0, sizes:['85', '90', '95', '100', '105'], colors:['#A38655', '#18283B', '#5B3A29', '#C9B79C'], badge:'', art:'belt'},
  {id:270, name:'Crisp Leather Belt', cat:'other', sub:'Belts', price:155, old:0, sizes:['85', '90', '95', '100', '105'], colors:['#242424', '#5B3A29', '#A38655', '#18283B'], badge:'', art:'belt'},
  {id:271, name:'Essential Suede Belt', cat:'other', sub:'Belts', price:120, old:0, sizes:['85', '90', '95', '100', '105'], colors:['#A38655', '#242424', '#18283B'], badge:'', art:'belt'},
  {id:272, name:'Urban Casual Belt', cat:'other', sub:'Belts', price:90, old:0, sizes:['85', '90', '95', '100', '105'], colors:['#C9B79C', '#18283B', '#242424', '#5B3A29'], badge:'', art:'belt'},
  {id:273, name:'Everyday Grain Belt', cat:'other', sub:'Belts', price:105, old:0, sizes:['85', '90', '95', '100', '105'], colors:['#C9B79C', '#A38655', '#18283B', '#242424'], badge:'', art:'belt'},
  {id:274, name:'Maison Dress Belt', cat:'other', sub:'Belts', price:90, old:0, sizes:['85', '90', '95', '100', '105'], colors:['#242424', '#A38655', '#5B3A29'], badge:'', art:'belt'},
  {id:275, name:'Everyday Braided Belt', cat:'other', sub:'Belts', price:130, old:0, sizes:['85', '90', '95', '100', '105'], colors:['#5B3A29', '#242424', '#A38655', '#18283B'], badge:'', art:'belt'},
  {id:276, name:'Tailored Suede Belt', cat:'other', sub:'Belts', price:150, old:0, sizes:['85', '90', '95', '100', '105'], colors:['#242424', '#A38655', '#C9B79C', '#18283B'], badge:'', art:'belt'},
  {id:277, name:'Studio Reversible Belt', cat:'other', sub:'Belts', price:145, old:0, sizes:['85', '90', '95', '100', '105'], colors:['#18283B', '#C9B79C', '#A38655'], badge:'', art:'belt'},
  {id:278, name:'Atelier Suede Belt', cat:'other', sub:'Belts', price:100, old:0, sizes:['85', '90', '95', '100', '105'], colors:['#A38655', '#C9B79C', '#242424', '#18283B'], badge:'', art:'belt'},
  {id:279, name:'Washed Braided Belt', cat:'other', sub:'Belts', price:125, old:0, sizes:['85', '90', '95', '100', '105'], colors:['#A38655', '#5B3A29', '#242424', '#18283B'], badge:'', art:'belt'},
  {id:280, name:'Heritage Grain Belt', cat:'other', sub:'Belts', price:140, old:175, sizes:['85', '90', '95', '100', '105'], colors:['#242424', '#C9B79C', '#A38655', '#18283B'], badge:'Sale', art:'belt'},
  {id:281, name:'Brushed Dress Belt', cat:'other', sub:'Belts', price:130, old:0, sizes:['85', '90', '95', '100', '105'], colors:['#C9B79C', '#A38655', '#18283B'], badge:'', art:'belt'},
  {id:282, name:'Resort Woven Belt', cat:'other', sub:'Belts', price:155, old:0, sizes:['85', '90', '95', '100', '105'], colors:['#5B3A29', '#C9B79C', '#A38655'], badge:'', art:'belt'},
  {id:283, name:'Garment-Dyed Reversible Belt', cat:'other', sub:'Belts', price:150, old:0, sizes:['85', '90', '95', '100', '105'], colors:['#A38655', '#242424', '#C9B79C'], badge:'New', art:'belt'},
  {id:284, name:'Modern Casual Belt', cat:'other', sub:'Belts', price:160, old:0, sizes:['85', '90', '95', '100', '105'], colors:['#A38655', '#5B3A29', '#C9B79C', '#18283B'], badge:'', art:'belt'},
  {id:285, name:'Lightweight Reversible Belt', cat:'other', sub:'Belts', price:135, old:0, sizes:['85', '90', '95', '100', '105'], colors:['#C9B79C', '#A38655', '#18283B'], badge:'', art:'belt'},
  {id:286, name:'Signature Reversible Belt', cat:'other', sub:'Belts', price:80, old:0, sizes:['85', '90', '95', '100', '105'], colors:['#242424', '#A38655', '#18283B', '#C9B79C'], badge:'', art:'belt'},
  {id:287, name:'Cloud Reversible Belt', cat:'other', sub:'Belts', price:100, old:125, sizes:['85', '90', '95', '100', '105'], colors:['#242424', '#A38655', '#C9B79C'], badge:'Sale', art:'belt'},
  {id:288, name:'Everyday Woven Belt', cat:'other', sub:'Belts', price:55, old:0, sizes:['85', '90', '95', '100', '105'], colors:['#18283B', '#A38655', '#C9B79C'], badge:'', art:'belt'},
  {id:289, name:'Noir Leather Belt', cat:'other', sub:'Belts', price:60, old:0, sizes:['85', '90', '95', '100', '105'], colors:['#242424', '#18283B', '#C9B79C'], badge:'', art:'belt'},
  {id:290, name:'Classic Casual Belt', cat:'other', sub:'Belts', price:115, old:0, sizes:['85', '90', '95', '100', '105'], colors:['#A38655', '#5B3A29', '#242424', '#C9B79C'], badge:'New', art:'belt'},
  {id:291, name:'Studio Leather Belt', cat:'other', sub:'Belts', price:90, old:0, sizes:['85', '90', '95', '100', '105'], colors:['#5B3A29', '#C9B79C', '#242424'], badge:'', art:'belt'},
  {id:292, name:'Atelier Braided Belt', cat:'other', sub:'Belts', price:160, old:0, sizes:['85', '90', '95', '100', '105'], colors:['#A38655', '#242424', '#C9B79C', '#5B3A29'], badge:'', art:'belt'},
  {id:293, name:'Noir Reversible Belt', cat:'other', sub:'Belts', price:145, old:180, sizes:['85', '90', '95', '100', '105'], colors:['#18283B', '#C9B79C', '#A38655'], badge:'Sale', art:'belt'},
  {id:294, name:'Atelier Dress Belt', cat:'other', sub:'Belts', price:130, old:0, sizes:['85', '90', '95', '100', '105'], colors:['#A38655', '#C9B79C', '#18283B'], badge:'', art:'belt'},
  {id:295, name:'Soft-Touch Grain Belt', cat:'other', sub:'Belts', price:85, old:105, sizes:['85', '90', '95', '100', '105'], colors:['#C9B79C', '#5B3A29', '#18283B', '#A38655'], badge:'Sale', art:'belt'},
  {id:296, name:'Crisp Braided Belt', cat:'other', sub:'Belts', price:140, old:0, sizes:['85', '90', '95', '100', '105'], colors:['#5B3A29', '#A38655', '#18283B', '#242424'], badge:'', art:'belt'},
  {id:297, name:'Weekend Reversible Belt', cat:'other', sub:'Belts', price:70, old:0, sizes:['85', '90', '95', '100', '105'], colors:['#5B3A29', '#242424', '#A38655', '#18283B'], badge:'', art:'belt'},
  {id:298, name:'Maison Suede Belt', cat:'other', sub:'Belts', price:110, old:0, sizes:['85', '90', '95', '100', '105'], colors:['#A38655', '#5B3A29', '#C9B79C'], badge:'', art:'belt'},
  {id:299, name:'Weekend Suede Belt', cat:'other', sub:'Belts', price:150, old:0, sizes:['85', '90', '95', '100', '105'], colors:['#242424', '#C9B79C', '#18283B', '#5B3A29'], badge:'', art:'belt'},
  {id:300, name:'Brushed Grain Belt', cat:'other', sub:'Belts', price:80, old:0, sizes:['85', '90', '95', '100', '105'], colors:['#C9B79C', '#A38655', '#18283B', '#242424'], badge:'', art:'belt'},
  {id:301, name:'Signature Woven Belt', cat:'other', sub:'Belts', price:125, old:0, sizes:['85', '90', '95', '100', '105'], colors:['#A38655', '#242424', '#18283B', '#C9B79C'], badge:'', art:'belt'},
  {id:302, name:'Soft-Touch Braided Belt', cat:'other', sub:'Belts', price:145, old:0, sizes:['85', '90', '95', '100', '105'], colors:['#18283B', '#242424', '#5B3A29'], badge:'', art:'belt'},
  {id:303, name:'Everyday Casual Belt', cat:'other', sub:'Belts', price:70, old:0, sizes:['85', '90', '95', '100', '105'], colors:['#18283B', '#C9B79C', '#242424', '#5B3A29'], badge:'', art:'belt'},
  {id:304, name:'Premium Reversible Belt', cat:'other', sub:'Belts', price:155, old:0, sizes:['85', '90', '95', '100', '105'], colors:['#242424', '#A38655', '#18283B'], badge:'', art:'belt'},

  /* ---------- OTHER ACCESSORIES (40): wallets, sunglasses, watches, scarves ---------- */
  {id:305, name:'Pure Zip Wallet', cat:'other', sub:'Accessories', price:220, old:0, sizes:['One'], colors:['#242424', '#A38655', '#18283B'], badge:'', art:'wallet'},
  {id:306, name:'Premium Slim Wallet', cat:'other', sub:'Accessories', price:105, old:130, sizes:['One'], colors:['#A38655', '#5B3A29', '#18283B', '#242424'], badge:'Sale', art:'wallet'},
  {id:307, name:'Maison Leather Wallet', cat:'other', sub:'Accessories', price:205, old:0, sizes:['One'], colors:['#5B3A29', '#242424', '#A38655', '#18283B'], badge:'', art:'wallet'},
  {id:308, name:'Resort Slim Wallet', cat:'other', sub:'Accessories', price:90, old:110, sizes:['One'], colors:['#18283B', '#5B3A29', '#A38655'], badge:'Sale', art:'wallet'},
  {id:309, name:'Signature Bifold Wallet', cat:'other', sub:'Accessories', price:135, old:0, sizes:['One'], colors:['#242424', '#18283B', '#A38655'], badge:'', art:'wallet'},
  {id:310, name:'Fine-Gauge Bifold Wallet', cat:'other', sub:'Accessories', price:115, old:0, sizes:['One'], colors:['#242424', '#18283B', '#5B3A29', '#A38655'], badge:'', art:'wallet'},
  {id:311, name:'Urban Slim Wallet', cat:'other', sub:'Accessories', price:145, old:0, sizes:['One'], colors:['#A38655', '#5B3A29', '#242424', '#18283B'], badge:'', art:'wallet'},
  {id:312, name:'Pure Card Holder', cat:'other', sub:'Accessories', price:175, old:220, sizes:['One'], colors:['#5B3A29', '#A38655', '#18283B', '#242424'], badge:'Sale', art:'wallet'},
  {id:313, name:'Lightweight Bifold Wallet', cat:'other', sub:'Accessories', price:150, old:0, sizes:['One'], colors:['#18283B', '#A38655', '#242424'], badge:'', art:'wallet'},
  {id:314, name:'Structured Slim Wallet', cat:'other', sub:'Accessories', price:165, old:0, sizes:['One'], colors:['#A38655', '#242424', '#18283B', '#5B3A29'], badge:'New', art:'wallet'},
  {id:315, name:'Minimal Round Sunglasses', cat:'other', sub:'Accessories', price:155, old:0, sizes:['One'], colors:['#242424', '#18283B', '#5B3A29'], badge:'', art:'shades'},
  {id:316, name:'Slim-Fit Square Sunglasses', cat:'other', sub:'Accessories', price:95, old:0, sizes:['One'], colors:['#A38655', '#5B3A29', '#242424'], badge:'New', art:'shades'},
  {id:317, name:'Everyday Classic Sunglasses', cat:'other', sub:'Accessories', price:125, old:0, sizes:['One'], colors:['#A38655', '#5B3A29', '#242424', '#18283B'], badge:'', art:'shades'},
  {id:318, name:'Everyday Square Sunglasses', cat:'other', sub:'Accessories', price:155, old:0, sizes:['One'], colors:['#A38655', '#5B3A29', '#242424'], badge:'', art:'shades'},
  {id:319, name:'Weekend Classic Sunglasses', cat:'other', sub:'Accessories', price:145, old:0, sizes:['One'], colors:['#18283B', '#5B3A29', '#242424'], badge:'', art:'shades'},
  {id:320, name:'Weekend Square Sunglasses', cat:'other', sub:'Accessories', price:255, old:0, sizes:['One'], colors:['#242424', '#18283B', '#A38655', '#5B3A29'], badge:'', art:'shades'},
  {id:321, name:'Urban Round Sunglasses', cat:'other', sub:'Accessories', price:185, old:0, sizes:['One'], colors:['#18283B', '#5B3A29', '#A38655'], badge:'New', art:'shades'},
  {id:322, name:'Tailored Aviator Sunglasses', cat:'other', sub:'Accessories', price:120, old:150, sizes:['One'], colors:['#242424', '#5B3A29', '#18283B', '#A38655'], badge:'Sale', art:'shades'},
  {id:323, name:'Cloud Aviator Sunglasses', cat:'other', sub:'Accessories', price:210, old:0, sizes:['One'], colors:['#18283B', '#5B3A29', '#242424'], badge:'', art:'shades'},
  {id:324, name:'Noir Aviator Sunglasses', cat:'other', sub:'Accessories', price:120, old:0, sizes:['One'], colors:['#A38655', '#5B3A29', '#18283B', '#242424'], badge:'New', art:'shades'},
  {id:325, name:'Crisp Leather-Strap Watch', cat:'other', sub:'Accessories', price:230, old:0, sizes:['One'], colors:['#5B3A29', '#18283B', '#A38655'], badge:'New', art:'watch'},
  {id:326, name:'Maison Leather-Strap Watch', cat:'other', sub:'Accessories', price:460, old:0, sizes:['One'], colors:['#5B3A29', '#A38655', '#242424', '#18283B'], badge:'', art:'watch'},
  {id:327, name:'Premium Dress Watch', cat:'other', sub:'Accessories', price:290, old:0, sizes:['One'], colors:['#5B3A29', '#18283B', '#242424'], badge:'', art:'watch'},
  {id:328, name:'Lightweight Classic Watch', cat:'other', sub:'Accessories', price:445, old:0, sizes:['One'], colors:['#5B3A29', '#242424', '#A38655'], badge:'', art:'watch'},
  {id:329, name:'Essential Classic Watch', cat:'other', sub:'Accessories', price:235, old:295, sizes:['One'], colors:['#A38655', '#5B3A29', '#242424', '#18283B'], badge:'Sale', art:'watch'},
  {id:330, name:'Structured Classic Watch', cat:'other', sub:'Accessories', price:285, old:0, sizes:['One'], colors:['#242424', '#A38655', '#5B3A29', '#18283B'], badge:'', art:'watch'},
  {id:331, name:'Minimal Dress Watch', cat:'other', sub:'Accessories', price:160, old:0, sizes:['One'], colors:['#18283B', '#242424', '#A38655'], badge:'', art:'watch'},
  {id:332, name:'Pure Dress Watch', cat:'other', sub:'Accessories', price:365, old:455, sizes:['One'], colors:['#18283B', '#A38655', '#242424', '#5B3A29'], badge:'Sale', art:'watch'},
  {id:333, name:'Urban Minimal Watch', cat:'other', sub:'Accessories', price:275, old:0, sizes:['One'], colors:['#5B3A29', '#A38655', '#242424', '#18283B'], badge:'', art:'watch'},
  {id:334, name:'Everyday Minimal Watch', cat:'other', sub:'Accessories', price:440, old:0, sizes:['One'], colors:['#5B3A29', '#A38655', '#18283B', '#242424'], badge:'', art:'watch'},
  {id:335, name:'Slim-Fit Silk Scarf', cat:'other', sub:'Accessories', price:155, old:0, sizes:['One'], colors:['#18283B', '#A38655', '#6D2E3A', '#DED7CD'], badge:'', art:'scarf'},
  {id:336, name:'Lightweight Silk Scarf', cat:'other', sub:'Accessories', price:80, old:0, sizes:['One'], colors:['#9CA68A', '#A38655', '#18283B'], badge:'New', art:'scarf'},
  {id:337, name:'Fine-Gauge Wool Scarf', cat:'other', sub:'Accessories', price:95, old:120, sizes:['One'], colors:['#18283B', '#6D2E3A', '#A38655', '#9CA68A'], badge:'Sale', art:'scarf'},
  {id:338, name:'Essential Knit Scarf', cat:'other', sub:'Accessories', price:135, old:0, sizes:['One'], colors:['#DED7CD', '#6D2E3A', '#9CA68A'], badge:'', art:'scarf'},
  {id:339, name:'Modern Knit Scarf', cat:'other', sub:'Accessories', price:95, old:0, sizes:['One'], colors:['#18283B', '#A38655', '#DED7CD'], badge:'', art:'scarf'},
  {id:340, name:'Garment-Dyed Wool Scarf', cat:'other', sub:'Accessories', price:70, old:90, sizes:['One'], colors:['#DED7CD', '#6D2E3A', '#9CA68A'], badge:'Sale', art:'scarf'},
  {id:341, name:'Minimal Wool Scarf', cat:'other', sub:'Accessories', price:160, old:0, sizes:['One'], colors:['#6D2E3A', '#9CA68A', '#A38655'], badge:'', art:'scarf'},
  {id:342, name:'Studio Silk Scarf', cat:'other', sub:'Accessories', price:60, old:0, sizes:['One'], colors:['#A38655', '#6D2E3A', '#9CA68A'], badge:'New', art:'scarf'},
  {id:343, name:'Lightweight Knit Scarf', cat:'other', sub:'Accessories', price:155, old:0, sizes:['One'], colors:['#9CA68A', '#18283B', '#6D2E3A', '#A38655'], badge:'New', art:'scarf'},
  {id:344, name:'Heritage Cashmere Scarf', cat:'other', sub:'Accessories', price:65, old:0, sizes:['One'], colors:['#DED7CD', '#18283B', '#A38655'], badge:'New', art:'scarf'},
];

const CATEGORIES = [
  {key:'men', name:'Men', desc:'Modern tailoring', img:img('photo-1516257984-b1b4d707412e',1200), wide:true},
  {key:'women', name:'Women', desc:'Elevated essentials', img:img('photo-1483985988355-763728e1935b',900)},
  {key:'jeans', name:'Jeans', desc:'Premium denim', img:img('photo-1542272604-787c3835535d',900)},
  {key:'kids', name:'Kids', desc:'Soft & playful', img:img('photo-1519238263530-99bdd11df2ea',900)},
  {key:'other', name:'New Arrivals', desc:'Latest drops', img:img('photo-1483985988355-763728e1935b',900)},
  {key:'other', name:'Accessories', desc:'Finishing touches', img:img('photo-1584917865442-de89df76afd3',900)}
];

/* ============================================================
   COLOUR VARIANTS (used by the Quick View thumbnails)
   Every product gets 3-4 colour variants -> product.variants
   To use your REAL colour photos, fill VARIANT_IMAGES below:
     VARIANT_IMAGES[productId] = { '#18283B': 'photo-xxxx', '#A38655': 'photo-yyyy' }
   (Unsplash photo id, or a local path such as 'assets/img/coat-brass.jpg')
   Colours without an entry use placeholder pictures.
   ============================================================ */
const COLOR_NAMES = {'#18283B':'Indigo','#242424':'Charcoal','#A38655':'Brass','#DED7CD':'Stone','#FFFFFF':'White','#6B6A4A':'Olive','#6D2E3A':'Wine','#9CA68A':'Sage','#9DB4C8':'Sky','#C9B79C':'Sand','#5B3A29':'Brown'};
const VARIANT_IMAGES = {
  // 1: {'#18283B':'photo-1591047139829-d91aecb6caea', '#242424':'photo-1593032465175-481ac7f401a0'},
};

/* ============================================================
   PRODUCT ART (colour-true illustrations)
   Products with  art:'shirt'  get their pictures drawn automatically
   in each colour, so colour thumbnails show the REAL colour.
   art types: shirt, polo, pants, trousers, shoe, tie, belt, wallet, shades, watch, scarf
   To use a real photo instead: add img:'assets/img/x.jpg', alt:'...' and delete art:'...'
   ============================================================ */
function shadeHex(hex,amt){
  const n=parseInt(hex.slice(1),16); let r=n>>16,g=(n>>8)&255,b=n&255;
  const t=amt<0?0:255,k=Math.abs(amt);
  r=Math.round((t-r)*k+r); g=Math.round((t-g)*k+g); b=Math.round((t-b)*k+b);
  return '#'+((1<<24)+(r<<16)+(g<<8)+b).toString(16).slice(1);
}
function hexLum(hex){const n=parseInt(hex.slice(1),16);return (0.299*(n>>16)+0.587*((n>>8)&255)+0.114*(n&255))/255;}
const ART_SHAPES = {
  shirt:(c,seed)=>`<path d="M100 78 L56 100 L30 250 L58 258 L88 150 L88 335 Q150 348 212 335 L212 150 L242 258 L270 250 L244 100 L200 78 Q150 108 100 78Z" ${c.F} ${c.S}/>
    ${seed%3===1?[...Array(9)].map((_,i)=>`<path d="M${100+i*13} 125 V338" stroke="${c.light}" stroke-width="1.6" opacity=".45"/>`).join(''):''}
    <path d="M102 74 L150 104 L136 132 L96 92Z M198 74 L150 104 L164 132 L204 92Z" fill="${c.light}" ${c.S}/>
    <path d="M150 104 V338" stroke="${c.stroke}" stroke-width="1.4"/>
    ${[150,190,230,270,310].map(y=>`<circle cx="150" cy="${y}" r="3" fill="${c.stroke}" opacity=".7"/>`).join('')}
    <path d="M30 250 L58 258 M270 250 L242 258" stroke="${c.stroke}" stroke-width="3"/>
    <path d="M174 168 h28 v32 h-28z" fill="none" ${c.S}/>`,
  polo:(c,seed)=>`<path d="M105 72 L60 100 L36 170 L74 188 L90 150 L90 335 Q150 348 210 335 L210 150 L226 188 L264 170 L240 100 L195 72 Q150 100 105 72Z" ${c.F} ${c.S}/>
    ${seed%3===2?[...Array(8)].map((_,i)=>`<path d="M92 ${150+i*22} H208" stroke="${c.light}" stroke-width="7" opacity=".5"/>`).join(''):''}
    <path d="M105 72 L148 96 L138 124 L98 92Z M195 72 L152 96 L162 124 L202 92Z" fill="${c.light}" ${c.S}/>
    <path d="M150 96 V172" stroke="${c.stroke}" stroke-width="1.4"/>
    ${[118,138,158].map(y=>`<circle cx="150" cy="${y}" r="3" fill="${c.stroke}" opacity=".75"/>`).join('')}
    <path d="M36 170 L74 188 M264 170 L226 188" stroke="${c.stroke}" stroke-width="4"/>`,
  pants:(c)=>`<path d="M92 56 L208 56 L222 150 L234 350 L170 350 L150 178 L130 350 L66 350 L78 150Z" ${c.F} ${c.S}/>
    <path d="M92 56 H208 V82 H92Z" fill="${c.dark}" ${c.S}/>
    <path d="M150 82 V178" stroke="${c.stroke}" stroke-width="1.4"/>
    <path d="M143 82 q-7 26 -3 42 M157 82 q7 26 3 42" fill="none" stroke="${c.light}" stroke-width="2.4" stroke-linecap="round"/>
    <path d="M96 92 Q110 122 98 152 M204 92 Q190 122 202 152" fill="none" stroke="${c.stroke}" stroke-width="1.4"/>
    <rect x="84" y="222" width="34" height="42" rx="3" fill="none" ${c.S}/><rect x="182" y="222" width="34" height="42" rx="3" fill="none" ${c.S}/>
    <path d="M67 330 H131 M169 330 H233" stroke="${c.stroke}" stroke-width="3.2"/>`,
  trousers:(c)=>`<path d="M92 56 L208 56 L220 150 L214 350 L164 350 L150 178 L136 350 L86 350 L80 150Z" ${c.F} ${c.S}/>
    <path d="M92 56 H208 V78 H92Z" fill="${c.dark}" ${c.S}/>
    ${[102,138,158,194].map(x=>`<rect x="${x}" y="54" width="6" height="26" rx="1.5" fill="${c.light}" ${c.S}/>`).join('')}
    <path d="M150 78 V176" stroke="${c.stroke}" stroke-width="1.4"/><circle cx="150" cy="89" r="3.6" fill="${c.stroke}"/>
    <path d="M114 120 L108 350 M186 120 L192 350" stroke="${c.light}" stroke-width="1.8" opacity=".6"/>
    <path d="M94 96 Q106 108 108 134 M206 96 Q194 108 192 134" fill="none" stroke="${c.stroke}" stroke-width="1.4"/>`,
  shoe:(c)=>`<path d="M52 288 L50 200 Q52 186 72 186 L104 192 Q118 206 128 190 L140 172 Q152 166 160 176 L196 222 Q214 232 240 238 Q282 246 284 270 L284 288Z" ${c.F} ${c.S}/>
    <path d="M72 186 Q96 214 128 190" fill="none" ${c.S}/>
    <path d="M140 172 Q150 190 168 188 L196 222" fill="${c.light}" opacity=".55" stroke="${c.stroke}" stroke-width="1.2"/>
    ${[0,1,2,3].map(i=>`<path d="M${146+i*13} ${186+i*11} l18 -8" stroke="#fff" stroke-width="3.4" stroke-linecap="round"/>`).join('')}
    <path d="M226 236 Q250 252 252 286" fill="none" ${c.S}/>
    <path d="M52 232 Q72 246 76 288" fill="none" ${c.S}/>
    <path d="M90 266 Q150 236 214 262" fill="none" stroke="${c.dark}" stroke-width="4" stroke-linecap="round"/>
    <rect x="42" y="284" width="248" height="30" rx="15" fill="#F6F2EA" ${c.S}/>
    <path d="M58 299 H274" stroke="${c.stroke}" stroke-width="1" stroke-dasharray="3 4" opacity=".55"/>`,
  tie:(c,seed)=>`<clipPath id="tc"><path d="M132 92 L168 92 L196 300 L150 352 L104 300Z"/></clipPath>
    <path d="M126 46 L174 46 L168 92 L132 92Z" ${c.F} ${c.S}/>
    <path d="M132 92 L168 92 L196 300 L150 352 L104 300Z" ${c.F} ${c.S}/>
    <g clip-path="url(#tc)">${seed%3===1?[...Array(10)].map((_,i)=>`<path d="M90 ${120+i*26} L210 ${90+i*26}" stroke="${c.light}" stroke-width="7" opacity=".55"/>`).join(''):seed%3===2?[...Array(5)].flatMap((_,r)=>[...Array(4)].map((_,k)=>`<circle cx="${124+k*20+(r%2)*10}" cy="${120+r*42}" r="3.4" fill="${c.light}" opacity=".7"/>`)).join(''):''}</g>
    <path d="M140 50 L136 90 M160 50 L164 90" stroke="${c.stroke}" stroke-width="1.2" opacity=".6"/>`,
  belt:(c)=>`<rect x="30" y="186" width="244" height="30" rx="5" ${c.F} ${c.S}/>
    <path d="M36 192 H268 M36 210 H268" stroke="${c.light}" stroke-width="1.2" stroke-dasharray="5 4" fill="none"/>
    ${[190,210,230,250].map(x=>`<circle cx="${x}" cy="201" r="3.2" fill="${c.dark}"/>`).join('')}
    <rect x="132" y="182" width="12" height="38" rx="3" fill="${c.dark}" ${c.S}/>
    <rect x="46" y="170" width="62" height="62" rx="9" fill="none" stroke="#A38655" stroke-width="7"/>
    <path d="M78 201 H126" stroke="#A38655" stroke-width="5" stroke-linecap="round"/>`,
  wallet:(c)=>`<rect x="56" y="140" width="188" height="130" rx="14" ${c.F} ${c.S}/>
    <path d="M56 180 Q150 218 244 180 V154 Q244 140 230 140 H70 Q56 140 56 154Z" fill="${c.dark}" opacity=".55"/>
    <rect x="66" y="150" width="168" height="110" rx="9" fill="none" stroke="${c.light}" stroke-width="1.4" stroke-dasharray="4 4"/>
    <circle cx="150" cy="206" r="9" fill="#A38655" ${c.S}/>`,
  shades:(c)=>`<ellipse cx="100" cy="205" rx="52" ry="40" fill="#2B3138" stroke="${c.hex}" stroke-width="9"/>
    <ellipse cx="200" cy="205" rx="52" ry="40" fill="#2B3138" stroke="${c.hex}" stroke-width="9"/>
    <path d="M144 198 Q150 186 156 198" fill="none" stroke="${c.hex}" stroke-width="8" stroke-linecap="round"/>
    <path d="M50 196 L24 178 M250 196 L276 178" stroke="${c.hex}" stroke-width="8" stroke-linecap="round"/>
    <path d="M72 190 Q86 180 102 186 M172 190 Q186 180 202 186" fill="none" stroke="#fff" stroke-width="4" opacity=".35" stroke-linecap="round"/>`,
  watch:(c)=>`<path d="M118 28 H182 L190 140 H110Z" ${c.F} ${c.S}/><path d="M110 260 H190 L182 372 H118Z" ${c.F} ${c.S}/>
    ${[290,308,326].map(y=>`<circle cx="150" cy="${y}" r="3" fill="${c.dark}"/>`).join('')}
    <circle cx="150" cy="200" r="68" fill="#A38655" ${c.S}/><circle cx="150" cy="200" r="55" fill="#F6F2EA" ${c.S}/>
    ${[...Array(12)].map((_,i)=>{const a=i*Math.PI/6;return `<path d="M${150+Math.sin(a)*46} ${200-Math.cos(a)*46} L${150+Math.sin(a)*52} ${200-Math.cos(a)*52}" stroke="#242424" stroke-width="2"/>`}).join('')}
    <path d="M150 200 V164 M150 200 L174 214" stroke="#242424" stroke-width="3.4" stroke-linecap="round"/><circle cx="150" cy="200" r="4" fill="#A38655"/>`,
  scarf:(c,seed)=>`<path d="M98 36 Q150 26 202 36 L206 338 Q150 350 94 338Z" ${c.F} ${c.S}/>
    ${[...Array(5)].map((_,i)=>`<path d="M96 ${70+i*52} Q150 ${62+i*52} 204 ${70+i*52}" fill="none" stroke="${c.light}" stroke-width="${seed%2?6:2.4}" opacity=".6"/>`).join('')}
    ${[...Array(13)].map((_,i)=>`<path d="M${100+i*8.4} 342 v26" stroke="${c.stroke}" stroke-width="2" opacity=".8"/>`).join('')}`
};
function art(type,hex,seed){
  const c={hex, dark:shadeHex(hex,-.28), light:shadeHex(hex,.2), stroke:shadeHex(hex,-.5)};
  c.F='fill="url(#g)"'; c.S=`stroke="${c.stroke}" stroke-width="1.6" stroke-linejoin="round"`;
  const bg=hexLum(hex)>.78?'#C9BFAE':'#F0EBE1';
  const fn=ART_SHAPES[type]||ART_SHAPES.shirt;
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400"><defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="${c.light}"/><stop offset="1" stop-color="${hex}"/></linearGradient><radialGradient id="b" cx=".5" cy=".42" r=".75"><stop offset="0" stop-color="#fff" stop-opacity=".6"/><stop offset="1" stop-color="${bg}" stop-opacity="0"/></radialGradient></defs><rect width="300" height="400" fill="${bg}"/><rect width="300" height="400" fill="url(#b)"/><ellipse cx="150" cy="376" rx="96" ry="8" fill="#000" opacity=".13"/>${fn(c,seed||0)}</svg>`;
  return 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);
}

const resolveImg = v => /^(https?:|assets\/|\.\/|\/)/.test(v) ? v : img(v);
(function buildVariants(){
  const PAD = ['#DED7CD','#A38655','#18283B','#242424','#FFFFFF'];
  PRODUCTS.forEach(p=>{
    PAD.forEach(c=>{ if(p.colors.length<3 && !p.colors.includes(c)) p.colors.push(c); });
    p.colors = p.colors.slice(0,4);
    const own = VARIANT_IMAGES[p.id] || {};
    const pool = [p.img, p.alt, ...PRODUCTS.filter(o=>o.id!==p.id && o.cat===p.cat).map(o=>o.img)];
    if(p.art && !p.img){p.img=art(p.art,p.colors[0],p.id);p.alt=art(p.art,p.colors[1]||p.colors[0],p.id);}
    p.variants = p.colors.map((hex,i)=>({
      hex, name: COLOR_NAMES[hex] || hex,
      img: own[hex] ? resolveImg(own[hex]) : (p.art ? art(p.art,hex,p.id) : pool[i % pool.length])
    }));
  });
})();
