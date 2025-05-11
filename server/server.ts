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

fs.readdirSync(apiPath).forEach((folder) => {
    const folderPath = path.join(apiPath, folder)
    if (fs.statSync(folderPath).isDirectory()) {
        import(folderPath).then((route) => {
            app.use(`/api/${folder}`, route.default)
        }).catch((error) => {
            console.error(`Error server import to folder ${folder}:`, error)
        })
    }
})

app.listen(PORT, () => {
    console.log(`🚀 PORT ${PORT} is running`)
})

