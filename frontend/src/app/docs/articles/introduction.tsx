import { LanguagesEnum } from "../page";

function IntroductionFR() {
    return (
        <div>
            <h3>Je suis une introduction</h3>
        </div>
    );
}

function IntroductionEN() {
    return (
        <div>
            <h3>I am an introduction</h3>
        </div>
    );
}

export function Introduction(language: LanguagesEnum) {
    return language === LanguagesEnum.ENGLISH ? IntroductionEN() : IntroductionFR();
}
