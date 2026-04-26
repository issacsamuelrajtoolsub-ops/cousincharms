export function Footer() {
  return (
    <footer className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-10 py-16 border-t border-cc-border mt-10 max-w-[1320px] mx-auto px-8">
      <div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/logo.svg" height={44} alt="Cousin Charms" />
        <p className="text-sm text-cc-ink-700 max-w-[280px] mt-3">
          Cousin Charms — a small jewelry studio. Shipping worldwide, slowly and carefully.
        </p>
      </div>
      {[
        { title: 'SHOP', links: ['All charms', 'New this week', 'Bestsellers', 'Gift cards'] },
        { title: 'STUDIO', links: ['Our story', "How it's made", 'Journal', 'Wholesale'] },
        { title: 'HELP', links: ['Shipping', 'Returns', 'Care guide', 'Contact'] },
      ].map((col) => (
        <div key={col.title} className="flex flex-col gap-2.5">
          <div className="cc-eyebrow">{col.title}</div>
          {col.links.map((l) => (
            <a key={l} className="text-sm font-medium text-cc-ink-700 hover:text-cc-ink-950 cursor-pointer">
              {l}
            </a>
          ))}
        </div>
      ))}
    </footer>
  );
}
