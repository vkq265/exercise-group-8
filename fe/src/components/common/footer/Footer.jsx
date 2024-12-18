import React from "react";
import { useNavigate } from "react-router-dom";
const Footer = () => {
    const navigate = useNavigate();

    const ContactCol = () => {
        return (
            <div className="contact-container flex-1 flex-col min-w-[300px] text-left text-wrap text-md">
                <div className="contact-title font-semibold text-lg">
                    Thông tin liên hệ
                </div>
                <div className="address flex items-center">
                    <i className="h-full w-auto lni lni-map"></i>
                    Số 1 Võ Văn Ngân, Phường Linh Chiểu, Quận Thủ Đức, TP.HCM
                </div>
                <div className="phone flex items-center">
                    <i className="h-full w-auto lni lni-phone"></i>
                    0123456789
                </div>
                <div className="email flex items-center">
                    <i className="h-full w-auto lni lni-envelope"></i>
                    <a href="mailto:vkq265@gmail.com">vkq265@gmail.com</a>
                </div>
                <div className="work-time flex items-center">
                    <i className="h-full w-auto lni fas fa-clock"></i>
                    T2-CN (8:00 - 17:00)
                </div>
            </div>
        );
    }

    const HelpOptionCol = () => {
        return (
            <div className="help-option-container flex-1 flex-col min-w-[200px] text-left text-wrap text-md pr-20">
                <div className="help-option-title font-semibold text-lg">
                    Hỗ trợ
                </div>
                <div className="no-underline text-inherit cursor-pointer hover:scale-110 transition-all duration-200">
                    <div onClick={() => navigate("/about-us")}>Giới thiệu</div>
                </div>
                <div className="no-underline text-inherit cursor-pointer hover:scale-110 transition-all duration-200">
                    <div onClick={() => navigate("return-policy")}>Chính sách đổi trả</div>
                </div>
                <div className="no-underline text-inherit cursor-pointer hover:scale-110 transition-all duration-200">
                    <div onClick={() => navigate("security-policy")}>Chính sách bảo mật</div>
                </div>
                <div className="no-underline text-inherit cursor-pointer hover:scale-110 transition-all duration-200">
                    <div onClick={() => navigate("term-and-service")}>Điều khoản dịch vụ</div>
                </div>
            </div>
        );
    }
    const LogoCol = () => {
        return (
            <div className="logo-container flex-1 flex-col min-w-[200px] text-left text-wrap text-md">
                <div className="logo-title font-semibold text-lg">
                    Logo
                </div>
                <div className="logo-content m-2 text-6xl select-none">
                    HAQ
                </div>
                <div className="social-link flex m-2 space-x-2 items-center">
                    <a href="https://www.facebook.com/quoc.vhp"><i className="lni lni-facebook-original"></i></a>
                    <a href="https://www.instagram.com/quoc.vhp"><i className="lni lni-instagram-original text-red-600"></i></a>
                    <a href="https://www.github.com/vkq28808"><i className="lni lni-github-original"></i></a>
                </div>
            </div>
        );
    }

    return (
        <div className="flex w-full !bg-[--primary-background-color] !text-[--secondary-text-color]">
            <div className="flex footer-container w-full justify-center">
                <div className="footer-content w-full">
                    <div className="flex flex-wrap justify-between space-x-10 space-y-4 p-4">
                        <ContactCol />
                        <HelpOptionCol />
                        <LogoCol />
                    </div>
                    <div className="w-full flex justify-center">
                        <p>© 2024 All rights reserved</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;