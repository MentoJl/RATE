import React from "react"
import { Carousel, Image } from "antd"

const Adds = () => {
    return (
        <Carousel 
        autoplay={{ dotDuration: true }}
        style={{ width: "100%" }}
        arrows
        >
            <div>
                <Image preview={false} src='/Carousel/Logo.jpeg' height={400} width='100%'></Image>
            </div>
            <div>
                <Image preview={false} src='/Carousel/Logo2.jpeg' height={400} width='100%'></Image>
            </div>
            <div>
                <Image preview={false} src='/Carousel/Logo.jpeg' height={400} width='100%'></Image>
            </div>
            <div>
                <Image preview={false} src='/Carousel/Logo2.jpeg' height={400} width='100%'></Image>
            </div>
        </Carousel>
    );
}

export default Adds