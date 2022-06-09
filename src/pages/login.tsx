import { LoginUnit, MainLayout } from "@components/templates";
import { NextPage } from "next";
import React from "react";

const Login: NextPage = () => {
    return (
        <MainLayout>
            <LoginUnit />
        </MainLayout>
    );
};

export default Login;
