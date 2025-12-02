import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Minus, Plus, X } from 'lucide-react';
import { formatPrice } from '@/data/constants';
import { CartItem } from '@/types/shop';

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    cart: CartItem[];
    removeFromCart: (id: string) => void;
    updateQty: (id: string, qty: number) => void;
    onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, cart, removeFromCart, updateQty, onCheckout }) => {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col"
                    >
                        <div className="p-6 border-b border-terra-100 flex justify-between items-center">
                            <h2 className="font-serif text-2xl text-terra-900">Keranjang</h2>
                            <button onClick={onClose} className="p-2 hover:bg-terra-50 rounded-full transition-colors">
                                <X size={24} className="text-terra-600" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                            {cart.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center">
                                    <ShoppingBag size={64} className="text-terra-200 mb-6" />
                                    <h3 className="font-serif text-xl text-terra-900 mb-2">Keranjang Kosong</h3>
                                    <p className="text-terra-500">Mulai belanja untuk mengisi keranjang.</p>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {cart.map((item) => (
                                        <div key={item.id} className="flex gap-4 pb-6 border-b border-terra-100 last:border-0">
                                            <div className="w-24 h-28 bg-terra-100 rounded-xl overflow-hidden flex-shrink-0">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1 flex flex-col justify-between">
                                                <div>
                                                    <span className="text-xs text-wood uppercase font-medium">{item.category}</span>
                                                    <h4 className="text-terra-900 font-medium mt-0.5 leading-tight">{item.name}</h4>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <div className="flex items-center border border-terra-200 rounded-lg">
                                                        <button onClick={() => updateQty(item.id, item.quantity - 1)} className="p-2 hover:bg-terra-50 transition-colors">
                                                            <Minus size={14} />
                                                        </button>
                                                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                                                        <button onClick={() => updateQty(item.id, item.quantity + 1)} className="p-2 hover:bg-terra-50 transition-colors">
                                                            <Plus size={14} />
                                                        </button>
                                                    </div>
                                                    <span className="font-medium text-terra-900">{formatPrice(item.price * item.quantity)}</span>
                                                </div>
                                            </div>
                                            <button onClick={() => removeFromCart(item.id)} className="text-terra-400 hover:text-red-500 transition-colors self-start">
                                                <X size={18} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {cart.length > 0 && (
                            <div className="p-6 border-t border-terra-100 bg-sand-50">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-terra-600">Subtotal</span>
                                    <span className="font-serif text-2xl text-terra-900">{formatPrice(total)}</span>
                                </div>
                                <p className="text-xs text-terra-500 mb-4">Ongkir dihitung saat checkout</p>
                                <button
                                    onClick={onCheckout}
                                    className="w-full bg-terra-900 text-white py-4 rounded-full font-medium hover:bg-wood transition-colors"
                                >
                                    Checkout
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartDrawer;

