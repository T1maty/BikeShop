import React from 'react';
import parse from "html-react-parser";

const AboutUsPage = () => {
    return (
        <div>
            {parse("<p style=\"text-align:center;\"><span style=\"font-size: 30px;\">Про нас</span></p>\n" +
                "<p><span style=\"font-size: 24px;\">BikeLove - це команда велосипедистів що була створена в 2020р. задля того щоб надавати якісний сервіс у сфері велосипедів усім бажаючим.</span></p>\n" +
                "<p><span style=\"font-size: 24px;\">Ми займаємось:</span></p>\n" +
                "<ul>\n" +
                "<li><span style=\"font-size: 24px;\">Продажом велосипедів</span></li>\n" +
                "<li><span style=\"font-size: 24px;\">Аксесуарів</span></li>\n" +
                "<li><span style=\"font-size: 24px;\">Запчастин </span></li>\n" +
                "<li><span style=\"font-size: 24px;\">Хімії</span></li>\n" +
                "<li><span style=\"font-size: 24px;\">Прокатом</span></li>\n" +
                "<li><span style=\"font-size: 24px;\">Ремонтом</span></li>\n" +
                "<li><span style=\"font-size: 24px;\">Обслуговуванням</span></li>\n" +
                "</ul>\n" +
                "<p></p>\n" +
                "<p><span style=\"font-size: 24px;\">Персональний підхід до кожного клієнта дозволяє задовільнити всі можливі потреби, а досвід нашої команди не залишає місця можливим проблемам. Звертаючись до нас, ви гарантуєте високу якість та швидкість виконаної роботи.</span></p>\n")}
        </div>
    );
};

export default AboutUsPage;