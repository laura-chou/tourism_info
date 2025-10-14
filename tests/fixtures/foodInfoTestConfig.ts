const base = "/food-info";

export const ROUTE = {
  BASE: base
} as const;

export interface ProcessedFoodItem {
  Id: number
  Add: string
  Name: string
  Tel: string
  Opentime: string
  Website?: string
  Description?: string
  Pictures: string[]
}

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
      ],
    },
  },
};

export const MOCK_FORMAT_DATA: ProcessedFoodItem[] = [
  {
    Id: 1,
    Add: "彰化縣員林市員水路二段390號",
    Name: "林桔園蜜餞行",
    Tel: "886-4-8351196",
    Opentime: "08:00-22:00",
    Website: "https://goo.gl/qMe98p",
    Description: "這是一個景點介紹",
    Pictures: [
      "picture1.jpg",
      "picture2.jpg"
    ]
  }
];