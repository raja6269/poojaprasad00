"use client";

import React, { useState } from "react";
import { ShoppingCart, Phone, Trash2, CheckCircle2 } from "lucide-react";

// 1. Define the Product Structure
interface Product {
  id: string;
  name: string;
  category: "Laddoo" | "Peda" | "Dry Fruits" | "Combo Packs";
  price: number;
  unit: string;
  image: string;
  description: string;
}

// 2. Sample Data for Prasad Items
const PRASAD_PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Pure Desi Ghee Besan Laddoo",
    category: "Laddoo",
    price: 320,
    unit: "500g",
    image: "https://unsplash.com",
    description: "Traditional melt-in-the-mouth laddoos made with pure cow ghee and premium gram flour."
  },
  {
    id: "p2",
    name: "Mathura Peda (Special Prasad)",
    category: "Peda",
    price: 280,
    unit: "500g",
    image: "https://unsplash.com",
    description: "Authentic caramelized milk solids infused with cardamom, perfect for bhog."
  },
  {
    id: "p3",
    name: "Premium Panchamrit Dry Fruit Mix",
    category: "Dry Fruits",
    price: 450,
    unit: "250g",
    image: "https://unsplash.com",
    description: "A holy blend of almonds, cashews, raisins, foxnuts (makhana), and dry coconut."
  },
  {
    id: "p4",
    name: "Maha Bhog Shringar Combo",
    category: "Combo Packs",
    price: 999,
    unit: "1 Pack",
    image: "https://unsplash.com",
    description: "Includes 500g Laddoo, 500g Peda, 250g Dry Fruits, Kumkum, Akshat, and a Mauli thread."
  }
];

// Replace with your store's registered WhatsApp number (including country code, without +)
const WHATSAPP_NUMBER = "919876543210"; 

export default function PoojaPrasadStore() {
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "Laddoo", "Peda", "Dry Fruits", "Combo Packs"];

  // Cart Management Functions
  const addToCart = (id: string) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => {
      const updated = { ...prev };
      if (updated[id] > 1) {
        updated[id] -= 1;
      } else {
        delete updated[id];
      }
      return updated;
    });
  };

  const clearItem = (id: string) => {
    setCart((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  // Calculations
  const filteredProducts = activeCategory === "All" 
    ? PRASAD_PRODUCTS 
    : PRASAD_PRODUCTS.filter(p => p.category === activeCategory);

  const cartItemsCount = Object.values(cart).reduce((a, b) => a + b, 0);
  
  const totalPrice = Object.entries(cart).reduce((sum, [id, qty]) => {
    const product = PRASAD_PRODUCTS.find((p) => p.id === id);
    return sum + (product ? product.price * qty : 0);
  }, 0);

  // Generate WhatsApp text and redirect link
  const handleCheckoutViaWhatsApp = () => {
    if (cartItemsCount === 0) return;

    let message = `*🌸 New Pooja Prasad Order 🌸*\n\n`;
    message += `Hello! I would like to order the following sacred offerings:\n\n`;

    Object.entries(cart).forEach(([id, qty]) => {
      const product = PRASAD_PRODUCTS.find((p) => p.id === id);
      if (product) {
        message += `▪️ *${product.name}* (${product.unit})\n`;
        message += `   Qty: ${qty} x ₹${product.price} = *₹${product.price * qty}*\n\n`;
      }
    });

    message += `-----------------------------\n`;
    message += `💰 *Total Bill Amount: ₹${totalPrice}*\n`;
    message += `-----------------------------\n\n`;
    message += `Please confirm my order and send payment details. 🙏`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me{WHATSAPP_NUMBER}?text=${encodedMessage}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-orange-50/40 text-stone-800 antialiased">
      {/* Top Banner */}
      <div className="bg-amber-600 text-amber-50 text-center py-2 px-4 text-xs font-medium tracking-wide">
        🚩 Pure Desi Ghee & Freshly Prepared Satvik Bhog Prasad Delivered to Your Doorstep
      </div>

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-orange-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🕉️</span>
            <div>
              <h1 className="text-xl font-bold font-serif text-amber-800 tracking-tight">Divine Prasad Bhandar</h1>
              <p className="text-[10px] text-stone-500 uppercase tracking-widest font-semibold">Pure • Sacred • Satvik</p>
            </div>
          </div>
          
          <a 
            href="#cart-section" 
            className="relative p-2.5 bg-orange-100 hover:bg-orange-200 text-orange-800 rounded-full transition-colors flex items-center"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center font-bold animate-pulse">
                {cartItemsCount}
              </span>
            )}
          </a>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-amber-700 to-orange-800 text-white rounded-3xl p-6 sm:p-10 mb-12 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-10 text-9xl pointer-events-none font-serif">🕉️</div>
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/30 text-amber-200 border border-amber-400/20 mb-4">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> 100% Shuddh & Satvik Guaranteed
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-serif leading-tight mb-4">
              Bring Home the Divine Blessings with Premium Prasad
            </h2>
            <p className="text-amber-100 text-sm sm:text-base mb-6 leading-relaxed">
              Handcrafted carefully following traditional Vedic recipes using premium ingredients, organic dry fruits, and native cow ghee.
            </p>
            <a 
              href="#products-grid" 
              className="inline-block bg-white text-orange-950 font-bold px-6 py-3 rounded-xl hover:bg-amber-50 shadow-md transition-transform active:scale-95"
            >
              Explore Menu & Price List
            </a>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex overflow-x-auto pb-4 mb-8 no-scrollbar gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 text-sm font-medium rounded-xl whitespace-nowrap transition-all ${
                activeCategory === category
                  ? "bg-amber-700 text-white shadow-md shadow-amber-700/20"
                  : "bg-white text-stone-600 hover:bg-orange-50 border border-orange-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start" id="products-grid">
          
          {/* Left Column: Product Cards List */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filteredProducts.map((product) => {
              const qty = cart[product.id] || 0;
              return (
                <div key={product.id} className="bg-white rounded-2xl border border-orange-100 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                  <div>
                    <div className="relative h-48 bg-stone-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-xs font-semibold text-amber-900 px-2.5 py-1 rounded-md shadow-xs">
                        {product.category}
                      </span>
                    </div>
                    
                    <div className="p-5">
                      <div className="flex justify-between items-start gap-2 mb-2">
                        <h3 className="font-bold text-lg text-stone-900 leading-snug">{product.name}</h3>
                      </div>
                      <p className="text-xs text-stone-500 mb-4 line-clamp-2">{product.description}</p>
                    </div>
                  </div>

                  <div className="p-5 pt-0 border-t border-stone-50 flex items-center justify-between mt-auto bg-stone-50/50">
                    <div>
                      <span className="text-xl font-black text-stone-900">₹{product.price}</span>
                      <span className="text-xs text-stone-500 font-medium ml-1">/ {product.unit}</span>
                    </div>

                    {qty > 0 ? (
                      <div className="flex items-center bg-amber-700 text-white rounded-xl shadow-xs overflow-hidden">
                        <button 
