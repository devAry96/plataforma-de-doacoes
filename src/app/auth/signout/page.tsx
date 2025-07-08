import Link from 'next/link';

export default function SignOutPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 80 }}>
      <h1>Você saiu da sua conta</h1>
      <p>Obrigado por usar nosso sistema!</p>
      <Link href="/auth/signin" style={{ marginTop: 24, color: '#0070f3', textDecoration: 'underline' }}>
        Voltar para login
      </Link>
    </div>
  );
}
