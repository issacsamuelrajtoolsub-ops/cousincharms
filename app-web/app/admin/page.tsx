'use client';

import { useState, type ReactNode } from 'react';
import { Icon } from '../_components/Icon';

type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
  cat: 'Classics' | 'New' | 'Limited';
  img: string;
  desc: string;
};

const initial: Product[] = [
  { id: 'heart',     name: 'Heart on a Chain', price: 48, stock: 24, cat: 'Classics', img: '/assets/charm-heart.svg',     desc: 'Cast brass, gold-plated. About the size of a dime.' },
  { id: 'star',      name: 'Little Star',      price: 38, stock: 12, cat: 'New',      img: '/assets/charm-star.svg',      desc: 'Five little points. The kind of charm you pass on.' },
  { id: 'moon',      name: 'Crescent Moon',    price: 54, stock: 8,  cat: 'Classics', img: '/assets/charm-moon.svg',      desc: 'A sliver of moon, cast in brass.' },
  { id: 'clover',    name: 'Four-Leaf Clover', price: 42, stock: 18, cat: 'Classics', img: '/assets/charm-clover.svg',    desc: 'For luck, or for looking like you have it.' },
  { id: 'key',       name: 'Little Key',       price: 46, stock: 3,  cat: 'New',      img: '/assets/charm-key.svg',       desc: 'Hand-finished, antiqued edges.' },
  { id: 'flower',    name: 'Sun Daisy',        price: 40, stock: 20, cat: 'New',      img: '/assets/charm-flower.svg',    desc: 'Named for a summer.' },
  { id: 'butterfly', name: 'Soft Butterfly',   price: 52, stock: 15, cat: 'Classics', img: '/assets/charm-butterfly.svg', desc: 'Wings with a little give.' },
  { id: 'sun',       name: 'Happy Sun',        price: 44, stock: 10, cat: 'Classics', img: '/assets/charm-sun.svg',       desc: 'Smiles on the way.' },
];

const orders = [
  { id: 'CC-2847', buyer: 'Maya Torres',   email: 'maya@cousin.co',   total: 102, status: 'new'  as const, items: 2, when: '2 min ago' },
  { id: 'CC-2846', buyer: 'Theo Ng',       email: 'theo@ng.mail',     total: 48,  status: 'paid' as const, items: 1, when: '14 min ago' },
  { id: 'CC-2845', buyer: 'Ruby Alvarado', email: 'ruby@gmail.com',   total: 146, status: 'ship' as const, items: 3, when: '38 min ago' },
  { id: 'CC-2844', buyer: 'Sam Park',      email: 's.park@co.net',    total: 54,  status: 'paid' as const, items: 1, when: '1 hr ago' },
  { id: 'CC-2843', buyer: 'Dara L.',       email: 'dara@lamail.io',   total: 96,  status: 'ship' as const, items: 2, when: '3 hr ago' },
];

function StockTag({ n }: { n: number }) {
  if (n <= 3) return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-cc-danger-soft text-cc-danger">Only {n} left</span>;
  if (n <= 10) return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-cc-yellow-100 text-cc-ink-900">{n} in stock</span>;
  return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-cc-success-soft text-cc-success">{n} in stock</span>;
}

function Btn({ kind, children, ...rest }: { kind: 'primary' | 'ghost' | 'danger'; children: ReactNode } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const cls =
    kind === 'primary'
      ? 'bg-cc-yellow-400 text-cc-ink-950 hover:bg-cc-yellow-500 hover:shadow-cc-glow border-cc-ink-950'
      : kind === 'danger'
      ? 'bg-cc-danger-soft text-cc-danger border-cc-danger'
      : 'bg-white text-cc-ink-950 hover:bg-cc-ink-100 border-cc-ink-950';
  return (
    <button {...rest} className={`px-3.5 py-2 rounded-cc-sm text-[13px] font-semibold cursor-pointer border-[1.5px] inline-flex items-center gap-1.5 transition-all ${cls}`}>
      {children}
    </button>
  );
}

