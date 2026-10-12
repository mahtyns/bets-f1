interface LinkProps {
    linkName: string,
    linkUrl: string,
    external: boolean
}
const Link = (props: LinkProps) => {
    return (
        <a className="link" href={props.linkUrl}>{props.linkName}</a>
    )
}

export default Link