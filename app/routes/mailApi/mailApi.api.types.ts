export interface ISendMailApiRequest {
  email: string,
  name: string,
  theme: string,
  desc: string,
  files?: File[]
}

export interface IMailApiResponse {
  success: boolean,
  message?: string
}