import { FormatFoodInfo } from "../../src/controllers/foodInfo.controller";

const base = "/food-info";

export const ROUTE = {
  BASE: `${base}/台北市/大安區`
} as const;

export const MOCK_ORIGIN_DATA = {
  XML_Head: {
    Infos: {
      Info: [
        {
          Region: "彰化縣",
          Town: "員林市",
          Add: "彰化縣員林市員水路二段390號",
          Name: "林桔園蜜餞行",
          Tel: "886-4-8351196",
          Opentime: "08:00-22:00",
          Website: "https://goo.gl/qMe98p",
          Description: "這是一個景點介紹",
          Picture1: "picture1.jpg",
          Picture2: "picture2.jpg",
        },
        {
          Region: "台北市",
          Town: "大安區",
          Add: "台北市大安區信義路四段123號",
          Name: "信義茶坊",
          Tel: "886-2-27001234",
          Opentime: "09:00-21:00",
          Website: "https://example.com/tea",
          Description: "品茗好去處，都市中的靜謐角落。",
          Picture1: "taipei1.jpg",
          Picture2: "taipei2.jpg"
        },
        {
          Region: "台北市",
          Town: "大安區",
          Add: "",
          Name: "XYZ餐廳",
          Tel: "",
          Opentime: "",
          Website: "",
          Description: "這是一間餐廳。",
          Picture1: "taipei1.jpg",
          Picture2: ""
        }
      ],
    },
  },
};

export const MOCK_FORMAT_DATA: FormatFoodInfo[] = [
  {
    Id: 1,
    Add: "台北市大安區信義路四段123號",
    Name: "信義茶坊",
    Tel: "886-2-27001234",
    OpenTime: "09:00-21:00",
    Website: "https://example.com/tea",
    Description: "品茗好去處，都市中的靜謐角落。",
    Pictures: [
      "taipei1.jpg",
      "taipei2.jpg"
    ]
  },
  {
    Id: 2,
    Add: "台北市大安區",
    Name: "XYZ餐廳",
    Tel: "無",
    OpenTime: "無",
    Website: "",
    Description: "這是一間餐廳。",
    Pictures: [
      "taipei1.jpg"
    ]
  }
];