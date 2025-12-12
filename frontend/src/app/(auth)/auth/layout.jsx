import "@/app/globals.css";

export default function AuthLayout({ children }) {
  return (
    <div
      className="antialiased bg-zinc-50 dark:bg-black flex items-center justify-center px-4"
      style={{
        minHeight: "100vh",
        backgroundImage: "url('/auth_bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-full min-h-[80vh] max-w-7xl p-2  bg-white dark:bg-zinc-900 rounded-3xl  backdrop-blur-[2px] shadow-none border-2  grid  grid-cols-1 lg:grid-cols-2">
        <div className="col-span-1 bg-white flex items-center justify-center lg:col-span-1 ">
          {children}
        </div>
        <div
          className="col-span-1  border rounded-2xl bg-slate-800 hidden lg:block "
          style={{
            backgroundImage: "url('/auth_login.png')",
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
      </div>
    </div>
  );
}
