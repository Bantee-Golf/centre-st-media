export interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  url: string;
  tag?: string;
}

/**
 * Curated products from shop.gopsusports.com
 * These URLs are passed to Rye's Sell Anything API at checkout time.
 * Rye handles scraping product details, calculating shipping/tax, and order placement.
 */
export const PRODUCTS: Product[] = [
  {
    id: "psu-hoodie-elena",
    name: "Women's Pressbox Cream Penn State Nittany Lions Elena Janise Hoodie",
    price: "$54.99",
    image: "/products/psu-hoodie.jpg",
    url: "https://shop.gopsusports.com/womens-pressbox-cream-penn-state-nittany-lions-elena-janise-hoodie/p-352214052030506432+z-8-3054301854",
    tag: "Popular",
  },
  {
    id: "psu-jersey-football",
    name: "Men's Nike #1 White Penn State Nittany Lions Football Replica Jersey",
    price: "$84.99",
    image: "/products/psu-jersey.jpg",
    url: "https://shop.gopsusports.com/mens-nike-number-1-white-penn-state-nittany-lions-football-replica-jersey/p-59153671789592+z-817-3755718994",
    tag: "Best Seller",
  },
  {
    id: "psu-hat-trucker",
    name: "Men's Top of the World Navy Penn State Nittany Lions Trucker Adjustable Hat",
    price: "$29.99",
    image: "/products/psu-hat.jpg",
    url: "https://shop.gopsusports.com/mens-top-of-the-world-navy-penn-state-nittany-lions-trucker-adjustable-hat/p-15444750289027+z-9082-2218498305",
  },
  {
    id: "psu-tee-vintage",
    name: "Unisex Homefield Navy Penn State Nittany Lions Vintage Logo T-Shirt",
    price: "$39.99",
    image: "/products/psu-tee.jpg",
    url: "https://shop.gopsusports.com/unisex-homefield-navy-penn-state-nittany-lions-vintage-logo-t-shirt/p-27000838858738+z-9775-2403362017",
  },
  {
    id: "psu-quarter-zip",
    name: "Men's Colosseum Navy Penn State Nittany Lions Tortugas Logo Quarter-Zip Jacket",
    price: "$64.99",
    image: "/products/psu-quarter-zip.jpg",
    url: "https://shop.gopsusports.com/mens-colosseum-navy-penn-state-nittany-lions-tortugas-logo-quarter-zip-jacket/p-38605836127839+z-9826-2429019270",
  },
  {
    id: "psu-sweatpants",
    name: "Men's Colosseum Navy Penn State Nittany Lions Worlds to Conquer Sweatpants",
    price: "$44.99",
    image: "/products/psu-sweatpants.jpg",
    url: "https://shop.gopsusports.com/mens-colosseum-navy-penn-state-nittany-lions-worlds-to-conquer-sweatpants/p-16382635054927+z-9826-1277547803",
  },
];
