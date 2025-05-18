import { ObjectId } from 'mongodb'

export interface IUserApiRequest {
  _id?: ObjectId,
  name?: string,
  email?: string,
  password?: string,
  role?: string
}

export interface IDeleteUserApiRequest {
  _id: ObjectId
}

export interface IUserApiResponse {
  success: boolean,
  message?: string
}