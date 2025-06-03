import React from "react"
import { Carousel, Image } from "antd"

const Adds = () => {
  return (
    <Carousel
      autoplay={{ dotDuration: true }}
      style={{ 
        width: "100%",
        // maxWidth: '1400px' 
      }}
      arrows
    >
      <div>
        <Image preview={false} src='/Carousel/123.png' height={400} width='100%'></Image>
      </div>
      <div>
        <Image preview={false} src='/Carousel/34.png' height={400} width='100%'></Image>
      </div>
      <div>
        <Image preview={false} src='/Carousel/1.png' height={400} width='100%'></Image>
      </div>
      <div>
        <Image preview={false} src='/Carousel/0.png' height={400} width='100%'></Image>
      </div>
    </Carousel>
  )
}

export default Adds