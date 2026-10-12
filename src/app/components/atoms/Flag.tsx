interface FlagProps {
    src: string,
    alt: string,
    mainClass: string
}

const Flag = (props: FlagProps) => {
    return (
        <img className={`${props.mainClass}__flag flag`} src={props.src} alt={props.alt} />
    )
}

export default Flag