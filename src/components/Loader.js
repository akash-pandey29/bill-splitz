import React from 'react';
import loaderImage from '../assets/images/loaderImage.gif';

export const Loader = () => {
    return (
        <div
            style={{
                width: '100%',
                height: '100vh',
                position: 'fixed',
                zIndex: 999,
                background: `#21242d url(${loaderImage}) no-repeat center`
            }}
        >
            Loading...
        </div>
    );
};
