import "@/app/globals.css";
import Navbar from "@/components/common/navbar/navbar";
export default function HomeLayout({ children }) {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <Navbar />
      {children}
    </div>
  );
}
