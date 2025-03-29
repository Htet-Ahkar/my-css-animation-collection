export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="flex-col-center screen" id="root">
        {children}
      </main>
    </>
  );
}
