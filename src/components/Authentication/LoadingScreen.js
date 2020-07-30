import React from 'react';
import { Spinner } from '../UI';
import Background from '../Hoc/Background';

const LoadingScreen = () => {
    return (
        <Background>
            <Spinner /> 
        </Background>
    );
}

export default LoadingScreen;