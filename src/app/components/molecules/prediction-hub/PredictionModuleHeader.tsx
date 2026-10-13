import Title from "../../atoms/Title";
import Text from "../../atoms/Text";

interface PredictionModuleHeaderProps {
    mainClass: string;
    title: string;
    subtitle: string;
    hint: string;
}

const PredictionModuleHeader = (props: PredictionModuleHeaderProps) => {
    return (
        <header className={`${props.mainClass}__module-header`}>
            <div className={`${props.mainClass}__module-heading`}>
                <Title isH1={false} title={props.title} />
                <Text text={props.subtitle} variant="primary" mainClass={`${props.mainClass}__module-subtitle`} />
            </div>
            <Text text={props.hint} variant="muted" mainClass={`${props.mainClass}__module-hint`} />
        </header>
    );
};

export default PredictionModuleHeader;
