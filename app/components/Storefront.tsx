'use client'

import { useState } from 'react'
import { ShoppingCart, X, MapPin, Phone, Heart, Star } from 'lucide-react'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

interface Product {
  id: string
  name: string
  price: number
  image: string
  category: string
  rating: number
  reviews: number
  description: string
}

const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Desi Ghee Prasad',
    price: 299,
    image: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd9a28d?w=400&q=80',
    category: 'Prasad',
    rating: 4.8,
    reviews: 234,
    description: 'Pure desi ghee prasad blessed with divine rituals',
  },
  {
    id: '2',
    name: 'Laddu Set (12 pcs)',
    price: 449,
    image: 'https://images.unsplash.com/photo-1599599810200-a5b5c0c0c1e6?w=400&q=80',
    category: 'Prasad',
    rating: 4.9,
    reviews: 567,
    description: 'Traditional besan and motichur laddus - perfect for offerings',
  },
  {
    id: '3',
    name: 'Pooja Samagri Kit',
    price: 599,
    image: 'https://images.unsplash.com/photo-1599599810500-a5b5c0c0c1e6?w=400&q=80',
    category: 'Samagri',
    rating: 4.7,
    reviews: 312,
    description: 'Complete pooja samagri including flowers, incense, and oils',
  },
  {
    id: '4',
    name: 'Sandalwood Incense Sticks',
    price: 199,
    image: 'https://images.unsplash.com/photo-1599599810300-a5b5c0c0c1e6?w=400&q=80',
    category: 'Incense',
    rating: 4.6,
    reviews: 421,
    description: 'Premium sandalwood agarbatti for divine fragrance',
  },
  {
    id: '5',
    name: 'Tulsi Beads Mala',
    price: 349,
    image: 'https://images.unsplash.com/photo-1599599811100-a5b5c0c0c1e6?w=400&q=80',
    category: 'Spiritual',
    rating: 4.9,
    reviews: 289,
    description: 'Authentic tulsi beads mala for meditation and prayers',
  },
  {
    id: '6',
    name: 'Coconut Prasad Box',
    price: 249,
    image: 'https://images.unsplash.com/photo-1599599810000-a5b5c0c0c1e6?w=400&q=80',
    category: 'Prasad',
    rating: 4.8,
    reviews: 198,
    description: 'Fresh coconut prasad in premium packaging',
  },
]

