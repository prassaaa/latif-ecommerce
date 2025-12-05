import ShopLayout from '@/layouts/ShopLayout';
import { SiteSettings } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Truck, Clock, MapPin, Package } from 'lucide-react';

const SHIPPING_INFO = [
    { icon: Truck, title: 'Area Jakarta', time: '1-3 hari kerja', desc: 'Gratis ongkir min. pembelian Rp 5.000.000' },
    { icon: MapPin, title: 'Jawa & Bali', time: '3-5 hari kerja', desc: 'Ongkir dihitung berdasarkan volume' },
    { icon: Clock, title: 'Luar Pulau', time: '5-10 hari kerja', desc: 'Tersedia pengiriman via kargo' },
    { icon: Package, title: 'Custom Order', time: '2-4 minggu', desc: 'Termasuk waktu produksi' },
];

export default function ShippingPolicy() {
    const { siteSettings } = usePage<{ siteSettings?: SiteSettings }>().props;
    const siteName = siteSettings?.site_name || 'Latif Living';

    return (
        <>
            <Head title={`Kebijakan Pengiriman - ${siteName}`} />
            <div className="bg-noise" />
            <ShopLayout>
                <main className="min-h-screen bg-sand-50 pt-28 pb-20">
                    <div className="max-w-4xl mx-auto px-6 md:px-12">
                        {/* Header */}
                        <div className="text-center mb-12">
                            <h1 className="font-serif text-4xl md:text-5xl text-terra-900 mb-4">Kebijakan Pengiriman</h1>
                            <p className="text-terra-600 text-lg">Informasi lengkap mengenai pengiriman produk {siteName}</p>
                        </div>

                        {/* Shipping Cards */}
                        <div className="grid md:grid-cols-2 gap-6 mb-12">
                            {SHIPPING_INFO.map((item) => (
                                <div key={item.title} className="bg-white rounded-2xl p-6 shadow-sm border border-terra-100">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-terra-100 flex items-center justify-center flex-shrink-0">
                                            <item.icon className="w-6 h-6 text-terra-700" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-terra-900 text-lg">{item.title}</h3>
                                            <p className="text-terra-700 font-medium">{item.time}</p>
                                            <p className="text-terra-500 text-sm mt-1">{item.desc}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Detailed Info */}
                        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-terra-100 space-y-8">
                            <section>
                                <h2 className="font-serif text-2xl text-terra-900 mb-4">Proses Pengiriman</h2>
                                <ol className="list-decimal pl-6 text-terra-600 space-y-3">
                                    <li>Pesanan dikonfirmasi setelah pembayaran diterima</li>
                                    <li>Tim kami akan mempersiapkan dan mengemas produk dengan aman</li>
                                    <li>Anda akan menerima nomor resi untuk tracking pengiriman</li>
                                    <li>Kurir akan menghubungi sebelum pengiriman untuk koordinasi</li>
                                    <li>Produk sampai di alamat tujuan</li>
                                </ol>
                            </section>

                            <section>
                                <h2 className="font-serif text-2xl text-terra-900 mb-4">Biaya Pengiriman</h2>
                                <ul className="list-disc pl-6 text-terra-600 space-y-2">
                                    <li><strong>Jakarta:</strong> Gratis untuk pembelian min. Rp 5.000.000</li>
                                    <li><strong>Bodetabek:</strong> Mulai dari Rp 150.000</li>
                                    <li><strong>Jawa & Bali:</strong> Dihitung berdasarkan volume dan berat</li>
                                    <li><strong>Luar Pulau:</strong> Menggunakan ekspedisi kargo, tarif sesuai lokasi</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="font-serif text-2xl text-terra-900 mb-4">Pengemasan</h2>
                                <p className="text-terra-600 leading-relaxed">
                                    Semua produk dikemas dengan standar tinggi untuk memastikan keamanan selama pengiriman. Kami menggunakan bubble wrap, kardus tebal, dan palet kayu untuk produk berukuran besar.
                                </p>
                            </section>

                            <section>
                                <h2 className="font-serif text-2xl text-terra-900 mb-4">Penerimaan Barang</h2>
                                <ul className="list-disc pl-6 text-terra-600 space-y-2">
                                    <li>Periksa kondisi kemasan sebelum menandatangani bukti terima</li>
                                    <li>Dokumentasikan jika ada kerusakan kemasan saat diterima</li>
                                    <li>Laporkan kerusakan produk dalam 24 jam dengan foto bukti</li>
                                    <li>Simpan kemasan asli untuk keperluan klaim atau retur</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="font-serif text-2xl text-terra-900 mb-4">Catatan Penting</h2>
                                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                                    <p className="text-amber-800 text-sm">
                                        Waktu pengiriman dapat berbeda saat momen tertentu (Hari Raya, promo besar) karena volume pesanan yang tinggi. Kami akan selalu menginformasikan estimasi terbaru kepada Anda.
                                    </p>
                                </div>
                            </section>
                        </div>
                    </div>
                </main>
            </ShopLayout>
        </>
    );
}

