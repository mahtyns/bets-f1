interface AvatarOption {
    id: number;
    src: string;
    alt: string;
}

interface AvatarListProps {
    mainClass: string;
    avatars: AvatarOption[];
    selectedId: number | null;
    onSelect: (id: number) => void;
}

const AvatarList = (props: AvatarListProps) => {
    return (
        <ul className={`${props.mainClass}__avatar-list`}>
            {props.avatars.map((avatar) => (
                <li key={avatar.id}>
                    <button
                        type="button"
                        className={`${props.mainClass}__avatar ${avatar.id === props.selectedId ? `${props.mainClass}__avatar--selected` : ""}`}
                        onClick={() => props.onSelect(avatar.id)}
                        aria-pressed={avatar.id === props.selectedId}
                    >
                        <img src={avatar.src} alt={avatar.alt} width={96} height={96} />
                    </button>
                </li>
            ))}
        </ul>
    )
}

export default AvatarList