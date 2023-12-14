"use client"

import {Carousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {ContainerSlider} from "@/components/slider/slider.style";
import Image from "next/image"; 

const MyCarousel = () => {
    return (
        <ContainerSlider>
            <Carousel showStatus={false} emulateTouch={true}>
                <div style={{height: "20vw",position: 'relative'}}>
                        <div style={{fontSize: '3.5vw',color: 'white',position: 'absolute',zIndex: '2',bottom:'2.5vw',left: '50%',transform:'translate(-50%,0)'}}>Fao - кольца твоей мечты</div>
                        <div style={{width: '100%', height:'100%',position:'absolute',zIndex:'1',background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.65), rgba(255, 255, 255,0) 85%)'}}/>
                        <Image src='/images/slider/slider1.jpg' alt='SliderOne' fill={true} objectFit='cover'/>
                </div>
                <div style={{height: "20vw",position: 'relative'}}>
                        <div style={{fontSize: '3.5vw',color: 'white',position: 'absolute',zIndex: '2',bottom:'2.5vw',left: '50%',transform:'translate(-50%,0)'}}>Fao - кольца твоей мечты</div>
                        <div style={{width: '100%', height:'100%',position:'absolute',zIndex:'1',background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.351), rgba(255, 255, 255,0) 85%)'}}/>
                        <Image src='/images/slider/slider2.jpg' alt='SliderOne' fill={true} objectFit='cover'/>
                </div>
                <div style={{height: "20vw",position: 'relative'}}>
                        <div style={{fontSize: '3.5vw',color: 'white',position: 'absolute',zIndex: '2',bottom:'2.5vw',left: '50%',transform:'translate(-50%,0)'}}>Fao - кольца твоей мечты</div>
                        <div style={{width: '100%', height:'100%',position:'absolute',zIndex:'1',background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.525), rgba(255, 255, 255,0) 85%)'}}/>
                        <Image src='/images/slider/slider3.jpg' alt='SliderOne' fill={true} objectFit='cover' objectPosition='50% 55%'/>
                </div>
            </Carousel>
        </ContainerSlider>
    );
};

export default MyCarousel;
