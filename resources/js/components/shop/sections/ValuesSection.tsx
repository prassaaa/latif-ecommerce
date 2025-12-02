import { Leaf, Truck, ShieldCheck } from 'lucide-react';

const VALUES = [
    { icon: <Leaf />, title: 'Bahan Berkelanjutan', desc: 'Setiap produk menggunakan kayu dari hutan yang dikelola secara bertanggung jawab dan bahan daur ulang.' },
    { icon: <Truck />, title: 'Gratis Pengiriman', desc: 'Pengiriman gratis untuk pembelian di atas Rp 5 juta ke seluruh Indonesia.' },
    { icon: <ShieldCheck />, title: 'Garansi Selamanya', desc: 'Garansi seumur hidup untuk semua kerusakan struktural karena kami percaya dengan kualitas kami.' },
];

export const ValuesSection = () => (
    <section className="py-24 bg-sand-100">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <div className="text-center mb-16">
                <span className="text-wood font-medium uppercase tracking-widest text-xs">Mengapa Kami</span>
                <h2 className="font-serif text-5xl text-terra-900 mt-2">Filosofi Kami</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {VALUES.map((item, i) => (
                    <div key={i} className="bg-white p-10 rounded-3xl text-center group hover:shadow-2xl hover:shadow-terra-900/5 transition-all duration-300">
                        <div className="w-16 h-16 mx-auto bg-terra-100 rounded-2xl flex items-center justify-center text-wood group-hover:bg-wood group-hover:text-white transition-colors">
                            {item.icon}
                        </div>
                        <h3 className="font-serif text-2xl text-terra-900 mt-6 mb-3">{item.title}</h3>
                        <p className="text-terra-500 leading-relaxed">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default ValuesSection;

