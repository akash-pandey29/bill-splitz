import React from 'react';
import TextTransition, { presets } from 'react-text-transition';

const HeaderTextAnimation = ({ textList }) => {
    const [index, setIndex] = React.useState(0);

    const styles = {
        headText: {
            color: '#ffc107',
            display: 'flex',
            justifyContent: 'center'
        }
    };
    React.useEffect(() => {
        const intervalId = setInterval(
            () => setIndex((index) => index + 1),
            2500 // every 3 seconds
        );
        return () => clearTimeout(intervalId);
    }, []);

    return (
        <TextTransition springConfig={presets.wobbly} style={styles.headText}>
            {textList[index % textList.length]}
        </TextTransition>
    );
};
export default HeaderTextAnimation;
