import CreatePasteForm from "@/components/CreatePasteForm";
import RecentPastes from "@/components/RecentPastes";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-stone-800 dark:text-stone-100">Create New Paste</h1>
          <CreatePasteForm />
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-stone-800 dark:text-stone-100">Recent Pastes</h2>
          <RecentPastes />
        </div>
      </div>
    </div>
  );
}
