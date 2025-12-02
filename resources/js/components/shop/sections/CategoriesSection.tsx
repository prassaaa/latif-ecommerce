import { ArrowRight } from 'lucide-react';

export const CategoriesSection = () => (
    <section className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <h2 className="font-serif text-5xl text-terra-900">Ruangan Pilihan</h2>
            <p className="text-terra-500 max-w-sm text-right mt-4 md:mt-0">Jelajahi koleksi kami yang dirancang dengan penuh perhatian untuk setiap ruangan di rumah Anda.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[600px]">
            <div className="md:col-span-2 relative group overflow-hidden rounded-3xl cursor-pointer">
                <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2000&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Living" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div className="absolute bottom-8 left-8 text-white">
                    <h3 className="font-serif text-3xl">Ruang Tamu</h3>
                    <p className="text-sm opacity-80 mt-2 flex items-center gap-2">Jelajahi <ArrowRight size={14} /></p>
                </div>
            </div>
            <div className="flex flex-col gap-6">
                <div className="flex-1 relative group overflow-hidden rounded-3xl cursor-pointer">
                    <img src="https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Dining" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                    <div className="absolute bottom-6 left-6 text-white">
                        <h3 className="font-serif text-2xl">Ruang Makan</h3>
                    </div>
                </div>
                <div className="flex-1 relative group overflow-hidden rounded-3xl cursor-pointer">
                    <img src="https://images.unsplash.com/photo-1513506003011-3b03c80175e8?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Lighting" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                    <div className="absolute bottom-6 left-6 text-white">
                        <h3 className="font-serif text-2xl">Pencahayaan</h3>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

export default CategoriesSection;

