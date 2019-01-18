import React from 'react';
import ContentLoader from "react-content-loader"

export default function MyLoader(props) {
    return (
        <ContentLoader 
            height={400}
            width={300}
            speed={2}
            primaryColor="#f3f3f3"
            secondaryColor="#ecebeb"
            {...props}
        >
            <rect x="10" y="10" rx="3" ry="3" width="280" height="280" /> 
            <rect x="0" y="300" rx="3" ry="3" width="70" height="10" /> 
            <rect x="80" y="300" rx="3" ry="3" width="100" height="10" /> 
            <rect x="190" y="300" rx="3" ry="3" width="10" height="10" /> 
            <rect x="15" y="320" rx="3" ry="3" width="130" height="10" /> 
            <rect x="155" y="320" rx="3" ry="3" width="130" height="10" /> 
            <rect x="15" y="340" rx="3" ry="3" width="90" height="10" /> 
            <rect x="115" y="340" rx="3" ry="3" width="60" height="10" /> 
            <rect x="185" y="340" rx="3" ry="3" width="60" height="10" /> 
            <rect x="0" y="360" rx="3" ry="3" width="30" height="10" />
        </ContentLoader>
    );
}