
import { Subtitle } from "../../atoms/Subtitle";
import Title from "../../atoms/Title";

export const PredictionLockedOpener = () => {

    return (
        <section id="prediction-hub-locked" className="prediction-hub--locked">
            <Title isH1={false} title="The race weekend is here!" />
            <Subtitle isH3={true} title="Enjoy the speed! Good luck with your bets." />
        </section>
    )
}
