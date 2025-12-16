// Main interactions for homepage
(function() {
  // Image fallback placeholder
  const placeholder = (w, h, text) => `https://placehold.co/${w}x${h}?text=${encodeURIComponent(text || 'Image')}`;
  function applyImgFallback() {
    const imgs = document.querySelectorAll('img');
    imgs.forEach(img => {
      const width = img.naturalWidth || img.getAttribute('width') || 400;
      const height = img.naturalHeight || img.getAttribute('height') || 300;
      const label = img.alt || 'Image';
      img.addEventListener('error', () => {
        if (!img.dataset.fallbackApplied) {
          img.src = placeholder(width, height, label);
          img.dataset.fallbackApplied = 'true';
        }
      }, { once: true });
    });
  }

  const header = document.getElementById('siteHeader');
  const nav = document.getElementById('primaryNav');
  const hamburger = document.getElementById('hamburger');

  // Sticky header on scroll
  const onScroll = () => {
    if (window.scrollY > 10) header.classList.add('stuck');
    else header.classList.remove('stuck');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu toggle
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', String(open));
    });
  }

  // Bestsellers data
  const products = {
    rings: [
      { title: 'Aurora Halo Ring', img: '/assets/images/The Aurora Halo blends the sleek, graceful arches….jpeg', price: '₹7,999', mrp: '₹9,999' },
      { title: 'Solstice Diamond Band', img: '/assets/images/videoframe_22034.png', price: '₹6,499', mrp: '₹8,299' },
      { title: 'Luna Twist Ring', img: '/assets/images/assets/images/11.jpeg', price: '₹5,299', mrp: '₹6,499' },
      { title: 'Opal Whisper Ring', img: '/assets/images/CARD MESSAGE_ “You can\'t be perfect, but you can….jpeg', price: '₹4,999', mrp: '₹5,999' }
    ],
    earrings: [
      { title: 'Celeste Drops', img: '/assets/images/best_earrings1.jpg', price: '₹4,499', mrp: '₹5,999' },
      { title: 'Nova Studs', img: '/assets/images/best_earrings2.jpg', price: '₹3,999', mrp: '₹5,299' },
      { title: 'Stellar Hoops', img: '/assets/images/collection_earrings.jpg', price: '₹4,299', mrp: '₹5,499' },
      { title: 'Velvet Pearl', img: '/assets/images/new_arrivals2.jpg', price: '₹5,199', mrp: '₹6,499' }
    ],
    pendants: [
      { title: 'Auric Heart', img: '/assets/images/best_pendants1.jpg', price: '₹5,999', mrp: '₹7,499' },
      { title: 'Sol Locket', img: '/assets/images/collection_pendants.jpg', price: '₹4,299', mrp: '₹5,499' },
      { title: 'Moonbeam Charm', img: '/assets/images/new_arrivals1.jpg', price: '₹5,199', mrp: '₹6,199' },
      { title: 'Serene Bar', img: '/assets/images/hero.jpg', price: '₹3,999', mrp: '₹4,799' }
    ],
    bracelets: [
      { title: 'Eclat Chain', img: '/assets/images/best_bracelets1.jpg', price: '₹6,999', mrp: '₹8,799' },
      { title: 'Gleam Cuff', img: '/assets/images/collection_bracelets.jpg', price: '₹7,299', mrp: '₹9,199' },
      { title: 'Frost Link', img: '/assets/images/new_arrivals2.jpg', price: '₹6,299', mrp: '₹7,499' },
      { title: 'Dawn Beads', img: '/assets/images/collection_accessories.jpg', price: '₹4,999', mrp: '₹5,999' }
    ],
    bangles: [
      { title: 'Regal Bold', img: '/assets/images/best_bangles1.jpg', price: '₹8,499', mrp: '₹10,499' },
      { title: 'Gilded Wave', img: '/assets/images/collection_bangles.jpg', price: '₹7,999', mrp: '₹9,499' },
      { title: 'Twilight Stack', img: '/assets/images/collection_necklace.jpg', price: '₹9,199', mrp: '₹10,999' },
      { title: 'Ivory Curve', img: '/assets/images/collection_rings.jpg', price: '₹6,499', mrp: '₹7,999' }
    ]
  };

  const grid = document.getElementById('productsGrid');
  const tabs = Array.from(document.querySelectorAll('.tabs .tab'));
  function renderProducts(category) {
    const items = products[category] || [];
    grid.innerHTML = items.map(p => `
      <article class="product-card">
        <div class="product-media"><img loading="lazy" src="${encodeURI(p.img)}" alt="${p.title}"></div>
        <div class="product-info">
          <div class="product-title">${p.title}</div>
          <div class="price"><strong>${p.price}</strong><span class="mrp">${p.mrp}</span></div>
        </div>
      </article>
    `).join('');
    applyImgFallback();
  }
  renderProducts('rings');
  tabs.forEach(tab => tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    renderProducts(tab.dataset.category);
  }));

  // Recently viewed carousel
  const rvItems = [
    { title: 'Halo Ring', img: '/assets/images/best_rings1.jpg' },
    { title: 'Gold Hoops', img: '/assets/images/best_earrings2.jpg' },
    { title: 'Heart Pendant', img: '/assets/images/best_pendants1.jpg' },
    { title: 'Chain Bracelet', img: '/assets/images/best_bracelets1.jpg' },
    { title: 'Classic Bangle', img: '/assets/images/best_bangles1.jpg' },
    { title: 'Pearl Studs', img: '/assets/images/collection_earrings.jpg' }
  ];
  const rvTrack = document.getElementById('rvTrack');
  const rvPrev = document.querySelector('.rv-nav.prev');
  const rvNext = document.querySelector('.rv-nav.next');
  rvTrack.innerHTML = rvItems.map(i => `
    <div class="rv-item">
      <img loading="lazy" src="${i.img}" alt="${i.title}">
      <div class="rv-caption">${i.title}</div>
    </div>
  `).join('');
  applyImgFallback();
  rvPrev.addEventListener('click', () => { rvTrack.scrollBy({ left: -240, behavior: 'smooth' }); });
  rvNext.addEventListener('click', () => { rvTrack.scrollBy({ left: 240, behavior: 'smooth' }); });

  // Testimonials carousel
  const testimonials = [
    { name: 'Ananya', text: 'Absolutely in love with the craftsmanship. Elegant and comfortable to wear all day!', img: '/assets/images/testimonial_1.jpg' },
    { name: 'Rohan', text: 'Great quality and design. The ring looks stunning and feels premium.', img: '/assets/images/testimonial_2.jpg' },
    { name: 'Meera', text: 'Perfect gifting experience. Packaging and personalised note were thoughtful.', img: '/assets/images/testimonial_3.jpg' }
  ];
  const tTrack = document.getElementById('tTrack');
  const tDots = document.getElementById('tDots');
  let tIndex = 0; let tTimer;
  function renderTestimonials() {
    tTrack.innerHTML = testimonials.map(t => `
      <div class="t-slide">
        <img class="avatar" src="${t.img}" alt="${t.name}">
        <div class="content">
          <h3>${t.name}</h3>
          <p>${t.text}</p>
        </div>
      </div>
    `).join('');
    tDots.innerHTML = testimonials.map((_, i) => `<button class="t-dot" aria-label="Go to testimonial ${i+1}"></button>`).join('');
    applyImgFallback();
  }
  function goToSlide(i) {
    tIndex = (i + testimonials.length) % testimonials.length;
    tTrack.style.transform = `translateX(-${tIndex * 100}%)`;
    Array.from(tDots.children).forEach((d, idx) => d.classList.toggle('active', idx === tIndex));
  }
  function startAuto() { tTimer = setInterval(() => goToSlide(tIndex + 1), 5000); }
  function stopAuto() { clearInterval(tTimer); }
  renderTestimonials();
  goToSlide(0);
  startAuto();
  tTrack.addEventListener('mouseenter', stopAuto);
  tTrack.addEventListener('mouseleave', startAuto);
  Array.from(tDots.children).forEach((dot, idx) => dot.addEventListener('click', () => goToSlide(idx)));

  // Run fallback once more after DOM ready
  document.addEventListener('DOMContentLoaded', applyImgFallback);
})();
