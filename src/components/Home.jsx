import React, { useState, useEffect, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  ChevronRight,
  ArrowRight,
  Check,
  Star,
  Minus,
  Plus,
  Filter,
  Eye,
  Sparkles,
  SlidersHorizontal
} from 'lucide-react';
import s1Img from '../assets/images/s1.png';
import editorialImg from '../assets/images/editorial-model.png';
import './Home.css';
/* -------------------------------------------------------------------------- */
/* BASE URL helper — resolves public/ assets correctly under any sub-path    */
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');
const img = (path) => `${BASE}${path}`;
/* -------------------------------------------------------------------------- */
/* INLINE DATA — Products, Categories, Craftsmanship, Journal, Testimonials  */
/* -------------------------------------------------------------------------- */
const productsData = [
  {
    id: "saree-01",
    name: "The Midnight Silk",
    collection: "Signature Collection",
    category: "Silk",
    price: 18900,
    originalPrice: 22000,
    color: "Obsidian Black",
    fabric: "Mulberry Silk & Zari",
    weave: "Handloom Weave",
    occasion: "Cocktail & Evening",
    care: "Dry Clean Only",
    rating: 4.9,
    reviews: 28,
    isFeatured: true,
    isNew: true,
    image: img("/images/sarees/saree-01.png"),
    hoverImage: img("/images/sarees/saree-01-detail.png"),
    hoverTag: "PALLU & ZARI BORDER DETAIL",
    gallery: [
      img("/images/sarees/saree-01.png"),
      img("/images/sarees/saree-01-detail.png"),
      img("/images/craft/craft-drape.png")
    ],
    description: "A deep obsidian black silk drape finished with delicate antique-gold detailing and intricate zari weave along the pallu. Crafted for statement evening luxury.",
    details: [
      "Pure 100% Mulberry Silk with real zari threadwork",
      "Hand-pleated pallu with traditional floral motifs",
      "Includes unstitched matching black silk blouse piece (80cm)",
      "Crafted by master weavers in Varanasi"
    ]
  },
  {
    id: "saree-02",
    name: "Imperial Burgundy Banarasi",
    collection: "Heritage Weaves",
    category: "Heritage",
    price: 24500,
    originalPrice: 28000,
    color: "Deep Burgundy",
    fabric: "Banarasi Katan Silk",
    weave: "Kadhwa Weave",
    occasion: "Wedding & Festive",
    care: "Dry Clean Only",
    rating: 5.0,
    reviews: 42,
    isFeatured: true,
    isNew: false,
    image: img("/images/sarees/saree-02.png"),
    hoverImage: img("/images/sarees/saree-02-detail.png"),
    hoverTag: "KADHWA FLORAL WEAVE & CHEST DRAPE",
    gallery: [
      img("/images/sarees/saree-02.png"),
      img("/images/sarees/saree-02-detail.png"),
      img("/images/bridal/bridal-02.png")
    ],
    description: "Woven in the ancient holy city of Varanasi, this opulent deep burgundy Banarasi silk drape features rich gold floral kadhwa motifs passed down through generations.",
    details: [
      "Authentic Varanasi Silk Mark Certified",
      "Heavy zari pallu with traditional jaal patterns",
      "Comes with unstitched brocade blouse piece",
      "Ideal for royal wedding receptions"
    ]
  },
  {
    id: "saree-03",
    name: "Ivory Kanchipuram Heirloom",
    collection: "Signature Collection",
    category: "Silk",
    price: 32000,
    originalPrice: 36000,
    color: "Ivory Beige",
    fabric: "Pure Kanchipuram Silk",
    weave: "Korvai Handloom",
    occasion: "Bridal & Heritage",
    care: "Dry Clean Only",
    rating: 4.9,
    reviews: 35,
    isFeatured: true,
    isNew: true,
    image: img("/images/sarees/saree-03.png"),
    hoverImage: img("/images/sarees/saree-03-detail.png"),
    hoverTag: "GOLD TEMPLE BORDER & SILK SHEEN",
    gallery: [
      img("/images/sarees/saree-03.png"),
      img("/images/sarees/saree-03-detail.png"),
      img("/images/categories/category-silk.png")
    ],
    description: "An understated masterwork in luminous ivory silk accented with broad champagne gold temple borders. A timeless heirloom created for the discerning woman.",
    details: [
      "3-ply Mulberry silk for substantial weight and graceful drape",
      "Solid gold zari temple border (Korvai technique)",
      "Includes raw silk unstitched blouse material",
      "Handcrafted over 120 hours in Kanchipuram"
    ]
  },
  {
    id: "saree-04",
    name: "Champagne Metallic Tissue",
    collection: "Contemporary Edit",
    category: "Contemporary",
    price: 21000,
    originalPrice: 24000,
    color: "Champagne Gold",
    fabric: "Silk Tissue & Zari",
    weave: "Modern Drape Weave",
    occasion: "Soirée & Red Carpet",
    care: "Dry Clean Only",
    rating: 4.8,
    reviews: 19,
    isFeatured: true,
    isNew: true,
    image: img("/images/sarees/saree-04.png"),
    hoverImage: img("/images/sarees/saree-04-detail.png"),
    hoverTag: "METALLIC PLEAT & MODERN STYLING",
    gallery: [
      img("/images/sarees/saree-04.png"),
      img("/images/sarees/saree-04-detail.png"),
      img("/images/categories/category-contemporary.png")
    ],
    description: "Lightweight metallic champagne gold tissue silk that catches the light with liquid shimmer. Modern minimal luxury designed for effortless evening draping.",
    details: [
      "Ultra-lightweight high shine metallic silk blend",
      "Subtle micro-embroidered border finish",
      "Includes matching champagne shimmer blouse piece",
      "Fluid drape with crisp structural pleats"
    ]
  },
  {
    id: "bridal-01",
    name: "Crimson Royal Kanchipuram",
    collection: "The Bridal Edit",
    category: "Bridal",
    price: 48000,
    originalPrice: 55000,
    color: "Deep Crimson Red",
    fabric: "Heavy Kanchipuram Silk",
    weave: "Royal Zari Weave",
    occasion: "Bridal Main Ceremony",
    care: "Dry Clean & Store in Muslin",
    rating: 5.0,
    reviews: 56,
    isFeatured: false,
    isNew: true,
    image: img("/images/bridal/bridal-01.png"),
    hoverImage: img("/images/bridal/bridal-02.png"),
    hoverTag: "GOLD ZARI TEMPLE WEAVE",
    gallery: [
      img("/images/bridal/bridal-01.png"),
      img("/images/categories/category-bridal.png"),
      img("/images/sarees/saree-02.png")
    ],
    description: "The epitome of Indian bridal grandeur. Rich crimson red heavy silk woven with pure gold zari temple architectural motifs and auspicious peacock patterns.",
    details: [
      "Silk Mark Certified 100% Pure Heavy Silk",
      "Authentic silver zari washed in pure 24k gold",
      "Custom velvet storage bag & muslin wrapping included",
      "Heirloom piece created for generations"
    ]
  },
  {
    id: "bridal-02",
    name: "Scarlet & Gold Heritage Drape",
    collection: "The Bridal Edit",
    category: "Bridal",
    price: 42500,
    originalPrice: 48000,
    color: "Scarlet Red",
    fabric: "Banarasi Silk & Velvet",
    weave: "Zardozi Hand Embroidery",
    occasion: "Bridal Pheras",
    care: "Dry Clean Only",
    rating: 4.9,
    reviews: 31,
    isFeatured: false,
    isNew: false,
    image: img("/images/bridal/bridal-02.png"),
    hoverImage: img("/images/bridal/bridal-01.png"),
    hoverTag: "ZARDOZI EMBROIDERY BORDER",
    gallery: [
      img("/images/bridal/bridal-02.png"),
      img("/images/bridal/bridal-01.png"),
      img("/images/categories/category-heritage.png")
    ],
    description: "A dramatic bridal statement combining traditional scarlet silk with hand-worked gold zardozi embroidery detailing along the border and pallu.",
    details: [
      "Hand embroidered zardozi motifs",
      "Heavy gold bullion threadwork",
      "Comes with designer blouse fabric",
      "Signature Aavira bridal gift packaging"
    ]
  }
];

