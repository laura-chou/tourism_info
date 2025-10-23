import { FormatTouristSpots } from "../../src/controllers/touristSpots.controller";

const base = "/tourist-spots";

export const ROUTE = {
  BASE: `${base}/新北市/平溪區`
} as const;

export const MOCK_ORIGIN_DATA = {
  XML_Head: {
    Infos: {
      Info: [
        {
          Region: "新北市",
          Town: "金山區",
          Add: "新北市金山區磺港里磺港路",
          Name: "磺港漁港",
          Tel: "02-2498-1111",
          Website: "https://fishery.ntpc.gov.tw/cht/index.php?code=list&flag=detail&ids=60&article_id=507",
          Toldescribe: "磺港漁港位於磺溪出海口，擁有悠久的漁業歷史與蹦火仔捕魚技法，是金山地區重要的觀光漁港。港區設有魚市場、公園與休閒漁業館，結合溫泉資源，吸引遊客前來體驗漁村風情。",
          Opentime: "全年開放",
          Picture1: "picture1.jpg",
          Picture2: "picture2.jpg",
          Picture3: "picture3.jpg",
          Changetime: "2025-10-18",
          Travellinginfo: "可搭乘台灣好行至金山站後步行前往，或自駕沿台2線至金山岬附近。",
          Ticketinfo: "免費參觀"
        },
        {
          Region: "新北市",
          Town: "平溪區",
          Add: "新北市平溪區石底里靜安路二段",
          Name: "慈母峰登山步道",
          Tel: "02-2495-1510",
          Website: "https://newtaipei.travel/zh-cn/attractions/detail/110680",
          Toldescribe: "慈母峰為平溪三名山之一，海拔410公尺，步道由石底橋登山口起，沿途設有岩石階梯與鐵欄杆，適合登山新手挑戰。登頂後可遠眺平溪山景，並可連走普陀山與孝子山。",
          Opentime: "全年開放",
          Picture1: "picture1.jpg",
          Picture2: "picture2.jpg",
          Picture3: "picture3.jpg",
          Changetime: "2025-10-19",
          Travellinginfo: "搭乘台灣好行795至平溪站，步行至平溪瀑布旁登山口；自駕可沿106縣道至台電公司前右轉。",
          Ticketinfo: "免費參觀"
        },
        {
          Region: "新北市",
          Town: "平溪區",
          Add: "",
          Name: "xyz登山步道",
          Tel: "",
          Website: "",
          Toldescribe: "xyz為平溪區內一條熱門登山步道",
          Opentime: "",
          Picture1: "picture1.jpg",
          Picture2: "",
          Picture3: "",
          Changetime: "2025-10-19",
          Travellinginfo: "",
          Ticketinfo: ""
        }
      ],
    },
  },
};

export const MOCK_FORMAT_DATA: FormatTouristSpots[] = [
  {
    Id: 1,
    Add: "新北市平溪區石底里靜安路二段",
    Name: "慈母峰登山步道",
    Tel: "02-2495-1510",
    TicketInfo: "免費參觀",
    TravellingInfo: "搭乘台灣好行795至平溪站，步行至平溪瀑布旁登山口；自駕可沿106縣道至台電公司前右轉。",
    Website: "https://newtaipei.travel/zh-cn/attractions/detail/110680",
    Description: "慈母峰為平溪三名山之一，海拔410公尺，步道由石底橋登山口起，沿途設有岩石階梯與鐵欄杆，適合登山新手挑戰。登頂後可遠眺平溪山景，並可連走普陀山與孝子山。",
    Pictures: [
      "picture1.jpg",
      "picture2.jpg",
      "picture3.jpg"
    ],
    OpenTime: "全年開放",
    ChangeTime: "2025-10-19"
  },
    {
    Id: 2,
    Add: "新北市平溪區",
    Name: "xyz登山步道",
    Tel: "無",
    TicketInfo: "無",
    TravellingInfo: "",
    Website: "",
    Description: "xyz為平溪區內一條熱門登山步道",
    Pictures: [
      "picture1.jpg"
    ],
    OpenTime: "無",
    ChangeTime: "2025-10-19"
  }
];