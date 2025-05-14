import React, { useEffect, useState } from "react";

const PageSkeleton = () => {
    const [hide, setHide] = useState(false)

    useEffect(() => {
        setHide(true)
        document.body.style.overflow = ""
    }, [])

    return (
    <div
        style={{
            width: "100%",
            height: "120vh",
            top: -100,
            left: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            zIndex: 999,
            backgroundColor: "white",
            transform: hide ? "translateY(100%)" : "translateY(0)",
            transition: "transform 1s ease-in-out",
            maskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 5%)',
        }}
    >
        <img
        src="/Logo/HeaderLogo1-preview.png"
        style={{
            marginTop: '-70px',
            width: "300px",
            height: "300px",
            animation: "spin 2s linear infinite",
        }}
        />
        <style>
        {`
            @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
            }
        `}
        </style>
    </div>
    );
};

export default PageSkeleton;