import getRandomPrice from "../helper/getRandomPrice"

import armchair from "../../../../public/assets/chairs/armchair-1.jpg"
import couch from "../../../../public/assets/couchs/couch-2.jpg"

const trendingProducts = [
  {
    id: 1,
    name: "Armchair",
    color: "yellow",
    price: getRandomPrice(100, 20),
    href: "/assets/chairs/armchairs-1.jpg",
    imageSrc: armchair,
    imageAlt: "yellow-armchair-1",
  },
  {
    id: 2,
    name: "Couch",
    color: "green",
    price: getRandomPrice(100, 1),
    href: "/assets/couchs/couch-2.jpg",
    imageSrc: { couch },
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
]

export default trendingProducts
