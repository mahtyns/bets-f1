import { helperTexts } from "../../../content/helperTexts"
import { icons } from "../../../content/constants"

interface PrizeProps {
    mainClass: string;
}

const PrizeLabel = (props: PrizeProps) => {
    return (
        <div className={`${props.mainClass}__prize`}>
            <div className={`${props.mainClass}__prize__icon`}>
                <img src={icons.trophy} />
            </div>
            <div className={`${props.mainClass}__prize__text`}>
                <p>{helperTexts.winner}</p>
                <p>WINNER GETS VIP RACE DINNER 🍕</p>
            </div>
        </div>
    )
}

export default PrizeLabel