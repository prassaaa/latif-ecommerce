import { motion } from 'framer-motion';
import { ArrowLeft, Check } from 'lucide-react';
import { formatPrice } from '@/data/constants';
import { CartItem } from '@/types/shop';

interface CheckoutViewProps {
    cart: CartItem[];
    onBack: () => void;
    onSuccess: () => void;
}

export const CheckoutView: React.FC<CheckoutViewProps> = ({ cart, onBack, onSuccess }) => {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal >= 5000000 ? 0 : 150000;
    const total = subtotal + shipping;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSuccess();
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen pt-32 pb-20"
        >
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-terra-600 hover:text-terra-900 mb-8 transition-colors"
                >
                    <ArrowLeft size={20} />
                    <span>Kembali ke Keranjang</span>
                </button>

                <h1 className="font-serif text-5xl text-terra-900 mb-12">Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Checkout Form */}
                    <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-8">
                        <div>
                            <h2 className="font-serif text-2xl text-terra-900 mb-6">Informasi Kontak</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <input type="text" placeholder="Nama Depan" className="col-span-1 p-4 border border-terra-200 rounded-xl focus:outline-none focus:border-wood transition-colors" required />
                                <input type="text" placeholder="Nama Belakang" className="col-span-1 p-4 border border-terra-200 rounded-xl focus:outline-none focus:border-wood transition-colors" required />
                                <input type="email" placeholder="Email" className="col-span-2 p-4 border border-terra-200 rounded-xl focus:outline-none focus:border-wood transition-colors" required />
                                <input type="tel" placeholder="Nomor Telepon" className="col-span-2 p-4 border border-terra-200 rounded-xl focus:outline-none focus:border-wood transition-colors" required />
                            </div>
                        </div>

                        <div>
                            <h2 className="font-serif text-2xl text-terra-900 mb-6">Alamat Pengiriman</h2>
                            <div className="space-y-4">
                                <input type="text" placeholder="Alamat Lengkap" className="w-full p-4 border border-terra-200 rounded-xl focus:outline-none focus:border-wood transition-colors" required />
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="text" placeholder="Kota" className="p-4 border border-terra-200 rounded-xl focus:outline-none focus:border-wood transition-colors" required />
                                    <input type="text" placeholder="Provinsi" className="p-4 border border-terra-200 rounded-xl focus:outline-none focus:border-wood transition-colors" required />
                                </div>
                                <input type="text" placeholder="Kode Pos" className="w-full p-4 border border-terra-200 rounded-xl focus:outline-none focus:border-wood transition-colors" required />
                            </div>
                        </div>

                        <div>
                            <h2 className="font-serif text-2xl text-terra-900 mb-6">Metode Pembayaran</h2>
                            <div className="space-y-3">
                                {['Transfer Bank', 'Kartu Kredit/Debit', 'E-Wallet', 'COD (Bayar di Tempat)'].map((method) => (
                                    <label key={method} className="flex items-center gap-4 p-4 border border-terra-200 rounded-xl cursor-pointer hover:border-wood transition-colors">
                                        <input type="radio" name="payment" value={method} className="w-5 h-5 accent-wood" defaultChecked={method === 'Transfer Bank'} />
                                        <span className="text-terra-700">{method}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <button type="submit" className="w-full bg-terra-900 text-white py-5 rounded-full font-medium hover:bg-wood transition-colors flex items-center justify-center gap-3 text-lg">
                            <Check size={22} />
                            Selesaikan Pesanan
                        </button>
                    </form>

                    {/* Order Summary */}
                    <div className="lg:col-span-5">
                        <div className="bg-sand-50 rounded-3xl p-8 sticky top-32">
                            <h2 className="font-serif text-2xl text-terra-900 mb-6">Ringkasan Pesanan</h2>

                            <div className="space-y-4 mb-6 max-h-80 overflow-y-auto custom-scrollbar pr-2">
                                {cart.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="w-20 h-24 bg-terra-100 rounded-xl overflow-hidden flex-shrink-0">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-terra-900 font-medium text-sm">{item.name}</h4>
                                            <p className="text-terra-500 text-sm">Qty: {item.quantity}</p>
                                            <p className="text-terra-900 font-medium">{formatPrice(item.price * item.quantity)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-terra-200 pt-6 space-y-3">
                                <div className="flex justify-between text-terra-600">
                                    <span>Subtotal</span>
                                    <span>{formatPrice(subtotal)}</span>
                                </div>
                                <div className="flex justify-between text-terra-600">
                                    <span>Ongkir</span>
                                    <span>{shipping === 0 ? 'Gratis' : formatPrice(shipping)}</span>
                                </div>
                                <div className="flex justify-between text-xl font-serif text-terra-900 pt-3 border-t border-terra-200">
                                    <span>Total</span>
                                    <span>{formatPrice(total)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default CheckoutView;

