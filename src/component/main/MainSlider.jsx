import { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MainSlider = () => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        adaptiveHeight: true,
        autoplay: true,
        autoplaySpeed: 2500,
        pauseOnFocus: true

    }


    return (
        <div>
            <h2> 이 속에서 mui 활용 하는 방법 ? </h2>
            <Slider {...settings}>
                <div>
                    <img src='https://cdn.newspenguin.com/news/photo/202006/1920_5382_140.jpg'></img>
                    글씨가 어떻게 들어가는거지
                </div>
                <div>
                    <img src='https://cdn.newspenguin.com/news/photo/202006/1920_5382_140.jpg'></img>
                </div>
                <div>
                    <img src='https://cdn.newspenguin.com/news/photo/202006/1920_5382_140.jpg'></img>
                </div>
                <div>
                    <img src='https://cdn.newspenguin.com/news/photo/202006/1920_5382_140.jpg'></img>
                </div>
                <div>
                    <img src='https://cdn.newspenguin.com/news/photo/202006/1920_5382_140.jpg'></img>
                </div>
                <div>
                    <h3>6</h3>
                </div>
            </Slider>
        </div>
    );
}
export default MainSlider