import React, { useState, useEffect, useRef } from "react";
import {
  Bell, Play, Share2, Heart, Sun, Moon, Plane, Shield, HandHeart,
  Briefcase, Home as HomeIcon, BookOpen, Compass as CompassIcon,
  ChevronLeft, ChevronRight, ArrowLeft, Type, Bookmark, Search,
  MoreHorizontal, Settings, HelpCircle, LogOut, Edit3, ChevronRight as ChevRight,
  MapPin, Calendar as CalendarIcon, Flame, Percent, X, Volume2, VolumeX, AlarmClock
} from "lucide-react";

// ---------- Design tokens ----------
const GREEN = "#173C33";
const GREEN_DARK = "#0F2D26";
const GOLD = "#C9A24D";
const CREAM = "#F7F4EC";
const CARD = "#FFFFFF";

const serif = { fontFamily: "'Playfair Display', Georgia, 'Times New Roman', serif" };

function Screen({ children }) {
  return (
    <div
      style={{ background: CREAM, fontFamily: "'Inter', system-ui, sans-serif" }}
      className="w-full h-full flex flex-col text-[#1C1C1A]"
    >
      {children}
    </div>
  );
}

function TopBar({ title, subtitle, avatar, onBell }) {
  return (
    <div className="flex items-start justify-between px-5 pt-6 pb-4">
      <div className="flex items-start gap-3">
        {avatar && (
          <img src={avatar} alt="" className="w-9 h-9 rounded-full object-cover mt-1" />
        )}
        <div>
          <h1 style={{ ...serif, color: GREEN }} className="text-[26px] leading-[1.1] font-bold">
            {title}
          </h1>
          {subtitle && <p className="text-sm text-[#6B6A63] mt-1">{subtitle}</p>}
        </div>
      </div>
      <button
        onClick={onBell}
        aria-label="Notifications"
        className="w-9 h-9 rounded-full flex items-center justify-center mt-1 active:scale-95 transition"
      >
        <Bell size={20} color={GREEN} />
      </button>
    </div>
  );
}

