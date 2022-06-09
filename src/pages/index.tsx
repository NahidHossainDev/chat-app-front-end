import type { NextPage } from "next";
import { HomePageUnit, MainLayout } from "../components/templates";

const Home: NextPage = () => {
    return (
        <MainLayout>
            <HomePageUnit />
        </MainLayout>
    );
};

export default Home;
