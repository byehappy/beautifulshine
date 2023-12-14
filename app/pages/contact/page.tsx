import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact page",
};

export default function Contact() {
  return (
    <div style={{display:"flex",gap:'2vw',margin:'2vw 5vw',justifyContent:"space-around"}}>
        <div style={{display:"flex",gap:'1vw',flexDirection:"column"}}>
        <p style={{fontSize:'1.2vw',fontWeight:'500'}}>Физический адрес: Большая Московская улица, 19А</p>
        <p style={{fontSize:'1.2vw',fontWeight:'500'}}>Телефон: +7 (123) 456-7890</p>
        <p style={{fontSize:'1.2vw',fontWeight:'500'}}>Email: info@example.com</p>
      </div>
      <div style={{display:"flex",flexDirection:"column"}}>
      <span style={{fontSize:'1vw',fontWeight:'700'}}>Мы здесь!</span>
      <iframe
        src="https://yandex.ru/map-widget/v1/?um=constructor%3Ac9a79086d2861d3a7333d6e72a6e2af6788c7b059dd444883a3477406bc859f0&amp;source=constructor"
        width="500"
        height="400"
        frameBorder="0"
      ></iframe>
      </div>
    </div>
  );
}
