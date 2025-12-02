import { Link } from '@inertiajs/react';
import { ShoppingBag, Star, ArrowRight } from 'lucide-react';
import { PRODUCTS, formatPrice } from '@/data/constants';
import { Product } from '@/types/shop';

interface ProductsSectionProps {
    onProductClick: (product: Product) => void;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({ onProductClick }) => (
    <section className="py-24 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                <div>
                    <span className="text-wood font-medium uppercase tracking-widest text-xs">Terlaris</span>
                    <h2 className="font-serif text-5xl text-terra-900 mt-2">Produk Unggulan</h2>
                </div>
                <Link href="/shop/products" className="mt-4 md:mt-0 text-terra-900 font-medium flex items-center gap-2 hover:gap-4 transition-all">
                    Lihat Semua <ArrowRight size={18} />
                </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {PRODUCTS.slice(0, 6).map((product) => (
                    <div
                        key={product.id}
                        onClick={() => onProductClick(product)}
                        className="group cursor-pointer"
                    >
                        <div className="aspect-[4/5] bg-terra-100 rounded-3xl overflow-hidden mb-5 relative">
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                                <ShoppingBag size={18} className="text-terra-900" />
                            </div>
                        </div>
                        <span className="text-xs text-wood uppercase font-medium tracking-wider">{product.category}</span>
                        <h3 className="font-serif text-xl text-terra-900 mt-1 mb-2">{product.name}</h3>
                        <div className="flex justify-between items-center">
                            <span className="text-terra-700 font-medium">{formatPrice(product.price)}</span>
                            <div className="flex items-center gap-1">
                                <Star size={14} className="text-yellow-500 fill-yellow-500" />
                                <span className="text-sm text-terra-500">{product.rating}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default ProductsSection;