function ProductEditor({
  item,
  onSave,
  onClose,
}: {
  item?: Product;
  onSave: (p: Product) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<Product>(
    item ?? { id: '', name: '', price: 0, stock: 0, cat: 'New', img: '/assets/charm-star.svg', desc: '' },
  );
  const upd = <K extends keyof Product>(k: K, v: Product[K]) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <>
      <div className="fixed inset-0 bg-cc-ink-950/45 backdrop-blur-sm z-50" onClick={onClose} />
      <aside className="fixed top-0 right-0 bottom-0 w-[560px] max-w-[96vw] bg-cc-bg-warm z-50 overflow-auto px-8 py-7" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute top-5 right-6 w-9 h-9 rounded-cc-sm inline-flex items-center justify-center text-cc-ink-700 hover:bg-cc-ink-100"
          aria-label="Close"
        >
          <Icon name="close" size={16} />
        </button>
        <div className="flex gap-1 p-1 bg-cc-ink-100 rounded-cc-md w-fit">
          <span className="px-4 py-2 rounded-[10px] text-[13px] font-semibold bg-white shadow-cc-xs">{item ? 'Edit' : 'New'} charm</span>
        </div>
        <h2 className="font-display text-[28px] mt-4 mb-5">
          {item ? (
            <>
              Editing <em className="italic" style={{ color: 'var(--color-cc-yellow-700)' }}>{form.name || 'charm'}</em>
            </>
          ) : (
            <>
              A new <em className="italic" style={{ color: 'var(--color-cc-yellow-700)' }}>charm.</em>
            </>
          )}
        </h2>

        <div className="border-2 border-dashed border-cc-border rounded-cc-md p-6 text-center text-cc-ink-600 bg-cc-bg-inset mb-4">
          {form.img ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={form.img} alt="" style={{ width: 80, height: 100 }} className="mx-auto" />
          ) : (
            <span>Drop an image or click to browse</span>
          )}
          <div className="text-xs mt-2">PNG or SVG · max 4 MB</div>
        </div>

        {[
          { k: 'name' as const, l: 'Product name', placeholder: 'Heart on a Chain' },
        ].map((f) => (
          <div key={f.k} className="flex flex-col gap-1.5 mb-3.5">
            <label className="text-[13px] font-medium text-cc-ink-800">{f.l}</label>
            <input
              value={form[f.k]}
              onChange={(e) => upd(f.k, e.target.value)}
              placeholder={f.placeholder}
              className="px-3.5 py-2.5 border-[1.5px] border-cc-border rounded-cc-sm bg-white text-[15px] outline-none focus:border-cc-ink-950 focus:ring-4 focus:ring-cc-yellow-100 transition-all"
            />
          </div>
        ))}

        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5 mb-3.5">
            <label className="text-[13px] font-medium text-cc-ink-800">Price (USD)</label>
            <input
              type="number"
              value={form.price}
              onChange={(e) => upd('price', Number(e.target.value))}
              className="px-3.5 py-2.5 border-[1.5px] border-cc-border rounded-cc-sm bg-white text-[15px] outline-none focus:border-cc-ink-950 focus:ring-4 focus:ring-cc-yellow-100 transition-all"
            />
          </div>
          <div className="flex flex-col gap-1.5 mb-3.5">
            <label className="text-[13px] font-medium text-cc-ink-800">Stock</label>
            <input
              type="number"
              value={form.stock}
              onChange={(e) => upd('stock', Number(e.target.value))}
              className="px-3.5 py-2.5 border-[1.5px] border-cc-border rounded-cc-sm bg-white text-[15px] outline-none focus:border-cc-ink-950 focus:ring-4 focus:ring-cc-yellow-100 transition-all"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5 mb-3.5">
          <label className="text-[13px] font-medium text-cc-ink-800">Category</label>
          <select
            value={form.cat}
            onChange={(e) => upd('cat', e.target.value as Product['cat'])}
            className="px-3.5 py-2.5 border-[1.5px] border-cc-border rounded-cc-sm bg-white text-[15px] outline-none focus:border-cc-ink-950 focus:ring-4 focus:ring-cc-yellow-100 transition-all"
          >
            <option>Classics</option>
            <option>New</option>
            <option>Limited</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5 mb-3.5">
          <label className="text-[13px] font-medium text-cc-ink-800">Description</label>
          <textarea
            value={form.desc}
            onChange={(e) => upd('desc', e.target.value)}
            placeholder="Write it the way you'd tell a friend."
            className="px-3.5 py-2.5 border-[1.5px] border-cc-border rounded-cc-sm bg-white text-[15px] outline-none focus:border-cc-ink-950 focus:ring-4 focus:ring-cc-yellow-100 transition-all min-h-[100px] resize-y"
          />
        </div>

        <div className="flex justify-between items-center mt-6 pt-5 border-t border-cc-border">
          <Btn kind="ghost" onClick={onClose}>Cancel</Btn>
          <div className="flex gap-2">
            {item && <Btn kind="danger">Delete</Btn>}
            <Btn
              kind="primary"
              onClick={() => onSave({ ...form, id: form.id || form.name.toLowerCase().replace(/\s+/g, '-') })}
            >
              Save. Nice.
            </Btn>
          </div>
        </div>
      </aside>
    </>
  );
}

