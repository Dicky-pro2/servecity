import Navbar from "../../components/Navbar";
import { useTheme } from "../../context/ThemeContext";
import Footer from "../../components/Footer";

export default function Home() {
  const { isDark } = useTheme();
  return (
    <div className={`min-h-screen ${isDark ? "bg-[#141414]" : "bg-white"}`}>
      <Navbar />
      <HeroSection />
      <CategoriesSection />
      <HowItWorksSection />
      <FeaturedProvidersSection />
      <TrustSafetySection />
      <Footer />
    </div>
  );
}

function HeroSection() {
  const { isDark } = useTheme();
  return (
    <>
      {/* ── HERO ── */}
      <section
        className={`max-w-7xl mx-auto px-8 py-16 md:py-24 flex flex-col md:flex-row items-center justify-between gap-16 ${isDark ? "text-white" : "text-gray-900"}`}
      >
        {/* Left */}
        <div className="flex-1 max-w-xl">
          {/* Tag */}
          <div className={`inline-flex items-center gap-2 bg-blue-50 text-[#1A73E8] text-xs font-bold px-4 py-2 rounded-full mb-6 ${isDark ? "bg-gray-700 border border-green-500 text-green-400" : "bg-blue-100"}`}>
            <span className={`w-1.5 h-1.5 bg-[#1A73E8] rounded-full ${isDark ? "bg-green-400" : "bg-blue-300"}`} />
            #1 Service Marketplace in Port Harcourt
          </div>
          {/* Headline */}
          <h1
            className={`text-4xl md:text-5xl font-extrabold leading-[1.15] tracking-tight mb-5 ${isDark ? "text-white" : "text-gray-900"}`}
          >
            We connect you with{" "}
            <span className="text-[#1A73E8]">trusted services</span> for your
            home & business
          </h1>
          {/* Subtext */}
          <p
            className={`text-base leading-relaxed mb-8 max-w-md ${isDark ? "text-gray-400" : "text-gray-500"}`}
          >
            Find skilled service providers across the city — electrical,
            plumbing, cleaning, tech support and more. Safe payments. Real
            reviews.
          </p>
          {/* Search */}
          <div
            className={`flex items-center gap-2 rounded-full px-5 py-2 max-w-md mb-5 border ${isDark ? "bg-[#1a1a1a] border-[#333]" : "bg-gray-50 border-gray-200"}`}
          >
            <input
              className={`flex-1 bg-transparent outline-none text-sm placeholder-gray-400 py-1 placeholder:${isDark ? "text-gray-500" : "text-gray-400"}`}
            />
            <button className="bg-[#1A73E8] hover:bg-blue-700 text-white text-sm font-bold px-5 py-2.5 rounded-full transition shrink-0">
              Search
            </button>
          </div>
          {/* Popular tags */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-gray-400 font-medium">Popular:</span>
            {["Electrical", "Plumbing", "Cleaning", "Painting"].map((tag) => (
              <button
                key={tag}
                className={`text-xs font-semibold text-gray-600 ${isDark ? "bg-gray-600 hover:bg-gray-500 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-700"} px-4 py-1.5 rounded-full transition`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Right — Illustration */}
        <div className="flex-1 flex justify-center items-center w-full">
          <div className="relative w-full max-w-md">
            {/* Background blob */}
            <div className="absolute inset-0 bg-blue-50 rounded-3xl -rotate-2 scale-95" />

            {/* Card */}
            <div className="relative bg-blue-50 rounded-3xl p-10 flex items-center justify-center min-h-[340px]">
              {/* Placeholder — replace with your illustration */}
              <div className="text-center">
                <div className="text-7xl mb-3">🔧</div>
                <p
                  className={`text-base leading-relaxed mb-8 max-w-md ${isDark ? "text-gray-400" : "text-gray-500"}`}
                >
                  Add illustration to src/assets/hero.png
                </p>
              </div>

              {/* Floating card — top left */}
              <div className={`absolute -top-4 -left-4 ${isDark ? "bg-gray-800" : "bg-white"} rounded-2xl shadow-lg px-4 py-3 flex items-center gap-3`}>
                <div className="w-8 h-8 bg-green-100 rounded-xl flex items-center justify-center text-sm">
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-900">
                    Payment Secured
                  </div>
                  <div className="text-[10px] text-gray-400">
                    Escrow protected
                  </div>
                </div>
              </div>

              {/* Floating card — bottom right */}
              <div className={`absolute -bottom-4 -right-4 ${isDark ? "bg-gray-800" : "bg-white"} rounded-2xl shadow-lg px-4 py-3 flex items-center gap-3`}>
                <div className="w-8 h-8 bg-blue-100 rounded-xl flex items-center justify-center text-sm">
                  ⭐
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-900">
                    4.8 Rating
                  </div>
                  <div className="text-[10px] text-gray-400">
                    1,200+ reviews
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section
        className={`border-t border-b py-6 px-8 ${isDark ? "bg-[#141414] border-[#222]" : "bg-gray-50 border-gray-100"}`}
      >
        <div
          className={`text-2xl font-extrabold ${isDark ? "text-white" : "text-gray-900"}`}
        >
          Trusted by Thousands in Port Harcourt
        </div>
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[
            { v: "500+", l: "Service Providers" },
            { v: "1,200+", l: "Jobs Completed" },
            { v: "4.8★", l: "Average Rating" },
            { v: "₦0", l: "Lost to Scams" },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl font-extrabold text-gray-900">{s.v}</div>
              <div className="text-xs text-gray-400 font-medium mt-0.5">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function CategoriesSection() {
  const categories = [
    { icon: "⚡", label: "Electrical", bg: "#FFF7ED" },
    { icon: "🔧", label: "Plumbing", bg: "#EFF6FF" },
    { icon: "🧹", label: "Cleaning", bg: "#F0FDF4" },
    { icon: "🎨", label: "Painting", bg: "#FDF4FF" },
    { icon: "🏗️", label: "Construction", bg: "#FEF2F2" },
    { icon: "🔨", label: "Appliance Repair", bg: "#FFFBEB" },
    { icon: "💻", label: "Tech Support", bg: "#F0F9FF" },
    { icon: "🚗", label: "Auto Repair", bg: "#F8FAFC" },
  ];
  const { isDark } = useTheme();
  return (
    <section
      className={`px-8 py-20 ${isDark ? "text-white" : "text-gray-900"}`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-50 text-[#1A73E8] text-xs font-bold px-4 py-2 rounded-full mb-3">
              <span className="w-1.5 h-1.5 bg-[#1A73E8] rounded-full" />
              Categories
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              Browse Services{" "}
              <span className="text-[#1A73E8]">By Category</span>
            </h2>
            <p
              className={`text-base leading-relaxed mb-8 max-w-md ${isDark ? "text-gray-400" : "text-gray-500"}`}
            >
              Find the right provider for any job across the city
            </p>
          </div>
          <a
            href="/browse"
            className="text-sm font-bold text-[#1A73E8] hover:underline flex items-center gap-1 pb-1"
          >
            View all →
          </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
          {categories.map((cat, i) => (
            <a
              key={i}
              href="/browse"
              className={`flex items-center gap-4 p-5 bg-white border-2 border-gray-100 rounded-2xl hover:border-[#1A73E8] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 ${isDark ? "bg-gray-800 border border-gray-600 hover:border-green-500 text-white" : "bg-gray-50 border-gray-100"}`}
            >
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0 ${isDark ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
                style={{ background: cat.bg }}
              >
                {cat.icon}
              </div>
              <span className="text-sm font-bold text-gray-900">
                {cat.label}
              </span>
              <span className="text-gray-300 ml-auto text-sm">→</span>
            </a>
          ))}
        </div>

        {/* Provider CTA Banner */}
        <div className={`bg-blue-50 rounded-2xl px-8 py-7 flex flex-col md:flex-row items-center justify-between gap-5 ${isDark ? "bg-gray-800 border-gray-600" : "bg-gray-50 border-gray-100"}`}>
          <div>
            <p
              className={`text-base leading-relaxed mb-8 max-w-md ${isDark ? "text-gray-400" : "text-gray-500"}`}
            >
              Are you a service provider?{" "}
              <span className="text-[#1A73E8]">Join ServeCity today.</span>
            </p>
            <p
              className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"} mt-1`}
            >
              List your services, get discovered by clients, and grow your
              business.
            </p>
          </div>

          <a
            href="/register"
            className={`bg-[#1A73E8] hover:bg-blue-700 text-white text-sm font-bold px-7 py-3 rounded-full transition whitespace-nowrap shadow-sm ${isDark ? "shadow-[#1A73E9]" : "shadow-blue-300"}`}
          >
            Become a Provider →
          </a>
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const { isDark } = useTheme()

  const steps = [
    {
      icon: "🔍",
      iconBg: "#EEF4FF",
      num: "01",
      title: "Search & Connect",
      desc: 'Browse providers by category or location. View their profile, ratings and badge. Tap "Chat on WhatsApp" to discuss the job and agree on a price.'
    },
    {
      icon: "💳",
      iconBg: "#F0FDF4",
      num: "02",
      title: "Book & Pay Safely",
      desc: "Fund your wallet and make payment on the platform. Your money is held securely in escrow — the provider only gets paid after the job is done."
    },
    {
      icon: "⭐",
      iconBg: "#FFF7ED",
      num: "03",
      title: "Confirm & Rate",
      desc: "Once the job is completed, confirm it on the platform. Payment is released to the provider and you leave a rating to help the community grow."
    },
  ]

  return (
    <section className={`px-8 py-20 transition-colors duration-300 ${isDark ? 'bg-[#0a0a0a]' : 'bg-[#F7F9FF]'}`}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-[#1A73E8] text-xs font-bold px-4 py-2 rounded-full mb-4">
            <span className="w-1.5 h-1.5 bg-[#1A73E8] rounded-full" />
            Simple Process
          </div>
          <h2 className={`text-3xl md:text-4xl font-extrabold tracking-tight mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            How <span className="text-[#1A73E8]">ServeCity</span> Works
          </h2>
          <p className={`text-sm font-medium ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            Get the help you need in 3 simple steps
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {steps.map((step, i) => (
            <div
              key={i}
              className={`relative rounded-3xl p-8 border-2 overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:border-[#1A73E8] hover:shadow-lg ${
                isDark
                  ? 'bg-[#141414] border-[#222]'
                  : 'bg-white border-gray-100'
              }`}
            >
              {/* Big background number */}
              <div className={`absolute top-4 right-5 text-6xl font-extrabold leading-none pointer-events-none select-none ${
                isDark ? 'text-[#1e1e1e]' : 'text-[#F0F4FF]'
              }`}>
                {step.num}
              </div>

              {/* Icon */}
              <div
                className="w-13 h-13 rounded-2xl flex items-center justify-center text-2xl mb-5"
                style={{ background: step.iconBg, width: 52, height: 52 }}
              >
                {step.icon}
              </div>

              {/* Step label */}
              <p className="text-xs font-bold text-[#1A73E8] uppercase tracking-widest mb-2">
                Step {step.num}
              </p>

              {/* Title */}
              <h3 className={`text-lg font-extrabold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {step.title}
              </h3>

              {/* Description */}
              <p className={`text-sm leading-relaxed font-medium ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="bg-[#1A73E8] rounded-3xl px-10 py-9 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-extrabold text-white mb-1">
              Ready to get started?
            </h3>
            <p className="text-sm text-blue-200 font-medium">
              Join thousands of clients and providers already using ServeCity across the city.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            
            <a
              href="/register"
              className="bg-white text-[#1A73E8] text-sm font-bold px-6 py-3 rounded-full hover:bg-gray-100 transition whitespace-nowrap"
            >
              Find a Service
            </a>
            
             <a
              href="/register"
              className="border-2 border-white/30 text-white text-sm font-bold px-6 py-3 rounded-full hover:border-white/60 transition whitespace-nowrap"
            >
              Offer a Service
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}

function FeaturedProvidersSection() {
  const { isDark } = useTheme()

  const providers = [
    { initials: "JO", name: "James Okafor", service: "Electrician", location: "Lagos Island", rating: "4.9", jobs: 84, badge: "gold", color: "#1A73E8" },
    { initials: "MA", name: "Mike Adeyemi", service: "AC & Appliance Repair", location: "Ikeja, Lagos", rating: "4.8", jobs: 120, badge: "gold", color: "#7C3AED" },
    { initials: "SM", name: "Sola Martins", service: "Painter", location: "Victoria Island", rating: "4.7", jobs: 56, badge: "blue", color: "#059669" },
    { initials: "EN", name: "Emeka Nwosu", service: "Plumber", location: "Port Harcourt", rating: "4.8", jobs: 43, badge: "blue", color: "#DC2626" },
  ]

  return (
    <section className={`px-8 py-20 transition-colors duration-300 ${isDark ? 'bg-[#0f0f0f]' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-50 text-[#1A73E8] text-xs font-bold px-4 py-2 rounded-full mb-3">
              <span className="w-1.5 h-1.5 bg-[#1A73E8] rounded-full" />
              Top Rated
            </div>
            <h2 className={`text-3xl md:text-4xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Featured <span className="text-[#1A73E8]">Providers</span>
            </h2>
            <p className={`text-sm font-medium mt-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              Trusted and verified service providers across the city
            </p>
          </div>
          <a href="/browse" className="text-sm font-bold text-[#1A73E8] hover:underline pb-1">
            View all →
          </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {providers.map((p, i) => (
            <div
              key={i}
              className={`relative flex flex-col items-center text-center p-6 rounded-3xl border-2 transition-all duration-200 hover:-translate-y-1 hover:border-[#1A73E8] hover:shadow-lg ${
                isDark ? 'bg-[#141414] border-[#222]' : 'bg-white border-gray-100'
              }`}
            >
              {/* Avatar */}
              <div className="relative mb-4">
                <div
                  className="w-18 h-18 rounded-full flex items-center justify-center text-white text-xl font-extrabold"
                  style={{ background: p.color, width: 72, height: 72 }}
                >
                  {p.initials}
                </div>
                {/* Badge tick */}
                <div
                  className={`absolute bottom-0 right-0 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white border-2 ${
                    isDark ? 'border-[#141414]' : 'border-white'
                  } ${p.badge === 'gold' ? 'bg-amber-400' : 'bg-[#1A73E8]'}`}
                >
                  {p.badge === 'gold' ? '★' : '✓'}
                </div>
              </div>

              {/* Info */}
              <p className={`text-sm font-extrabold mb-0.5 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {p.name}
              </p>
              <p className={`text-xs font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {p.service}
              </p>
              <p className={`text-xs mb-3 ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                📍 {p.location}
              </p>

              {/* Rating */}
              <div className="flex items-center justify-center gap-1.5 mb-4">
                <span className="text-amber-400 text-xs">⭐⭐⭐⭐⭐</span>
                <span className={`text-xs font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{p.rating}</span>
                <span className={`text-xs ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>· {p.jobs} jobs</span>
              </div>

              {/* WhatsApp Button */}
              <button
                className={`w-full text-xs font-bold py-2.5 rounded-full transition-all ${
                  isDark
                    ? 'bg-[#1a2a1a] text-green-400 hover:bg-green-500 hover:text-white'
                    : 'bg-green-50 text-green-600 hover:bg-green-500 hover:text-white'
                }`}
              >
                💬 Chat on WhatsApp
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TrustSafetySection() {
  const { isDark } = useTheme()

  const trustItems = [
    {
      icon: "🔒",
      iconBg: "#EEF4FF",
      title: "Escrow Payment System",
      desc: "Your payment is held safely on the platform and only released to the provider after you confirm the job is completed."
    },
    {
      icon: "✅",
      iconBg: "#F0FDF4",
      title: "Verified Provider Badges",
      desc: "Providers earn blue and gold badges after completing real jobs on the platform — so you always know who to trust."
    },
    {
      icon: "⭐",
      iconBg: "#FFF7ED",
      title: "Transparent Ratings",
      desc: "Every rating is left by a real client after a completed and paid job — no fake reviews, ever."
    },
    {
      icon: "🤝",
      iconBg: "#FDF4FF",
      title: "Fair for Everyone",
      desc: "New providers get equal visibility as experienced ones. Your quality of work determines how far you go."
    },
  ]

  const walletItems = [
    { name: "Plumbing — James O.", tag: "In Escrow", tagClass: "text-orange-400 bg-orange-400/10", amount: "−₦12,000" },
    { name: "AC Install — Mike A.", tag: "Completed", tagClass: "text-green-400 bg-green-400/10", amount: "+₦18,000" },
    { name: "Painting — Sola M.", tag: "In Progress", tagClass: "text-blue-400 bg-blue-400/10", amount: "−₦8,000" },
  ]

  return (
    <section className={`px-8 py-20 transition-colors duration-300 ${isDark ? 'bg-[#0a0a0a]' : 'bg-[#F7F9FF]'}`}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

        {/* Left */}
        <div>
          <div className="inline-flex items-center gap-2 bg-blue-50 text-[#1A73E8] text-xs font-bold px-4 py-2 rounded-full mb-4">
            <span className="w-1.5 h-1.5 bg-[#1A73E8] rounded-full" />
            Trust & Safety
          </div>
          <h2 className={`text-3xl md:text-4xl font-extrabold tracking-tight leading-tight mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Your Money is Always{' '}
            <span className="text-[#1A73E8]">Protected</span>
          </h2>
          <p className={`text-sm leading-relaxed mb-8 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            Every payment on ServeCity is held in secure escrow and only released after you confirm the job is done. No scams, no stress — just peace of mind.
          </p>

          {/* Trust items */}
          <div className="flex flex-col gap-5 mb-10">
            {trustItems.map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0"
                  style={{ background: item.iconBg }}
                >
                  {item.icon}
                </div>
                <div>
                  <p className={`text-sm font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {item.title}
                  </p>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          
            <a href="/register"
            className="inline-block bg-[#1A73E8] hover:bg-blue-700 text-white text-sm font-bold px-7 py-3.5 rounded-full transition"
          >
            Get Started — It's Free
          </a>
        </div>

        {/* Right */}
        <div className="flex flex-col gap-4">

          {/* Wallet mockup */}
          <div className="bg-gray-950 rounded-3xl p-7">
            <p className="text-white/40 text-xs font-semibold mb-1">My Wallet</p>
            <p className="text-white text-4xl font-extrabold mb-1">₦45,000</p>
            <p className="text-white/30 text-xs mb-6">Available balance</p>

            <div className="flex flex-col gap-3">
              {walletItems.map((item, i) => (
                <div key={i} className="bg-white/5 rounded-2xl px-4 py-3 flex items-center justify-between">
                  <div>
                    <p className="text-white/70 text-xs font-semibold">{item.name}</p>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 inline-block ${item.tagClass}`}>
                      {item.tag}
                    </span>
                  </div>
                  <p className="text-white text-sm font-extrabold">{item.amount}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Info cards */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: "🛡️", title: "100% Secure", desc: "All transactions are encrypted and protected on our platform." },
              { icon: "💬", title: "WhatsApp First", desc: "Negotiate freely on WhatsApp before any payment is made." },
            ].map((card, i) => (
              <div key={i} className={`rounded-2xl p-5 border ${isDark ? 'bg-[#141414] border-[#222]' : 'bg-white border-gray-100'}`}>
                <div className="text-2xl mb-3">{card.icon}</div>
                <p className={`text-sm font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{card.title}</p>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}