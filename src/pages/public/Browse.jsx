import { useState } from 'react'
import { useTheme } from '../../context/ThemeContext'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

const categories = [
  { icon: "⚡", label: "Electrical" },
  { icon: "🔧", label: "Plumbing" },
  { icon: "🧹", label: "Cleaning" },
  { icon: "🎨", label: "Painting" },
  { icon: "🏗️", label: "Construction" },
  { icon: "🔨", label: "Appliance Repair" },
  { icon: "💻", label: "Tech Support" },
  { icon: "🚗", label: "Auto Repair" },
]

const providers = [
  { initials: "JO", name: "James Okafor", service: "Electrician", location: "Lagos Island", rating: "4.9", jobs: 84, badge: "gold", color: "#1A73E8", price: "₦5,000", desc: "Specialist in residential wiring, installations and fault detection. 8 years experience." },
  { initials: "MA", name: "Mike Adeyemi", service: "AC & Appliance Repair", location: "Ikeja, Lagos", rating: "4.8", jobs: 120, badge: "gold", color: "#7C3AED", price: "₦8,000", desc: "Expert AC installation, servicing and all home appliance repairs. Fast and reliable." },
  { initials: "SM", name: "Sola Martins", service: "Painter", location: "Victoria Island", rating: "4.7", jobs: 56, badge: "blue", color: "#059669", price: "₦15,000", desc: "Interior and exterior painting. Quality finishes at affordable rates across Lagos." },
  { initials: "EN", name: "Emeka Nwosu", service: "Plumber", location: "Port Harcourt", rating: "4.8", jobs: 43, badge: "blue", color: "#DC2626", price: "₦6,000", desc: "Pipe installations, leakage repairs, drainage and all plumbing works done right." },
  { initials: "KA", name: "Kemi Adebisi", service: "Cleaning Service", location: "Lekki, Lagos", rating: "4.9", jobs: 67, badge: "blue", color: "#0284C7", price: "₦10,000", desc: "Deep cleaning, post-construction cleaning and regular home cleaning services." },
  { initials: "BO", name: "Bayo Ogundimu", service: "Tech Support", location: "Abuja", rating: "4.6", jobs: 38, badge: "gold", color: "#9333EA", price: "₦7,000", desc: "Laptop repairs, network setup, CCTV installation and all tech support needs." },
]

