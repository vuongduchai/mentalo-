import { useState } from "react";

const images = {
  hero: "https://images.unsplash.com/photo-1732464517792-7385024242a6?auto=format&fit=crop&w=1500&q=88",
  about: "https://images.unsplash.com/photo-1597047521791-32e57285b0d4?auto=format&fit=crop&w=1000&q=85",
  product: "https://images.unsplash.com/photo-1707740557687-29525d1e18c8?auto=format&fit=crop&w=1000&q=85",
  collection: "https://images.unsplash.com/photo-1740790718899-61aa1c6e3152?auto=format&fit=crop&w=1200&q=85",
  journal: "https://images.unsplash.com/photo-1645305783165-e93c51bb483f?auto=format&fit=crop&w=900&q=85",
};

function Arrow() {
  return <span aria-hidden="true">→</span>;
}

function LineTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-7 flex items-center gap-5 text-[9px] font-semibold uppercase tracking-[0.24em]">
      <span>{children}</span><span className="h-px w-14 bg-[#191816]/25" />
    </div>
  );
}

function FeatureIcon({ type }: { type: "shield" | "scissors" | "box" | "truck" }) {
  const path = {
    shield: <path d="M12 3 5 6v5c0 4.7 2.7 8.2 7 10 4.3-1.8 7-5.3 7-10V6l-7-3Zm-3 9 2 2 4-5" />,
    scissors: <path d="m8.5 9.5 11-6M8.5 14.5l11 6M8 10l8 4M5 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm0 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />,
    box: <path d="m4 7 8-4 8 4-8 4-8-4Zm0 0v10l8 4 8-4V7M12 11v10" />,
    truck: <path d="M3 6h11v11H3V6Zm11 4h4l3 4v3h-7v-7ZM7 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm11 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />,
  };
  return <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1">{path[type]}</svg>;
}

