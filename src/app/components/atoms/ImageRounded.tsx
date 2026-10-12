import Image from "next/image";

interface ImageRoundedProps {
    src: string;
    alt: string;
    width: number;
    height: number;
    mainClass: string
}


const ImageRounded = (props: ImageRoundedProps) => {
    return (
        <Image src={props.src} alt={props.alt} width={props.width} height={props.height}
            className={`${props.mainClass}__rounded-image`} />
    )
}

export default ImageRounded