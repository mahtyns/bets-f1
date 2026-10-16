interface SubtitleProps {
    isH3: boolean,
    title: string
}
export const Subtitle = (props: SubtitleProps) => {
    return (
        <>
            {
                props.isH3 ?
                    <h3 className={`title-h3`}>
                        {props.title}
                    </h3> :
                    <p className={`title-text`}>
                        {props.title}
                    </p>
            }
        </>
    )
}
