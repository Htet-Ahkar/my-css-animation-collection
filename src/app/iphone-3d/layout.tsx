export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="flex-col-center screen bg-black" id="root">
        {children}
      </main>
    </>
  );
}
