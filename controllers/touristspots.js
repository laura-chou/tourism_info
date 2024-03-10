import axios from 'axios'
import { format } from "date-fns"
import { IsNullOrEmpty, ReplaceValue } from "../js/common.js"

export const getTouristSpots = async (req, res) => {
  try {
    await axios.get(process.env.TOURISTSPOTS_URL)
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
          if (IsNullOrEmpty(item.Ticketinfo)) item.Ticketinfo = '無'
          if (IsNullOrEmpty(item.Opentime)) item.Opentime = '無'
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
                      Opentime: item.Opentime,
                      Ticketinfo: item.Ticketinfo,
                      Travellinginfo: item.Travellinginfo,
                      Website: item.Website,
                      Toldescribe: item.Toldescribe,
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
  let val = 0
  const date1 = IsNullOrEmpty(x.Changetime) ? "0001-01-01" : format(x.Changetime, "yyyy-MM-dd")
  const date2 = IsNullOrEmpty(y.Changetime) ? "0001-01-01" : format(y.Changetime, "yyyy-MM-dd")
  if (date1 > date2) val = -1
  if (date1 < date2) val = 1
  if (IsNullOrEmpty(x.Picture1)) val = 1;
  if (IsNullOrEmpty(y.Picture1)) val = -1;
  if (IsNullOrEmpty(x.Travellinginfo)) val = 1;
  if (IsNullOrEmpty(y.Travellinginfo)) val = -1;
  if (IsNullOrEmpty(x.Website)) val = 1;
  if (IsNullOrEmpty(y.Website)) val = -1;
  return val
}