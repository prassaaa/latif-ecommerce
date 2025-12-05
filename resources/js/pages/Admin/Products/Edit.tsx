import AdminLayout from '@/layouts/admin/admin-layout';
import { Head, useForm, Link, router } from '@inertiajs/react';
import { ArrowLeft, Upload, X, Star } from 'lucide-react';
import { useState, useRef } from 'react';

interface Category {
    id: number;
    name: string;
}

interface ProductImage {
    id: number;
    url: string;
    is_primary: boolean;
}

interface Product {
    id: number;
    name: string;
    slug: string;
    sku: string;
    description: string | null;
    price: number;
    discount_percentage: number | null;
    stock_quantity: number;
    category_id: number | null;
    status: { value: string; label: string };
    is_featured: boolean;
    images: ProductImage[];
}

interface EditProductProps {
    product: Product;
    categories: Category[];
}

export default function EditProduct({ product, categories }: EditProductProps) {
    const [existingImages, setExistingImages] = useState<ProductImage[]>(product.images || []);
    const [newImages, setNewImages] = useState<{ file: File; preview: string }[]>([]);
    const [deleteImageIds, setDeleteImageIds] = useState<number[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { data, setData, processing, errors } = useForm({
        name: product.name,
        sku: product.sku,
        category_id: String(product.category_id || ''),
        description: product.description || '',
        price: String(product.price),
        discount_percentage: product.discount_percentage ? String(product.discount_percentage) : '',
        stock_quantity: String(product.stock_quantity),
        status: product.status.value,
        is_featured: product.is_featured,
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        const images = Array.from(files).map(file => ({
            file,
            preview: URL.createObjectURL(file)
        }));

        setNewImages(prev => [...prev, ...images]);
    };

    const removeExistingImage = (imageId: number) => {
        setDeleteImageIds(prev => [...prev, imageId]);
        setExistingImages(prev => prev.filter(img => img.id !== imageId));
    };

    const removeNewImage = (index: number) => {
        setNewImages(prev => {
            const updated = [...prev];
            URL.revokeObjectURL(updated[index].preview);
            updated.splice(index, 1);
            return updated;
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('_method', 'PUT');

        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, String(value));
        });

        newImages.forEach((img) => {
            formData.append('images[]', img.file);
        });

        deleteImageIds.forEach((id) => {
            formData.append('delete_images[]', String(id));
        });

        router.post(`/admin/products/${product.id}`, formData, {
            forceFormData: true,
        });
    };

    return (
        <AdminLayout breadcrumbs={[
            { title: 'Produk', href: '/admin/products' },
            { title: 'Edit Produk', href: `/admin/products/${product.id}/edit` }
        ]}>
            <Head title={`Edit: ${product.name}`} />

            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Link href="/admin/products" className="p-2 rounded-lg text-terra-600 hover:bg-terra-100 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-terra-900">Edit Produk</h1>
                        <p className="text-terra-500 mt-1">{product.name}</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Info */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-terra-100">
                        <h2 className="text-lg font-semibold text-terra-900 mb-4">Informasi Dasar</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-terra-700 mb-2">Nama Produk *</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-terra-200 bg-sand-50 text-terra-900 focus:outline-none focus:ring-2 focus:ring-wood/50 focus:border-wood transition-all"
                                />
                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-terra-700 mb-2">SKU *</label>
                                <input
                                    type="text"
                                    value={data.sku}
                                    onChange={(e) => setData('sku', e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-terra-200 bg-sand-50 text-terra-900 focus:outline-none focus:ring-2 focus:ring-wood/50 focus:border-wood transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-terra-700 mb-2">Kategori *</label>
                                <select
                                    value={data.category_id}
                                    onChange={(e) => setData('category_id', e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-terra-200 bg-sand-50 text-terra-900 focus:outline-none focus:ring-2 focus:ring-wood/50 focus:border-wood transition-all"
                                >
                                    <option value="">Pilih kategori</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-terra-700 mb-2">Deskripsi</label>
                                <textarea
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-xl border border-terra-200 bg-sand-50 text-terra-900 focus:outline-none focus:ring-2 focus:ring-wood/50 focus:border-wood transition-all resize-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Images */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-terra-100">
                        <h2 className="text-lg font-semibold text-terra-900 mb-4">Gambar Produk</h2>
                        <div className="space-y-4">
                            {/* Existing Images */}
                            {existingImages.length > 0 && (
                                <div>
                                    <p className="text-sm text-terra-500 mb-3">Gambar Saat Ini</p>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                        {existingImages.map((img) => (
                                            <div key={img.id} className="relative group">
                                                <img
                                                    src={img.url}
                                                    alt="Product"
                                                    className="w-full aspect-square object-cover rounded-xl border border-terra-100"
                                                />
                                                {img.is_primary && (
                                                    <span className="absolute top-2 left-2 px-2 py-1 bg-wood text-white text-xs rounded-lg flex items-center gap-1">
                                                        <Star className="w-3 h-3" /> Utama
                                                    </span>
                                                )}
                                                <button
                                                    type="button"
                                                    onClick={() => removeExistingImage(img.id)}
                                                    className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Upload Area */}
                            <div
                                className="border-2 border-dashed border-terra-200 rounded-xl p-8 text-center hover:border-wood transition-colors cursor-pointer"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                                <Upload className="w-12 h-12 mx-auto text-terra-400 mb-4" />
                                <p className="text-terra-700 font-medium">Klik untuk upload gambar baru</p>
                                <p className="text-terra-400 text-sm mt-1">PNG, JPG, WEBP hingga 2MB</p>
                            </div>

                            {/* New Images Preview */}
                            {newImages.length > 0 && (
                                <div>
                                    <p className="text-sm text-terra-500 mb-3">Gambar Baru</p>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                        {newImages.map((img, index) => (
                                            <div key={index} className="relative group">
                                                <img
                                                    src={img.preview}
                                                    alt={`New ${index + 1}`}
                                                    className="w-full aspect-square object-cover rounded-xl border border-terra-100"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeNewImage(index)}
                                                    className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Pricing */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-terra-100">
                        <h2 className="text-lg font-semibold text-terra-900 mb-4">Harga & Stok</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-terra-700 mb-2">Harga *</label>
                                <input type="number" value={data.price} onChange={(e) => setData('price', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-terra-200 bg-sand-50 text-terra-900 focus:outline-none focus:ring-2 focus:ring-wood/50 focus:border-wood transition-all" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-terra-700 mb-2">Diskon (%)</label>
                                <input type="number" value={data.discount_percentage} onChange={(e) => setData('discount_percentage', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-terra-200 bg-sand-50 text-terra-900 focus:outline-none focus:ring-2 focus:ring-wood/50 focus:border-wood transition-all" placeholder="0" min="0" max="100" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-terra-700 mb-2">Stok *</label>
                                <input type="number" value={data.stock_quantity} onChange={(e) => setData('stock_quantity', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-terra-200 bg-sand-50 text-terra-900 focus:outline-none focus:ring-2 focus:ring-wood/50 focus:border-wood transition-all" />
                            </div>
                        </div>
                    </div>

                    {/* Status */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-terra-100">
                        <h2 className="text-lg font-semibold text-terra-900 mb-4">Status</h2>
                        <div className="flex flex-wrap gap-6">
                            <div>
                                <label className="block text-sm font-medium text-terra-700 mb-2">Status Produk</label>
                                <select
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-terra-200 bg-sand-50 text-terra-900 focus:outline-none focus:ring-2 focus:ring-wood/50 focus:border-wood transition-all"
                                >
                                    <option value="active">Aktif</option>
                                    <option value="inactive">Nonaktif</option>
                                    <option value="draft">Draft</option>
                                </select>
                            </div>
                            <label className="flex items-center gap-3 cursor-pointer self-end pb-3">
                                <input type="checkbox" checked={data.is_featured} onChange={(e) => setData('is_featured', e.target.checked)} className="w-5 h-5 rounded border-terra-300 text-terra-900 focus:ring-wood" />
                                <span className="text-terra-700">Produk Unggulan</span>
                            </label>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-4">
                        <Link href="/admin/products" className="px-6 py-3 rounded-xl border border-terra-200 text-terra-700 hover:bg-terra-50 transition-colors font-medium">Batal</Link>
                        <button type="submit" disabled={processing} className="px-6 py-3 rounded-xl bg-terra-900 text-white hover:bg-wood-dark transition-colors font-medium disabled:opacity-50">
                            {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}

