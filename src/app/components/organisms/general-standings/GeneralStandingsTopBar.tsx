import Title from "../../atoms/Title";
import { mainPageContent } from '../../../content/main'
import PrizeLabel from "../../molecules/general-standings/PrizeLabel";
import { Round } from "@/app/data/rounds";
import { CHAMPIONSHIP_YEAR } from "@/app/content/helper-values";

interface GeneralStandingsTopbar {
    mainClass: string,
    rounds: Round[]
}

const GeneralStandingsTopBar = (props: GeneralStandingsTopbar) => {
    const currentRound = props.rounds[0].round + 1;
    const lastRound = props.rounds[0].totalRounds;
    return (
        <div className={`${props.mainClass}__topbar`}>
            <div className={`${props.mainClass}__topbar--left`}>
                <div className={`${props.mainClass}__info`}>{`Round ${currentRound} / ${lastRound} · ${CHAMPIONSHIP_YEAR}`}</div>
                <Title title={mainPageContent.mainStandings.title} isH1={true} />
            </div>
            <div className={`${props.mainClass}__topbar--right`}>
                <PrizeLabel mainClass={props.mainClass} />
            </div>
        </div>
    )
}

export default GeneralStandingsTopBar