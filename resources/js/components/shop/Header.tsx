import { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { ShoppingBag, Search, Menu } from 'lucide-react';
import { NAV_ITEMS } from '@/data/constants';

interface HeaderProps {
    cartCount: number;
    onCartClick: () => void;
    onLogoClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ cartCount, onCartClick, onLogoClick }) => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 w-full z-40 transition-all duration-500 border-b ${scrolled ? 'bg-white/80 backdrop-blur-md py-4 border-terra-200' : 'bg-transparent py-6 border-transparent'}`}>
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex justify-between items-center">
                <div className="flex items-center gap-1 cursor-pointer group" onClick={onLogoClick}>
                    <span className="font-serif text-3xl font-bold tracking-tight text-terra-900 relative z-10">
                        Latif
                        <span className="text-wood group-hover:text-terra-900 transition-colors">.</span>
                    </span>
                </div>

                <div className="hidden md:flex items-center gap-8">
                    {NAV_ITEMS.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="text-sm font-medium text-terra-600 hover:text-wood transition-all"
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-4">
                    <button className="p-2 text-terra-900 hover:bg-terra-100 rounded-full transition-colors">
                        <Search size={20} />
                    </button>
                    <button onClick={onCartClick} className="relative p-2 text-terra-900 hover:bg-terra-100 rounded-full transition-colors group">
                        <ShoppingBag size={20} className="group-hover:scale-110 transition-transform" />
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-wood text-white text-[10px] flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                                {cartCount}
                            </span>
                        )}
                    </button>
                    <button className="md:hidden p-2 text-terra-900">
                        <Menu size={20} />
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Header;

