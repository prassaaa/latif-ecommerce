import { Link, usePage } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';
import { SiteSettings } from '@/types';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: PropsWithChildren<AuthLayoutProps>) {
    const { siteSettings } = usePage<{ siteSettings?: SiteSettings }>().props;
    const siteName = siteSettings?.site_name || 'Latif Living';
    const currentYear = new Date().getFullYear();

    return (
        <div className="min-h-svh flex">
            {/* Left Side - Branding */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-terra-900 via-terra-800 to-wood-dark relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl" />
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-wood rounded-full blur-3xl" />
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-between p-12 w-full">
                    <Link href="/shop" className="flex items-center">
                        <img
                            src="/assets/images/logo.webp"
                            alt={siteName}
                            className="h-8 w-auto brightness-0 invert"
                        />
                    </Link>

                    <div className="space-y-6">
                        <h2 className="font-serif text-4xl xl:text-5xl text-white leading-tight">
                            Furniture Berkualitas<br />
                            <span className="text-sand-200">untuk Hunian Impian</span>
                        </h2>
                        <p className="text-terra-300 text-lg max-w-md leading-relaxed">
                            Temukan koleksi furniture premium dengan desain elegan dan kualitas terbaik untuk melengkapi ruang hidup Anda.
                        </p>
                    </div>

                    <p className="text-terra-400 text-sm">
                        &copy; {currentYear} {siteName}. Hak cipta dilindungi.
                    </p>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center bg-sand-50 p-6 md:p-10">
                {/* Mobile Logo */}
                <div className="lg:hidden mb-8">
                    <Link href="/shop">
                        <img
                            src="/assets/images/logo.webp"
                            alt={siteName}
                            className="h-8 w-auto"
                        />
                    </Link>
                </div>

                <div className="w-full max-w-md">
                    <div className="bg-white rounded-2xl shadow-sm border border-terra-100 p-8 md:p-10">
                        <div className="space-y-2 text-center mb-8">
                            <h1 className="font-serif text-2xl md:text-3xl text-terra-900">{title}</h1>
                            <p className="text-terra-500 text-sm">
                                {description}
                            </p>
                        </div>
                        {children}
                    </div>

                    <p className="text-center text-terra-400 text-xs mt-6 lg:hidden">
                        &copy; {currentYear} {siteName}. Hak cipta dilindungi.
                    </p>
                </div>
            </div>
        </div>
    );
}
