interface TabProps {
    mainClass?: string,
    text: string,
    anchor: string
}

export const Tab = (props: TabProps) => {
    return (
        <a className={`tab ${props.mainClass}__tab`} href={`#${props.anchor}`}>
            {props.text}
        </a>
    )
}
