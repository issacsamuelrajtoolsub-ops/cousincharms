export type Charm = {
  id: string;
  name: string;
  price: number;
  category: 'classics' | 'new';
  material: string;
  size: string;
  rating: number;
  img: string;
  stock: number;
  popular: boolean;
  isNew: boolean;
  desc: string;
};

export const CHARMS: Charm[] = [
  { id: 'heart',     name: 'Heart on a Chain',  price: 48, category: 'classics', material: 'Brass, gold-plated',          size: 'Dime',   rating: 4.9, img: '/assets/charm-heart.svg',     stock: 24, popular: true,  isNew: false, desc: "Cast brass, gold-plated. About the size of a dime. Warm to the touch by the end of a long day." },
  { id: 'star',      name: 'Little Star',       price: 38, category: 'new',      material: 'Sterling silver, 14k plate',  size: 'Dime',   rating: 4.8, img: '/assets/charm-star.svg',      stock: 12, popular: false, isNew: true,  desc: "Five little points. The kind of charm you pass on." },
  { id: 'moon',      name: 'Crescent Moon',     price: 54, category: 'classics', material: 'Brass, gold-plated',          size: 'Nickel', rating: 4.9, img: '/assets/charm-moon.svg',      stock: 8,  popular: true,  isNew: false, desc: "A sliver of moon, cast in brass. With two tiny stars etched at the side." },
  { id: 'clover',    name: 'Four-Leaf Clover',  price: 42, category: 'classics', material: 'Brass, enamel',               size: 'Dime',   rating: 4.7, img: '/assets/charm-clover.svg',    stock: 18, popular: false, isNew: false, desc: "For luck, or for looking like you have it." },
  { id: 'key',       name: 'Little Key',        price: 46, category: 'new',      material: 'Brass, antiqued',             size: 'Dime',   rating: 4.8, img: '/assets/charm-key.svg',       stock: 3,  popular: false, isNew: true,  desc: "Hand-finished, antiqued edges. The kind of key that opens nothing in particular." },
  { id: 'flower',    name: 'Sun Daisy',         price: 40, category: 'new',      material: 'Brass, gold-plated',          size: 'Dime',   rating: 4.6, img: '/assets/charm-flower.svg',    stock: 20, popular: false, isNew: true,  desc: "Named for a summer. Looks like one, too." },
  { id: 'butterfly', name: 'Soft Butterfly',    price: 52, category: 'classics', material: 'Brass, enamel wings',         size: 'Nickel', rating: 4.9, img: '/assets/charm-butterfly.svg', stock: 15, popular: true,  isNew: false, desc: "Wings with a little give. Hangs gently." },
  { id: 'sun',       name: 'Happy Sun',         price: 44, category: 'classics', material: 'Brass, gold-plated',          size: 'Dime',   rating: 4.8, img: '/assets/charm-sun.svg',       stock: 10, popular: true,  isNew: false, desc: "Smiles on the way. The friendliest one we make." },
];

export const findCharm = (id: string) => CHARMS.find((c) => c.id === id);
