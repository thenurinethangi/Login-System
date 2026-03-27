import React from "react";

type AuthShellProps = {
  title: string;
  subtitle: string;
  footer: React.ReactNode;
  children: React.ReactNode;
  sidebarContent?: React.ReactNode;
};

export default function AuthShell({
  title,
  subtitle,
  footer,
  children,
  sidebarContent,
}: AuthShellProps) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] min-h-screen">
        <div className="hidden lg:flex flex-col justify-between bg-linear-to-br from-[#1a1a2e] via-[#0f3460] to-[#16213e] p-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 -left-20 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#7c3aed]/10 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
              <svg className="w-full h-full opacity-5" viewBox="0 0 400 600" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{stopColor: 'white', stopOpacity: 1}} />
                    <stop offset="100%" style={{stopColor: 'white', stopOpacity: 0}} />
                  </linearGradient>
                </defs>
                <path d="M 0 0 Q 100 100 0 200 L 0 0" fill="url(#grad1)" />
                <path d="M 400 600 Q 350 500 400 400 L 400 600" fill="url(#grad1)" />
              </svg>
            </div>
            <img 
              src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&h=1000&fit=crop&q=80" 
              alt="Premium shopping experience" 
              className="w-full h-full object-cover opacity-20"
            />
          </div>
          
          <div className="relative z-10 flex flex-col justify-between h-full">
            <div>
              <div className="text-[#7c3aed] font-semibold text-sm tracking-widest uppercase mb-4">Welcome to Elite</div>
              <h2 className="text-4xl font-playfair font-bold leading-tight text-white mb-4">Premium Collections</h2>
              <p className="text-white/70 text-sm leading-relaxed mb-6">Discover curated collections of luxury products and exclusive offers designed for you.</p>
            </div>
            {sidebarContent}
          </div>
        </div>

        <div className="flex flex-col items-center justify-center px-6 py-12 sm:px-8 lg:px-12">          <div className="w-full max-w-md space-y-8">
            <div className="space-y-2">
              <h1 className="text-5xl font-playfair font-bold text-[#0f0f0f]">{title}</h1>
              <p className="text-base text-[#6b7280] font-light tracking-wide">{subtitle}</p>
            </div>

            <div>{children}</div>
            
            <div className="text-center text-xs text-[#9ca3af] tracking-wide">{footer}</div>
          </div>
        </div>
      </div>
    </main>
  );
}
