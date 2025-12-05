import { Link, usePage } from '@inertiajs/react';
import { Package, Heart, MapPin, User, LogOut, ShoppingBag, Home, ChevronRight } from 'lucide-react';
import { ReactNode } from 'react';
import { SharedData, SiteSettings } from '@/types';

interface CustomerLayoutProps {
    children: ReactNode;
    title?: string;
}

interface MenuItem {
    name: string;
    href: string;
    icon: typeof Package;
}

const menuItems: MenuItem[] = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Pesanan Saya', href: '/shop/orders', icon: Package },
    { name: 'Wishlist', href: '/shop/wishlist', icon: Heart },
    { name: 'Alamat', href: '/shop/addresses', icon: MapPin },
    { name: 'Profil', href: '/settings/profile', icon: User },
];

export default function CustomerLayout({ children, title }: CustomerLayoutProps) {
    const { auth } = usePage<SharedData>().props;
    const currentPath = window.location.pathname;

    const { siteSettings } = usePage<{ siteSettings?: SiteSettings }>().props;
    const siteName = siteSettings?.site_name || 'Latif Living';

    const isActive = (href: string) => {
        if (href === '/dashboard') {
            return currentPath === '/dashboard';
        }
        return currentPath.startsWith(href);
    };

    return (
        <div className="min-h-screen bg-sand-50">
            {/* Header */}
            <header className="bg-white border-b border-terra-100 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-terra-900 rounded-xl flex items-center justify-center">
                                <ShoppingBag className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-terra-900">{siteName}</span>
                        </Link>
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-terra-600">Halo, {auth.user.name}</span>
                            <Link
                                href="/logout"
                                method="post"
                                as="button"
                                className="p-2 rounded-lg text-terra-500 hover:bg-terra-50 transition-colors"
                            >
                                <LogOut className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Breadcrumb */}
                {title && (
                    <div className="flex items-center gap-2 text-sm text-terra-500 mb-6">
                        <Link href="/dashboard" className="hover:text-terra-700">Dashboard</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-terra-900 font-medium">{title}</span>
                    </div>
                )}

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <aside className="lg:w-64 flex-shrink-0">
                        <div className="bg-white rounded-2xl shadow-sm border border-terra-100 p-4">
                            <div className="flex items-center gap-3 p-3 mb-4 bg-sand-50 rounded-xl">
                                <div className="w-12 h-12 bg-terra-200 rounded-full flex items-center justify-center">
                                    <User className="w-6 h-6 text-terra-600" />
                                </div>
                                <div className="min-w-0">
                                    <p className="font-medium text-terra-900 truncate">{auth.user.name}</p>
                                    <p className="text-sm text-terra-500 truncate">{auth.user.email}</p>
                                </div>
                            </div>
                            <nav className="space-y-1">
                                {menuItems.map((item) => {
                                    const Icon = item.icon;
                                    const active = isActive(item.href);
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                                                active
                                                    ? 'bg-terra-900 text-white'
                                                    : 'text-terra-600 hover:bg-sand-50'
                                            }`}
                                        >
                                            <Icon className="w-5 h-5" />
                                            <span className="font-medium">{item.name}</span>
                                        </Link>
                                    );
                                })}
                            </nav>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1 min-w-0">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}

