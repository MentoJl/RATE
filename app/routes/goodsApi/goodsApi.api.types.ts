import { ObjectId } from 'mongodb'

export interface ICreateGoodsApiRequest {
  _id: ObjectId,
  image: string,
  title: string,
  userId: ObjectId,
  tags: string[],
  category: string,
  price: number,
  priceType: string
}

export interface IGetGoodsApiRequest {
  searchValue?: string,
}

export interface IGoodsApiResponse {
  success: boolean,
  message?: string
}