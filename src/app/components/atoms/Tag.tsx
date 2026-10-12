interface TagProps {
    text: string,
    mainClass: string
}

const Tag = (props: TagProps) => {
    return (
        <div className={`${props.mainClass}__tag tag`}>{props.text}</div>
    )
}

export default Tag