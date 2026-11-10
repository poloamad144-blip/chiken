import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { PromoBanner } from './components/PromoBanner';
import { BrandExperience } from './components/BrandExperience';
import { OffersSection } from './components/OffersSection';
import { BranchesSection } from './components/BranchesSection';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { ProductModal } from './components/ProductModal';
import { Toast } from './components/Toast';
import { Footer } from './components/Footer';
import { CinematicIntro } from './components/CinematicIntro';
import { CustomCursor } from './components/CustomCursor';
import { CartItem, MenuItem, OrderData } from './types/restaurant';
import {
  ASSET_SERVING_PLATTER,
  ASSET_CRISPY_THIGH,
  ASSET_CRISPY_WING,
  ASSET_FLYING_DRUMSTICK,
} from './data/menuData';
import { ShoppingBag } from 'lucide-react';

export default function App() {
  // Shopping Cart State with local storage persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('chiken_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [activeModalProduct, setActiveModalProduct] = useState<MenuItem | null>(null);
  const [completedOrder, setCompletedOrder] = useState<OrderData | null>(null);
  const [appliedPromo, setAppliedPromo] = useState<string>('');
  const [toast, setToast] = useState<{ message: string; item?: MenuItem } | null>(null);
  
  // Cinematic Intro state - plays upon opening the website, then transitions to main site
  const [introState, setIntroState] = useState<'playing' | 'transitioning' | 'completed'>('playing');

  // Preload video and key assets for instant playback and render
  useEffect(() => {
    const videoPreload = document.createElement('link');
    videoPreload.rel = 'preload';
    videoPreload.as = 'video';
    videoPreload.href = './chiken-intro.mp4';
    document.head.appendChild(videoPreload);

    [ASSET_SERVING_PLATTER, ASSET_CRISPY_THIGH, ASSET_CRISPY_WING, ASSET_FLYING_DRUMSTICK].forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    return () => {
      if (document.head.contains(videoPreload)) {
        document.head.removeChild(videoPreload);
      }
    };
  }, []);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('chiken_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  // Lock body scroll ONLY while video is playing; unlock as soon as transition starts
  useEffect(() => {
    if (introState === 'playing') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [introState]);

  // Total item count across all quantities
  const totalItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Subtotal in EGP
  const subtotal = cart.reduce((sum, item) => sum + item.item.price * item.quantity, 0);

  // Delivery fee & discount calculations
  const freeDeliveryThreshold = 350;
  let deliveryFee = subtotal >= freeDeliveryThreshold ? 0 : 40;
  let discount = 0;

  if (appliedPromo.toUpperCase() === 'CRUNCH25' && subtotal >= 400) {
    discount = Math.round(subtotal * 0.25);
  } else if (appliedPromo.toUpperCase() === 'FREEDELIVERY') {
    deliveryFee = 0;
    discount = 40;
  }

  const grandTotal = Math.max(0, subtotal + (deliveryFee === 0 ? 0 : deliveryFee) - (appliedPromo.toUpperCase() === 'FREEDELIVERY' ? 0 : discount));

  // Auto-dismiss toast
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      setToast(null);
    }, 3500);
    return () => clearTimeout(timer);
  }, [toast]);

  // Quick Add to Cart (from card)
  const handleAddToCart = (product: MenuItem) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (ci) => ci.item.id === product.id && !ci.specialInstructions
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      }
      return [
        ...prev,
        {
          id: `${product.id}-${Date.now()}`,
          item: product,
          quantity: 1,
          spiceLevel: (product.spiciness || 0) >= 2 ? 'Hot' : 'Mild',
          selectedSauce: product.includedDips?.[0] || 'Signature CHIKEN Sauce',
        },
      ];
    });

    setToast({
      message: `${product.name} added!`,
      item: product,
    });
  };

  // Add with Custom Options (from ProductModal)
  const handleAddToCartWithOptions = (
    product: MenuItem,
    quantity: number,
    spiceLevel?: 'Mild' | 'Hot' | 'Ghost Spicy',
    sauce?: string,
    notes?: string
  ) => {
    setCart((prev) => [
      ...prev,
      {
        id: `${product.id}-${Date.now()}`,
        item: product,
        quantity,
        spiceLevel,
        selectedSauce: sauce,
        specialInstructions: notes,
      },
    ]);

    setToast({
      message: `${quantity}x ${product.name} added!`,
      item: product,
    });
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const handleClearCart = () => {
    setCart([]);
    setAppliedPromo('');
  };

  const handleApplyPromo = (code: string) => {
    setAppliedPromo(code);
    setToast({
      message: `Coupon code ${code} activated!`,
    });
  };

  const handleOrderPlaced = (order: OrderData) => {
    setCompletedOrder(order);
    setCart([]);
    setAppliedPromo('');
    setIsCheckoutOpen(false);
  };

  const scrollToMenu = () => {
    const el = document.getElementById('menu');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOrderNowClick = () => {
    if (cart.length > 0) {
      setIsCartOpen(true);
    } else {
      scrollToMenu();
    }
  };

  const handleIntroTransitionStart = () => {
    setIntroState('transitioning');
  };

  const handleCompleteIntro = () => {
    try {
      sessionStorage.setItem('chiken_intro_seen', 'true');
    } catch {
      // ignore
    }
    setIntroState('completed');
  };

  return (
    <div className="min-h-screen bg-[#070606] text-[#FFF4E5] flex flex-col font-sans selection:bg-[#C8102E] selection:text-white relative overflow-x-hidden">
      
      {/* Custom Fried Chicken Drumstick Cursor (Desktop) */}
      <CustomCursor />

      {/* =========================================================================
          CINEMATIC INTRO: EDGE-TO-EDGE PURE VIDEO WITH SIDE-MOVE EXIT
         ========================================================================= */}
      {introState !== 'completed' && (
        <CinematicIntro
          onTransitionStart={handleIntroTransitionStart}
          onComplete={handleCompleteIntro}
        />
      )}

      {/* =========================================================================
          PRE-RENDERED WEBSITE: EXPANDS FROM BEHIND THE VIDEO AS IT MOVES ASIDE
         ========================================================================= */}
      <motion.div
        animate={{
          scale: introState === 'playing' ? 0.96 : 1,
          opacity: introState === 'playing' ? 0.85 : 1,
          filter: introState === 'playing' ? 'blur(2px)' : 'blur(0px)',
        }}
        transition={{
          duration: 1.1,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="flex-1 flex flex-col w-full origin-right"
      >
        {/* Sticky Header Navigation */}
        <motion.div
          animate={{
            y: introState === 'playing' ? -20 : 0,
            opacity: introState === 'playing' ? 0 : 1,
          }}
          transition={{
            duration: 0.8,
            delay: introState === 'transitioning' ? 0.2 : 0,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <Navbar
            cartCount={totalItemCount}
            onOpenCart={() => setIsCartOpen(true)}
            onOrderNowClick={handleOrderNowClick}
          />
        </motion.div>

        {/* Main Page Sections */}
        <main className="flex-1">
          {/* 1. Hero Section */}
          <Hero
            onExploreMenu={scrollToMenu}
            onOrderNow={handleOrderNowClick}
            onAddToCart={handleAddToCart}
            onOpenProductModal={(item) => setActiveModalProduct(item)}
          />

          {/* 2. Menu Preview & Signature Products */}
          <MenuSection
            onAddToCart={handleAddToCart}
            onOpenDetails={(item) => setActiveModalProduct(item)}
          />

          {/* 3. Promotional Section */}
          <PromoBanner
            onClaimDeal={(code) => {
              handleApplyPromo(code);
              scrollToMenu();
            }}
          />

          {/* 4. Brand Experience Section */}
          <BrandExperience />

          {/* 5. Special Offers */}
          <OffersSection
            onApplyPromo={(code) => {
              handleApplyPromo(code);
              setIsCartOpen(true);
            }}
          />

          {/* 6. Branches & Contact */}
          <BranchesSection />
        </main>

        {/* Footer */}
        <Footer />
      </motion.div>

      {/* Floating Cart Button for Mobile (when items in cart) */}
      {totalItemCount > 0 && !isCartOpen && (
        <button
          onClick={() => setIsCartOpen(true)}
          className="lg:hidden fixed bottom-6 left-6 right-6 z-30 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#C8102E] to-[#92051C] text-white font-heading text-lg tracking-wider shadow-2xl shadow-[#C8102E]/60 flex items-center justify-between border border-[#F5B82E]/40 animate-in slide-in-from-bottom-6 cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#F5B82E] text-black font-sans text-[10px] font-bold flex items-center justify-center">
                {totalItemCount}
              </span>
            </div>
            <span>VIEW CRISPY CART</span>
          </div>
          <span className="tabular-nums font-bold text-[#F5B82E]">
            {grandTotal} EGP
          </span>
        </button>
      )}

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        appliedPromo={appliedPromo}
        onApplyPromo={handleApplyPromo}
        onOpenCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Product Customization Modal */}
      <ProductModal
        product={activeModalProduct}
        onClose={() => setActiveModalProduct(null)}
        onAddToCartWithOptions={handleAddToCartWithOptions}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        subtotal={subtotal}
        deliveryFee={deliveryFee}
        discount={discount}
        total={grandTotal}
        appliedPromo={appliedPromo}
        onOrderPlaced={handleOrderPlaced}
      />

      {/* Order Confirmation Success Modal */}
      <OrderSuccessModal
        order={completedOrder}
        onClose={() => setCompletedOrder(null)}
      />

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          item={toast.item}
          onViewCart={() => {
            setToast(null);
            setIsCartOpen(true);
          }}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
