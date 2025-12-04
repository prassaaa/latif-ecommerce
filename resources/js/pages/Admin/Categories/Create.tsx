import AdminLayout from '@/layouts/admin/admin-layout';
import { Head, useForm, Link, router } from '@inertiajs/react';
import { ArrowLeft, X, Image as ImageIcon } from 'lucide-react';
import { useState } from 'react';

export default function CreateCategory() {
    const { data, setData, processing, errors } = useForm<{
        name: string;
        description: string;
        is_active: boolean;
        is_featured: boolean;
        image: File | null;
    }>({
        name: '',
        description: '',
        is_active: true,
        is_featured: false,
        image: null,
    });

    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setData('image', null);
        setImagePreview(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.post('/admin/categories', {
            ...data,
            image: data.image,
        }, {
            forceFormData: true,
        });
    };

    return (
        <AdminLayout breadcrumbs={[
            { title: 'Kategori', href: '/admin/categories' },
            { title: 'Tambah Kategori', href: '/admin/categories/create' }
        ]}>
            <Head title="Tambah Kategori" />

            <div className="max-w-2xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Link href="/admin/categories" className="p-2 rounded-lg text-terra-600 hover:bg-terra-100 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-terra-900">Tambah Kategori Baru</h1>
                        <p className="text-terra-500 mt-1">Buat kategori baru untuk produk</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-terra-100">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-terra-700 mb-2">Nama Kategori *</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-terra-200 bg-sand-50 text-terra-900 placeholder:text-terra-400 focus:outline-none focus:ring-2 focus:ring-wood/50 focus:border-wood transition-all"
                                    placeholder="Masukkan nama kategori"
                                />
                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-terra-700 mb-2">Deskripsi</label>
                                <textarea
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-xl border border-terra-200 bg-sand-50 text-terra-900 placeholder:text-terra-400 focus:outline-none focus:ring-2 focus:ring-wood/50 focus:border-wood transition-all resize-none"
                                    placeholder="Deskripsi kategori (opsional)"
                                />
                            </div>

                            {/* Image Upload */}
                            <div>
                                <label className="block text-sm font-medium text-terra-700 mb-2">Gambar Kategori</label>
                                <p className="text-sm text-terra-500 mb-3">Gambar ini akan ditampilkan di section "Ruangan Pilihan" pada halaman utama.</p>

                                {imagePreview ? (
                                    <div className="relative w-full h-48 rounded-xl overflow-hidden border border-terra-200">
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="w-full h-full object-cover"
                                        />
                                        <button
                                            type="button"
                                            onClick={removeImage}
                                            className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-terra-300 rounded-xl cursor-pointer hover:border-terra-400 hover:bg-terra-50/50 transition-all">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <ImageIcon className="w-10 h-10 text-terra-400 mb-3" />
                                            <p className="mb-2 text-sm text-terra-500">
                                                <span className="font-semibold">Klik untuk upload</span> atau drag and drop
                                            </p>
                                            <p className="text-xs text-terra-400">PNG, JPG atau WEBP (Maks. 2MB)</p>
                                        </div>
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                        />
                                    </label>
                                )}
                                {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
                            </div>

                            <div className="space-y-3">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={data.is_active}
                                        onChange={(e) => setData('is_active', e.target.checked)}
                                        className="w-5 h-5 rounded border-terra-300 text-terra-900 focus:ring-wood"
                                    />
                                    <span className="text-terra-700">Kategori Aktif</span>
                                </label>

                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={data.is_featured}
                                        onChange={(e) => setData('is_featured', e.target.checked)}
                                        className="w-5 h-5 rounded border-terra-300 text-terra-900 focus:ring-wood"
                                    />
                                    <div>
                                        <span className="text-terra-700">Kategori Unggulan</span>
                                        <p className="text-xs text-terra-500">Tampilkan di section "Ruangan Pilihan" pada homepage</p>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-4">
                        <Link href="/admin/categories" className="px-6 py-3 rounded-xl border border-terra-200 text-terra-700 hover:bg-terra-50 transition-colors font-medium">
                            Batal
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-6 py-3 rounded-xl bg-terra-900 text-white hover:bg-wood-dark transition-colors font-medium disabled:opacity-50"
                        >
                            {processing ? 'Menyimpan...' : 'Simpan Kategori'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}

