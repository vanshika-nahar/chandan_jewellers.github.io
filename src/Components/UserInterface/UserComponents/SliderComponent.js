import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { serverURL } from "../../Services/NodeServices";
import { createRef } from "react";

export default function ShowSlider(props) {
    var mySlider = createRef();

    const setImageBanner = () => {
        return props.images.map((item) => {
            return (
                <div style={{ width: "90vw" }}>
                    <img src={`${serverURL}/images/${item}`} width="100%" />
                </div>
            );
        });
    };

    const handleBackBanner = () => {
        mySlider.current.slickNext();
    };
    const handleforwardBanner = () => {
        mySlider.current.slickPrev();
    };

    return (
        <div>
            <Slider {...props.bannersettings} ref={mySlider} style={{ margin: "0%" }}>
                {setImageBanner()}
            </Slider>
        </div>
    );
}
