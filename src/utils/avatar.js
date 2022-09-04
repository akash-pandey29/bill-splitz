import React from 'react';
const stringToColor = (string) => {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
};

export const stringAvatar = (name, size = 15) => {
    return {
        sx: {
            bgcolor: stringToColor(name),
            border: '2px solid white',
            marginRight: '5px',
            width: size * 2,
            height: size * 2,
            fontSize: size
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`
    };
};
