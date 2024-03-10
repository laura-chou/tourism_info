export const IsNullOrEmpty = (item) => {
  return item === '' || item == null
}

export const ReplaceValue = (item) => {
  if (IsNullOrEmpty(item.Add)) item.Add = item.Region + item.Town
  if (IsNullOrEmpty(item.Tel)) item.Tel = '無'
  const pictureInfos = []
  if (!IsNullOrEmpty(item.Picture1)) pictureInfos.push(item.Picture1)
  if (!IsNullOrEmpty(item.Picture2)) pictureInfos.push(item.Picture2)
  if (!IsNullOrEmpty(item.Picture3)) pictureInfos.push(item.Picture3)
  item.Pictures = pictureInfos
  return item
}