import axios from 'axios'
import { IsNullOrEmpty, ReplaceValue } from "../js/common.js"

export const getFoodInfo = async (req, res) => {
  try {
    await axios.get(process.env.FOODINFO_URL)
      .then(response => {
        let responseData = response.data.XML_Head.Infos.Info
        if (req.params.hasOwnProperty("town")) {
          responseData = responseData.filter(item =>
            item.Region == req.params.region &&
            item.Town == req.params.town
          )
        }

        responseData.forEach(item => {
          item = ReplaceValue(item)
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
                      Website: item.Website,
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