const categoriesData = [
  {
    id: "silk",
    name: "SILK",
    subtitle: "Timeless brilliance",
    image: img("/images/categories/category-silk.png"),
    description: "Luminous Mulberry and Kanchipuram silks crafted for effortless sophistication."
  },
  {
    id: "heritage",
    name: "HERITAGE",
    subtitle: "Woven stories",
    image: img("/images/categories/category-heritage.png"),
    description: "Centuries-old Banarasi and Paithani weaving traditions preserved by master artisans."
  },
  {
    id: "bridal",
    name: "BRIDAL",
    subtitle: "For your forever moment",
    image: img("/images/categories/category-bridal.png"),
    description: "Couture drapes woven with pure gold zari for the modern royal bride."
  },
  {
    id: "contemporary",
    name: "CONTEMPORARY",
    subtitle: "Tradition, redefined",
    image: img("/images/categories/category-contemporary.png"),
    description: "Minimalist drapes, organzas, and metallic tissues reimagined for modern soirées."
  }
];

const craftsmanshipStages = [
  {
    number: "01",
    title: "THE THREAD",
    subtitle: "The beginning of every story.",
    description: "Finest mulberry and raw silk yarns are meticulously selected, hand-spun, and dyed in natural organic pots to achieve rich depth of tone and unmatched luster.",
    highlights: [
      "100% Pure Mulberry & Wild Raw Silk Yarns",
      "Hand-spun on traditional wooden charkhas",
      "Dyed in organic botanical vats for color depth",
      "Rigorous yarn tensile strength inspection"
    ],
    duration: "12 Days of Yarn Preparation",
    image: img("/images/craft/craft-thread.png")
  },
  {
    number: "02",
    title: "THE WEAVE",
    subtitle: "Crafted by skilled master hands.",
    description: "Master artisans work on traditional Varanasi pit looms for weeks, interweaving golden zari threads using centuries-old Jacquard and Kadhwa techniques.",
    highlights: [
      "Tested 24K Gold & Silver washed Zari",
      "Authentic Varanasi handloom Jacquard weave",
      "Intricate Meenakari floral & temple motifs",
      "Up to 240 hours of handloom craftsmanship"
    ],
    duration: "3-4 Weeks on the Handloom",
    image: img("/images/craft/craft-weaving.png")
  },
  {
    number: "03",
    title: "THE DRAPE",
    subtitle: "Finished for a woman who carries tradition forward.",
    description: "Each saree undergoes precision hand-pleating inspection, signature gold tassel hand-knotting, and delicate steam pressing before heirloom muslin wrapping.",
    highlights: [
      "Hand-pleated fall & border alignment check",
      "Signature silk fringe & gold tassel finishing",
      "Gentle steam pressing & fabric softening",
      "Wrapped in organic muslin with luxury box"
    ],
    duration: "Final Inspection & Couture Finishing",
    image: img("/images/craft/craft-drape.png")
  }
];

const journalPosts = [
  {
    id: "art-of-silk",
    title: "The Art of Silk",
    category: "Craftsmanship",
    date: "August 2026",
    readTime: "4 min read",
    image: img("/images/journal/journal-01.png"),
    summary: "Discover the intricate journey of pure Mulberry silk from cocoon to gold zari loom."
  },
  {
    id: "behind-the-weave",
    title: "Behind the Weave",
    category: "Artisans",
    date: "July 2026",
    readTime: "6 min read",
    image: img("/images/journal/journal-02.png"),
    summary: "A rare glimpse inside Varanasi's master weaver looms and heirlooms in the making."
  },
  {
    id: "styling-modern-saree",
    title: "Styling the Modern Saree",
    category: "Style Guide",
    date: "June 2026",
    readTime: "3 min read",
    image: img("/images/journal/journal-03.png"),
    summary: "Editorial drape techniques for contemporary cocktail evenings and red-carpet moments."
  },
  {
    id: "a-brides-story",
    title: "A Bride's Story",
    category: "Couture",
    date: "May 2026",
    readTime: "5 min read",
    image: img("/images/journal/journal-04.png"),
    summary: "How bespoke handwoven Kanchipuram silk drapes bring timeless grace to modern weddings."
  }
];