export default function Storefront() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')

  const addToCart = (product: Product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id)
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [
        ...prevItems,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: product.image,
        },
      ]
    })
  }

  const removeFromCart = (productId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === productId ? { ...item, quantity } : item
        )
      )
    }
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 500 ? 0 : 49
  const total = subtotal + shipping

  const handleWhatsAppCheckout = () => {
    if (!name || !phone || !address) {
      alert('Please fill in all details')
      return
    }

    const cartSummary = cartItems
      .map(item => `${item.name} x${item.quantity} - ₹${item.price * item.quantity}`)
      .join('\n')

    const message = `*Order Summary*\n\n${cartSummary}\n\nSubtotal: ₹${subtotal}\nShipping: ₹${shipping}\n*Total: ₹${total}*\n\nName: ${name}\nPhone: ${phone}\nAddress: ${address}`

    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/919876543210?text=${encodedMessage}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-warmwhite">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-saffron to-crimson rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <h1 className="text-2xl font-bold text-crimson">Pooja Prasad & Samagri</h1>
          </div>
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 bg-saffron hover:bg-amber text-white rounded-lg transition"
          >
            <ShoppingCart size={24} />
            {cartItems.length > 0 && (
              <span className="absolute top-0 right-0 bg-crimson text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-saffron via-amber to-gold py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Blessed Prasad & Sacred Samagri</h2>
          <p className="text-lg text-white/90 mb-6">Premium quality pooja items for your spiritual journey</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg backdrop-blur">
              <Star size={20} className="text-white" />
              <span className="text-white font-semibold">4.8/5 Rating</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg backdrop-blur">
              <Heart size={20} className="text-white" />
              <span className="text-white font-semibold">5000+ Happy Customers</span>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-white py-8 border-b border-saffron/20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-saffron mb-2">✓</div>
              <p className="font-semibold text-gray-800">100% Pure & Organic</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber mb-2">🚚</div>
              <p className="font-semibold text-gray-800">Free Shipping Above ₹500</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-crimson mb-2">💎</div>
              <p className="font-semibold text-gray-800">Temple Blessed</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gold mb-2">📱</div>
              <p className="font-semibold text-gray-800">WhatsApp Support 24/7</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Catalog */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-crimson mb-12 text-center">Our Sacred Collection</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRODUCTS.map(product => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition overflow-hidden"
              >
                <div className="relative h-48 bg-gray-200 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition"
                  />
                  <div className="absolute top-3 right-3 bg-saffron text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {product.category}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-yellow-500">★</span>
                    <span className="font-semibold text-gray-800">{product.rating}</span>
                    <span className="text-sm text-gray-600">({product.reviews})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-crimson">₹{product.price}</span>
                    <button
                      onClick={() => addToCart(product)}
                      className="bg-gradient-to-r from-saffron to-amber hover:from-amber hover:to-gold text-white px-4 py-2 rounded-lg font-semibold transition"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cart Slide-Over */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="absolute inset-0 bg-black/50 transition-opacity"
            onClick={() => setIsCartOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl flex flex-col">
            {/* Cart Header */}
            <div className="flex items-center justify-between p-4 border-b border-saffron/20">
              <h2 className="text-2xl font-bold text-crimson">Your Cart</h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition"
              >
                <X size={24} className="text-gray-600" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart size={48} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-600">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex gap-3 p-3 bg-warmwhite rounded-lg">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{item.name}</h3>
                        <p className="text-sm text-gray-600">₹{item.price}</p>
                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm"
                          >
                            -
                          </button>
                          <span className="px-3 py-1 font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm"
                          >
                            +
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="ml-auto text-red-600 hover:text-red-800"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Checkout Section */}
            {cartItems.length > 0 && (
              <div className="border-t border-saffron/20 p-4 space-y-4">
                {/* Address Section */}
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-saffron"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-saffron"
                  />
                  <textarea
                    placeholder="Delivery Address"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-saffron resize-none"
                  />
                </div>

                {/* Price Summary */}
                <div className="bg-warmwhite p-3 rounded-lg space-y-2">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal:</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Shipping:</span>
                    <span className={shipping === 0 ? 'text-green-600 font-semibold' : ''}>
                      {shipping === 0 ? 'FREE' : `₹${shipping}`}
                    </span>
                  </div>
                  <div className="border-t border-gray-300 pt-2 flex justify-between font-bold text-lg text-crimson">
                    <span>Total:</span>
                    <span>₹{total}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleWhatsAppCheckout}
                  className="w-full bg-gradient-to-r from-saffron to-amber hover:from-amber hover:to-gold text-white py-3 rounded-lg font-bold text-lg transition flex items-center justify-center gap-2"
                >
                  <Phone size={20} />
                  Order via WhatsApp
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gradient-to-r from-crimson to-saffron text-white py-12 mt-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-bold mb-4">About Us</h3>
              <p className="text-white/80">Premium pooja prasad and samagri for your spiritual needs, blessed by temples.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-white/80">
                <li><a href="#" className="hover:text-white transition">Our Products</a></li>
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Contact</h3>
              <p className="text-white/80 flex items-center gap-2">
                <Phone size={16} />
                +91-9876543210
              </p>
              <p className="text-white/80 flex items-center gap-2 mt-2">
                <MapPin size={16} />
                Delhi, India
              </p>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 text-center text-white/80">
            <p>&copy; 2024 Pooja Prasad & Samagri. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
