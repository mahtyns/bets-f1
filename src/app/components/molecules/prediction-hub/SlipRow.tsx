interface SlipRowProps {
    mainClass: string;
    label: string;
    value: string;
    empty: boolean;
}

const SlipRow = (props: SlipRowProps) => {
    const emptyClass = props.empty ? ` ${props.mainClass}__slip-row--empty` : "";

    return (
        <li className={`${props.mainClass}__slip-row${emptyClass}`}>
            <span>{props.label}</span>
            <span>{props.value}</span>
        </li>
    );
};

export default SlipRow;
