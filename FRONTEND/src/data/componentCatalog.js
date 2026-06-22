import wardrobe from "../assets/images/bedroom/wardrobe.jpg";
import cot from "../assets/images/bedroom/cot.png";
import dressingTable from "../assets/images/bedroom/dressing-table2.png";
import sideTable from "../assets/images/bedroom/side-tabel.jpg";
import storageloft from "../assets/images/bedroom/storageloft.jpg";

import lowerCabinet from "../assets/images/kitchen/lower-cabinet.jpg";
import loftStorage from "../assets/images/kitchen/loft-storage.jpg";
import crockeryUnit from "../assets/images/kitchen/crockery-unit.jpg";
import breakfastCounter from "../assets/images/kitchen/breakfast-counter.jpg";

import tvUnit from "../assets/images/livingroom/tv-unit.jpg";
import poojaUnit from "../assets/images/livingroom/pooja-unit.jpg";
import partition from "../assets/images/livingroom/partition.jpg";
import vanity from "../assets/images/livingroom/vanity.jpg";

import utilityStorage from "../assets/images/utility/utility-storage.jpg";
const bedroomComponents = [

  {
    id: "wardrobe",

    name: "Wardrobe",

    image: wardrobe,

    unit: "sqft",

    variants: [
      {
        name: "Sliding Door",
        rate: 1550,
      },
      {
        name: "Normal Door",
        rate: 1330,
      },
    ],
  },

  {
    id: "loft",

    name: "Loft Storage",

    image: storageloft,

    unit: "sqft",

    rate: 900,
  },

  {
    id: "dressing",

    name: "Dressing Table",

    image: dressingTable,

    unit: "sqft",

    rate: 1400,
  },

  {
    id: "cot",

    name: "Cot",

    image: cot,

    unit: "piece",

    variants: [
      {
        name: "With Headboard",
        rate: 58000,
      },
      {
        name: "Without Headboard",
        rate: 48000,
      },
    ],
  },

  {
    id: "sideTable",

    name: "Side Table",

    image: sideTable,

    unit: "piece",

    rate: 6500,
  },

];
export const componentCatalog = {

  Kitchen: [

    {
      id: "lowerCabinet",

      name: "Lower Cabinets",

      image: lowerCabinet,

      unit: "sqft",

      rate: 1550
    },

    {
      id: "loftStorage",

      name: "Loft Storage",

      image: loftStorage,

      unit: "sqft",

      rate: 950
    },

    {
      id: "crockery",

      name: "Crockery Unit",

      image: crockeryUnit,

      unit: "sqft",

      rate: 1500
    },

    {
      id: "breakfast",

      name: "Breakfast Counter",

      image: breakfastCounter,

      unit: "sqft",

      rate: 1550
    }

  ],
    "Living Room": [

    {
      id: "tv",

      name: "TV Unit",

      image: tvUnit,

      unit: "sqft",

      rate: 1050
    },

    {
      id: "pooja",

      name: "Pooja Unit",

      image: poojaUnit,

      unit: "sqft",

      rate: 1350
    },

    {
      id: "partition",

      name: "Partition",

      image: partition,

      unit: "sqft",

      rate: 1350
    },

    {
      id: "vanity",

      name: "Vanity Counter",

      image: vanity,

      unit: "sqft",

      rate: 1550
    }

  ],
"Master Bedroom": bedroomComponents,

"Bedroom 2": bedroomComponents,

"Bedroom 3": bedroomComponents,

"Utility Area": [

  {
    id: "utility",

    name: "Utility Storage",

    image: utilityStorage,

    unit: "sqft",

    rate: 950,
  },

],
}