const base = "/hotel-info";

export const ROUTE = {
  BASE: `${base}/花蓮縣/吉安鄉`
} as const;

export interface HotelInfo {
  Id: number
  Add: string
  Name: string
  Tel: string
  Website: string
  Serviceinfos: string[]
  Description: string
  Pictures: string[]
}

export const MOCK_ORIGIN_DATA = {
  XML_Head: {
    Infos: {
      Info: [
        {
          Region: "新北市",
          Town: "淡水區",
          Add: "新北市淡水區中正路123號",
          Name: "海景旅店",
          Tel: "02-1234-5678",
          Website: "https://seaviewhotel.example.com",
          Serviceinfo: "提供免費早餐、Wi-Fi、停車場",
          Description: "位於淡水老街旁，擁有絕佳海景的舒適旅店。",
          Picture1: "https://example.com/images/hotel1.jpg",
          Picture2: "https://example.com/images/hotel2.jpg",
          Picture3: "https://example.com/images/hotel3.jpg"
        },
        {
          Region: "花蓮縣",
          Town: "吉安鄉",
          Add: "花蓮縣吉安鄉和平路88號",
          Name: "山嵐民宿",
          Tel: "03-8888-1234",
          Website: "https://shanlanbnb.example.com",
          Serviceinfo: "提供接駁服務,早餐,腳踏車租借",
          Description: "位於花蓮市郊，擁有寧靜山景與溫馨客房，適合家庭與背包客。",
          Picture1: "picture1.jpg",
          Picture2: "picture2.jpg",
          Picture3: "picture3.jpg"
        }
      ]
    },
  },
};

export const MOCK_FORMAT_DATA: HotelInfo[] = [
  {
    Id: 1,
    Add: "花蓮縣吉安鄉和平路88號",
    Name: "山嵐民宿",
    Tel: "03-8888-1234",
    Website: "https://shanlanbnb.example.com",
    Serviceinfos: [
      "提供接駁服務",
      "早餐",
      "腳踏車租借"
    ],
    Description: "位於花蓮市郊，擁有寧靜山景與溫馨客房，適合家庭與背包客。",
    Pictures: [
      "picture1.jpg",
      "picture2.jpg",
      "picture3.jpg"
    ]
  }
];