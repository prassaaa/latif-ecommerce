import { Link, usePage } from '@inertiajs/react';
import { home, about, contact, faq, privacy, terms, shipping, returns } from '@/routes/shop';
import { index as productsIndex, hotSale } from '@/routes/shop/products';
import { SiteSettings } from '@/types';

export const Footer = () => {
    const { siteSettings } = usePage<{ siteSettings: SiteSettings }>().props;
    const siteName = siteSettings?.site_name || 'Latif Living';
    const currentYear = new Date().getFullYear();

    return (
    <footer className="bg-terra-900 text-sand-200 py-20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-white/10 pb-16">
                <div className="md:col-span-5">
                    <Link href={home.url()}>
                        <img
                            src="/assets/images/logo.webp"
                            alt={siteName}
                            className="h-10 w-auto object-contain mb-6 brightness-0 invert"
                        />
                    </Link>
                    <p className="text-lg text-terra-400 font-light leading-relaxed max-w-md">
                        Furniture berkualitas tinggi untuk hunian modern. Kami percaya pada furniture yang bercerita—cerita Anda.
                    </p>
                </div>
                <div className="md:col-span-2 md:col-start-7">
                    <h4 className="font-medium text-white mb-6 tracking-wide">Belanja</h4>
                    <ul className="space-y-4 text-sm text-terra-400">
                        <li><Link href={productsIndex.url()} className="hover:text-wood-light transition-colors">Semua Produk</Link></li>
                        <li><Link href={hotSale.url()} className="hover:text-wood-light transition-colors">Hot Sale</Link></li>
                        <li><Link href={productsIndex.url({ query: { sort: 'newest' }})} className="hover:text-wood-light transition-colors">Produk Baru</Link></li>
                        <li><Link href={productsIndex.url({ query: { sort: 'best_seller' }})} className="hover:text-wood-light transition-colors">Terlaris</Link></li>
                    </ul>
                </div>
                <div className="md:col-span-2">
                    <h4 className="font-medium text-white mb-6 tracking-wide">Perusahaan</h4>
                    <ul className="space-y-4 text-sm text-terra-400">
                        <li><Link href={about.url()} className="hover:text-wood-light transition-colors">Tentang Kami</Link></li>
                        <li><Link href={contact.url()} className="hover:text-wood-light transition-colors">Kontak</Link></li>
                        <li><Link href={faq.url()} className="hover:text-wood-light transition-colors">FAQ</Link></li>
                    </ul>
                </div>
                <div className="md:col-span-2">
                    <h4 className="font-medium text-white mb-6 tracking-wide">Bantuan</h4>
                    <ul className="space-y-4 text-sm text-terra-400">
                        <li><Link href={shipping.url()} className="hover:text-wood-light transition-colors">Pengiriman</Link></li>
                        <li><Link href={returns.url()} className="hover:text-wood-light transition-colors">Pengembalian</Link></li>
                        <li><Link href={faq.url()} className="hover:text-wood-light transition-colors">Bantuan</Link></li>
                    </ul>
                </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center pt-8 text-xs text-terra-500">
                <p>&copy; {currentYear} {siteName}. Hak cipta dilindungi.</p>
                <div className="flex gap-6 mt-4 md:mt-0">
                    <Link href={privacy.url()} className="hover:text-terra-300 transition-colors">Kebijakan Privasi</Link>
                    <Link href={terms.url()} className="hover:text-terra-300 transition-colors">Syarat & Ketentuan</Link>
                </div>
            </div>
        </div>
    </footer>
    );
};

export default Footer;