const testimonialsData = [
  {
    quote: "Every detail felt incredibly luxurious. The saree was even more beautiful in person. The weight of the silk and pure gold zari is unmatched.",
    author: "ANANYA R.",
    location: "Mumbai",
    saree: "The Midnight Silk",
    rating: 5
  },
  {
    quote: "The craftsmanship, packaging and fabric quality were exceptional. Aavira has truly redefined what luxury Indian heritage means today.",
    author: "MEERA K.",
    location: "New Delhi",
    saree: "Imperial Burgundy Banarasi",
    rating: 5
  },
  {
    quote: "Wearing the Ivory Kanchipuram on my reception was unforgettable. It draped like liquid gold. Highly recommend to any bride.",
    author: "PRIYANKA M.",
    location: "Bengaluru",
    saree: "Ivory Kanchipuram Heirloom",
    rating: 5
  },
  {
    quote: "The fluidity and sheen of the Champagne Metallic Tissue gather endless compliments whenever I wear it. Pure red carpet elegance.",
    author: "SHALINI S.",
    location: "London",
    saree: "Champagne Metallic Tissue",
    rating: 5
  },
  {
    quote: "The bespoke unstitched blouse material and signature gold box packaging exceeded every expectation. An absolute family heirloom.",
    author: "RADHIKA V.",
    location: "Dubai",
    saree: "Crimson Royal Kanchipuram",
    rating: 5
  }
];