function BottomNav({ active, onChange }) {
  const items = [
    { key: "home", label: "Home", icon: HomeIcon },
    { key: "namaz", label: "Namaz", icon: () => <MosqueIcon /> },
    { key: "quran", label: "Quran", icon: BookOpen },
    { key: "duas", label: "Duas", icon: DuaIcon },
    { key: "more", label: "More", icon: MoreHorizontal },
  ];
  return (
    <div className="border-t border-[#E7E3D8] bg-[#FAF8F2] px-2 pt-2 pb-3 flex justify-between">
      {items.map((it) => {
        const isActive = active === it.key;
        const Icon = it.icon;
        return (
          <button
            key={it.key}
            onClick={() => onChange(it.key)}
            className="flex-1 flex flex-col items-center gap-1 py-1"
          >
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center transition"
              style={{ background: isActive ? "#DDEBE3" : "transparent" }}
            >
              <Icon size={19} color={isActive ? GREEN : "#8A8878"} strokeWidth={2} />
            </div>
            <span
              className="text-[10.5px]"
              style={{ color: isActive ? GREEN : "#8A8878", fontWeight: isActive ? 600 : 400 }}
            >
              {it.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function MosqueIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
      <path d="M12 2L9 6h6l-3-4z" fill="currentColor" />
      <path d="M4 21v-7a8 8 0 0116 0v7" stroke="currentColor" strokeWidth="1.8" />
      <path d="M2 21h20" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 6v4" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}
function DuaIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
      <path d="M4 4v14l4-3h12V4H4z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 9h8M8 12h5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function Card({ children, className = "", style = {} }) {
  return (
    <div
      className={`bg-white rounded-2xl border border-[#EAE6D9] ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

// ---------- HOME ----------
function HomePage({ setAlarmMsg }) {
  const [remaining, setRemaining] = useState(84 * 60 + 36);
  useEffect(() => {
    const t = setInterval(() => setRemaining((r) => (r > 0 ? r - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);
  const h = String(Math.floor(remaining / 3600)).padStart(2, "0");
  const m = String(Math.floor((remaining % 3600) / 60)).padStart(2, "0");
  const s = String(remaining % 60).padStart(2, "0");
  const [saved, setSaved] = useState(false);

  return (
    <Screen>
      <TopBar title="Call Me Muslim" avatar="https://i.pravatar.cc/80?img=47" />
      <div className="flex-1 overflow-y-auto px-5 pb-4 space-y-5">
        <div>
          <p className="text-[15px]">Assalamu Alaikum 👋</p>
          <p className="text-[15px] text-[#3F3E38] mt-1">
            May Allah bless your day with peace and barakah.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Pill icon={<CalendarIcon size={13} />} text="Monday, Oct 23" />
          <Pill icon={<Moon size={13} />} text="7 Rabi al-Thani 1445 AH" />
          <Pill icon={<MapPin size={13} />} text="London, UK" />
        </div>

        <div className="rounded-2xl p-5" style={{ background: GREEN }}>
          <div className="flex items-center gap-2 mb-1">
            <MosqueIcon />
            <span className="text-[11px] tracking-wide text-[#CFE3D8]">NEXT PRAYER</span>
          </div>
          <p style={{ ...serif, color: "white" }} className="text-2xl font-bold mb-2">
            Maghrib
          </p>
          <p style={{ color: GOLD }} className="text-4xl font-bold tracking-wide">
            {h}:{m}:{s}
          </p>
          <p className="text-[#CFE3D8] text-xs mt-1">Remaining time</p>
          <div className="h-1.5 bg-white/15 rounded-full mt-3 overflow-hidden">
            <div className="h-full rounded-full" style={{ width: "65%", background: GOLD }} />
          </div>
        </div>

        <Card className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-[13px] text-[#6B6A63]">
              <BookOpen size={15} />
              <span>DUA OF THE DAY</span>
            </div>
            <button onClick={() => setSaved((s) => !s)} aria-label="Save dua">
              <Bookmark size={17} color={GREEN} fill={saved ? GREEN : "none"} />
            </button>
          </div>
          <p dir="rtl" style={serif} className="text-right text-xl leading-relaxed mb-3">
            رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ
          </p>
          <p className="text-sm text-[#3F3E38] italic">
            "O our Lord, grant us the best in this life and the best in the next life, and protect us from the punishment of the Fire."
          </p>
          <p className="text-xs text-[#8A8878] mt-2 text-center">(Al-Baqarah 2:201)</p>
        </Card>

        <Card className="p-5">
          <p className="text-[13px] text-[#6B6A63] mb-3">QIBLA DIRECTION</p>
          <div className="flex flex-col items-center">
            <QiblaDial angle={118} size={160} />
            <p className="text-xs text-[#6B6A63] mt-3 text-center">
              Align your phone to find the exact direction of the Kaaba.
            </p>
            <button
              className="mt-3 w-full rounded-xl py-2.5 text-white text-sm font-medium flex items-center justify-center gap-2"
              style={{ background: GREEN }}
              onClick={() => setAlarmMsg("Compass opened (demo)")}
            >
              <CompassIcon size={15} /> Open Compass
            </button>
          </div>
        </Card>
      </div>
    </Screen>
  );
}

function Pill({ icon, text }) {
  return (
    <div className="flex items-center gap-1.5 bg-white border border-[#EAE6D9] rounded-full px-3 py-1.5 text-xs text-[#3F3E38]">
      {icon}
      <span>{text}</span>
    </div>
  );
}

function QiblaDial({ angle, size = 200 }) {
  return (
    <div
      className="rounded-full bg-[#F3F1E9] relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <span className="absolute top-2 text-[11px] text-[#8A8878]">N</span>
      <span className="absolute bottom-2 text-[11px] text-[#8A8878]">S</span>
      <span className="absolute left-2 text-[11px] text-[#8A8878]">W</span>
      <span className="absolute right-2 text-[11px] text-[#8A8878]">E</span>
      <div
        className="absolute w-1 rounded-full origin-bottom"
        style={{
          height: size * 0.38,
          background: `linear-gradient(to top, ${GREEN}, #D8D5C7)`,
          bottom: "50%",
          transform: `rotate(${angle}deg)`,
        }}
      />
      <div className="w-3 h-3 rounded-full" style={{ background: GREEN }} />
      <div
        className="absolute w-5 h-5 rounded flex items-center justify-center text-[10px]"
        style={{
          background: GOLD,
          transform: `rotate(${angle}deg) translateY(-${size * 0.42}px) rotate(-${angle}deg)`,
        }}
      >
        🕋
      </div>
    </div>
  );
}

// ---------- NAMAZ ----------
function NamazPage() {
  const [prayers, setPrayers] = useState([
    { name: "Fajr", ar: "الفجر", time: "05:12 AM - 06:35 AM", done: true },
    { name: "Dhuhr", ar: "الظهر", time: "12:30 PM - 03:45 PM", done: true },
    { name: "Asr", ar: "العصر", time: "03:45 PM - 05:20 PM", done: true },
    { name: "Maghrib", ar: "المغرب", time: "05:20 PM - 06:45 PM", done: false, next: true },
    { name: "Isha", ar: "العشاء", time: "06:45 PM - 05:12 AM", done: false },
  ]);
  const toggle = (i) =>
    setPrayers((p) => p.map((pr, idx) => (idx === i ? { ...pr, done: !pr.done } : pr)));
  const completed = prayers.filter((p) => p.done).length;
  const pct = (completed / prayers.length) * 100;

  return (
    <Screen>
      <TopBar title="Call Me Muslim" />
      <div className="flex-1 overflow-y-auto px-5 pb-4 space-y-5">
        <div>
          <h2 style={serif} className="text-2xl font-bold" >Namaz Dashboard</h2>
          <p className="text-sm text-[#6B6A63] mt-1">
            Manage your daily prayers and track your spiritual progress.
          </p>
        </div>
        <button
          className="rounded-full px-4 py-2.5 text-white text-sm font-medium flex items-center gap-2 w-fit"
          style={{ background: GREEN }}
        >
          <CompassIcon size={15} /> Qibla Direction
        </button>

        <Card className="p-5 flex flex-col items-center">
          <p style={serif} className="text-lg font-bold self-start mb-4">
            Today's Progress
          </p>
          <RingProgress pct={pct} label={`${completed}/${prayers.length}`} sub="Completed" />
          <p className="text-sm text-[#6B6A63] mt-3">Alhamdulillah, keep up the good work!</p>
        </Card>

        <Card className="p-5">
          <p style={serif} className="text-lg font-bold mb-3">Prayer Tracker</p>
          <Row label="Current Streak" value="12 Days" tone="gold" />
          <Row label="Missed this week" value="0 Prayers" tone="red" />
          <Row label="Jumu'ah Attended" value="Yes" tone="gold" last />
          <button className="mt-3 w-full rounded-xl border border-[#C9A24D] text-[#8A6D1E] text-sm font-medium py-2.5">
            View Detailed History
          </button>
        </Card>

        <div className="rounded-2xl px-4 py-3 flex items-center justify-between" style={{ background: GREEN }}>
          <div className="flex items-center gap-2 text-white text-sm">
            <span>🕐 Next Prayer: Maghrib</span>
          </div>
          <span style={{ color: GOLD }} className="text-sm font-semibold">01:24:15</span>
        </div>

        <p style={serif} className="text-2xl font-bold">Daily Prayers</p>
        <div className="space-y-3 pb-2">
          {prayers.map((p, i) => (
            <Card
              key={p.name}
              className={`p-4 flex items-center justify-between ${p.next ? "border-l-4" : ""}`}
              style={p.next ? { borderLeftColor: GOLD } : {}}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                  style={{ background: p.done ? "#DDEBE3" : "#F1EFE6" }}
                >
                  {p.name === "Isha" || p.name === "Maghrib" ? "🌙" : "☀️"}
                </div>
                <div>
                  <p className="font-semibold text-[15px]" style={serif}>
                    {p.name} <span className="text-sm font-normal">{p.ar}</span>
                  </p>
                  <p className="text-xs text-[#8A8878]">{p.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {p.done ? (
                  <span className="text-xs px-2 py-1 rounded-full bg-[#DDEBE3] text-[#1F5138]">Completed</span>
                ) : p.next ? (
                  <span
                    onClick={() => toggle(i)}
                    className="text-xs px-2 py-1 rounded-full text-white cursor-pointer"
                    style={{ background: GREEN }}
                  >
                    Mark Complete
                  </span>
                ) : null}
                <Toggle checked={p.done} onChange={() => toggle(i)} />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Screen>
  );
}

function Row({ label, value, tone, last }) {
  const colors = {
    gold: { bg: "#F5E9CC", text: "#8A6D1E" },
    red: { bg: "#FBE0E0", text: "#B13A3A" },
  };
  const c = colors[tone] || { bg: "#EEE", text: "#333" };
  return (
    <div className={`flex items-center justify-between py-2.5 ${!last ? "border-b border-[#F0EEE4]" : ""}`}>
      <span className="text-sm text-[#3F3E38]">{label}</span>
      <span className="text-xs font-medium px-2.5 py-1 rounded-full" style={{ background: c.bg, color: c.text }}>
        {value}
      </span>
    </div>
  );
}

function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={onChange}
      className="w-10 h-6 rounded-full flex items-center px-0.5 transition"
      style={{ background: checked ? GREEN : "#D8D5C7", justifyContent: checked ? "flex-end" : "flex-start" }}
    >
      <div className="w-5 h-5 rounded-full bg-white" />
    </button>
  );
}

function RingProgress({ pct, label, sub, size = 160 }) {
  const r = size / 2 - 10;
  const c = 2 * Math.PI * r;
  const offset = c - (pct / 100) * c;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle cx={size / 2} cy={size / 2} r={r} stroke="#EFEBDD" strokeWidth="12" fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={GREEN}
          strokeWidth="12"
          fill="none"
          strokeDasharray={c}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span style={serif} className="text-2xl font-bold">{label}</span>
        <span className="text-xs text-[#8A8878]">{sub}</span>
      </div>
    </div>
  );
}

// ---------- QURAN ----------
const SURAHS = [
  { n: 1, name: "Al-Fatihah", ar: "الفاتحة", eng: "THE OPENER", tag: "Makki", ayahs: 7 },
  { n: 2, name: "Al-Baqarah", ar: "البقرة", eng: "THE COW", tag: "Madani", ayahs: 286 },
  { n: 3, name: "Ali 'Imran", ar: "آل عمران", eng: "FAMILY OF IMRAN", tag: "Madani", ayahs: 200 },
  { n: 4, name: "An-Nisa", ar: "النساء", eng: "THE WOMEN", tag: "Madani", ayahs: 176 },
  { n: 5, name: "Al-Ma'idah", ar: "المائدة", eng: "THE TABLE SPREAD", tag: "Madani", ayahs: 120 },
  { n: 6, name: "Al-An'am", ar: "الأنعام", eng: "THE CATTLE", tag: "Makki", ayahs: 165 },
];

function QuranPage({ openSurah }) {
  const [tab, setTab] = useState("Surah");
  const [q, setQ] = useState("");
  const filtered = SURAHS.filter((s) => s.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <Screen>
      <TopBar title="Call Me Muslim" avatar="https://i.pravatar.cc/80?img=12" />
      <div className="flex-1 overflow-y-auto px-5 pb-4 space-y-4">
        <Card className="p-5" style={{ background: "#FBFAF6" }}>
          <div className="flex items-center gap-2 text-xs text-[#6B6A63] mb-2">
            <BookOpen size={13} /> <span>CONTINUE READING</span>
          </div>
          <p style={serif} className="text-2xl font-bold">Al-Baqarah</p>
          <p className="text-sm text-[#8A8878] mt-1">Ayah 124 • Juz 1</p>
          <button
            className="mt-3 rounded-xl px-4 py-2.5 text-white text-sm font-medium flex items-center gap-2"
            style={{ background: GREEN }}
            onClick={() => openSurah({ n: 2, name: "Al-Baqarah" })}
          >
            Read Now <ChevronRight size={15} />
          </button>
        </Card>

        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8A8878]" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search Surah, Ayah, or Translation..."
            className="w-full bg-white border border-[#EAE6D9] rounded-full pl-9 pr-4 py-2.5 text-sm outline-none"
          />
        </div>

        <div className="flex gap-6 border-b border-[#EAE6D9]">
          {["Surah", "Juz", "Bookmarks"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="pb-2 text-sm relative"
              style={{ color: tab === t ? GREEN : "#8A8878", fontWeight: tab === t ? 600 : 400 }}
            >
              {t}
              {tab === t && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: GREEN }} />
              )}
            </button>
          ))}
        </div>

        <div className="space-y-3 pb-2">
          {filtered.map((s) => (
            <Card
              key={s.n}
              className="p-4 flex items-center justify-between cursor-pointer active:scale-[0.99] transition"
              onClick={() => openSurah(s)}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rotate-45 flex items-center justify-center rounded-lg"
                  style={{ background: "#EFEBDD" }}
                >
                  <span className="-rotate-45 text-sm font-semibold" style={{ color: GREEN }}>{s.n}</span>
                </div>
                <div>
                  <p style={serif} className="font-bold text-[15px]">{s.name}</p>
                  <p className="text-xs text-[#8A8878]">{s.eng}</p>
                </div>
              </div>
              <div className="text-right">
                <p dir="rtl" style={serif} className="text-lg" >{s.ar}</p>
                <span
                  className="text-[10px] px-2 py-0.5 rounded-full"
                  style={{
                    background: s.tag === "Madani" ? "#F5E9CC" : "#E4E1D3",
                    color: s.tag === "Madani" ? "#8A6D1E" : "#6B6A63",
                  }}
                >
                  {s.tag}
                </span>
                <p className="text-[11px] text-[#8A8878] mt-1">{s.ayahs} Ayahs</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Screen>
  );
}

// ---------- DUAS ----------
const CATS = [
  { icon: Sun, name: "Morning Duas", sub: "Start your day right" },
  { icon: Moon, name: "Evening Duas", sub: "Peaceful rest" },
  { icon: Plane, name: "Travel", sub: "Safe journeys" },
  { icon: Shield, name: "Protection", sub: "Guard from evil" },
  { icon: HandHeart, name: "Forgiveness", sub: "Seek mercy" },
  { icon: Briefcase, name: "Rizq", sub: "Sustenance & wealth" },
];

function DuasPage() {
  const [saved, setSaved] = useState(false);
  return (
    <Screen>
      <TopBar title="Call Me Muslim" avatar="https://i.pravatar.cc/80?img=47" />
      <div className="flex-1 overflow-y-auto px-5 pb-4 space-y-5">
        <div className="text-center">
          <p style={serif} className="text-lg font-bold">Daily Duas</p>
          <p className="text-sm text-[#6B6A63] mt-1">
            Find peace and guidance in your daily life through these beautiful supplications.
          </p>
        </div>

        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs px-2.5 py-1 rounded-full flex items-center gap-1" style={{ background: "#DDEBE3", color: GREEN }}>
              <Heart size={11} /> Featured
            </span>
            <div className="flex gap-3">
              <button className="w-8 h-8 rounded-full border border-[#EAE6D9] flex items-center justify-center">
                <Play size={13} color={GREEN} />
              </button>
              <button className="w-8 h-8 rounded-full border border-[#EAE6D9] flex items-center justify-center">
                <Share2 size={13} color={GREEN} />
              </button>
            </div>
          </div>
          <p dir="rtl" style={serif} className="text-right text-2xl leading-relaxed mb-4">
            رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا
          </p>
          <p className="text-[11px] text-[#8A8878] mb-1">TRANSLITERATION</p>
          <p className="text-sm mb-3">Rabbir hamhuma kama rabbayani sagheera</p>
          <p className="text-[11px] text-[#8A8878] mb-1">MEANING</p>
          <p className="text-sm">
            "My Lord, have mercy upon them as they brought me up [when I was] small."{" "}
            <span className="text-[#8A8878]">(Quran 17:24)</span>
          </p>
        </Card>

        <p style={serif} className="text-2xl font-bold">Categories</p>
        <div className="grid grid-cols-2 gap-3 pb-2">
          {CATS.map((c) => (
            <Card key={c.name} className="p-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center mb-3" style={{ background: "#DDEBE3" }}>
                <c.icon size={18} color={GREEN} />
              </div>
              <p className="font-semibold text-[14px]" style={serif}>{c.name}</p>
              <p className="text-xs text-[#8A8878] mt-0.5">{c.sub}</p>
            </Card>
          ))}
        </div>
      </div>
    </Screen>
  );
}

// ---------- MORE MENU ----------
function MorePage({ go }) {
  const items = [
    { key: "charity", label: "Sadqa-e-Jariya", sub: "Ongoing charity projects", emoji: "💧" },
    { key: "calendar", label: "Islamic Calendar", sub: "Hijri dates & events", emoji: "🌙" },
    { key: "hadith", label: "Hadith Collection", sub: "Sahih al-Bukhari & more", emoji: "📜" },
    { key: "profile", label: "My Profile", sub: "Spiritual journey & stats", emoji: "🧕" },
    { key: "qibla", label: "Qibla Compass", sub: "Find nearby masjids", emoji: "🕋" },
  ];
  return (
    <Screen>
      <TopBar title="Call Me Muslim" />
      <div className="flex-1 overflow-y-auto px-5 pb-4 space-y-3">
        <p style={serif} className="text-2xl font-bold mb-1">More</p>
        {items.map((it) => (
          <Card
            key={it.key}
            onClick={() => go(it.key)}
            className="p-4 flex items-center justify-between cursor-pointer active:scale-[0.99] transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg" style={{ background: "#EFEBDD" }}>
                {it.emoji}
              </div>
              <div>
                <p className="font-semibold text-[15px]" style={serif}>{it.label}</p>
                <p className="text-xs text-[#8A8878]">{it.sub}</p>
              </div>
            </div>
            <ChevRight size={18} color="#8A8878" />
          </Card>
        ))}
      </div>
    </Screen>
  );
}

function SubHeader({ title, onBack, right }) {
  return (
    <div className="flex items-center justify-between px-5 pt-6 pb-4">
      <div className="flex items-center gap-3">
        <button onClick={onBack} aria-label="Back">
          <ArrowLeft size={20} color={GREEN} />
        </button>
        <h1 style={{ ...serif, color: GREEN }} className="text-xl font-bold">{title}</h1>
      </div>
      {right}
    </div>
  );
}

// ---------- CHARITY ----------
function CharityPage({ onBack }) {
  const projects = [
    { tag: "Education", title: "Quran Distribution", desc: "Spread the light of guidance. Provide copies of the Holy Quran to students and communities in need globally.", img: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=400&q=60" },
    { tag: "Sustenance", title: "Water Projects", desc: "The best form of charity is giving water. Build wells and water systems to provide clean drinking water for life.", img: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=400&q=60" },
    { tag: "Community", title: "Masjid Projects", desc: "Build a house in Jannah. Support the construction and maintenance of mosques in rural and developing areas.", img: "https://images.unsplash.com/photo-1519817650390-64a93db51149?w=400&q=60" },
  ];
  return (
    <Screen>
      <SubHeader title="Sadqa-e-Jariya" onBack={onBack} />
      <div className="flex-1 overflow-y-auto px-5 pb-4 space-y-5">
        <p className="text-sm text-[#6B6A63] text-center -mt-2">
          A good deed that keeps giving. Invest in eternal rewards through sustainable charity projects.
        </p>
        <Card className="p-5">
          <span className="text-xs px-2.5 py-1 rounded-full inline-block mb-3" style={{ background: "#DDEBE3", color: GREEN }}>
            Your Impact
          </span>
          <p style={serif} className="text-xl font-bold" >Community Water Well</p>
          <p className="text-sm text-[#6B6A63] mt-1 mb-3">
            Your contribution is providing clean water to over 500 families daily in rural communities.
          </p>
          <div className="h-2 bg-[#EFEBDD] rounded-full overflow-hidden">
            <div className="h-full rounded-full" style={{ width: "75%", background: GREEN }} />
          </div>
          <div className="flex justify-between text-xs text-[#8A8878] mt-1.5">
            <span>$750 Raised</span>
            <span>$1,000 Goal</span>
          </div>
        </Card>

        <p style={serif} className="text-2xl font-bold">Ongoing Projects</p>
        <div className="space-y-4 pb-2">
          {projects.map((p) => (
            <Card key={p.title} className="overflow-hidden">
              <div className="relative h-36">
                <img src={p.img} alt={p.title} className="w-full h-full object-cover" />
                <span className="absolute top-3 left-3 text-xs px-2.5 py-1 rounded-full bg-white/90 text-[#3F3E38]">
                  {p.tag}
                </span>
              </div>
              <div className="p-4">
                <p style={serif} className="font-bold text-lg">{p.title}</p>
                <p className="text-sm text-[#6B6A63] mt-1 mb-3">{p.desc}</p>
                <button className="w-full rounded-xl py-2.5 text-white text-sm font-medium flex items-center justify-center gap-2" style={{ background: GREEN }}>
                  Contribute <ChevronRight size={15} />
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Screen>
  );
}

// ---------- CALENDAR ----------
function CalendarPage({ onBack }) {
  const [correction, setCorrection] = useState(0);
  const [showMoon, setShowMoon] = useState(true);
  const weeks = [
    [{g:25,h:14},{g:26,h:15},{g:27,h:16},{g:28,h:17},{g:29,h:18},{g:1,h:19,mute:false,fadeLeft:true}],
  ];
  const days = ["S","M","T","W","T","F","S"];
  const grid = [
    [25,26,27,28,29,1],
    [3,4,5,6,7,8],
    [10,11,12,13,14,15],
  ];
  const hijri = [
    [14,15,16,17,18,19],
    [21,22,23,24,25,26],
    [28,1,2,3,4,5],
  ];
  return (
    <Screen>
      <SubHeader title="Islamic Calendar" onBack={onBack} />
      <div className="flex-1 overflow-y-auto px-5 pb-4 space-y-5">
        <Card className="p-5">
          <div className="flex items-center justify-between mb-1">
            <div>
              <p style={serif} className="text-xl font-bold">March 2024</p>
              <p className="text-xs text-[#8A8878]">Sha'ban - Ramadan 1445</p>
            </div>
            <div className="flex gap-2">
              <button className="w-8 h-8 rounded-full border border-[#EAE6D9] flex items-center justify-center"><ChevronLeft size={15} /></button>
              <button className="w-8 h-8 rounded-full border border-[#EAE6D9] flex items-center justify-center"><ChevronRight size={15} /></button>
            </div>
          </div>
          <div className="grid grid-cols-7 text-center text-xs text-[#8A8878] mt-4 mb-2">
            {days.map((d, i) => <span key={i}>{d}</span>)}
          </div>
          {grid.map((row, ri) => (
            <div key={ri} className="grid grid-cols-7 text-center mb-1">
              {row.map((g, ci) => {
                const isToday = ri === 0 && ci === 5;
                const isEvent = ri === 1 && ci === 1;
                return (
                  <div
                    key={ci}
                    className="flex flex-col items-center justify-center py-1.5 rounded-lg"
                    style={{ background: isToday ? GREEN : isEvent ? "#F1EFE6" : "transparent" }}
                  >
                    <span className={`text-sm ${ri===0 && (ci<5) ? "text-[#C9C6B8]" : ""}`} style={{ color: isToday ? "white" : "#1C1C1A" }}>{g}</span>
                    <span className="text-[10px]" style={{ color: isToday ? "#CFE3D8" : "#8A8878" }}>{hijri[ri][ci]}</span>
                  </div>
                );
              })}
            </div>
          ))}
          <div className="flex items-center gap-4 text-xs text-[#6B6A63] mt-3">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full" style={{ background: GREEN }} /> Today</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full" style={{ background: GOLD }} /> Islamic Event</span>
          </div>
        </Card>

        <p style={serif} className="text-2xl font-bold">Events this Month</p>
        <Card className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "#F1EFE6" }}>🌙</div>
            <div>
              <p className="font-semibold text-sm">Ramadan Begins</p>
              <p className="text-xs text-[#8A8878]">Expected start of the holy month.</p>
            </div>
          </div>
          <div className="text-right text-xs text-[#8A8878]">
            <p className="font-medium text-[#1C1C1A]">Mar 11</p>
            <p>Ramadan 1</p>
          </div>
        </Card>
        <Card className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "#F1EFE6" }}>⚪</div>
            <div>
              <p className="font-semibold text-sm">Ayyam al-Bidh</p>
              <p className="text-xs text-[#8A8878]">White days fasting.</p>
            </div>
          </div>
          <div className="text-right text-xs text-[#8A8878]">
            <p className="font-medium text-[#1C1C1A]">Mar 23-25</p>
            <p>Ram 13-15</p>
          </div>
        </Card>

        <p style={serif} className="text-2xl font-bold">Calendar Settings</p>
        <Card className="p-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#F0EEE4]">
            <div>
              <p className="text-sm font-medium">Hijri Correction</p>
              <p className="text-xs text-[#8A8878]">Adjust dates by +/- days</p>
            </div>
            <div className="flex items-center gap-3 bg-[#F1EFE6] rounded-full px-2 py-1">
              <button onClick={() => setCorrection((c) => c - 1)} className="w-6 h-6 flex items-center justify-center">-</button>
              <span className="text-sm w-4 text-center">{correction}</span>
              <button onClick={() => setCorrection((c) => c + 1)} className="w-6 h-6 flex items-center justify-center">+</button>
            </div>
          </div>
          <div className="flex items-center justify-between pt-3">
            <div>
              <p className="text-sm font-medium">Show Moon Phases</p>
              <p className="text-xs text-[#8A8878]">Display icons on calendar</p>
            </div>
            <Toggle checked={showMoon} onChange={() => setShowMoon((s) => !s)} />
          </div>
        </Card>
      </div>
    </Screen>
  );
}

// ---------- HADITH ----------
function HadithPage({ onBack }) {
  const [saved, setSaved] = useState(false);
  return (
    <Screen>
      <div className="flex items-center justify-between px-5 pt-6 pb-4">
        <div className="flex items-center gap-3">
          <button onClick={onBack} aria-label="Back"><ArrowLeft size={20} color={GREEN} /></button>
          <h1 style={{ ...serif, color: GREEN }} className="text-lg font-bold">Sahih al-Bukh...</h1>
        </div>
        <Type size={20} color={GREEN} />
      </div>
      <div className="flex-1 overflow-y-auto px-5 pb-4">
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs px-2.5 py-1 rounded-full" style={{ background: "#DDEBE3", color: GREEN }}>Hadith 1</span>
            <span className="text-xs px-2.5 py-1 rounded-full" style={{ background: "#F5E9CC", color: "#8A6D1E" }}>Sahih</span>
          </div>
          <p className="text-sm italic border-l-2 pl-3 mb-4" style={{ borderColor: GOLD }}>
            Narrated 'Umar bin Al-Khattab:
          </p>
          <p dir="rtl" style={serif} className="text-right text-2xl leading-loose mb-4" >
            إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى
          </p>
          <div className="border-t border-[#F0EEE4] pt-4 mb-4">
            <p className="text-[11px] text-[#8A8878] mb-1">TRANSLITERATION</p>
            <p className="text-sm">"Innama al-a'malu bin-niyyat, wa innama likulli imri'in ma nawa."</p>
          </div>
          <div className="border-t border-[#F0EEE4] pt-4 mb-4">
            <p className="text-[11px] text-[#8A8878] mb-1">TRANSLATION</p>
            <p className="text-sm">
              I heard Allah's Messenger (ﷺ) saying, "The reward of deeds depends upon the intentions and every person will get the reward according to what he has intended."
            </p>
          </div>
          <div className="flex gap-3 pt-2">
            <button className="rounded-full px-4 py-2 text-white text-sm font-medium flex items-center gap-2" style={{ background: GREEN }}>
              <Play size={13} /> Listen
            </button>
            <button
              onClick={() => setSaved((s) => !s)}
              className="rounded-full px-4 py-2 border border-[#EAE6D9] text-sm font-medium flex items-center gap-2"
            >
              <Bookmark size={13} fill={saved ? GREEN : "none"} color={GREEN} /> Save
            </button>
            <button className="rounded-full px-4 py-2 border border-[#EAE6D9] text-sm font-medium flex items-center gap-2">
              <Share2 size={13} color={GREEN} /> Share
            </button>
          </div>
        </Card>
      </div>
    </Screen>
  );
}

// ---------- PROFILE ----------
function ProfilePage({ onBack }) {
  return (
    <Screen>
      <SubHeader title="Call Me Muslim" onBack={onBack} />
      <div className="flex-1 overflow-y-auto px-5 pb-4 space-y-5">
        <Card className="p-6 flex flex-col items-center text-center" style={{ background: "#F1EFE6" }}>
          <img src="https://i.pravatar.cc/120?img=47" className="w-20 h-20 rounded-full object-cover mb-3" alt="" />
          <span className="text-xs px-2.5 py-1 rounded-full flex items-center gap-1 mb-2" style={{ background: GOLD, color: "#4A3B12" }}>
            ✓ Premium
          </span>
          <p style={serif} className="text-xl font-bold">Zoya Ahmed</p>
          <p className="text-sm text-[#6B6A63] mb-4">Devoted to consistent growth.</p>
          <button className="rounded-full px-5 py-2.5 text-white text-sm font-medium flex items-center gap-2" style={{ background: GREEN }}>
            <Edit3 size={14} /> Edit Profile
          </button>
        </Card>

        <p style={serif} className="text-2xl font-bold">Spiritual Journey</p>
        <div className="grid grid-cols-2 gap-3">
          <StatCard icon={<Flame size={17} color={GREEN} />} value="12" label="Day Streak" />
          <StatCard icon={<BookOpen size={17} color={GREEN} />} value="45" label="Hadiths Read" />
          <StatCard icon={<MosqueIcon />} value="87%" label="Prayer Consistency" />
          <StatCard icon={<HandHeart size={17} color={GREEN} />} value="3" label="Active Charities" />
        </div>

        <Card className="p-5 flex flex-col items-center" style={{ background: "#F1EFE6" }}>
          <p style={serif} className="font-bold text-lg self-start mb-3">Daily Goals</p>
          <RingProgress pct={75} label="75%" sub="Complete" size={140} />
        </Card>

        <Card className="p-5" style={{ background: "#F1EFE6" }}>
          <div className="flex items-center justify-between mb-2">
            <p className="font-semibold flex items-center gap-2" style={serif}>🌙 Ramadan Prep</p>
            <span className="text-sm font-medium">60%</span>
          </div>
          <p className="text-sm text-[#6B6A63] mb-3">Preparing heart and mind for the blessed month.</p>
          <div className="h-2 bg-white rounded-full overflow-hidden">
            <div className="h-full rounded-full" style={{ width: "60%", background: GREEN }} />
          </div>
        </Card>

        <Card className="divide-y divide-[#F0EEE4]">
          <MenuRow icon={<Heart size={17} />} label="My Contributions" />
          <MenuRow icon={<Bookmark size={17} />} label="Saved Content" />
          <MenuRow icon={<Settings size={17} />} label="App Settings" />
          <MenuRow icon={<HelpCircle size={17} />} label="Help & Support" />
          <MenuRow icon={<LogOut size={17} />} label="Log Out" danger />
        </Card>
      </div>
    </Screen>
  );
}

function StatCard({ icon, value, label }) {
  return (
    <Card className="p-4">
      <div className="w-9 h-9 rounded-full flex items-center justify-center mb-2" style={{ background: "#DDEBE3" }}>
        {icon}
      </div>
      <p style={serif} className="text-xl font-bold">{value}</p>
      <p className="text-xs text-[#8A8878]">{label}</p>
    </Card>
  );
}
function MenuRow({ icon, label, danger }) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center gap-3">
        <span style={{ color: danger ? "#C23B3B" : "#3F3E38" }}>{icon}</span>
        <span className="text-sm font-medium" style={{ color: danger ? "#C23B3B" : "#1C1C1A" }}>{label}</span>
      </div>
      {!danger && <ChevRight size={16} color="#8A8878" />}
    </div>
  );
}

// ---------- QIBLA FULL ----------
function QiblaPage({ onBack }) {
  return (
    <Screen>
      <SubHeader title="Call Me Muslim" onBack={onBack} />
      <div className="flex-1 overflow-y-auto px-5 pb-4 space-y-5">
        <div className="text-center">
          <p style={serif} className="text-xl font-bold">Qibla Compass</p>
          <p className="text-sm text-[#6B6A63]">Find the direction to the Kaaba</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-[#F1EFE6] rounded-full px-4 py-2 text-sm font-medium mb-4">
            118° SE <span className="text-xs text-[#8A8878] font-normal block text-center">from London, UK</span>
          </div>
          <QiblaDial angle={118} size={220} />
          <button className="mt-4 text-sm text-[#8A8878] border border-[#EAE6D9] rounded-full px-4 py-2">
            Rotate device to align
          </button>
        </div>
        <p style={serif} className="text-2xl font-bold">Nearby Masjids</p>
        <div className="space-y-3">
          <MasjidRow name="East London Mosque" sub="Whitechapel Road" dist="0.8 mi" time="15 min" walk />
          <MasjidRow name="Regent's Park Mosque" sub="London Central Mosque" dist="2.1 mi" time="12 min" />
        </div>
        <button className="w-full rounded-full py-2.5 border border-[#C9A24D] text-[#8A6D1E] text-sm font-medium">
          View All on Map
        </button>
      </div>
    </Screen>
  );
}
function MasjidRow({ name, sub, dist, time, walk }) {
  return (
    <Card className="p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: GREEN }}>
          <MosqueIconWhite />
        </div>
        <div>
          <p className="font-semibold text-sm">{name}</p>
          <p className="text-xs text-[#8A8878]">{sub}</p>
        </div>
      </div>
      <div className="text-right text-xs text-[#8A8878]">
        <p className="font-medium text-[#1C1C1A]">{dist}</p>
        <p>{walk ? "🚶" : "🚗"} {time}</p>
      </div>
    </Card>
  );
}
function MosqueIconWhite() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M12 2L9 6h6l-3-4z" fill="white" />
      <path d="M4 21v-7a8 8 0 0116 0v7" stroke="white" strokeWidth="1.8" />
      <path d="M2 21h20" stroke="white" strokeWidth="1.8" />
    </svg>
  );
}

// ---------- SURAH READER ----------
function SurahReaderPage({ surah, onBack }) {
  const ayahs = [
    { n: 1, ar: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", tr: "Bismillahir Rahmanir Raheem", en: "In the name of Allah, the Most Gracious, the Most Merciful." },
    { n: 2, ar: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", tr: "Alhamdu lillahi rabbil 'alameen", en: "All praise is due to Allah, Lord of the worlds." },
    { n: 3, ar: "الرَّحْمَٰنِ الرَّحِيمِ", tr: "Ar-Rahmanir-Raheem", en: "The Most Gracious, the Most Merciful." },
  ];
  return (
    <Screen>
      <SubHeader title={surah?.name || "Surah"} onBack={onBack} right={<Type size={19} color={GREEN} />} />
      <div className="flex-1 overflow-y-auto px-5 pb-4 space-y-4">
        {ayahs.map((a) => (
          <Card key={a.n} className="p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs" style={{ background: "#DDEBE3", color: GREEN }}>
                {a.n}
              </span>
              <div className="flex gap-3 text-[#8A8878]">
                <Play size={14} />
                <Bookmark size={14} />
                <Share2 size={14} />
              </div>
            </div>
            <p dir="rtl" style={serif} className="text-right text-2xl leading-loose mb-3">{a.ar}</p>
            <p className="text-sm text-[#6B6A63] italic mb-1">{a.tr}</p>
            <p className="text-sm">{a.en}</p>
          </Card>
        ))}
      </div>
    </Screen>
  );
}

// ---------- PRAYER ALERT OVERLAY ----------
function PrayerAlert({ onClose }) {
  const [silent, setSilent] = useState(false);
  return (
    <div className="absolute inset-0 flex flex-col justify-between p-6 z-50" style={{ background: `linear-gradient(180deg, ${GREEN}, ${GREEN_DARK})` }}>
      <div className="flex items-center justify-between">
        <Settings size={18} color="white" />
        <button onClick={onClose} aria-label="Close"><X size={20} color="white" /></button>
      </div>
      <div className="flex flex-col items-center text-center -mt-10">
        <p style={{ color: GOLD }} className="text-xs tracking-widest mb-2">TIME FOR PRAYER</p>
        <p style={serif} className="text-white text-4xl font-bold">6:42 PM</p>
        <p className="text-[#CFE3D8] text-sm flex items-center gap-1 mt-1"><MapPin size={12} /> London, UK</p>
        <p dir="rtl" style={{ ...serif, color: GOLD }} className="text-6xl mt-8 mb-2">مغرب</p>
        <p className="text-white text-lg">Maghrib</p>
        <button className="w-20 h-20 rounded-full flex items-center justify-center mt-8" style={{ background: GOLD }}>
          <Play size={28} color={GREEN_DARK} fill={GREEN_DARK} />
        </button>
      </div>
      <div className="space-y-3">
        <button className="w-full rounded-2xl py-3 text-sm font-semibold flex items-center justify-center gap-2" style={{ background: GOLD, color: GREEN_DARK }}>
          <ExternalLinkIcon /> Open Call Me Muslim
        </button>
        <div className="flex gap-3">
          <button className="flex-1 rounded-2xl py-3 text-sm text-white border border-white/30 flex items-center justify-center gap-2">
            <AlarmClock size={15} /> Snooze
          </button>
          <button onClick={() => setSilent((s) => !s)} className="flex-1 rounded-2xl py-3 text-sm text-white border border-white/30 flex items-center justify-center gap-2">
            {silent ? <VolumeX size={15} /> : <VolumeX size={15} />} Silent
          </button>
        </div>
      </div>
    </div>
  );
}
function ExternalLinkIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M14 3h7v7M21 3l-9 9M19 14v5a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h5" stroke="#0F2D26" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// ---------- APP ROOT ----------
export default function App() {
  const [tab, setTab] = useState("home");
  const [subPage, setSubPage] = useState(null); // charity | calendar | hadith | profile | qibla
  const [surah, setSurah] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(""), 1600);
      return () => clearTimeout(t);
    }
  }, [toast]);

  const goHome = (t) => {
    setSubPage(null);
    setSurah(null);
    setTab(t);
  };

  let content;
  if (surah) {
    content = <SurahReaderPage surah={surah} onBack={() => setSurah(null)} />;
  } else if (subPage) {
    const map = {
      charity: <CharityPage onBack={() => setSubPage(null)} />,
      calendar: <CalendarPage onBack={() => setSubPage(null)} />,
      hadith: <HadithPage onBack={() => setSubPage(null)} />,
      profile: <ProfilePage onBack={() => setSubPage(null)} />,
      qibla: <QiblaPage onBack={() => setSubPage(null)} />,
    };
    content = map[subPage];
  } else if (tab === "home") {
    content = <HomePage setAlarmMsg={setToast} />;
  } else if (tab === "namaz") {
    content = <NamazPage />;
  } else if (tab === "quran") {
    content = <QuranPage openSurah={setSurah} />;
  } else if (tab === "duas") {
    content = <DuasPage />;
  } else {
    content = <MorePage go={setSubPage} />;
  }

  return (
    <div className="w-full flex justify-center py-4" style={{ background: "#EDEAE0", minHeight: 780 }}>
      <div
        className="relative w-full flex flex-col overflow-hidden"
        style={{ maxWidth: 390, height: 780, borderRadius: 32, boxShadow: "0 0 0 8px #0B0B0A, 0 20px 40px rgba(0,0,0,0.25)" }}
      >
        <div className="flex-1 overflow-hidden relative">
          {content}
          {showAlert && <PrayerAlert onClose={() => setShowAlert(false)} />}
          {toast && (
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs px-4 py-2 rounded-full">
              {toast}
            </div>
          )}
        </div>
        {!surah && !subPage && (
          <BottomNav active={tab} onChange={goHome} />
        )}
        <button
          onClick={() => setShowAlert(true)}
          className="absolute top-2 right-2 text-[9px] text-white/50 bg-black/30 rounded-full px-2 py-0.5"
        >
          demo: prayer alert
        </button>
      </div>
    </div>
  );
}
