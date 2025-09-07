import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { LoginModal } from './components/LoginModal';
import { ProductGrid } from './components/ProductGrid';
import { ProductModal } from './components/ProductModal';
import { CartModal, CartItem } from './components/CartModal';
import { AdminPanel } from './components/AdminPanel';
import { UserProfile } from './components/UserProfile';
import { PromoBanner } from './components/PromoBanner';
import { Product } from './components/ProductCard';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner@2.0.3';

// Datos iniciales de productos
const initialProducts: Product[] = [
  // Zapatillas
  {
    id: '1',
    name: 'Vans Old Skool',
    category: 'Zapatillas',
    image: 'https://i.ibb.co/XnFqDZz/vans2.jpg',
    price: 36000,
    sizes: '34-38',
    stock: 15
  },
  {
    id: '2',
    name: 'Vans Old Skool Black',
    category: 'Zapatillas',
    image: 'https://i.ibb.co/9991FgJR/vans3.jpg',
    price: 36000,
    sizes: '38-42',
    stock: 12
  },
  {
    id: '3',
    name: 'Vans Old Skool White',
    category: 'Zapatillas',
    image: 'https://i.ibb.co/FL3t2TQg/vans11.jpg',
    price: 36000,
    sizes: '34-38',
    stock: 18
  },
  {
    id: '4',
    name: 'New Balance 740',
    category: 'Zapatillas',
    image: 'https://i.ibb.co/VsFvFBL/nb1.jpg',
    price: 45000,
    sizes: '35-39',
    stock: 8
  },
  {
    id: '5',
    name: 'Botas CAT Impermeables',
    category: 'Zapatillas',
    image: 'https://i.ibb.co/wrswVjXX/cat2.jpg',
    price: 35000,
    sizes: '38-43',
    stock: 6
  },
  {
    id: '6',
    name: 'Adidas SL 72 N',
    category: 'Zapatillas',
    image: 'https://i.ibb.co/DPDkYyb0/adidas2.jpg',
    price: 43000,
    sizes: '35-39',
    stock: 10
  },
  {
    id: '7',
    name: 'Adidas SL 72 RS',
    category: 'Zapatillas',
    image: 'https://i.ibb.co/SDGZ1wMX/adidas1.jpg',
    price: 40000,
    sizes: '34-38',
    stock: 14
  },
  {
    id: '8',
    name: 'Pumas Caven 2.0',
    category: 'Zapatillas',
    image: 'https://i.ibb.co/8nKNz3SG/pumas1.jpg',
    price: 42700,
    sizes: '38-41',
    stock: 9
  },
  // Cremas Skala
  {
    id: '9',
    name: 'Skala Crema Para Peinar Abacate',
    category: 'Cremas Skala',
    image: 'https://i.ibb.co/MDyVFdDJ/skaabacate.png',
    price: 6390,
    boxPrice: 33590,
    stock: 25
  },
  {
    id: '10',
    name: 'Skala Impecavel Ceramidas G3 Crema Acondicionador',
    category: 'Cremas Skala',
    image: 'https://i.ibb.co/CK9ccxsk/skacera.png',
    price: 6800,
    boxPrice: 37200,
    stock: 30
  },
  {
    id: '11',
    name: 'Mascara Skala Coquetel De Frutas Liberada Vegana',
    category: 'Cremas Skala',
    image: 'https://i.ibb.co/8Lj1tPrd/skabebe.png',
    price: 6490,
    boxPrice: 34900,
    stock: 20
  },
  {
    id: '12',
    name: 'Skala Crema De Peinar Hidratacion Profunda',
    category: 'Cremas Skala',
    image: 'https://i.ibb.co/sdsfMMw7/babosa.png',
    price: 6000,
    boxPrice: 31200,
    stock: 22
  },
  {
    id: '13',
    name: 'Skala Mascara Crema Vinagre De Maca Manzana Vegana',
    category: 'Cremas Skala',
    image: 'https://i.ibb.co/0jM0PShT/manza.png',
    price: 6300,
    boxPrice: 35400,
    stock: 18
  },
  {
    id: '14',
    name: 'Mascara Skala 12 En 1 Restauración',
    category: 'Cremas Skala',
    image: 'https://i.ibb.co/s9cmCNJk/12-1.png',
    price: 5350,
    boxPrice: 29700,
    stock: 35
  },
  {
    id: '15',
    name: 'Skala Máscara Coco Frutástica 2 En 1 Nutrición',
    category: 'Cremas Skala',
    image: 'https://i.ibb.co/Nnyd1PZ3/coco.png',
    price: 5600,
    boxPrice: 30600,
    stock: 28
  },
  {
    id: '16',
    name: 'Máscara Skala MAIS CACHOS hidratación',
    category: 'Cremas Skala',
    image: 'https://i.ibb.co/xqNgXntL/celeste.png',
    price: 9120,
    boxPrice: 48120,
    stock: 15
  },
  {
    id: '17',
    name: 'Mascara Divino Potao Crema Peinar Rulos Skala Vegana',
    category: 'Cremas Skala',
    image: 'https://i.ibb.co/bjwz8VSZ/rosada.png',
    price: 6450,
    boxPrice: 35800,
    stock: 24
  },
  {
    id: '18',
    name: 'Mascara Skala 2 En 1 Banana Y Bacuri',
    category: 'Cremas Skala',
    image: 'https://i.ibb.co/v6mP9nQ7/banana.png',
    price: 5100,
    boxPrice: 27500,
    stock: 32
  },
  {
    id: '19',
    name: 'Skala Potao Desmaiado Máscara Vegana Anti Frizz Pelo',
    category: 'Cremas Skala',
    image: 'https://i.ibb.co/390phs5F/dificil.png',
    price: 5150,
    boxPrice: 27900,
    stock: 26
  },
  {
    id: '20',
    name: 'Mascara Crema Skala Dona 2 En 1 Crema Peinar Vegana',
    category: 'Cremas Skala',
    image: 'https://i.ibb.co/Mk5CBSmT/roda.png',
    price: 5800,
    boxPrice: 30400,
    stock: 19
  },
  {
    id: '21',
    name: 'Baño De Crema Skala Maracuya Fortalecedor',
    category: 'Cremas Skala',
    image: 'https://i.ibb.co/QFXrH5pD/br.png',
    price: 6990,
    boxPrice: 35790,
    stock: 21
  },
  {
    id: '22',
    name: 'Skala Genetic Glicolico Crema Vegana Brillo Hidratación 1kg',
    category: 'Cremas Skala',
    image: 'https://i.ibb.co/yBFY95FH/colico.png',
    price: 6190,
    boxPrice: 32100,
    stock: 17
  },
  {
    id: '23',
    name: 'Skala Macara Capilar Uva 2 En 1 Brillo Extremo',
    category: 'Cremas Skala',
    image: 'https://i.ibb.co/Q7p11Nv3/u.png',
    price: 6890,
    boxPrice: 39500,
    stock: 23
  },
  {
    id: '24',
    name: 'Skala Mascara Crema Para Peinar Frutilla Morango Vegana',
    category: 'Cremas Skala',
    image: 'https://i.ibb.co/jvwv9bjs/moran.png',
    price: 6295,
    boxPrice: 32770,
    stock: 29
  },
  // Pasta dental
  {
    id: '25',
    name: 'Colgate Total 12 Advanced Health',
    category: 'Pasta dental',
    image: 'https://images.unsplash.com/photo-1755086598087-771fc08e1ae5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xnYXRlJTIwdG9vdGhwYXN0ZSUyMGRlbnRhbCUyMGNhcmV8ZW58MXx8fHwxNzU3MjY5MTM3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    price: 4500,
    stock: 40
  },
  {
    id: '26',
    name: 'Colgate Luminous White Advanced',
    category: 'Pasta dental',
    image: 'https://images.unsplash.com/photo-1755086598087-771fc08e1ae5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xnYXRlJTIwdG9vdGhwYXN0ZSUyMGRlbnRhbCUyMGNhcmV8ZW58MXx8fHwxNzU3MjY5MTM3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    price: 5200,
    stock: 35
  },
  // Perfumes árabes
  {
    id: '27',
    name: 'Perfume Árabe Oud Royal Premium',
    category: 'Perfumes árabes',
    image: 'https://images.unsplash.com/photo-1650686036849-ff87bcaa2e9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmFiaWMlMjBwZXJmdW1lJTIwbHV4dXJ5JTIwZnJhZ3JhbmNlfGVufDF8fHx8MTc1NzI2OTE0MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    price: 18500,
    stock: 12
  },
  {
    id: '28',
    name: 'Perfume Árabe Rose Damascus Luxury',
    category: 'Perfumes árabes',
    image: 'https://images.unsplash.com/photo-1650686036849-ff87bcaa2e9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmFiaWMlMjBwZXJmdW1lJTIwbHV4dXJ5JTIwZnJhZ3JhbmNlfGVufDF8fHx8MTc1NzI2OTE0MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    price: 22000,
    stock: 8
  }
];

