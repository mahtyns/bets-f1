import { Subtitle } from "../../atoms/Subtitle";
import Title from "../../atoms/Title";

export const PredictionLockedStats = () => {
    return (
        <section id="prediction-hub-stats">
            <Title isH1={false} title="What they say in the paddock" />
            <Subtitle isH3={true} title="Predicted results from your friends" />
        </section>
    )
}