export default function Browse() {
  const { isDark } = useTheme()
  const [activeCategory, setActiveCategory] = useState("Electrical")
  const [search, setSearch] = useState("")

  const filtered = providers.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.service.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-[#0f0f0f]' : 'bg-[#f7f9ff]'}`}>
      <Navbar />

      {/* ── TOP SEARCH BAR ── */}
      <div className={`border-b px-8 py-4 flex flex-wrap items-center gap-3 sticky top-16 z-40 transition-colors duration-300 ${
        isDark ? 'bg-[#141414] border-[#222]' : 'bg-white border-gray-100'
      }`}>

        {/* Search input */}
        <div className={`flex items-center gap-2 rounded-full px-5 py-2.5 border flex-1 max-w-md ${
          isDark ? 'bg-[#1a1a1a] border-[#333]' : 'bg-gray-50 border-gray-200'
        }`}>
          <span className="text-gray-400 text-sm">🔍</span>
          <input
            type="text"
            placeholder="Search for a service or provider..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className={`flex-1 bg-transparent outline-none text-sm placeholder-gray-400 ${
              isDark ? 'text-white' : 'text-gray-700'
            }`}
          />
        </div>

        {/* Category pills */}
        <div className="flex items-center gap-2 flex-wrap">
          {categories.slice(0, 4).map((cat, i) => (
            <button
              key={i}
              onClick={() => setActiveCategory(cat.label)}
              className={`flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-full border transition ${
                activeCategory === cat.label
                  ? 'bg-[#1A73E8] text-white border-[#1A73E8]'
                  : isDark
                    ? 'bg-[#1a1a1a] text-gray-400 border-[#333] hover:border-[#1A73E8]'
                    : 'bg-white text-gray-500 border-gray-200 hover:border-[#1A73E8]'
              }`}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
          <button
            onClick={() => setActiveCategory("")}
            className={`text-xs font-bold px-4 py-2 rounded-full border transition ${
              activeCategory === ""
                ? 'bg-[#1A73E8] text-white border-[#1A73E8]'
                : isDark
                  ? 'bg-[#1a1a1a] text-gray-400 border-[#333]'
                  : 'bg-white text-gray-500 border-gray-200'
            }`}
          >
            All
          </button>
        </div>

        {/* Results count */}
        <p className={`text-xs font-medium ml-auto ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
          {filtered.length} providers found
        </p>
      </div>

      {/* ── MAIN LAYOUT ── */}
      <div className="max-w-7xl mx-auto px-8 py-8 grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* ── SIDEBAR ── */}
        <div className="flex flex-col gap-4">

          {/* Categories */}
          <div className={`rounded-2xl border p-5 transition-colors duration-300 ${
            isDark ? 'bg-[#141414] border-[#222]' : 'bg-white border-gray-100'
          }`}>
            <h3 className={`text-sm font-extrabold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Categories
            </h3>
            <div className="flex flex-col gap-1">
              {categories.map((cat, i) => (
                <button
                  key={i}
                  onClick={() => setActiveCategory(cat.label)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition text-left ${
                    activeCategory === cat.label
                      ? 'bg-blue-50 text-[#1A73E8]'
                      : isDark
                        ? 'text-gray-400 hover:bg-white/5'
                        : 'text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  <span>{cat.icon}</span>
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Badge filter */}
          <div className={`rounded-2xl border p-5 transition-colors duration-300 ${
            isDark ? 'bg-[#141414] border-[#222]' : 'bg-white border-gray-100'
          }`}>
            <h3 className={`text-sm font-extrabold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Provider Badge
            </h3>
            <div className="flex flex-col gap-3">
              {["★ Top Rated (Gold)", "✓ Verified (Blue)", "All Providers"].map((opt, i) => (
                <label key={i} className={`flex items-center gap-3 text-sm font-medium cursor-pointer ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  <input type="checkbox" defaultChecked={i < 2} className="accent-[#1A73E8] w-4 h-4" />
                  {opt}
                </label>
              ))}
            </div>
          </div>

          {/* Rating filter */}
          <div className={`rounded-2xl border p-5 transition-colors duration-300 ${
            isDark ? 'bg-[#141414] border-[#222]' : 'bg-white border-gray-100'
          }`}>
            <h3 className={`text-sm font-extrabold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Minimum Rating
            </h3>
            <div className="flex flex-col gap-3">
              {["⭐⭐⭐⭐⭐ 5.0", "⭐⭐⭐⭐ 4.0+", "⭐⭐⭐ 3.0+"].map((opt, i) => (
                <label key={i} className={`flex items-center gap-3 text-sm font-medium cursor-pointer ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  <input type="checkbox" defaultChecked={i === 0} className="accent-[#1A73E8] w-4 h-4" />
                  {opt}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* ── PROVIDER GRID ── */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((p, i) => (
              <div
                key={i}
                className={`rounded-3xl border-2 p-5 flex flex-col gap-3 transition-all duration-200 hover:-translate-y-1 hover:border-[#1A73E8] hover:shadow-lg cursor-pointer ${
                  isDark ? 'bg-[#141414] border-[#222]' : 'bg-white border-gray-100'
                }`}
              >
                {/* Top */}
                <div className="flex items-start gap-3">
                  <div className="relative shrink-0">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-extrabold text-sm"
                      style={{ background: p.color }}
                    >
                      {p.initials}
                    </div>
                    <div className={`absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold text-white border-2 ${
                      isDark ? 'border-[#141414]' : 'border-white'
                    } ${p.badge === 'gold' ? 'bg-amber-400' : 'bg-[#1A73E8]'}`}>
                      {p.badge === 'gold' ? '★' : '✓'}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-extrabold truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{p.name}</p>
                    <p className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{p.service}</p>
                    <p className={`text-xs ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>📍 {p.location}</p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <span className="text-amber-400 text-xs">⭐⭐⭐⭐⭐</span>
                  <span className={`text-xs font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{p.rating}</span>
                  <span className={`text-xs ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>· {p.jobs} jobs</span>
                </div>

                {/* Description */}
                <p className={`text-xs leading-relaxed ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  {p.desc}
                </p>

                {/* Footer */}
                <div className={`flex items-center justify-between pt-3 border-t ${isDark ? 'border-[#222]' : 'border-gray-100'}`}>
                  <div>
                    <span className={`text-sm font-extrabold ${isDark ? 'text-white' : 'text-gray-900'}`}>From {p.price}</span>
                    <span className={`text-xs ml-1 ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>/ job</span>
                  </div>
                  <button className={`text-xs font-bold px-4 py-2 rounded-full transition ${
                    isDark
                      ? 'bg-green-500/10 text-green-400 hover:bg-green-500 hover:text-white'
                      : 'bg-green-50 text-green-600 hover:bg-green-500 hover:text-white'
                  }`}>
                    💬 WhatsApp
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}