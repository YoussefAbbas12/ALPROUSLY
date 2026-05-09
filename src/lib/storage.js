import productsData from '../data/products.json'

export function getProducts() {
  return productsData
}

export function getProductById(id) {
  return productsData.find(p => p.id === id)
}

// Carousel Defaults
const DEFAULT_CAROUSEL = [
  {
    id: '1',
    title: 'Elevate Your Performance',
    description: 'Discover the new AeroSwift collection designed for champions.',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2000',
    link: '/products'
  },
  {
    id: '2',
    title: 'CloudWalk Technology',
    description: 'Experience unmatched comfort with our responsive energy return soles.',
    image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=2000',
    link: '/products'
  },
  {
    id: '3',
    title: 'The Stealth Collection',
    description: 'Premium compression gear for high-intensity training.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2000',
    link: '/products'
  }
]

export function getCarousel() {
  if (typeof window === 'undefined') return DEFAULT_CAROUSEL
  const stored = localStorage.getItem('alprously_carousel')
  return stored ? JSON.parse(stored) : DEFAULT_CAROUSEL
}

export function saveCarousel(slides) {
  localStorage.setItem('alprously_carousel', JSON.stringify(slides))
}

export function getCart() {
  const stored = localStorage.getItem('alprously_cart')
  return stored ? JSON.parse(stored) : []
}

export function saveCart(items) {
  localStorage.setItem('alprously_cart', JSON.stringify(items))
  // Dispatch custom event for navbar update
  window.dispatchEvent(new Event('cart-updated'))
}

export function addToCart(item) {
  const cart = getCart()
  const existing = cart.find(
    i => i.productId === item.productId && i.size === item.size
  )
  if (existing) {
    existing.quantity += item.quantity
  } else {
    cart.push(item)
  }
  saveCart(cart)
}

export function removeFromCart(productId, size) {
  const cart = getCart()
  const filtered = cart.filter(
    i => !(i.productId === productId && i.size === size)
  )
  saveCart(filtered)
}

export function clearCart() {
  localStorage.removeItem('alprously_cart')
  window.dispatchEvent(new Event('cart-updated'))
}

export function getOrders() {
  const stored = localStorage.getItem('alprously_orders')
  return stored ? JSON.parse(stored) : []
}

export function saveOrder(order) {
  const orders = getOrders()
  orders.push(order)
  localStorage.setItem('alprously_orders', JSON.stringify(orders))
}
