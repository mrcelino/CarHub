import Sidebar from "./components/sidebar";

export default function Dashboard() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-slate-400" />
        <div className="aspect-video rounded-xl bg-slate-400" />
        <div className="aspect-video rounded-xl bg-slate-400" />
      </div>
      <div className="flex h-full">
        <div className="min-h-[450px] w-full lex-1 rounded-xl bg-slate-400">
          Konten di sini
        </div>
      </div>
    </div>
  );
}
