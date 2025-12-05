import ShopLayout from '@/layouts/ShopLayout';
import { SiteSettings } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { RefreshCw, Shield, AlertCircle, CheckCircle } from 'lucide-react';

export default function ReturnPolicy() {
    const { siteSettings } = usePage<{ siteSettings?: SiteSettings }>().props;
    const siteName = siteSettings?.site_name || 'Latif Living';

    return (
        <>
            <Head title={`Kebijakan Pengembalian - ${siteName}`} />
            <div className="bg-noise" />
            <ShopLayout>
                <main className="min-h-screen bg-sand-50 pt-28 pb-20">
                    <div className="max-w-4xl mx-auto px-6 md:px-12">
                        {/* Header */}
                        <div className="text-center mb-12">
                            <h1 className="font-serif text-4xl md:text-5xl text-terra-900 mb-4">Kebijakan Pengembalian</h1>
                            <p className="text-terra-600 text-lg">Kepuasan Anda adalah prioritas kami</p>
                        </div>

                        {/* Highlight Cards */}
                        <div className="grid md:grid-cols-3 gap-6 mb-12">
                            <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-terra-100">
                                <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                                    <RefreshCw className="w-7 h-7 text-green-600" />
                                </div>
                                <h3 className="font-medium text-terra-900 text-lg mb-2">7 Hari Retur</h3>
                                <p className="text-terra-500 text-sm">Untuk produk tidak sesuai deskripsi</p>
                            </div>
                            <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-terra-100">
                                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                                    <Shield className="w-7 h-7 text-blue-600" />
                                </div>
                                <h3 className="font-medium text-terra-900 text-lg mb-2">Garansi 1 Tahun</h3>
                                <p className="text-terra-500 text-sm">Untuk kerusakan struktural</p>
                            </div>
                            <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-terra-100">
                                <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle className="w-7 h-7 text-amber-600" />
                                </div>
                                <h3 className="font-medium text-terra-900 text-lg mb-2">Refund Penuh</h3>
                                <p className="text-terra-500 text-sm">Jika kesalahan dari kami</p>
                            </div>
                        </div>

                        {/* Detailed Policy */}
                        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-terra-100 space-y-8">
                            <section>
                                <h2 className="font-serif text-2xl text-terra-900 mb-4">Syarat Pengembalian</h2>
                                <ul className="list-disc pl-6 text-terra-600 space-y-2">
                                    <li>Pengembalian dalam waktu 7 hari setelah barang diterima</li>
                                    <li>Produk dalam kondisi asli, belum digunakan, dengan label lengkap</li>
                                    <li>Kemasan asli harus disertakan</li>
                                    <li>Sertakan bukti pembelian (invoice/order number)</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="font-serif text-2xl text-terra-900 mb-4">Produk yang Dapat Dikembalikan</h2>
                                <ul className="space-y-3 text-terra-600">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                        <span>Produk tidak sesuai dengan deskripsi atau foto</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                        <span>Produk rusak saat diterima (cacat produksi)</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                        <span>Produk salah kirim (berbeda dari pesanan)</span>
                                    </li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="font-serif text-2xl text-terra-900 mb-4">Produk yang Tidak Dapat Dikembalikan</h2>
                                <ul className="space-y-3 text-terra-600">
                                    <li className="flex items-start gap-3">
                                        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                                        <span>Produk custom order / made-to-order</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                                        <span>Produk yang sudah digunakan atau dimodifikasi</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                                        <span>Produk tanpa kemasan asli</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                                        <span>Produk dengan label sale/clearance</span>
                                    </li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="font-serif text-2xl text-terra-900 mb-4">Proses Pengembalian</h2>
                                <ol className="list-decimal pl-6 text-terra-600 space-y-3">
                                    <li>Hubungi CS kami via WhatsApp dengan nomor pesanan dan alasan retur</li>
                                    <li>Tim kami akan memverifikasi permintaan dalam 1x24 jam</li>
                                    <li>Jika disetujui, kirimkan produk ke alamat yang diberikan</li>
                                    <li>Setelah produk diterima dan diperiksa, refund diproses dalam 7-14 hari kerja</li>
                                </ol>
                            </section>

                            <section>
                                <h2 className="font-serif text-2xl text-terra-900 mb-4">Biaya Pengembalian</h2>
                                <div className="bg-terra-50 rounded-xl p-4 space-y-2">
                                    <p className="text-terra-700"><strong>Kesalahan dari kami:</strong> Biaya pengiriman retur ditanggung {siteName}</p>
                                    <p className="text-terra-700"><strong>Berubah pikiran:</strong> Biaya pengiriman retur ditanggung pembeli</p>
                                </div>
                            </section>
                        </div>
                    </div>
                </main>
            </ShopLayout>
        </>
    );
}

