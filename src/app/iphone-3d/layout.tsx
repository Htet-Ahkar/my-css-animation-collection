export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="flex-col-center screen bg-black text-white" id="root">
        {children}
      </main>
    </>
  );
}
