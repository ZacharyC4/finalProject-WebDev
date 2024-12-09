"use client";
import React from 'react';
import TeamRoster from './teamRoster';

export default function Page() {

    // I had to make a few styles on this page to change the background image opacity
    // and to make the content div have a higher z-index so it would be on top of the background image.
    const containerStyle = {
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
    };

    const backgroundImageStyle = {
        backgroundImage: "url('./assets/picture.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        opacity: 0.3,
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
    };

    const contentStyle = {
        position: "relative", 
        zIndex: 1,
        padding: "20px",
    };

    return (
        // This just returns the TeamRoster component inside a div to render the page.
        <div style={containerStyle}>
            
            <div style={backgroundImageStyle}></div>

            <div style={contentStyle}>
                <TeamRoster />
            </div>

        </div>
    );
}
