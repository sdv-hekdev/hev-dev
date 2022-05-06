import getRandomPrice from "../helper/getRandomPrice"

const trendingProducts = [
  {
    id: 1,
    name: "Armchair",
    color: "yellow",
    price: getRandomPrice(100, 20),
    href: "/assets/chairs/armchair-1.jpg",
    imageSrc: "/assets/chairs/armchair-1.jpg",
    imageAlt: "yellow-armchair-1",
  },
  {
    id: 2,
    name: "Couch",
    color: "green",
    price: getRandomPrice(100, 1),
    href: "/assets/couchs/couch-2.jpg",
    imageSrc: "/assets/couchs/couch-2.jpg",
    imageAlt: "green-couch-2",
  },
  {
    id: 3,
    name: "Cupboard",
    color: "turquoise",
    price: getRandomPrice(100, 1),
    href: "/assets/cupboards/cupboard-3.jpg",
    imageSrc: "/assets/cupboards/cupboard-3.jpg",
    imageAlt: "turquoise-cupboard-3",
  },
  {
    id: 4,
    name: "Lamp",
    color: "white",
    price: getRandomPrice(100, 1),
    href: "/assets/lamps/lamp-4.jpg",
    imageSrc: "/assets/lamps/lamp-4.jpg",
    imageAlt: "white-lamp-2",
  },
  {
    id: 5,
    name: "Lamp",
    color: "white",
    price: getRandomPrice(100, 1),
    href: "/assets/lamps/lamp-5.jpg",
    imageSrc: "/assets/lamps/lamp-5.jpg",
    imageAlt: "white-lamp-2",
  },
  {
    id: 6,
    name: "Lamp",
    color: "white",
    price: getRandomPrice(100, 1),
    href: "/assets/lamps/lamp-6.jpg",
    imageSrc: "/assets/lamps/lamp-6.jpg",
    imageAlt: "white-lamp-2",
  },
  {
    id: 7,
    name: "Lamp",
    color: "white",
    price: getRandomPrice(100, 1),
    href: "/assets/lamps/lamp-7.jpg",
    imageSrc: "/assets/lamps/lamp-7.jpg",
    imageAlt: "white-lamp-2",
  },
]

export default trendingProducts
