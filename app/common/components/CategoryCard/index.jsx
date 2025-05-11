import React from "react";
import { Card } from "antd";
import { useState } from "react";
import { Typography } from "@mui/material";

const Category = ({title, catalog, imgSrc}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Card
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        cursor: 'pointer',
        width: 300,
        height: 200,
        textAlign: 'center',
        color: 'black',
        position: 'relative',
        overflow: 'hidden',
        background: 'transparent',
        border: '1px solid #ddd',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `url(${imgSrc}) center/cover`,
          transform: hovered ? 'translateY(0)' : 'translateY(20%)',
          opacity: hovered ? 0.5 : 0,
          maskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 30%)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 30%)',
          transition: 'transform 0.9s ease, opacity 0.9s ease, mask-image 1s ease',
        }}
      />
      <Typography
        variant='h4'
        style={{
          cursor: 'pointer',
          position: 'relative',
          zIndex: 2,
          transform: hovered ? 'translateY(-100%)' : 'translateY(0%)',
          transition: 'transform 0.9s ease, opacity 0.9s ease, color 0.5s ease',
        }}
      >
      {title}
      </Typography>
      <Typography
        style={{
          cursor: 'pointer',
          position: 'absolute',
          zIndex: 2,
          opacity: hovered ? 1 : 0,
          left: '35%',
          top: '50%',
          transform: hovered ? 'translateY(0%)' : 'translateY(60%)',
          transition: 'transform 0.9s ease, opacity 0.9s ease, color 0.5s ease',
        }}
      >
        {catalog?.map((item, index) => (
          <React.Fragment key={index}>
            • {item} <br />
          </React.Fragment>
        ))}
      </Typography>
    </Card>
  );
}

export default Category;