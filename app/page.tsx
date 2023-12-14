import {Metadata} from "next";
import MyCarousel from "@/components/slider/slider";
import MainPage from "@/components/mainPage/mainPage";
import Card from "@/components/productCard/Card";

export const metadata: Metadata = {
    title: "Demo site",
    description: "Demo",
};

export default function Home() {
    
    return (
        <main>
            <MainPage/>
            <MyCarousel/>
        </main>
    )
}
