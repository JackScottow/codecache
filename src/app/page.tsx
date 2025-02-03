import CreatePasteForm from "@/components/CreatePasteForm";
import RecentPastes from "@/components/RecentPastes";

export default function HomePage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">CodeCache</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <CreatePasteForm />
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-6 text-neutral-300">Recent Caches</h2>
          <RecentPastes />
        </div>
      </div>
    </main>
  );
}
