export interface Product {
  id: string;
  title: string;
  category: 'Bridal Lehengas' | 'Banarasi Sarees' | 'Designer Anarkalis' | 'Indo-Western & Sherwanis' | 'Festive Sets';
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  gallery: string[];
  description: string;
  fabric: string;
  workType: string;
  color: string;
  availableSizes: string[];
  inStock: boolean;
  rating: number;
  reviewsCount: number;
  isNew?: boolean;
  isBestseller?: boolean;
  occasion: string;
  model3dConfig?: {
    dressType: 'lehenga' | 'saree' | 'anarkali' | 'sherwani';
    colorHex: string;
    textureType: 'velvet' | 'silk' | 'georgette' | 'brocade';
    zariShimmer: boolean;
    flareScale: number;
  };
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
  customMeasurements?: {
    bust: string;
    waist: string;
    hips: string;
    length: string;
    notes?: string;
  };
}

export interface CustomerReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  location: string;
  highlight?: string;
}

export interface OrderDetails {
  orderId: string;
  items: CartItem[];
  customer: {
    fullName: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    deliveryMethod: 'home' | 'store_pickup';
    paymentMethod: 'cod' | 'upi' | 'card' | 'store_pay';
    notes?: string;
  };
  pricing: {
    subtotal: number;
    discountAmount: number;
    couponCode?: string;
    shipping: number;
    total: number;
  };
  timestamp: string;
  status: 'Confirmed' | 'Tailoring' | 'Ready for Dispatch';
}
