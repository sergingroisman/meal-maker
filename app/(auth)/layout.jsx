import Header from "@/components/Header"

export default function AuthLayout({ children }) {
  return (
    <div>
      <Header />
      <div className="flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
}