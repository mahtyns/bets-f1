interface ImageRoundedProps {
    src: string;
    alt: string;
    mainClass: string
}


const ImageRounded = (props: ImageRoundedProps) => {
    return (
        <img src={props.src} alt={props.alt} className={`${props.mainClass}__rounded-image`} />
    )
}

export default ImageRounded