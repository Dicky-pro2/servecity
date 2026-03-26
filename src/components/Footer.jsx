import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

export default function Footer() {
  const { isDark } = useTheme()

  return (
    <>
      {/* ── CTA BANNER ── */}
      <section className="bg-[#1A73E8] px-8 py-16 text-center">
        <h2 className="text-3xl font-extrabold text-white mb-3 tracking-tight">
          Ready to Get Started?
        </h2>
        <p className="text-blue-200 text-sm font-medium mb-8">
          Join thousands of clients and providers already using ServeCity across the city.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <Link
            to="/register"
            className="bg-white text-[#1A73E8] text-sm font-bold px-8 py-3 rounded-full hover:bg-gray-100 transition"
          >
            Find a Service
          </Link>
          <Link
            to="/register"
            className="border-2 border-white/30 text-white text-sm font-bold px-8 py-3 rounded-full hover:border-white/60 transition"
          >
            Offer a Service
          </Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className={`px-8 pt-14 transition-colors duration-300 ${isDark ? 'bg-[#0a0a0a]' : 'bg-[#0f0f0f]'}`}>
        <div className="max-w-7xl mx-auto">

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/5">

            {/* Brand */}
            <div className="md:col-span-1">
              <Link to="/" className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg bg-[#1A73E8] flex items-center justify-center">
                  <span className="text-white text-[11px] font-bold">SC</span>
                </div>
                <span className="text-white font-extrabold text-lg tracking-tight">
                  ServeCity
                </span>
              </Link>
              <p className="text-gray-600 text-sm leading-relaxed mb-6 max-w-xs">
                Connecting clients with trusted service providers across the city. Safe payments. Real reviews. Fair opportunities.
              </p>
              {/* Socials */}
              <div className="flex gap-2">
                {["𝕏", "f", "in", "📸"].map((s, i) => (
                  <button
                    key={i}
                    className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-sm text-gray-400 hover:bg-[#1A73E8] hover:text-white hover:border-[#1A73E8] transition"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Platform */}
            <div>
              <h4 className="text-white text-sm font-bold mb-5">Platform</h4>
              <ul className="flex flex-col gap-3">
                {[
                  { label: "Browse Services", to: "/browse" },
                  { label: "How It Works", to: "/how-it-works" },
                  { label: "Become a Provider", to: "/register" },
                  { label: "Pricing", to: "/pricing" },
                ].map((item, i) => (
                  <li key={i}>
                    <Link to={item.to} className="text-gray-600 text-sm font-medium hover:text-white transition">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-white text-sm font-bold mb-5">Company</h4>
              <ul className="flex flex-col gap-3">
                {[
                  { label: "About Us", to: "/about" },
                  { label: "Blog", to: "/blog" },
                  { label: "Careers", to: "/careers" },
                  { label: "Contact Us", to: "/contact" },
                ].map((item, i) => (
                  <li key={i}>
                    <Link to={item.to} className="text-gray-600 text-sm font-medium hover:text-white transition">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-white text-sm font-bold mb-5">Legal</h4>
              <ul className="flex flex-col gap-3">
                {[
                  { label: "Privacy Policy", to: "/privacy" },
                  { label: "Terms of Service", to: "/terms" },
                  { label: "Cookie Policy", to: "/cookies" },
                  { label: "Support", to: "/support" },
                ].map((item, i) => (
                  <li key={i}>
                    <Link to={item.to} className="text-gray-600 text-sm font-medium hover:text-white transition">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-gray-600 text-xs">
              © {new Date().getFullYear()} ServeCity. All rights reserved.
            </p>
            <p className="text-gray-600 text-xs">
              Built with ❤️ in Nigeria
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}