export default function App() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [showAllArticles, setShowAllArticles] = useState(false);
  const [articleExpanded, setArticleExpanded] = useState(false);
  const [activeNav, setActiveNav] = useState("Trang chủ");
  const navItems = [
    { label: "Trang chủ", href: "#" },
    { label: "Cửa hàng", href: "#shop" },
    { label: "Về chúng tôi", href: "#about" },
    { label: "Tạp chí", href: "#journal" },
  ];

  return (
    <main className="min-h-screen bg-[#f1eee8] text-[#191816]">
      <header className="absolute inset-x-0 top-0 z-30 flex h-16 items-center justify-between border-b border-black/10 bg-[#f1eee8] px-4 sm:h-20 sm:px-[6vw] md:border-0">
        <button className="grid size-9 place-items-center md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
            {open ? <path d="m5 5 14 14M19 5 5 19" /> : <path d="M3 8h18M3 16h18" />}
          </svg>
        </button>
        <a href="#" className="brand-wordmark absolute left-1/2 -translate-x-1/2 text-xs sm:static sm:translate-x-0 sm:text-sm">MENTALO</a>
        <nav
          className="hidden items-center gap-10 text-[9px] uppercase tracking-[0.18em] md:flex"
          onMouseLeave={() => setActiveNav("Trang chủ")}
        >
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="relative py-3"
              onMouseEnter={() => setActiveNav(item.label)}
              onFocus={() => setActiveNav(item.label)}
            >
              {item.label}
              <span
                className={`absolute inset-x-0 bottom-1 h-px origin-center bg-black transition-transform duration-300 ${
                  activeNav === item.label ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-0.5 text-xs sm:gap-5">
          <button className="hidden size-9 place-items-center min-[390px]:grid sm:size-9" aria-label="Tìm kiếm" aria-expanded={searchOpen} onClick={() => { setSearchOpen(!searchOpen); setCartOpen(false); }}>
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <circle cx="10.5" cy="10.5" r="6.5" />
              <path d="m15.5 15.5 4 4" />
            </svg>
          </button>
          <button className="flex h-9 items-center gap-1 sm:gap-1.5" aria-label="Mở giỏ hàng" aria-expanded={cartOpen} onClick={() => { setCartOpen(!cartOpen); setSearchOpen(false); }}>
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M5 8h14l-1 12H6L5 8Z" />
              <path d="M9 9V6a3 3 0 0 1 6 0v3" />
            </svg>
            <sup className="text-[9px]">{String(cartCount).padStart(2, "0")}</sup>
          </button>
        </div>
        {open && <nav className="fixed inset-x-0 bottom-0 top-16 flex flex-col items-center justify-center gap-9 bg-[#f1eee8] text-sm uppercase tracking-[0.25em] sm:top-20 md:hidden"><a href="#" onClick={() => setOpen(false)}>Trang chủ</a><a href="#shop" onClick={() => setOpen(false)}>Cửa hàng</a><a href="#about" onClick={() => setOpen(false)}>Về chúng tôi</a><a href="#journal" onClick={() => setOpen(false)}>Tạp chí</a><span className="mt-10 text-[8px] tracking-[0.3em] text-black/40">Ít ồn ào. Thêm phong thái.</span></nav>}
        {searchOpen && <div className="absolute inset-x-0 top-full border-t border-black/10 bg-[#f1eee8] px-5 py-5 shadow-lg sm:px-[6vw]">
          <form className="mx-auto flex max-w-3xl items-center gap-3 border-b border-black/30 pb-3" onSubmit={(event) => { event.preventDefault(); document.querySelector("#shop")?.scrollIntoView({ behavior: "smooth" }); setSearchOpen(false); }}>
            <svg viewBox="0 0 24 24" className="size-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m15.5 15.5 4 4" /></svg>
            <input autoFocus value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Tìm sản phẩm..." aria-label="Nhập từ khóa tìm kiếm" className="w-full bg-transparent text-sm outline-none placeholder:text-black/45" />
            <button type="submit" className="text-[9px] uppercase tracking-widest">Tìm</button>
          </form>
        </div>}
        {cartOpen && <div className="absolute right-3 top-full w-[min(360px,calc(100vw-24px))] border border-black/10 bg-[#f1eee8] p-5 shadow-xl sm:right-[6vw]">
          <div className="flex items-center justify-between border-b border-black/10 pb-4"><h2 className="font-serif text-xl">Giỏ hàng</h2><button onClick={() => setCartOpen(false)} aria-label="Đóng giỏ hàng" className="text-lg">×</button></div>
          {cartCount > 0 ? <div className="py-5"><div className="flex justify-between gap-4 text-xs"><span>Quần tây may đo <span className="text-black/50">× {cartCount}</span></span><span>{(890000 * cartCount).toLocaleString("vi-VN")}₫</span></div><button onClick={() => setCartCount(0)} className="mt-4 text-[9px] uppercase tracking-widest text-black/50 underline">Xóa sản phẩm</button></div> : <p className="py-8 text-center text-xs text-black/55">Giỏ hàng của bạn đang trống.</p>}
          <a href="#shop" onClick={() => setCartOpen(false)} className="block bg-[#191816] px-5 py-3 text-center text-[9px] uppercase tracking-widest text-white">Tiếp tục mua sắm <Arrow /></a>
        </div>}
      </header>

      <section className="relative pt-16 lg:hidden">
        <div className="relative h-[calc(100svh-64px)] min-h-[580px] overflow-hidden">
          <img src={images.hero} alt="Người mẫu nam MENTALO trong trang phục suit đen" className="h-full w-full object-cover object-[center_top] grayscale" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/60" />
          <div className="absolute inset-x-0 bottom-0 px-6 pb-10 text-center text-white">
            <p className="text-[9px] uppercase tracking-[0.35em]">Bộ sưu tập mới</p>
            <h1 className="mt-4 font-serif text-[15vw] leading-none tracking-[0.04em]">MENTALO</h1>
            <p className="mt-4 font-serif text-xl leading-tight">Ít ồn ào. Thêm phong thái.</p>
            <a href="#shop" className="mx-auto mt-7 flex w-fit items-center gap-10 border border-white/80 px-6 py-3 text-[8px] uppercase tracking-[0.22em]">Khám phá bộ sưu tập <Arrow /></a>
          </div>
        </div>
      </section>

      <section className="relative hidden min-h-screen overflow-hidden pt-20 lg:block">
        <div className="relative z-10 flex min-h-[calc(100vh-80px)] w-3/5 flex-col justify-center px-[6vw]">
          <p className="mb-5 text-[10px] uppercase tracking-[0.3em]">Thời trang nam</p>
          <h1 className="font-serif text-[8vw] leading-none tracking-[0.01em]">MENTALO</h1>
          <p className="mt-4 font-serif text-2xl leading-none">Ít ồn ào.<br />Thêm phong thái.</p>
          <a href="#shop" className="mt-9 flex w-fit items-center gap-12 bg-[#191816] px-6 py-3 text-[8px] uppercase tracking-[0.2em] text-white">Khám phá bộ sưu tập <Arrow /></a>
          <div className="absolute bottom-8 flex items-center gap-5 text-[8px] tracking-widest"><span>01 / 02</span><span className="h-px w-20 bg-black/30" /></div>
        </div>
        <div className="absolute inset-y-0 right-0 w-[52%]">
          <img src={images.hero} alt="Người mẫu nam MENTALO trong trang phục suit đen" className="h-full w-full object-cover object-top grayscale" />
        </div>
      </section>

      <section id="about" className="grid border-t border-black/5 py-16 sm:px-[6vw] sm:py-20 lg:grid-cols-[1fr_1.15fr] lg:gap-24 lg:py-24">
        <div className="mx-auto max-w-md px-6 text-center sm:px-0 sm:text-left">
          <div className="flex justify-center sm:block"><LineTitle>Phong thái đàn ông</LineTitle></div>
          <h2 className="font-serif text-4xl leading-[1.02]">Đơn giản là một<br />lựa chọn có chủ đích.</h2>
          <p className="mx-auto mt-7 max-w-sm text-xs leading-6 text-black/55 sm:mx-0">MENTALO mang đến những thiết kế tối giản nam tính, tinh tế và dễ ứng dụng. Không chạy theo xu hướng, chúng tôi tập trung vào chất lượng, form dáng và sự thoải mái trong từng chuyển động.</p>
          <a href="#" className="mt-7 inline-flex gap-5 border-b border-black pb-1 text-[9px] uppercase tracking-[0.18em]">Câu chuyện của chúng tôi <Arrow /></a>
        </div>
        <div className="relative mt-12 sm:mt-14 lg:mt-0 lg:pr-16">
          <img src={images.about} alt="Chi tiết áo sơ mi nam tối giản" className="aspect-[4/5] h-full w-full object-cover grayscale sm:aspect-[1.7/1]" />
          <p className="absolute -right-2 top-1/2 hidden -translate-y-1/2 border-l border-black pl-4 text-[8px] uppercase leading-5 tracking-widest lg:block">01<br />Giới thiệu</p>
        </div>
      </section>

      <section id="shop" className="border-t border-black/5 px-5 py-14 sm:px-[6vw] sm:py-20 lg:py-24">
        <div className="flex items-start justify-between"><LineTitle>Sản phẩm nổi bật</LineTitle><button type="button" onClick={() => setShowAllProducts(!showAllProducts)} className="pt-0.5 text-[8px] uppercase tracking-widest">{showAllProducts ? "Thu gọn" : "Xem tất cả"} &nbsp;→</button></div>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <img src={images.product} alt="Quần tây may đo MENTALO" className="-mx-5 aspect-[4/5] w-[calc(100%+2.5rem)] object-cover object-[center_75%] grayscale sm:mx-0 sm:aspect-[1.4/1] sm:w-full" />
          <div className="grid gap-8 sm:grid-cols-[1fr_auto] lg:px-8">
            <div className="text-center sm:text-left">
              <p className="text-[9px] uppercase tracking-widest text-black/50">M–01</p>
              <h3 className="mt-3 font-serif text-3xl">Quần tây may đo</h3>
              <p className="mt-2 text-xs text-black/50">Phom dáng cổ điển. Mặc đẹp mỗi ngày.</p>
              <p className="mt-9 text-sm font-semibold">890.000₫</p>
              <button type="button" onClick={() => { setCartCount(cartCount + 1); setCartOpen(true); setSearchOpen(false); }} className="mt-7 inline-flex gap-5 text-[9px] uppercase tracking-widest">Thêm vào giỏ <Arrow /></button>
            </div>
            <div className="flex justify-center gap-5 self-end text-[10px] leading-7 sm:block"><p>● &nbsp;Đen</p><p className="text-[#273044]">● &nbsp;Xanh navy</p><p className="text-[#77736c]">● &nbsp;Xám than</p></div>
          </div>
        </div>
        {showAllProducts && <div className="mt-10 grid gap-4 border-t border-black/10 pt-6 text-xs leading-6 sm:grid-cols-3"><div><p className="font-semibold">Áo sơ mi tối giản</p><p className="text-black/55">Thoáng nhẹ, dễ phối đồ · Từ 690.000₫</p></div><div><p className="font-semibold">Áo thun Essential</p><p className="text-black/55">Cotton mềm mại, phom vừa vặn · Từ 390.000₫</p></div><div><p className="font-semibold">Áo khoác Everyday</p><p className="text-black/55">Đường nét gọn gàng, linh hoạt · Từ 1.290.000₫</p></div></div>}
      </section>

      <section className="grid border-y border-black/5 bg-[#e8e3da] px-5 py-16 sm:bg-transparent sm:px-[6vw] sm:py-20 lg:grid-cols-2 lg:gap-28 lg:py-24">
        <div className="text-center sm:text-left">
          <div className="flex justify-center sm:block"><LineTitle>Vì sao chọn MENTALO</LineTitle></div>
          <h2 className="font-serif text-4xl leading-tight">Chất lượng<br />trong từng chi tiết.</h2>
          <p className="mx-auto mt-6 max-w-sm text-xs leading-6 text-black/50 sm:mx-0">Từ chất liệu, đường may đến form dáng, mỗi chi tiết đều được chăm chút để mang lại trải nghiệm tốt nhất cho bạn.</p>
        </div>
        <div className="mt-14 grid grid-cols-2 gap-x-5 gap-y-12 sm:gap-x-12 lg:mt-0">
          {[
            ["shield", "Vải cao cấp", "Chất liệu thoáng mát, bền đẹp theo thời gian."],
            ["scissors", "Phom dáng chuẩn", "Tôn dáng, thoải mái trong mọi chuyển động."],
            ["box", "Đổi trả dễ dàng", "Đổi trả linh hoạt trong vòng 7 ngày."],
            ["truck", "Giao hàng nhanh", "Giao hàng nhanh chóng trên toàn quốc."],
          ].map(([icon, title, desc]) => <div key={title}><FeatureIcon type={icon as "shield" | "scissors" | "box" | "truck"} /><p className="mt-4 text-[9px] font-semibold uppercase tracking-widest">{title}</p><p className="mt-2 max-w-32 text-[10px] leading-4 text-black/50">{desc}</p></div>)}
        </div>
      </section>

      <section className="grid lg:grid-cols-2">
        <div className="order-2 flex flex-col items-center justify-center px-6 py-16 text-center sm:order-1 sm:items-start sm:px-[6vw] sm:py-20 sm:text-left lg:py-24">
          <div className="flex justify-center sm:block"><LineTitle>Bộ sưu tập</LineTitle></div>
          <h2 className="font-serif text-4xl leading-[1.05]">Thiết yếu<br />cho mỗi ngày.</h2>
          <p className="mt-6 max-w-sm text-xs leading-6 text-black/50">Những thiết kế cơ bản không bao giờ nhàm chán. Tối giản trong kiểu dáng, tinh tế trong từng đường nét, để bạn luôn sẵn sàng trong mọi hoàn cảnh.</p>
          <a href="#" className="mt-7 inline-flex w-fit gap-5 border-b border-black pb-1 text-[9px] uppercase tracking-widest">Xem bộ sưu tập <Arrow /></a>
        </div>
        <img src={images.collection} alt="Bộ sưu tập thời trang thiết yếu hàng ngày" className="order-1 aspect-[4/5] h-full w-full object-cover grayscale sm:order-2 sm:aspect-[4/3] lg:min-h-[480px] lg:aspect-auto" />
      </section>

      <section id="journal" className="border-t border-black/5 px-5 py-16 sm:px-[6vw] sm:py-20">
        <div className="flex justify-between"><LineTitle>Tạp chí</LineTitle><button type="button" onClick={() => setShowAllArticles(!showAllArticles)} className="text-[8px] uppercase tracking-widest">{showAllArticles ? "Thu gọn" : "Xem tất cả"} &nbsp;→</button></div>
        <div className="grid items-center gap-9 md:grid-cols-[30%_1fr]">
          <img src={images.journal} alt="Chi tiết chất liệu trang phục MENTALO" className="-mx-5 aspect-[4/3] w-[calc(100%+2.5rem)] object-cover grayscale sm:mx-0 sm:aspect-[1.6/1] sm:w-full" />
          <div className="mx-auto max-w-sm text-center md:mx-0 md:text-left"><p className="text-[8px] tracking-widest">12.04.2025</p><h3 className="mt-3 font-serif text-2xl leading-tight">Chọn vải quần âu nam<br />sao cho đẹp và thoải mái?</h3><p className="mt-3 text-[10px] leading-5 text-black/45">Cùng MENTALO tìm hiểu các loại vải phổ biến và lựa chọn phù hợp nhất dành cho bạn.</p><button type="button" onClick={() => setArticleExpanded(!articleExpanded)} className="mt-5 inline-flex gap-5 text-[8px] uppercase tracking-widest">{articleExpanded ? "Thu gọn" : "Đọc thêm"} <Arrow /></button>{articleExpanded && <div className="mt-4 space-y-3 text-left text-[10px] leading-5 text-black/60"><p>Vải wool pha có độ đứng phom đẹp, phù hợp với quần âu mặc đi làm. Nếu ưu tiên sự thoáng mát, cotton pha linen là lựa chọn dễ chịu cho những ngày nóng.</p><p>Hãy chọn chất vải có độ co giãn nhẹ và bề mặt ít nhăn để thoải mái vận động suốt ngày dài.</p></div>}</div>
        </div>
        {showAllArticles && <div className="mt-10 grid gap-5 border-t border-black/10 pt-6 sm:grid-cols-2"><article><p className="text-[8px] tracking-widest text-black/45">PHONG CÁCH · 08.03.2025</p><h3 className="mt-2 font-serif text-lg">Xây dựng tủ đồ tối giản cho quý ông hiện đại</h3><p className="mt-2 text-[10px] leading-5 text-black/55">Những món đồ cơ bản giúp bạn phối trang phục tinh gọn mà vẫn chỉn chu.</p></article><article><p className="text-[8px] tracking-widest text-black/45">CHẤT LIỆU · 21.02.2025</p><h3 className="mt-2 font-serif text-lg">Chăm sóc trang phục để bền đẹp lâu hơn</h3><p className="mt-2 text-[10px] leading-5 text-black/55">Một vài thói quen đơn giản giúp giữ phom dáng và màu sắc theo thời gian.</p></article></div>}
      </section>

      <section className="relative flex min-h-[420px] items-end overflow-hidden bg-black px-6 py-12 text-white sm:min-h-0 sm:px-[6vw] sm:py-16">
        <img src={images.hero} alt="" className="absolute inset-0 h-full w-full object-cover object-[center_35%] opacity-25 grayscale" />
        <div className="relative w-full text-center sm:w-auto sm:text-left"><p className="text-[8px] uppercase tracking-[0.25em]">MENTALO &nbsp; ——</p><h2 className="mt-6 font-serif text-4xl leading-none">Mặc đẹp<br />theo cách của bạn.</h2><a href="#shop" className="mt-7 inline-block border border-white/70 px-5 py-3 text-[8px] uppercase tracking-widest">Mua sắm ngay &nbsp; →</a></div>
      </section>

      <footer className="px-5 py-12 sm:px-[6vw] sm:py-14">
        <div className="grid gap-10 text-[9px] leading-6 md:grid-cols-[2fr_1fr_1fr_1fr]">
          <div><p className="brand-wordmark text-lg">MENTALO</p><p className="mt-2 text-[7px] uppercase tracking-widest text-black/40">Mặc đẹp theo cách của bạn</p><div className="mt-5 flex gap-3"><a href="https://instagram.com" aria-label="Instagram" className="grid size-8 place-items-center rounded-full border border-black/20 transition hover:bg-black hover:text-white"><svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="18" cy="6" r=".8" fill="currentColor"/></svg></a><a href="https://tiktok.com" aria-label="TikTok" className="grid size-8 place-items-center rounded-full border border-black/20 transition hover:bg-black hover:text-white"><svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 4v10.5a4.5 4.5 0 1 1-4-4.47M14 4c.5 3 2.5 5 5 5"/></svg></a><a href="https://youtube.com" aria-label="YouTube" className="grid size-8 place-items-center rounded-full border border-black/20 transition hover:bg-black hover:text-white"><svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="5" width="18" height="14" rx="4"/><path d="m10 9 5 3-5 3V9Z"/></svg></a></div></div>
          <div><a href="#shop">Cửa hàng</a><br /><a href="#about">Giới thiệu</a><br /><a href="#journal">Tạp chí</a></div>
          <div><a href="#">Trợ giúp</a><br /><a href="#">Đổi trả</a><br /><a href="#">Liên hệ</a></div>
          <div><a href="#">Instagram</a><br /><a href="#">TikTok</a><br /><a href="#">YouTube</a></div>
        </div>
        <div className="mt-10 flex flex-col gap-3 border-t border-black/10 pt-5 text-[7px] uppercase tracking-widest text-black/40 sm:mt-12 sm:flex-row sm:justify-between"><span>—— &nbsp; Ít ồn ào. Thêm phong thái.</span><span>© 2025 MENTALO</span></div>
      </footer>
    </main>
  );
}