const InstagramIcon = ({ size = 17 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const FacebookIcon = ({ size = 17 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

/* -------------------------------------------------------------------------- */
/* CUSTOM CURSOR COMPONENT                                                     */
/* -------------------------------------------------------------------------- */
const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      if (
        e.target.tagName === 'BUTTON' ||
        e.target.tagName === 'A' ||
        e.target.closest('button') ||
        e.target.closest('a') ||
        e.target.classList.contains('clickable')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div
      className={`custom-cursor ${isHovered ? 'hovered' : ''}`}
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    />
  );
};

/* -------------------------------------------------------------------------- */
/* NAVBAR COMPONENT                                                          */
/* -------------------------------------------------------------------------- */
const Navbar = ({
  scrolled,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  activeTab,
  setActiveTab
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tabId, sectionId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    if (sectionId) {
      setTimeout(() => {
        const elem = document.getElementById(sectionId);
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    }
  };

  return (
    <nav className={`aavira-navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="luxury-container nav-container">
        {/* BRAND LOGO */}
        <a href="#hero" className="nav-brand" onClick={() => handleNavClick('home', 'hero')}>
          <span className="brand-logo-text">KANCHIRA</span>
        </a>

        {/* CENTER LINKS */}
        <ul className="nav-menu">
          <li>
            <button
              className={`nav-link ${activeTab === 'shop' ? 'active' : ''}`}
              onClick={() => handleNavClick('shop', 'signature-section')}
            >
              Collections
            </button>
          </li>
          <li>
            <button
              className={`nav-link ${activeTab === 'shop' ? 'active' : ''}`}
              onClick={() => handleNavClick('shop', 'signature-section')}
            >
              Sarees
            </button>
          </li>
          <li>
            <button
              className="nav-link"
              onClick={() => handleNavClick('home', 'bridal-section')}
            >
              Bridal
            </button>
          </li>
          <li>
            <button
              className="nav-link"
              onClick={() => handleNavClick('home', 'craft-section')}
            >
              Heritage
            </button>
          </li>
          <li>
            <button
              className="nav-link"
              onClick={() => handleNavClick('home', 'journal-section')}
            >
              Journal
            </button>
          </li>
        </ul>

        {/* RIGHT ACTIONS */}
        <div className="nav-actions">
          <button className="icon-btn" onClick={onOpenSearch} title="Search">
            <Search size={19} />
          </button>
          <button className="icon-btn" onClick={onOpenWishlist} title="Wishlist">
            <Heart size={19} />
            {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
          </button>
          <button className="icon-btn" onClick={onOpenCart} title="Bag">
            <ShoppingBag size={19} />
            {cartCount > 0 && <span className="badge">{cartCount}</span>}
          </button>
          <button
            className="icon-btn mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU DRAWER */}
      {mobileMenuOpen && (
        <div className="mobile-menu-drawer">
          <ul className="mobile-nav-list">
            <li>
              <button onClick={() => handleNavClick('shop', 'signature-section')}>Collections</button>
            </li>
            <li>
              <button onClick={() => handleNavClick('shop', 'signature-section')}>Sarees</button>
            </li>
            <li>
              <button onClick={() => handleNavClick('home', 'bridal-section')}>Bridal Edit</button>
            </li>
            <li>
              <button onClick={() => handleNavClick('home', 'craft-section')}>Heritage & Loom</button>
            </li>
            <li>
              <button onClick={() => handleNavClick('home', 'journal-section')}>Journal</button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

/* -------------------------------------------------------------------------- */
/* HERO SECTION                                                              */
/* -------------------------------------------------------------------------- */
const Hero = ({ onExploreClick, onStoryClick }) => {
  const canvasRef = useRef(null);
  const heroBgRef = useRef(null);

  // High-performance direct DOM RAF parallax effect for Hero background
  useEffect(() => {
    let animationFrameId;
    let currentY = 0;
    let targetY = 0;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY < window.innerHeight * 1.2) {
        targetY = scrollY * 0.35;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    const renderLoop = () => {
      currentY += (targetY - currentY) * 0.1;
      if (heroBgRef.current) {
        heroBgRef.current.style.transform = `translate3d(0, ${currentY.toFixed(2)}px, 0) scale(1.06)`;
      }
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    animationFrameId = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Subtle ambient particle floating effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.5 + 0.1,
      speedY: Math.random() * 0.3 + 0.1,
      speedX: (Math.random() - 0.5) * 0.2
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.y -= p.speedY;
        p.x += p.speedX;
        if (p.y < 0) {
          p.y = canvas.height;
          p.x = Math.random() * canvas.width;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 169, 110, ${p.alpha})`;
        ctx.shadowBlur = 4;
        ctx.shadowColor = '#C9A96E';
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section id="hero" className="hero-section">
      <div
        ref={heroBgRef}
        className="hero-parallax-bg"
        style={{ backgroundImage: `url(${s1Img})` }}
      />
      <div className="hero-bg-overlay" />
      <div className="hero-bg-glow" />
      <canvas ref={canvasRef} className="hero-particles-canvas" />

      <div className="luxury-container hero-container-single">
        {/* HERO CONTENT */}
        <div className="hero-content">
          <h1 className="hero-heading" data-aos="fade-right" data-aos-duration="1200" data-aos-delay="200">
            KANCHIRA
          </h1>
          <p className="hero-description" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">
            Timeless Indian craftsmanship, reimagined for the modern woman.
          </p>
          <div className="hero-cta-group" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="600">
            <button className="btn-primary-luxury" onClick={onExploreClick}>
              EXPLORE COLLECTION
            </button>
            <button className="btn-outline-luxury" onClick={onStoryClick}>
              DISCOVER OUR STORY
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

/* -------------------------------------------------------------------------- */
/* PRODUCT CARD COMPONENT                                                    */
/* -------------------------------------------------------------------------- */
const ProductCard = ({ product, onQuickView, onToggleWishlist, isWishlisted, index }) => {
  const hoverImg = product.hoverImage || (product.gallery && product.gallery[1]) || product.image;

  return (
    <div className="product-card" data-aos="fade-up" data-aos-delay={(index % 4) * 150 + 100}>
      <div className="product-image-container">
        {/* Full Standing Model Pose Shot */}
        <img
          src={product.image}
          alt={product.name}
          className="product-img main-pose-img"
          loading="lazy"
        />
        {/* Exact Pallu, Chest & Border Close-up Shot of THAT SAME SAREE */}
        <img
          src={hoverImg}
          alt={`${product.name} Pallu & Border Detail`}
          className="product-img hover-detail-img"
          loading="lazy"
        />

        {/* Floating Detail Indicator Pill */}
        <span className="product-detail-pill">
          <Sparkles size={11} /> {product.hoverTag || 'PALLU & BORDER DETAIL'}
        </span>

        {product.isNew && <span className="product-badge-new">NEW EDIT</span>}
        <button
          className={`wishlist-btn-card ${isWishlisted ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          title="Add to Wishlist"
        >
          <Heart size={16} fill={isWishlisted ? '#C9A96E' : 'none'} />
        </button>
      </div>

      <div className="product-info">
        <span className="product-collection-tag">{product.collection}</span>
        <h3 className="product-name">{product.name}</h3>
        <div className="product-underline" />
        <span className="product-price">₹{product.price.toLocaleString('en-IN')}</span>

        <button className="btn-view-saree" onClick={() => onQuickView(product)}>
          <Eye size={14} /> VIEW SAREE
        </button>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* SIGNATURE COLLECTION SECTION                                              */
/* -------------------------------------------------------------------------- */
const Collection = ({ products, onQuickView, onToggleWishlist, wishlistIds }) => {
  return (
    <section id="signature-section" className="signature-section">
      <div className="luxury-container">
        <div className="section-header-center" data-aos="fade-up">
          <span className="section-tag-gold">CURATED DRAPES</span>
          <h2 className="section-title-large">SIGNATURE COLLECTION</h2>
          <p className="section-subtitle-subtle">
            Curated drapes for unforgettable moments.
          </p>
        </div>

        <div className="products-grid-4">
          {products.slice(0, 4).map((product, idx) => (
            <ProductCard
              key={product.id}
              product={product}
              index={idx}
              onQuickView={onQuickView}
              onToggleWishlist={onToggleWishlist}
              isWishlisted={wishlistIds.includes(product.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

/* -------------------------------------------------------------------------- */
/* CATEGORY SECTION                                                          */
/* -------------------------------------------------------------------------- */
const CategorySection = ({ onSelectCategory }) => {
  return (
    <section className="category-section">
      <div className="luxury-container">
        <div className="section-header-center" data-aos="fade-up">
          <span className="section-tag-gold">EXPLORE BY WEAVE</span>
          <h2 className="section-title-large">THE EDITORIAL CATEGORIES</h2>
        </div>

        <div className="categories-grid">
          {categoriesData.map((cat, idx) => (
            <div
              key={cat.id}
              className="category-card"
              onClick={() => onSelectCategory(cat.name)}
              data-aos="fade-up"
              data-aos-delay={idx * 150 + 100}
            >
              <img src={cat.image} alt={cat.name} className="category-img" loading="lazy" />
              <div className="category-overlay" />
              <div className="category-content">
                <h3 className="category-title">{cat.name}</h3>
                <p className="category-subtitle">{cat.subtitle}</p>
                <span className="category-explore-link">
                  EXPLORE <ArrowRight size={14} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* -------------------------------------------------------------------------- */
/* EDITORIAL FULL SCREEN SECTION                                             */
/* -------------------------------------------------------------------------- */
const EditorialSection = ({ onExploreEdit }) => {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    let animationFrameId;
    let currentY = 0;
    let targetY = 0;

    const updateParallax = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const winHeight = window.innerHeight;
        if (rect.top < winHeight && rect.bottom > 0) {
          const scrollProgress = (winHeight - rect.top) / (winHeight + rect.height);
          targetY = (scrollProgress - 0.5) * 160;
        }
      }

      // Smooth lerp (10% per frame step) for fluid depth motion
      currentY += (targetY - currentY) * 0.1;

      if (bgRef.current) {
        bgRef.current.style.transform = `translate3d(0, ${currentY.toFixed(2)}px, 0) scale(1.12)`;
      }

      animationFrameId = requestAnimationFrame(updateParallax);
    };

    animationFrameId = requestAnimationFrame(updateParallax);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="editorial-hero-section">
      <div
        ref={bgRef}
        className="editorial-parallax-bg"
        style={{ backgroundImage: `url(${editorialImg})` }}
      />
      <div className="editorial-scrim" />
      <div className="editorial-content-box" data-aos="zoom-in" data-aos-duration="1200">
        <span className="section-tag-gold" style={{ color: '#C9A96E' }}>
          STATEMENT COUTURE
        </span>
        <h2 className="editorial-quote-large">
          SHE DOESN'T FOLLOW TRADITION.
          <span>SHE REDEFINES IT.</span>
        </h2>
        <button className="btn-primary-luxury" onClick={onExploreEdit}>
          EXPLORE THE EDIT
        </button>
      </div>
    </section>
  );
};

/* -------------------------------------------------------------------------- */
/* CRAFTSMANSHIP SECTION                                                     */
/* -------------------------------------------------------------------------- */
const Craftsmanship = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const activeStage = craftsmanshipStages[activeIndex];

  const handleSelectStage = (idx) => {
    if (idx === activeIndex) return;
    setIsAnimating(true);
    setTimeout(() => {
      setActiveIndex(idx);
      setIsAnimating(false);
    }, 200);
  };

  const handlePrev = () => {
    const nextIdx = activeIndex === 0 ? craftsmanshipStages.length - 1 : activeIndex - 1;
    handleSelectStage(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = (activeIndex + 1) % craftsmanshipStages.length;
    handleSelectStage(nextIdx);
  };

  return (
    <section id="craft-section" className="craft-section">
      <div className="luxury-container">
        {/* SECTION HEADER */}
        <div className="section-header-center" data-aos="fade-up">
          <span className="section-tag-gold">HERITAGE LOOM STORY</span>
          <h2 className="section-title-large">
            FROM LOOM TO YOU
          </h2>
          <p className="section-subtitle-subtle">
            Unraveling the sacred multi-stage creation of a handcrafted drape.
          </p>
        </div>

        {/* INTERACTIVE SWITCHER WRAPPER */}
        <div className="craft-showcase-container" data-aos="fade-up" data-aos-delay="150">
          {/* LEFT SIDE: IMAGE DISPLAY & THUMBNAILS */}
          <div className="craft-visual-panel">
            <div className="craft-image-frame">
              <img
                src={activeStage.image}
                alt={activeStage.title}
                className={`craft-main-image ${isAnimating ? 'animating' : ''}`}
              />
              <div className="craft-image-overlay" />

              {/* STAGE TITLE BADGE */}
              <div className="craft-stage-badge">
                <span className="badge-label">{activeStage.title}</span>
              </div>

              {/* NAV CONTROLS OVERLAY */}
              <div className="craft-nav-controls">
                <button className="craft-arrow-btn" onClick={handlePrev} title="Previous Stage">
                  ‹
                </button>
                <button className="craft-arrow-btn" onClick={handleNext} title="Next Stage">
                  ›
                </button>
              </div>
            </div>

            {/* THUMBNAIL SELECTOR STRIP */}
            <div className="craft-thumbnails-strip">
              {craftsmanshipStages.map((stage, idx) => (
                <button
                  key={stage.title}
                  className={`craft-thumb-btn ${idx === activeIndex ? 'active' : ''}`}
                  onClick={() => handleSelectStage(idx)}
                  title={`View ${stage.title}`}
                >
                  <img src={stage.image} alt={stage.title} />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE: DYNAMIC CONTENT PANEL */}
          <div className="craft-details-panel">
            {/* TABS HEADER */}
            <div className="craft-tabs-bar">
              {craftsmanshipStages.map((stage, idx) => (
                <button
                  key={stage.title}
                  className={`craft-tab-btn ${idx === activeIndex ? 'active' : ''}`}
                  onClick={() => handleSelectStage(idx)}
                >
                  <span className="tab-title">{stage.title}</span>
                </button>
              ))}
            </div>

            {/* CONTENT BODY */}
            <div className={`craft-content-body ${isAnimating ? 'animating' : ''}`}>
              <h3 className="craft-detail-heading">{activeStage.title}</h3>
              <h4 className="craft-detail-subheading">{activeStage.subtitle}</h4>

              <p className="craft-detail-description">{activeStage.description}</p>

              {/* HIGHLIGHTS BULLETS */}
              {activeStage.highlights && (
                <div className="craft-highlights-box">
                  <h5 className="highlights-title">STAGE HIGHLIGHTS</h5>
                  <ul className="highlights-list">
                    {activeStage.highlights.map((item, i) => (
                      <li key={i} className="highlight-item">
                        <Check size={14} className="highlight-icon" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* -------------------------------------------------------------------------- */
/* BRIDAL SECTION                                                            */
/* -------------------------------------------------------------------------- */
const BridalSection = ({ onDiscoverBridal }) => {
  return (
    <section id="bridal-section" className="bridal-section">
      <div className="luxury-container">
        <div className="section-header-center" data-aos="fade-up">
          <span className="section-tag-gold">FOR YOUR FOREVER MOMENT</span>
          <h2 className="section-title-large">THE BRIDAL EDIT</h2>
          <p className="section-subtitle-subtle">
            Made for the beginning of forever.
          </p>
        </div>

        <div className="bridal-grid-3">
          <div className="bridal-card" onClick={onDiscoverBridal} data-aos="fade-up" data-aos-delay="100">
            <img src={img("/images/bridal/bridal-01.png")} alt="Bridal Crimson Kanchipuram" className="bridal-img" loading="lazy" />
            <div className="bridal-overlay" />
            <h3 className="bridal-card-title">Crimson Royal Kanchipuram</h3>
          </div>

          <div className="bridal-card" onClick={onDiscoverBridal} data-aos="fade-up" data-aos-delay="250">
            <img src={img("/images/bridal/bridal-02.png")} alt="Scarlet & Gold Heritage Drape" className="bridal-img" loading="lazy" />
            <div className="bridal-overlay" />
            <h3 className="bridal-card-title">Scarlet & Gold Heritage Drape</h3>
          </div>

          <div className="bridal-card" onClick={onDiscoverBridal} data-aos="fade-up" data-aos-delay="400">
            <img src={img("/images/bridal/bridal-03.png")} alt="Imperial Bridal Collection" className="bridal-img" loading="lazy" />
            <div className="bridal-overlay" />
            <h3 className="bridal-card-title">Opulent Regal Velvet & Silk</h3>
          </div>
        </div>

        <div style={{ textAlign: 'center' }} data-aos="fade-up" data-aos-delay="500">
          <button className="btn-primary-luxury" onClick={onDiscoverBridal}>
            DISCOVER BRIDAL
          </button>
        </div>
      </div>
    </section>
  );
};



/* -------------------------------------------------------------------------- */
/* TESTIMONIALS SECTION                                                      */
/* -------------------------------------------------------------------------- */
const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatic scroll slideshow every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const current = testimonialsData[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonialsData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  return (
    <section className="testimonials-section">
      <div className="luxury-container">
        <div className="section-header-center" data-aos="fade-up">
          <span className="section-tag-gold">CLIENT STORIES</span>
          <h2 className="section-title-large">WORN WITH LOVE</h2>
          <p className="section-subtitle-subtle">
            Voices of discerning women who celebrate Indian textile artistry.
          </p>
        </div>

        {/* AUTOMATIC SCROLL TESTIMONIAL CAROUSEL CARD */}
        <div
          className="testimonial-carousel-wrapper"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <button
            className="testimonial-nav-btn prev-btn"
            onClick={handlePrev}
            title="Previous Story"
          >
            ‹
          </button>

          <div className="testimonial-active-card" key={currentIndex}>
            {/* RATING STARS */}
            <div className="testimonial-stars-row">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={16} fill="#C9A96E" color="#C9A96E" />
              ))}
            </div>

            <div className="gold-quote-mark">“</div>
            <p className="testimonial-quote">{current.quote}</p>

            <div className="testimonial-footer-info">
              <div className="testimonial-author">— {current.author}</div>
              <div className="testimonial-meta">
                <span className="meta-loc">{current.location}</span>
                <span className="meta-divider">•</span>
                <span className="meta-saree-pill">{current.saree}</span>
              </div>
            </div>
          </div>

          <button
            className="testimonial-nav-btn next-btn"
            onClick={handleNext}
            title="Next Story"
          >
            ›
          </button>
        </div>

        {/* SIMPLE AUTOMATIC SCROLL INDICATOR DOTS (WITHOUT NUMBERS) */}
        <div className="testimonial-dots-row" data-aos="fade-up" data-aos-delay="300">
          {testimonialsData.map((item, idx) => (
            <button
              key={idx}
              className={`testimonial-dot-btn ${idx === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(idx)}
              title={`Story ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

/* -------------------------------------------------------------------------- */
/* JOURNAL SECTION                                                           */
/* -------------------------------------------------------------------------- */
const Journal = () => {
  return (
    <section id="journal-section" className="journal-section">
      <div className="luxury-container">
        <div className="section-header-center" data-aos="fade-up">
          <span className="section-tag-gold">EDITORIAL READS</span>
          <h2 className="section-title-large">THE KANCHIRA JOURNAL</h2>
        </div>

        <div className="journal-grid">
          {journalPosts.map((post, idx) => (
            <div
              key={post.id}
              className="journal-tile"
              data-aos="fade-up"
              data-aos-delay={idx * 150 + 100}
            >
              <div className="journal-img-box">
                <img src={post.image} alt={post.title} className="journal-img" loading="lazy" />
              </div>
              <span className="journal-category">{post.category}</span>
              <h3 className="journal-title">{post.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* -------------------------------------------------------------------------- */
/* NEWSLETTER SECTION                                                        */
/* -------------------------------------------------------------------------- */
const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <section className="newsletter-section">
      <div className="luxury-container newsletter-box" data-aos="fade-up">
        <span className="section-tag-gold">PRIVATE CIRCLE</span>
        <h2 className="newsletter-heading">ENTER THE WORLD OF KANCHIRA</h2>
        <p className="newsletter-text">
          Be the first to discover new collections, private edits and stories from the loom.
        </p>

        {subscribed ? (
          <div className="gold-accent-line" style={{ width: '100%' }}>
            <p style={{ color: '#C9A96E', letterSpacing: '0.2em' }}>
              WELCOME TO THE JOURNAL CIRCLE.
            </p>
          </div>
        ) : (
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Your email address"
              className="newsletter-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="newsletter-btn">
              JOIN THE JOURNAL
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

/* -------------------------------------------------------------------------- */
/* FOOTER COMPONENT                                                          */
/* -------------------------------------------------------------------------- */
const Footer = () => {
  return (
    <footer className="aavira-footer">
      <div className="luxury-container">
        <div className="footer-top-grid">
          <div className="footer-brand-col">
            <span className="footer-logo">KANCHIRA</span>
            <p className="footer-desc">
              Timeless Indian textile craftsmanship, thoughtfully reimagined for the modern woman of grace.
            </p>
            <div className="footer-socials">
              <a href="#instagram" className="social-link" title="Instagram">
                <InstagramIcon size={17} />
              </a>
              <a href="#pinterest" className="social-link" title="Pinterest">
                <Sparkles size={17} />
              </a>
              <a href="#facebook" className="social-link" title="Facebook">
                <FacebookIcon size={17} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="footer-title">SHOP</h4>
            <ul className="footer-links">
              <li>
                <a href="#signature-section">Sarees</a>
              </li>
              <li>
                <a href="#signature-section">New Arrivals</a>
              </li>
              <li>
                <a href="#bridal-section">Bridal</a>
              </li>
              <li>
                <a href="#signature-section">Bestsellers</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="footer-title">ABOUT</h4>
            <ul className="footer-links">
              <li>
                <a href="#craft-section">Our Story</a>
              </li>
              <li>
                <a href="#craft-section">Craftsmanship</a>
              </li>
              <li>
                <a href="#journal-section">Journal</a>
              </li>
              <li>
                <a href="#footer">Contact</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="footer-title">SUPPORT</h4>
            <ul className="footer-links">
              <li>
                <a href="#footer">Shipping & Delivery</a>
              </li>
              <li>
                <a href="#footer">Returns & Exchanges</a>
              </li>
              <li>
                <a href="#footer">Saree Care & Size Guide</a>
              </li>
              <li>
                <a href="#footer">Client FAQs</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 KANCHIRA. All Rights Reserved.</span>
          <span>LUXURY COUTURE</span>
        </div>
      </div>
    </footer>
  );
};

/* -------------------------------------------------------------------------- */
/* PRODUCT MODAL / DETAILS PAGE                                               */
/* -------------------------------------------------------------------------- */
const ProductPage = ({ product, onClose, onAddToCart, onToggleWishlist, isWishlisted }) => {
  const [selectedImg, setSelectedImg] = useState(product.image);
  const [quantity, setQuantity] = useState(1);
  const [blouseOption, setBlouseOption] = useState('Unstitched');

  if (!product) return null;

  return (
    <div className="product-modal-backdrop" onClick={onClose}>
      <div className="product-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        {/* GALLERY */}
        <div className="modal-gallery">
          <div className="modal-main-img-box">
            <img src={selectedImg} alt={product.name} className="modal-main-img" />
          </div>
          <div className="modal-thumbs-row">
            {product.gallery.map((imgUrl, idx) => (
              <div
                key={idx}
                className={`thumb-box ${selectedImg === imgUrl ? 'active' : ''}`}
                onClick={() => setSelectedImg(imgUrl)}
              >
                <img src={imgUrl} alt="Thumbnail" className="thumb-img" />
              </div>
            ))}
          </div>
        </div>

        {/* DETAILS */}
        <div className="modal-product-details">
          <span className="product-collection-tag">{product.collection}</span>
          <h2 className="product-name" style={{ fontSize: '2.4rem' }}>
            {product.name}
          </h2>
          <div className="product-price" style={{ fontSize: '1.8rem', color: '#C9A96E' }}>
            ₹{product.price.toLocaleString('en-IN')}
          </div>

          <p style={{ fontSize: '0.95rem', color: '#E6DFD3', lineHeight: '1.7', margin: '1.5rem 0' }}>
            {product.description}
          </p>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ fontSize: '0.75rem', letterSpacing: '0.2em', color: '#C9A96E', display: 'block', marginBottom: '0.6rem' }}>
              BLOUSE CUSTOMIZATION
            </label>
            <div style={{ display: 'flex', gap: '1rem' }}>
              {['Unstitched Fabric', 'Custom Tailored (+₹2,500)'].map((opt) => (
                <button
                  key={opt}
                  className={`btn-outline-luxury ${blouseOption === opt ? 'active' : ''}`}
                  style={{
                    padding: '0.6rem 1rem',
                    fontSize: '0.7rem',
                    borderColor: blouseOption === opt ? '#C9A96E' : 'rgba(245,240,232,0.2)',
                    backgroundColor: blouseOption === opt ? 'rgba(201,169,110,0.1)' : 'transparent'
                  }}
                  onClick={() => setBlouseOption(opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', margin: '1.5rem 0 2.5rem 0' }}>
            <div className="quantity-control">
              <button
                className="qty-btn"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                <Minus size={14} />
              </button>
              <span className="qty-val">{quantity}</span>
              <button className="qty-btn" onClick={() => setQuantity((q) => q + 1)}>
                <Plus size={14} />
              </button>
            </div>

            <button
              className="btn-primary-luxury"
              style={{ flex: 1 }}
              onClick={() => {
                onAddToCart(product, quantity);
                onClose();
              }}
            >
              ADD TO BAG
            </button>

            <button
              className={`wishlist-btn-card ${isWishlisted ? 'active' : ''}`}
              style={{ position: 'static' }}
              onClick={() => onToggleWishlist(product)}
            >
              <Heart size={18} fill={isWishlisted ? '#C9A96E' : 'none'} />
            </button>
          </div>

          <div style={{ borderTop: '1px solid rgba(245,240,232,0.1)', paddingTop: '1.5rem' }}>
            <h4 style={{ fontSize: '0.8rem', letterSpacing: '0.2em', color: '#C9A96E', marginBottom: '0.8rem' }}>
              SPECIFICATIONS & CARE
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: '#D8CBB8' }}>
              <li>• Fabric: {product.fabric}</li>
              <li>• Weave: {product.weave}</li>
              <li>• Care: {product.care}</li>
              <li>• Includes: Saree + Unstitched Blouse Piece (80cm)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* CART DRAWER COMPONENT                                                      */
/* -------------------------------------------------------------------------- */
const CartDrawer = ({ cart, isOpen, onClose, onUpdateQty, onRemove, onCheckout }) => {
  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="cart-drawer-backdrop" onClick={onClose}>
      <div className="cart-drawer-content" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h3 className="brand-logo-text" style={{ fontSize: '1.4rem' }}>
            YOUR SHOPPING BAG ({cart.reduce((a, b) => a + b.quantity, 0)})
          </h3>
          <button className="icon-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {cart.length === 0 ? (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <ShoppingBag size={48} strokeWidth={1} color="#C9A96E" />
            <p style={{ margin: '1.5rem 0', color: '#E6DFD3' }}>Your shopping bag is currently empty.</p>
            <button className="btn-outline-luxury" onClick={onClose}>
              CONTINUE SHOPPING
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items-list">
              {cart.map((item) => (
                <div key={item.id} className="cart-item-card">
                  <img src={item.image} alt={item.name} className="cart-item-img" />
                  <div>
                    <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', color: '#F5F0E8' }}>
                      {item.name}
                    </h4>
                    <span style={{ fontSize: '0.8rem', color: '#C9A96E' }}>
                      ₹{item.price.toLocaleString('en-IN')}
                    </span>
                    <div className="quantity-control" style={{ marginTop: '0.6rem', scale: '0.85', transformOrigin: 'left center' }}>
                      <button className="qty-btn" onClick={() => onUpdateQty(item.id, item.quantity - 1)}>
                        <Minus size={12} />
                      </button>
                      <span className="qty-val">{item.quantity}</span>
                      <button className="qty-btn" onClick={() => onUpdateQty(item.id, item.quantity + 1)}>
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                  <button className="icon-btn" onClick={() => onRemove(item.id)} style={{ color: '#888' }}>
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-subtotal-row">
                <span>SUBTOTAL</span>
                <span style={{ color: '#C9A96E' }}>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <p style={{ fontSize: '0.75rem', color: '#888' }}>
                Complimentary worldwide luxury packaging & express courier included.
              </p>
              <button className="btn-primary-luxury" style={{ width: '100%' }} onClick={onCheckout}>
                PROCEED TO CHECKOUT
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* SEARCH MODAL COMPONENT                                                    */
/* -------------------------------------------------------------------------- */
const SearchModal = ({ isOpen, onClose, onSelectProduct }) => {
  const [query, setQuery] = useState('');
  if (!isOpen) return null;

  const results = query
    ? productsData.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.fabric.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="search-modal-backdrop" onClick={onClose}>
      <button className="modal-close-btn" onClick={onClose} style={{ top: '2rem', right: '2rem' }}>
        <X size={24} />
      </button>

      <div className="search-input-container" onClick={(e) => e.stopPropagation()}>
        <input
          type="text"
          placeholder="Search sarees by silk, banarasi, color..."
          className="search-input-field"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />

        {results.length > 0 && (
          <div style={{ marginTop: '2rem', background: '#121212', padding: '1.5rem', border: '1px solid rgba(201,169,110,0.2)' }}>
            {results.map((product) => (
              <div
                key={product.id}
                style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.8rem 0', borderBottom: '1px solid rgba(245,240,232,0.1)', cursor: 'pointer' }}
                onClick={() => {
                  onSelectProduct(product);
                  onClose();
                }}
              >
                <img src={product.image} alt={product.name} style={{ width: '50px', height: '65px', objectFit: 'cover' }} />
                <div>
                  <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', color: '#F5F0E8' }}>{product.name}</h4>
                  <span style={{ fontSize: '0.8rem', color: '#C9A96E' }}>₹{product.price.toLocaleString('en-IN')}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* MAIN HOME COMPONENT                                                       */
/* -------------------------------------------------------------------------- */
export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filterCategory, setFilterCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [toastMessage, setToastMessage] = useState('');

  // Initialize AOS scroll animations safely
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-cubic',
      offset: 50
    });
  }, []);

  // Scroll listener for sticky transparent-to-dark navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  // Cart operations
  const handleAddToCart = (product, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      return [...prev, { ...product, quantity: qty }];
    });
    showToast(`Added "${product.name}" to your shopping bag.`);
    setCartDrawerOpen(true);
  };

  const handleUpdateCartQty = (id, newQty) => {
    if (newQty <= 0) {
      handleRemoveCartItem(id);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveCartItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Wishlist toggle
  const handleToggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) {
        showToast(`Removed "${product.name}" from wishlist.`);
        return prev.filter((p) => p.id !== product.id);
      }
      showToast(`Saved "${product.name}" to your wishlist.`);
      return [...prev, product];
    });
  };

  const wishlistIds = wishlist.map((p) => p.id);

  // Filter & Sort logic for Shop page view
  const filteredProducts = productsData.filter((p) => {
    if (filterCategory === 'All') return true;
    return p.category.toLowerCase() === filterCategory.toLowerCase();
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return 0;
  });

  return (
    <div className="aavira-app-root">
      <CustomCursor />

      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#181818',
            color: '#C9A96E',
            border: '1px solid #C9A96E',
            padding: '0.9rem 2rem',
            fontSize: '0.8rem',
            letterSpacing: '0.15em',
            zIndex: 9999,
            boxShadow: '0 10px 30px rgba(0,0,0,0.8)',
            textTransform: 'uppercase'
          }}
        >
          {toastMessage}
        </div>
      )}

      {/* NAVBAR */}
      <Navbar
        scrolled={scrolled}
        cartCount={cart.reduce((a, b) => a + b.quantity, 0)}
        wishlistCount={wishlist.length}
        onOpenCart={() => setCartDrawerOpen(true)}
        onOpenWishlist={() => setActiveTab('shop')}
        onOpenSearch={() => setSearchOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* MAIN CONTENT VIEWS */}
      {activeTab === 'shop' ? (
        <main className="shop-page-wrapper">
          <div className="shop-header-banner" data-aos="fade-down">
            <span className="section-tag-gold">THE FULL DRAPE ARCHIVE</span>
            <h1 className="section-title-large">THE COLLECTION</h1>
            <p className="section-subtitle-subtle">
              Discover timeless Banarasi, Kanchipuram, and modern silk creations.
            </p>
          </div>

          <div className="luxury-container shop-layout">
            {/* SIDEBAR FILTERS */}
            <aside className="filter-sidebar" data-aos="fade-right">
              <div>
                <h4 className="filter-group-title">CATEGORIES</h4>
                <ul className="filter-option-list">
                  {['All', 'Silk', 'Heritage', 'Bridal', 'Contemporary'].map((cat) => (
                    <li key={cat}>
                      <button
                        className={`filter-btn-option ${filterCategory === cat ? 'active' : ''}`}
                        onClick={() => setFilterCategory(cat)}
                      >
                        {cat}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* PRODUCT GRID */}
            <div>
              <div className="sort-toolbar" data-aos="fade-left">
                <span style={{ fontSize: '0.85rem', color: '#888' }}>
                  SHOWING {filteredProducts.length} DESIGNS
                </span>
                <select
                  className="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="featured">Featured Order</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>

              <div className="products-grid-4" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                {filteredProducts.map((product, idx) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={idx}
                    onQuickView={(p) => setSelectedProduct(p)}
                    onToggleWishlist={handleToggleWishlist}
                    isWishlisted={wishlistIds.includes(product.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        </main>
      ) : (
        <main>
          {/* HERO */}
          <Hero
            onExploreClick={() => {
              const elem = document.getElementById('signature-section');
              if (elem) elem.scrollIntoView({ behavior: 'smooth' });
            }}
            onStoryClick={() => {
              const elem = document.getElementById('craft-section');
              if (elem) elem.scrollIntoView({ behavior: 'smooth' });
            }}
          />

          {/* SIGNATURE COLLECTION */}
          <Collection
            products={productsData}
            onQuickView={(p) => setSelectedProduct(p)}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlistIds}
          />

          {/* CATEGORIES */}
          <CategorySection
            onSelectCategory={(catName) => {
              setFilterCategory(catName);
              setActiveTab('shop');
            }}
          />

          {/* EDITORIAL BANNER */}
          <EditorialSection
            onExploreEdit={() => {
              setActiveTab('shop');
            }}
          />

          {/* CRAFTSMANSHIP */}
          <Craftsmanship />

          {/* BRIDAL EDIT */}
          <BridalSection
            onDiscoverBridal={() => {
              setFilterCategory('Bridal');
              setActiveTab('shop');
            }}
          />

          {/* TESTIMONIALS */}
          <Testimonials />

          {/* JOURNAL */}
          <Journal />

          {/* NEWSLETTER */}
          <Newsletter />
        </main>
      )}

      {/* FOOTER */}
      <Footer />

      {/* MODALS & DRAWERS */}
      {selectedProduct && (
        <ProductPage
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          isWishlisted={wishlistIds.includes(selectedProduct.id)}
        />
      )}

      <CartDrawer
        cart={cart}
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        onUpdateQty={handleUpdateCartQty}
        onRemove={handleRemoveCartItem}
        onCheckout={() => {
          showToast('Order confirmed! Thank you for choosing KANCHIRA Couture.');
          setCart([]);
          setCartDrawerOpen(false);
        }}
      />

      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />
    </div>
  );
}
