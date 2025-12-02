import TextLink from '@/components/text-link';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { logout } from '@/routes';
import { send } from '@/routes/verification';
import { Form, Head } from '@inertiajs/react';
import { Mail } from 'lucide-react';

export default function VerifyEmail({ status }: { status?: string }) {
    return (
        <AuthLayout
            title="Verifikasi Email"
            description="Silakan verifikasi alamat email Anda dengan mengklik link yang telah kami kirimkan."
        >
            <Head title="Verifikasi Email" />

            <div className="text-center mb-6">
                <div className="w-16 h-16 bg-wood/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-wood" />
                </div>
            </div>

            {status === 'verification-link-sent' && (
                <div className="mb-6 text-center text-sm font-medium text-green-600 bg-green-50 py-3 px-4 rounded-lg border border-green-200">
                    Link verifikasi baru telah dikirim ke alamat email yang Anda daftarkan.
                </div>
            )}

            <Form {...send.form()} className="space-y-6 text-center">
                {({ processing }) => (
                    <>
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-terra-100 hover:bg-terra-200 text-terra-900 font-medium py-3.5 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {processing && <Spinner />}
                            Kirim Ulang Email Verifikasi
                        </button>

                        <TextLink
                            href={logout()}
                            className="mx-auto block text-sm text-terra-500 hover:text-wood transition-colors"
                        >
                            Keluar
                        </TextLink>
                    </>
                )}
            </Form>
        </AuthLayout>
    );
}
