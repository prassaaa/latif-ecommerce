import { Mail } from 'lucide-react';

export const NewsletterSection = () => (
    <section className="py-24 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
            <div className="bg-sand-100 rounded-[40px] p-12 md:p-20 flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="max-w-xl">
                    <h2 className="font-serif text-5xl text-terra-900">Bergabung dengan Keluarga Latif</h2>
                    <p className="text-terra-600 mt-4 text-lg">Dapatkan akses eksklusif ke koleksi terbaru, tips dekorasi, dan penawaran khusus.</p>
                </div>
                <div className="w-full md:w-auto">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-terra-400" size={20} />
                            <input
                                type="email"
                                placeholder="Alamat email Anda"
                                className="w-full sm:w-80 pl-12 pr-4 py-4 rounded-full border border-terra-200 focus:outline-none focus:border-wood transition-colors"
                            />
                        </div>
                        <button className="bg-terra-900 text-white px-8 py-4 rounded-full font-medium hover:bg-wood transition-colors">
                            Berlangganan
                        </button>
                    </div>
                    <p className="text-terra-400 text-xs mt-4 text-center sm:text-left">Dengan berlangganan, Anda menyetujui kebijakan privasi kami.</p>
                </div>
            </div>
        </div>
    </section>
);

export default NewsletterSection;

