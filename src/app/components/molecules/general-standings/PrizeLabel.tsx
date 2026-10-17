import { helperTexts } from "../../../content/helper-texts"
import { icons } from "../../../content/constants"

interface PrizeProps {
    mainClass: string;
}

const PrizeLabel = (props: PrizeProps) => {
    return (
        <div className={`${props.mainClass}__prize`}>
            <div className={`${props.mainClass}__prize__icon`}>
                <img src={icons.trophy} alt="Trophy icon" />
            </div>
            <div className={`${props.mainClass}__prize__text`}>
                <p>{helperTexts.winner}</p>
                <p>WINNER GETS VIP RACE DINNER 🍕</p>
            </div>
        </div>
    )
}

export default PrizeLabel