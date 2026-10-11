import Title from "../../atoms/Title";
import { mainPageContent } from '../../../content/main'
import PrizeLabel from "../../molecules/general-standings/PrizeLabel";

interface GeneralStandingsTopbar {
    mainClass: string
}

const GeneralStandingsTopBar = (props: GeneralStandingsTopbar) => {
    return (
        <div className={`${props.mainClass}__topbar`}>
            <div className={`${props.mainClass}__topbar--left`}>
                <div className={`${props.mainClass}__info`}>Round 04 / 24 · Season 2027</div>
                <Title title={mainPageContent.mainStandings.title} isH1={true} />
            </div>
            <div className={`${props.mainClass}__topbar--right`}>
                <PrizeLabel mainClass={props.mainClass} />
            </div>
        </div>
    )
}

export default GeneralStandingsTopBar