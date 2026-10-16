import Image from "next/image";

export interface AvatarProps {
    src: string,
    alt: string,
    mainClass: string
}

const Avatar = (props: AvatarProps) => {
    return (
        <Image width={96} height={96} src={props.src} alt={props.alt} className={`avatar ${props.mainClass}__avatar`} />
    )
}

export default Avatar