import { predictionHubContent } from "@/app/content/prediction-hub";
import Text from "../atoms/Text";
import Title from "../atoms/Title";
import { PredictionHubTopbar } from "../molecules/prediction-hub-topbar/PredictionHubTopbar";

interface SecondaryPageHeadingProps {
    titleText: string,
    roundNumber: number,
    trackName: string,
    trackType: string,
    flag: string
}

export const SecondaryPageHeading = (props: SecondaryPageHeadingProps) => {
    const mainClass = "prediction-hub-heading"

    return (
        <section id="heading" className={mainClass}>
            <PredictionHubTopbar round={props.roundNumber} circuitName={props.trackName} circuitType={props.trackType} mainClass={mainClass} />
            <Title isH1={true} title={props.titleText} />
            <Text text={predictionHubContent.description} variant="primary" mainClass={mainClass} />
        </section>
    )
}
