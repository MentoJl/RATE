import { ObjectId } from 'mongodb'

export interface ICreateGoodsApiRequest {
  _id: ObjectId,
  image: string,
  title: string,
  userId: ObjectId,
  tags: string[],
  category: string,
  price: number,
  currency: string
  discription: string,
}

export interface ICreateGoodsFormData {
  title: string
  userId: ObjectId
  tags: string[] 
  category: string
  price: number
  currency: string
  description: string
  images: File[]
}

export interface IUploadFile {
  uid: string
  name: string
  url?: string
  originFileObj?: File
}

export interface IGetProductBuyIdRequest {
  _id: ObjectId,
}

export interface IGetProductBuyIdResponse {
  success: boolean,
  message?: string,
  data?: ICreateGoodsApiRequest
}

export interface IGetGoodsApiRequest {
  search?: string,
  category: string,
  price: number,
  productType: string,
  name: string
}

export interface IGoodsApiResponse {
  success: boolean,
  message?: string
}