import axios from 'axios'
import { IsNullOrEmpty, ReplaceValue } from "../js/common.js"

export const getHotelInfo = async (req, res) => {
  try {
    await axios.get(process.env.HOTELINFO_URL)
      .then(async response => {
        let responseData = response.data.XML_Head.Infos.Info
        if (req.params.hasOwnProperty("town")) {
          responseData = responseData.filter(item =>
            item.Region == req.params.region &&
            item.Town == req.params.town
          )
        }

        responseData.forEach(item => {
          item = ReplaceValue(item)
          if (!IsNullOrEmpty(item.Serviceinfo)) item.Serviceinfo = item.Serviceinfo.split(',').filter(el => el)
          if (!IsNullOrEmpty(item.Description) && item.Description.length == 1) item.Description = ''
        });

        const data = responseData
                  .sort(sortCondition)
                  .map((item, index) => 
                  {
                    return {
                      Id: index + 1,
                      Add: item.Add,
                      Name: item.Name,
                      Tel: item.Tel,
                      Website: item.Website,
                      Serviceinfo: item.Serviceinfo,
                      Description: item.Description,
                      Pictures: item.Pictures
                    }
                  })

        res.status(200).send({ success: true, message: '', result: data })
      })
      .catch(error => {
        res.status(500).send({ success: false, message: error.message })
      })
  } catch (error) {
    res.status(500).send({ success: false, message: 'server error' })
  }
}

const sortCondition = (x, y) => {
  if (IsNullOrEmpty(x.Picture1)) return 1;
  if (IsNullOrEmpty(y.Picture1)) return -1;
  if (IsNullOrEmpty(x.Website)) return 1;
  if (IsNullOrEmpty(y.Website)) return -1;
  return 0
}