function DeleteConfirm({ name, onYes, onNo }: { name: string; onYes: () => void; onNo: () => void }) {
  return (
    <div className="fixed inset-0 z-[60] bg-cc-ink-950/60 backdrop-blur-sm flex items-center justify-center p-6" onClick={onNo}>
      <div className="bg-cc-bg-warm rounded-cc-lg p-7 max-w-[400px] w-full shadow-cc-xl" onClick={(e) => e.stopPropagation()}>
        <h3 className="font-display text-[26px] m-0 mb-2">
          Delete <em className="italic" style={{ color: 'var(--color-cc-yellow-700)' }}>{name}</em>?
        </h3>
        <p className="text-cc-ink-600 m-0 mb-5">This charm goes away forever. Sure?</p>
        <div className="flex justify-end gap-2">
          <Btn kind="ghost" onClick={onNo}>Keep it</Btn>
          <button
            onClick={onYes}
            className="px-3.5 py-2 rounded-cc-sm text-[13px] font-semibold cursor-pointer border-[1.5px] bg-cc-danger text-white border-cc-danger hover:opacity-90"
          >
            Yes, delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [tab, setTab] = useState<'products' | 'orders'>('products');
  const [products, setProducts] = useState(initial);
  const [q, setQ] = useState('');
  const [editing, setEditing] = useState<Product | null>(null);
  const [newOpen, setNewOpen] = useState(false);
  const [confirmDel, setConfirmDel] = useState<Product | null>(null);

  const filtered = products.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] min-h-screen">
      <aside className="bg-cc-ink-950 text-cc-ink-100 px-4 py-6 flex flex-col gap-2">
        <div className="flex items-center gap-2.5 px-3 py-2 mb-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/logo-mark.svg" width={28} height={28} alt="" style={{ filter: 'invert(1)' }} />
          <span className="font-display text-lg text-white">
            Cousin <em className="italic" style={{ color: 'var(--color-cc-yellow-400)' }}>Studio</em>
          </span>
        </div>
        <nav className="flex flex-col">
          {[
            { k: 'dashboard', label: 'Dashboard', icon: 'chart' as const },
            { k: 'products', label: 'Products', icon: 'box' as const },
            { k: 'orders', label: 'Orders', icon: 'cart' as const },
            { k: 'settings', label: 'Settings', icon: 'cog' as const },
          ].map((it) => {
            const active = it.k === tab;
            const clickable = it.k === 'products' || it.k === 'orders';
            return (
              <a
                key={it.k}
                onClick={clickable ? () => setTab(it.k as 'products' | 'orders') : undefined}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-cc-sm text-sm font-medium cursor-pointer transition-all ${
                  active ? 'bg-cc-yellow-400 text-cc-ink-950' : 'text-cc-ink-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon name={it.icon} size={16} /> {it.label}
              </a>
            );
          })}
        </nav>
        <div className="mt-auto p-3 rounded-cc-sm bg-white/5 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-cc-yellow-400 text-cc-ink-950 inline-flex items-center justify-center font-bold text-[13px]">ST</div>
          <div className="text-[13px] text-white">
            Studio
            <small className="block text-[11px] text-cc-ink-400">admin@cousin.co</small>
          </div>
        </div>
      </aside>

      <main className="px-10 py-8" style={{ backgroundImage: 'url(/assets/pattern-dots.svg)', backgroundSize: 60 }}>
        <div className="flex justify-between items-end gap-6 mb-8">
          <div className="min-w-0 flex-1">
            <h1 className="font-display text-4xl leading-[1.1] tracking-[-0.02em] m-0">
              <small className="block font-sans text-xs text-cc-ink-500 font-semibold tracking-[0.14em] uppercase mb-2 leading-none">
                STUDIO · APR 26
              </small>
              Hey, <em className="italic" style={{ color: 'var(--color-cc-yellow-700)' }}>cousin.</em>
            </h1>
          </div>
          <div className="flex gap-2">
            <Btn kind="ghost">Export CSV</Btn>
            <Btn kind="primary" onClick={() => setNewOpen(true)}>
              <Icon name="plus" size={16} /> New charm
            </Btn>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
          {[
            { lbl: 'Orders this week', val: '28', delta: '↑ 12% vs last', up: true },
            { lbl: 'Revenue', val: '$1,842', delta: '↑ 8%', up: true },
            { lbl: 'Products live', val: products.length, delta: '· 2 low stock', muted: true },
            { lbl: 'New customers', val: '14', delta: '↓ 3%', down: true },
          ].map((s) => (
            <div key={s.lbl} className="bg-white border-[1.5px] border-cc-border rounded-cc-lg px-5 py-4">
              <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-cc-ink-500">{s.lbl}</div>
              <div className="font-display text-[34px] mt-1.5 cc-tabular">{s.val}</div>
              <div className={`text-xs font-semibold mt-0.5 ${s.up ? 'text-cc-success' : s.down ? 'text-cc-danger' : 'text-cc-ink-500'}`}>
                {s.delta}
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-1 p-1 bg-cc-ink-100 rounded-cc-md w-fit mb-4">
          {(['products', 'orders'] as const).map((t) => (
            <a
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-[10px] text-[13px] font-semibold cursor-pointer ${
                tab === t ? 'bg-white text-cc-ink-950 shadow-cc-xs' : 'text-cc-ink-700'
              }`}
            >
              {t === 'products' ? 'Catalog' : 'Orders'}
            </a>
          ))}
        </div>

        <div className="bg-white border-[1.5px] border-cc-border rounded-cc-lg overflow-hidden">
          <div className="flex items-center gap-3 px-5 py-3.5 border-b border-cc-border">
            <div className="flex items-center gap-2 bg-cc-bg-warm border-[1.5px] border-cc-border rounded-cc-sm px-3 py-2 flex-1 max-w-[320px]">
              <Icon name="search" size={16} />
              <input
                placeholder={tab === 'products' ? 'Search charms…' : 'Search orders…'}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="flex-1 border-0 bg-transparent outline-none text-sm"
              />
            </div>
            {tab === 'products' && (
              <Btn kind="primary" onClick={() => setNewOpen(true)} style={{ marginLeft: 'auto' }}>
                <Icon name="plus" size={16} /> New charm
              </Btn>
            )}
          </div>

          {tab === 'products' ? (
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  {['Charm', 'Category', 'Price', 'Stock', 'Actions'].map((h, i) => (
                    <th
                      key={h}
                      className={`text-left px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-cc-ink-500 bg-cc-bg-inset border-b border-cc-border ${
                        i === 4 ? '!text-right' : ''
                      }`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id} className="hover:[&>td]:bg-cc-yellow-50">
                    <td className="px-5 py-3.5 border-b border-cc-border-soft text-sm text-cc-ink-800">
                      <span className="inline-flex items-center justify-center w-11 h-11 rounded-cc-sm bg-cc-ink-50 mr-2.5 align-middle">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={p.img} alt="" style={{ width: '80%', height: '80%' }} />
                      </span>
                      <span className="font-medium font-display italic text-base text-cc-ink-950">{p.name}</span>
                    </td>
                    <td className="px-5 py-3.5 border-b border-cc-border-soft text-sm text-cc-ink-800">{p.cat}</td>
                    <td className="px-5 py-3.5 border-b border-cc-border-soft text-[13px] text-cc-ink-800 cc-tabular font-mono">${p.price}.00</td>
                    <td className="px-5 py-3.5 border-b border-cc-border-soft">
                      <StockTag n={p.stock} />
                    </td>
                    <td className="px-5 py-3.5 border-b border-cc-border-soft text-right">
                      <span className="inline-flex gap-1.5">
                        <button
                          onClick={() => setEditing(p)}
                          className="w-8 h-8 rounded-cc-sm inline-flex items-center justify-center text-cc-ink-700 hover:bg-cc-ink-100 hover:text-cc-ink-950 cursor-pointer"
                          aria-label={`Edit ${p.name}`}
                        >
                          <Icon name="edit" size={14} />
                        </button>
                        <button
                          onClick={() => setConfirmDel(p)}
                          className="w-8 h-8 rounded-cc-sm inline-flex items-center justify-center text-cc-ink-700 hover:bg-cc-danger-soft hover:text-cc-danger cursor-pointer"
                          aria-label={`Delete ${p.name}`}
                        >
                          <Icon name="trash" size={14} />
                        </button>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  {['Order', 'Buyer', 'Items', 'Total', 'Status', 'When', ''].map((h) => (
                    <th key={h} className="text-left px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-cc-ink-500 bg-cc-bg-inset border-b border-cc-border">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id} className="hover:[&>td]:bg-cc-yellow-50">
                    <td className="px-5 py-3.5 border-b border-cc-border-soft text-[13px] text-cc-ink-800 cc-tabular font-mono">{o.id}</td>
                    <td className="px-5 py-3.5 border-b border-cc-border-soft text-sm text-cc-ink-800">
                      <span className="font-medium text-cc-ink-950">{o.buyer}</span>
                      <br />
                      <small className="text-cc-ink-500">{o.email}</small>
                    </td>
                    <td className="px-5 py-3.5 border-b border-cc-border-soft text-sm text-cc-ink-800">{o.items}</td>
                    <td className="px-5 py-3.5 border-b border-cc-border-soft text-[13px] text-cc-ink-800 cc-tabular font-mono">${o.total}.00</td>
                    <td className="px-5 py-3.5 border-b border-cc-border-soft">
                      {o.status === 'new' && <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-cc-yellow-100 text-cc-ink-900">● New</span>}
                      {o.status === 'paid' && <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-cc-success-soft text-cc-success">✓ Paid</span>}
                      {o.status === 'ship' && <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-cc-info-soft text-cc-info">⇢ Shipped</span>}
                    </td>
                    <td className="px-5 py-3.5 border-b border-cc-border-soft text-cc-ink-500 text-sm">{o.when}</td>
                    <td className="px-5 py-3.5 border-b border-cc-border-soft">
                      <Btn kind="ghost">View</Btn>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>

      {editing && (
        <ProductEditor
          item={editing}
          onClose={() => setEditing(null)}
          onSave={(n) => {
            setProducts((ps) => ps.map((p) => (p.id === n.id ? n : p)));
            setEditing(null);
          }}
        />
      )}
      {newOpen && (
        <ProductEditor
          onClose={() => setNewOpen(false)}
          onSave={(n) => {
            setProducts((ps) => [n, ...ps]);
            setNewOpen(false);
          }}
        />
      )}
      {confirmDel && (
        <DeleteConfirm
          name={confirmDel.name}
          onNo={() => setConfirmDel(null)}
          onYes={() => {
            setProducts((ps) => ps.filter((p) => p.id !== confirmDel.id));
            setConfirmDel(null);
          }}
        />
      )}
    </div>
  );
}
