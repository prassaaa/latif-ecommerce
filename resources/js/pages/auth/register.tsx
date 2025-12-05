import { login } from '@/routes';
import { store } from '@/routes/register';
import { Form, Head, usePage } from '@inertiajs/react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { SiteSettings } from '@/types';

export default function Register() {
    const { siteSettings } = usePage<{ siteSettings?: SiteSettings }>().props;
    const siteName = siteSettings?.site_name || 'Latif Living';

    return (
        <AuthLayout
            title="Buat Akun Baru"
            description={`Daftar untuk mulai berbelanja di ${siteName}`}
        >
            <Head title="Daftar" />
            <Form
                {...store.form()}
                resetOnSuccess={['password', 'password_confirmation']}
                disableWhileProcessing
                className="flex flex-col gap-5"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-5">
                            <div className="grid gap-2">
                                <Label htmlFor="name" className="text-terra-700 font-medium">
                                    Nama Lengkap
                                </Label>
                                <input
                                    id="name"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="name"
                                    name="name"
                                    placeholder="Masukkan nama lengkap"
                                    className="w-full px-4 py-3 rounded-xl border border-terra-200 bg-sand-50 text-terra-900 placeholder:text-terra-400 focus:outline-none focus:ring-2 focus:ring-wood/50 focus:border-wood transition-all"
                                />
                                <InputError message={errors.name} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email" className="text-terra-700 font-medium">
                                    Alamat Email
                                </Label>
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    tabIndex={2}
                                    autoComplete="email"
                                    name="email"
                                    placeholder="Masukkan alamat email"
                                    className="w-full px-4 py-3 rounded-xl border border-terra-200 bg-sand-50 text-terra-900 placeholder:text-terra-400 focus:outline-none focus:ring-2 focus:ring-wood/50 focus:border-wood transition-all"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password" className="text-terra-700 font-medium">
                                    Kata Sandi
                                </Label>
                                <input
                                    id="password"
                                    type="password"
                                    required
                                    tabIndex={3}
                                    autoComplete="new-password"
                                    name="password"
                                    placeholder="Minimal 8 karakter"
                                    className="w-full px-4 py-3 rounded-xl border border-terra-200 bg-sand-50 text-terra-900 placeholder:text-terra-400 focus:outline-none focus:ring-2 focus:ring-wood/50 focus:border-wood transition-all"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password_confirmation" className="text-terra-700 font-medium">
                                    Konfirmasi Kata Sandi
                                </Label>
                                <input
                                    id="password_confirmation"
                                    type="password"
                                    required
                                    tabIndex={4}
                                    autoComplete="new-password"
                                    name="password_confirmation"
                                    placeholder="Ulangi kata sandi"
                                    className="w-full px-4 py-3 rounded-xl border border-terra-200 bg-sand-50 text-terra-900 placeholder:text-terra-400 focus:outline-none focus:ring-2 focus:ring-wood/50 focus:border-wood transition-all"
                                />
                                <InputError message={errors.password_confirmation} />
                            </div>

                            <button
                                type="submit"
                                tabIndex={5}
                                disabled={processing}
                                data-test="register-user-button"
                                className="mt-2 w-full bg-terra-900 hover:bg-wood-dark text-white font-medium py-3.5 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
                            >
                                {processing && <Spinner className="text-white" />}
                                Daftar Sekarang
                            </button>
                        </div>

                        <div className="text-center text-sm text-terra-500 pt-2">
                            Sudah punya akun?{' '}
                            <TextLink
                                href={login()}
                                tabIndex={6}
                                className="text-wood font-medium hover:text-wood-dark transition-colors"
                            >
                                Masuk di sini
                            </TextLink>
                        </div>
                    </>
                )}
            </Form>
        </AuthLayout>
    );
}
