import assets from "./assets";

const EventData = [
  {
    id: "Creator-01",
    name: "Ball @ Serangoon CC",
    creator: "Lebron James",
    persons: 6,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    image: assets.event01,
    bids: [
      {
        id: "Acceptor-11",
        name: "Choo Kai Wen",
        ratings: 4.25,
        image: assets.person02,
        date: "December 12, 2019 at 12:10 PM",
      },
      {
        id: "Acceptor-12",
        name: "Chang De Kang",
        ratings: 4.5,
        image: assets.person03,
        date: "December 27, 2019 at 1:50 PM",
      },
      {
        id: "Acceptor-13",
        name: "Cheng Yong Chang",
        ratings: 4.75,
        image: assets.person04,
        date: "December 31, 2019 at 3:50 PM",
      },
    ],
  },
  {
    id: "Creator-02",
    name: "ECP night cycling",
    creator: "Fabio",
    persons: 4,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum eptos diam fames arcu hendrerit, quis ultrices in eleifend posuere ipsum conubia porttitor felis.",
    image: assets.event02,
    bids: [
      {
        id: "Acceptor-21",
        name: "Ong Lin Min",
        ratings: 3.5,
        image: assets.person04,
        date: "December 12, 2019 at 12:10 PM",
      },
    ],
  },
  {
    id: "Creator-03",
    name: "Bungee Jump buddy",
    creator: "Elisabeth",
    persons: 1,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet consectetur adipiscing elit consequat accumsan sapien, lectus convallis malesuada odio curae habitasse dignissim nascetur. Nulla sed velit erat vitae leo sem inceptos diam fames arcu hendrerit, quis ultrices in eleifend posuere ipsum conubia porttitor felis. Lorem ipsum dolor sit amet consectetur adipiscing elit consequat accumsan sapien, lectus convallis malesuada odio curae habitasse dignissim nascetur. Nulla sed velit erat vitae leo sem inceptos diam fames arcu hendrerit, quis ultrices in eleifend posuere ipsum conubia porttitor felis.",
    image: assets.event03,
    bids: [
      {
        id: "Acceptor-31",
        name: "Pun Jia Xin",
        ratings: 4.5,
        image: assets.person02,
        date: "December 12, 2019 at 12:10 PM",
      },
      {
        id: "Acceptor-32",
        name: "Jennifer Fang",
        ratings: 4.2,
        image: assets.person03,
        date: "December 27, 2019 at 1:50 PM",
      },
    ],
  },
  {
    id: "Creator-04",
    name: "Try newly opened cafe @ Bugis",
    creator: "Puta",
    persons: 2,
    description:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit consequat accumsan sapien, lectus convallis malesuada odio curae habitasse dignissim nascetur.",
    image: assets.event04,
    bids: [
      {
        id: "Acceptor-41",
        name: "Koh Yong Quan",
        ratings: 5.0,
        image: assets.person02,
        date: "December 12, 2019 at 12:10 PM",
      },
      {
        id: "Acceptor-42",
        name: "Caleb Seah",
        ratings: 4.5,
        image: assets.person03,
        date: "December 27, 2019 at 1:50 PM",
      },
      {
        id: "Acceptor-43",
        name: "Poon Kai Feng",
        ratings: 4.1,
        image: assets.person04,
        date: "December 31, 2019 at 3:50 PM",
      },
      {
        id: "Acceptor-44",
        name: "Vincent Toh",
        ratings: 4.15,
        image: assets.person02,
        date: "December 31, 2019 at 3:50 PM",
      },
    ],
  },
  {
    id: "Creator-05",
    name: "Any PADI OW buddy?",
    creator: "David",
    persons: 5,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    image: assets.event05,
    bids: [
      {
        id: "Acceptor-51",
        name: "Deng Wen Ming",
        ratings: 4.8,
        image: assets.person02,
        date: "December 12, 2019 at 12:10 PM",
      },
    ],
  },
  {
    id: "Creator-06",
    name: "Need 1 more Mahjong kaki tonight",
    creator: "Leo Messi",
    persons: 1,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna adipiscing elit consequat accumsan sapien, lectus convallis malesuada odio curae habitasse dignissim nascetur. Nulla sed velit erat vitae leo sem inceptos diam fames arcu hendrerit, quis ultrices in eleifend posuere ipsum conubia porttitor felis.",
    image: assets.event06,
    bids: [
      {
        id: "Acceptor-61",
        name: "Poon Yi Hao",
        ratings: 4.75,
        image: assets.person02,
        date: "December 12, 2019 at 12:10 PM",
      },
      {
        id: "Acceptor-62",
        name: "Jennifer Sia",
        ratings: 3.8,
        image: assets.person03,
        date: "December 27, 2019 at 1:50 PM",
      },
      {
        id: "Acceptor-63",
        name: "Rosie Wong",
        ratings: 4.75,
        image: assets.person04,
        date: "December 31, 2019 at 3:50 PM",
      },
      {
        id: "Acceptor-64",
        name: "Siti Nurhaliza",
        ratings: 4.25,
        image: assets.person02,
        date: "December 31, 2019 at 3:50 PM",
      },
      {
        id: "Acceptor-65",
        name: "Kaitlyn Lee",
        ratings: 4.25,
        image: assets.person02,
        date: "December 31, 2019 at 3:50 PM",
      },
    ],
  },
  {
    id: "Creator-07",
    name: "Volleyball @ Utown",
    creator: "Victor de la Cruz",
    persons: 10,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: assets.event07,
    bids: [],
  },
];

export { EventData };
