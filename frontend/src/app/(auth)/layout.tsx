export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='w-full min-h-screen bg-white'>
      <main className='md:px-16 px-4 py-6 w-full h-screen'>
        {children}
      </main>
    </div>
  );
}
