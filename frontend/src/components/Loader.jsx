import React from 'react';
import '../styles/loader.css';
import { useLoader } from './LoaderContext';

function Loader() {
    const { isLoading } = useLoader();

    if (!isLoading) return null;

    return (
        <div className="bgc-loader">
            <div className="loader"></div>
        </div>
    );
}

export default Loader;