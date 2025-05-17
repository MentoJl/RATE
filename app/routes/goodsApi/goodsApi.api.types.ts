import { ObjectId } from 'mongodb'

export interface IGoodsApiRequest {
  _id: ObjectId,
  image: string,
  title: string,
  userId: ObjectId,
  tags: string[],
  category: string,
  price: number,
  priceType: string
}

export interface IGoodsApiResponse {
  success: boolean,
  message?: string
}