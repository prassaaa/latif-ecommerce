import { Head, Link, router, useForm } from '@inertiajs/react';
import { MapPin, CreditCard, Truck, Plus, Check, ArrowLeft, Loader2 } from 'lucide-react';
import { ShopLayout } from '@/layouts/ShopLayout';
import { useState } from 'react';

interface Address {
    id: number;
    label: string;
    recipient_name: string;
    phone: string;
    address: string;
    city: string;
    province: string;
    postal_code: string;
    is_default: boolean;
    full_address: string;
}

interface CartItem {
    id: number;
    quantity: number;
    unit_price_formatted: string;
    subtotal_formatted: string;
    product: {
        id: number;
        name: string;
        images: { url: string; is_primary: boolean }[];
    };
}

interface Cart {
    items_count: number;
    subtotal_formatted: string;
    items: CartItem[];
}

interface PaymentMethod {
    value: string;
    name: string;
}

interface Props {
    cart: Cart;
    addresses: Address[];
    paymentMethods: PaymentMethod[];
}

export default function CheckoutIndex({ cart, addresses, paymentMethods }: Props) {
    // Ensure addresses is always an array
    const addressList = Array.isArray(addresses) ? addresses : [];
    const paymentList = Array.isArray(paymentMethods) ? paymentMethods : [];

    // Ensure cart has items array
    const safeCart: Cart = {
        items_count: cart?.items_count || 0,
        subtotal_formatted: cart?.subtotal_formatted || 'Rp 0',
        items: Array.isArray(cart?.items) ? cart.items : [],
    };

    const [selectedAddress, setSelectedAddress] = useState<number | null>(
        addressList.find(a => a.is_default)?.id || addressList[0]?.id || null
    );
    const [selectedPayment, setSelectedPayment] = useState<string>(paymentList[0]?.value || '');

    const { processing } = useForm({});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedAddress || !selectedPayment) return;

        router.post('/shop/checkout', {
            address_id: selectedAddress,
            payment_method: selectedPayment,
            notes: '',
        }, {
            onSuccess: () => router.visit('/shop/checkout/success'),
        });
    };

    const getProductImage = (product: CartItem['product']) => {
        const primary = product.images?.find(img => img.is_primary);
        return primary?.url || product.images?.[0]?.url || '/images/placeholder.jpg';
    };

    return (
        <>
            <Head title="Checkout - Latif Living" />
            <div className="bg-noise" />
            <ShopLayout>
            <main className="min-h-screen bg-sand-50 pt-28 pb-20">
                <div className="max-w-6xl mx-auto px-6 md:px-12">
                    <Link href="/shop/cart" className="inline-flex items-center gap-2 text-terra-600 hover:text-terra-900 mb-6">
                        <ArrowLeft className="w-4 h-4" /> Kembali ke Keranjang
                    </Link>

                    <h1 className="font-serif text-3xl text-terra-900 mb-8">Checkout</h1>

                    <form onSubmit={handleSubmit}>
                        <div className="grid lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 space-y-6">
                                {/* Shipping Address */}
                                <div className="bg-white rounded-2xl p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="font-serif text-xl text-terra-900 flex items-center gap-2">
                                            <MapPin className="w-5 h-5" /> Alamat Pengiriman
                                        </h2>
                                        <Link href="/shop/addresses" className="text-wood hover:text-terra-900 text-sm flex items-center gap-1">
                                            <Plus className="w-4 h-4" /> Tambah Alamat
                                        </Link>
                                    </div>
                                    {addressList.length > 0 ? (
                                        <div className="space-y-3">
                                            {addressList.map((addr) => (
                                                <label key={addr.id} className={`block p-4 border-2 rounded-xl cursor-pointer transition-colors ${selectedAddress === addr.id ? 'border-wood bg-wood/5' : 'border-terra-100 hover:border-terra-200'}`}>
                                                    <div className="flex items-start gap-3">
                                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${selectedAddress === addr.id ? 'border-wood bg-wood' : 'border-terra-300'}`}>
                                                            {selectedAddress === addr.id && <Check className="w-3 h-3 text-white" />}
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-2 mb-1">
                                                                <span className="font-medium text-terra-900">{addr.label}</span>
                                                                {addr.is_default && <span className="text-xs bg-wood/10 text-wood px-2 py-0.5 rounded">Utama</span>}
                                                            </div>
                                                            <p className="text-terra-700">{addr.recipient_name} • {addr.phone}</p>
                                                            <p className="text-terra-500 text-sm">{addr.full_address}</p>
                                                        </div>
                                                    </div>
                                                    <input type="radio" name="address" value={addr.id} checked={selectedAddress === addr.id} onChange={() => setSelectedAddress(addr.id)} className="hidden" />
                                                </label>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-8">
                                            <MapPin className="w-12 h-12 mx-auto text-terra-200 mb-3" />
                                            <p className="text-terra-500 mb-4">Belum ada alamat tersimpan</p>
                                            <Link href="/shop/addresses" className="inline-flex items-center gap-2 bg-terra-900 text-white px-4 py-2 rounded-lg hover:bg-terra-800">
                                                <Plus className="w-4 h-4" /> Tambah Alamat
                                            </Link>
                                        </div>
                                    )}
                                </div>

                                {/* Payment Method */}
                                <PaymentSection paymentMethods={paymentList} selectedPayment={selectedPayment} setSelectedPayment={setSelectedPayment} />
                            </div>

                            {/* Order Summary */}
                            <OrderSummary cart={safeCart} getProductImage={getProductImage} processing={processing} selectedAddress={selectedAddress} selectedPayment={selectedPayment} />
                        </div>
                    </form>
                </div>
            </main>
            </ShopLayout>
        </>
    );
}

interface PaymentSectionProps {
    paymentMethods: PaymentMethod[];
    selectedPayment: string;
    setSelectedPayment: (value: string) => void;
}

function PaymentSection({ paymentMethods, selectedPayment, setSelectedPayment }: PaymentSectionProps) {
    const paymentIcons: Record<string, React.ReactNode> = {
        bank_transfer: <CreditCard className="w-5 h-5" />,
        e_wallet: <CreditCard className="w-5 h-5" />,
        cod: <Truck className="w-5 h-5" />,
        credit_card: <CreditCard className="w-5 h-5" />,
        virtual_account: <CreditCard className="w-5 h-5" />,
    };

    return (
        <div className="bg-white rounded-2xl p-6">
            <h2 className="font-serif text-xl text-terra-900 flex items-center gap-2 mb-4">
                <CreditCard className="w-5 h-5" /> Metode Pembayaran
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {paymentMethods.map((method) => (
                    <label key={method.value} className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-colors ${selectedPayment === method.value ? 'border-wood bg-wood/5' : 'border-terra-100 hover:border-terra-200'}`}>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${selectedPayment === method.value ? 'border-wood bg-wood' : 'border-terra-300'}`}>
                            {selectedPayment === method.value && <Check className="w-3 h-3 text-white" />}
                        </div>
                        <div className="flex items-center gap-2">
                            {paymentIcons[method.value]}
                            <span className="text-terra-900">{method.name}</span>
                        </div>
                        <input type="radio" name="payment" value={method.value} checked={selectedPayment === method.value} onChange={() => setSelectedPayment(method.value)} className="hidden" />
                    </label>
                ))}
            </div>
        </div>
    );
}

interface OrderSummaryProps {
    cart: Cart;
    getProductImage: (product: CartItem['product']) => string;
    processing: boolean;
    selectedAddress: number | null;
    selectedPayment: string;
}

function OrderSummary({ cart, getProductImage, processing, selectedAddress, selectedPayment }: OrderSummaryProps) {
    return (
        <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 sticky top-28">
                <h2 className="font-serif text-xl text-terra-900 mb-4">Ringkasan Pesanan</h2>

                {/* Items */}
                <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                    {cart.items.map((item) => (
                        <div key={item.id} className="flex gap-3">
                            <div className="w-14 h-14 bg-terra-100 rounded-lg overflow-hidden flex-shrink-0">
                                <img src={getProductImage(item.product)} alt={item.product.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-terra-900 text-sm line-clamp-1">{item.product.name}</p>
                                <p className="text-terra-500 text-sm">{item.quantity}x {item.unit_price_formatted}</p>
                            </div>
                            <span className="text-terra-900 text-sm font-medium">{item.subtotal_formatted}</span>
                        </div>
                    ))}
                </div>

                <div className="border-t border-terra-100 pt-4 space-y-2 mb-4">
                    <div className="flex justify-between text-terra-600">
                        <span>Subtotal</span>
                        <span>{cart.subtotal_formatted}</span>
                    </div>
                    <div className="flex justify-between text-terra-600">
                        <span>Ongkos Kirim</span>
                        <span className="text-terra-500">Gratis</span>
                    </div>
                </div>

                <div className="border-t border-terra-100 pt-4 mb-6">
                    <div className="flex justify-between">
                        <span className="font-medium text-terra-900">Total</span>
                        <span className="font-serif text-2xl text-terra-900">{cart.subtotal_formatted}</span>
                    </div>
                </div>

                <button type="submit" disabled={processing || !selectedAddress || !selectedPayment} className="w-full bg-terra-900 text-white py-4 rounded-full font-medium hover:bg-terra-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                    {processing ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" /> Memproses...
                        </>
                    ) : (
                        'Buat Pesanan'
                    )}
                </button>

                {(!selectedAddress || !selectedPayment) && (
                    <p className="text-red-500 text-sm text-center mt-3">
                        {!selectedAddress ? 'Pilih alamat pengiriman' : 'Pilih metode pembayaran'}
                    </p>
                )}
            </div>
        </div>
    );
}