interface UserData {
  name: string;
  email: string;
  registeredAt: string;
  isAdmin: boolean;
}

export default function App() {
  // Estados principales
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currency, setCurrency] = useState('USD');
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
  // Estados de modales
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);
  
  // Estados de datos
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [exchangeRates] = useState({ USD: 1, ARS: 800, PYG: 7300 });

  // Aplicar tema
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  // Restaurar carrito cuando el usuario inicie sesión
  useEffect(() => {
    if (currentUser) {
      const userCartKey = `tikva-cart-${currentUser.email}`;
      const savedUserCart = localStorage.getItem(userCartKey);
      if (savedUserCart) {
        try {
          const parsedCart = JSON.parse(savedUserCart);
          setCartItems(parsedCart);
        } catch (error) {
          console.error('Error loading user cart from localStorage:', error);
          setCartItems([]);
        }
      }
    }
  }, [currentUser]);

  // Guardar carrito específico del usuario (solo si está logueado)
  useEffect(() => {
    if (currentUser && cartItems.length >= 0) {
      const userCartKey = `tikva-cart-${currentUser.email}`;
      localStorage.setItem(userCartKey, JSON.stringify(cartItems));
    }
  }, [cartItems, currentUser]);

  // Funciones de navegación
  const scrollToProducts = () => {
    const element = document.getElementById('productos');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  // Funciones de autenticación
  const handleLogin = (email: string, password: string, name?: string, isRegistering?: boolean) => {
    // Validación para admin
    if (email === 'facu.esteche05@gmail.com') {
      if (password !== 'admin123') {
        toast.error('Contraseña incorrecta para el administrador');
        return;
      }
    }
    
    const isAdmin = email === 'facu.esteche05@gmail.com';
    
    const userData: UserData = {
      name: name || (isAdmin ? 'Facu Esteche' : 'Usuario'),
      email,
      registeredAt: new Date().toISOString(),
      isAdmin
    };

    setCurrentUser(userData);
    setIsLoginModalOpen(false);
    
    if (isRegistering) {
      toast.success(`¡Bienvenido ${userData.name}! Te has registrado exitosamente.`);
    } else {
      toast.success(`¡Bienvenido ${userData.name}!`);
    }

    if (isAdmin) {
      toast.success('Acceso de administrador activado');
    }
  };

  const handleLogout = () => {
    // Guardar carrito del usuario actual antes de cerrar sesión
    if (currentUser) {
      const userCartKey = `tikva-cart-${currentUser.email}`;
      localStorage.setItem(userCartKey, JSON.stringify(cartItems));
    }
    
    setCurrentUser(null);
    // Limpiar el carrito completamente al cerrar sesión
    setCartItems([]);
    toast.success('Sesión cerrada exitosamente');
  };

  // Funciones del carrito
  const handleAddToCart = (product: Product) => {
    // Solo permitir agregar al carrito si el usuario está logueado
    if (!currentUser) {
      toast.error('Debes iniciar sesión para agregar productos al carrito');
      setIsLoginModalOpen(true);
      return;
    }

    const existingItem = cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
    
    toast.success(`${product.name} añadido al carrito`);
  };

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      handleRemoveFromCart(productId);
      return;
    }
    
    setCartItems(cartItems.map(item =>
      item.id === productId
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
    toast.success('Producto eliminado del carrito');
  };

  const handleCheckout = () => {
    if (!currentUser) {
      setIsLoginModalOpen(true);
      return;
    }

    const message = `🛒 *Pedido desde Tikvá*\n\n` +
      cartItems.map(item => 
        `• ${item.name}\n  Cantidad: ${item.quantity}\n  Precio: $${(item.price * item.quantity).toLocaleString()}`
      ).join('\n\n') +
      `\n\n💰 *Total: $${cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toLocaleString()}*\n\n` +
      `🚚 *Envío gratis incluido*\n\n` +
      `👤 *Cliente:* ${currentUser.name}\n📧 *Email:* ${currentUser.email}`;
    
    const whatsappUrl = `https://wa.me/5493764145766?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    setIsCartModalOpen(false);
    toast.success('Redirigiendo a WhatsApp...');
  };

  // Funciones de administración
  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    toast.success('Producto actualizado');
  };

  const handleAddProduct = (newProduct: Omit<Product, 'id'>) => {
    const product: Product = {
      ...newProduct,
      id: Date.now().toString()
    };
    setProducts([...products, product]);
    toast.success('Producto añadido');
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(products.filter(p => p.id !== productId));
    toast.success('Producto eliminado');
  };

  // Funciones de producto
  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <Navbar
        isDarkMode={isDarkMode}
        onThemeToggle={() => setIsDarkMode(!isDarkMode)}
        currency={currency}
        onCurrencyChange={setCurrency}
        onLoginClick={() => setIsLoginModalOpen(true)}
        cartItemsCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setIsCartModalOpen(true)}
        isLoggedIn={!!currentUser}
        userEmail={currentUser?.email}
        onLogout={handleLogout}
        onProfileClick={() => setIsUserProfileOpen(true)}
      />

      {/* Contenido principal */}
      <main className="pt-16">
        {/* Banner de promociones */}
        <PromoBanner onScrollToProducts={scrollToProducts} />

        {/* Sección de productos */}
        <section id="productos" className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Nuestros Productos</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Descubre nuestra selección de productos de calidad premium con envío gratis y los mejores precios del mercado
              </p>
            </div>

            <ProductGrid
              products={products}
              currency={currency}
              onAddToCart={handleAddToCart}
              onViewDetails={handleViewDetails}
            />
          </div>
        </section>

        {/* Botón flotante de admin */}
        {currentUser?.isAdmin && (
          <button
            onClick={() => setIsAdminPanelOpen(true)}
            className="fixed bottom-6 right-6 bg-primary text-primary-foreground p-4 rounded-full shadow-lg hover:shadow-xl transition-all z-40"
          >
            ⚙️
          </button>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-card border-t py-8">
        <div className="container mx-auto px-4 text-center">
          <h3 className="font-bold text-xl mb-4 text-primary">Tikvá</h3>
          <p className="text-muted-foreground mb-4">
            Tu tienda de confianza para productos de calidad premium
          </p>
          <div className="flex justify-center space-x-4">
            <a 
              href="https://www.instagram.com/tikva_ok/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary"
            >
              Instagram
            </a>
            <a 
              href="https://www.facebook.com/profile.php?id=61579900372343" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary"
            >
              Facebook
            </a>
            <a 
              href="https://wa.me/5493764145766" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </footer>

      {/* Modales */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
      />

      <ProductModal
        product={selectedProduct}
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        currency={currency}
        onAddToCart={handleAddToCart}
      />

      <CartModal
        isOpen={isCartModalOpen}
        onClose={() => setIsCartModalOpen(false)}
        cartItems={cartItems}
        currency={currency}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={handleCheckout}
        isLoggedIn={!!currentUser}
        onLoginRequired={() => setIsLoginModalOpen(true)}
      />

      {currentUser?.isAdmin && (
        <AdminPanel
          isOpen={isAdminPanelOpen}
          onClose={() => setIsAdminPanelOpen(false)}
          products={products}
          onUpdateProduct={handleUpdateProduct}
          onAddProduct={handleAddProduct}
          onDeleteProduct={handleDeleteProduct}
          exchangeRates={exchangeRates}
          onUpdateExchangeRates={() => {}}
        />
      )}

      {currentUser && (
        <UserProfile
          isOpen={isUserProfileOpen}
          onClose={() => setIsUserProfileOpen(false)}
          userData={currentUser}
          cartHistory={cartItems}
        />
      )}

      {/* Toast notifications */}
      <Toaster />
    </div>
  );
}