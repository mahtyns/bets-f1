import Image from "next/image";
import Title from "../atoms/Title";
import { PredictionHeadingInfo } from "../molecules/prediction-heading-info/PredictionHeadingInfo";

interface SecondaryPageHeadingProps {
    titleText: string,
    roundNumber: number,
    trackName: string,
    trackType: string,
    flag: string
}

export const SecondaryPageHeading = (props: SecondaryPageHeadingProps) => {
    const mainClass = "heading"

    return (
        <section id="heading" className={mainClass}>
            <PredictionHeadingInfo round={props.roundNumber} circuitName={props.trackName} circuitType={props.trackType} />
            <Title isH1={true} title={props.titleText} />
        </section>
    )
}
