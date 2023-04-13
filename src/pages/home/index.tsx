import {Navigate} from "react-router-dom";
import * as React from "react";
import {useHome} from "../../hooks/home/use_home";

export const Home = () => {
    const {
        token
    } = useHome();

    return (
        <>
            {!token && (
                <Navigate to="/login" replace />
            )}
            <p>Home</p>
        </>
    );
};
