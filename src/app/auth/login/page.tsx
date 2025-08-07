import Login from '@/components/auth/Login';

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] pt-16 flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <Login />
      </div>
    </div>
  );
}
