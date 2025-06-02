import express, { Express } from 'express'
import cors from 'cors'
// import { createProxyMiddleware } from 'http-proxy-middleware'
import fs from 'fs'
import path from 'path'

const app: Express = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

const apiPath = path.resolve(__dirname, '../app/api')

async function loadRoutes() {
  const folders = fs.readdirSync(apiPath)
  for (const folder of folders) {
    const folderPath = path.join(apiPath, folder)
    if (fs.statSync(folderPath).isDirectory()) {
      try {
        const route = await import(folderPath)
        app.use(`/api/${folder}`, route.default)
      } catch (error) {
        console.error(`Error importing route from folder ${folder}:`, error)
      }
    }
  }
}

app.use('/uploads', express.static(path.resolve(__dirname, './uploads')))

loadRoutes().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on PORT ${PORT}`)
  })
})

