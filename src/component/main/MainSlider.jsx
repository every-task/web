import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MainFeaturedPost from "./MainFeaturedPost";

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

    const mainFeaturedPost = {
        title:
            'Title of a longer featured blog post',
        description:
            "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents." +
            "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
        image: 'https://cdn.pixabay.com/photo/2016/02/11/14/59/background-1193727_1280.png',
        imageText: 'image',
        // linkText: 'Continue reading…',
    };

    return (
        <div>
            <Slider {...settings}>
                <MainFeaturedPost post={mainFeaturedPost} />
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

                <MainFeaturedPost post={mainFeaturedPost} />
            </Slider>
        </div>
    );
}
export default MainSlider