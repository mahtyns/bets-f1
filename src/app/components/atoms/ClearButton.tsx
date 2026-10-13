import type { MouseEvent, PointerEvent } from "react";

interface ClearButtonProps {
    mainClass: string;
    label: string;
    onClick: () => void;
}

const ClearButton = (props: ClearButtonProps) => {
    const stopDrag = (event: PointerEvent<HTMLButtonElement> | MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
    };

    return (
        <button
            type="button"
            className={`${props.mainClass}__clear`}
            aria-label={props.label}
            onPointerDown={stopDrag}
            onMouseDown={stopDrag}
            onClick={(event) => {
                event.stopPropagation();
                props.onClick();
            }}
        >
            ×
        </button>
    );
};

export default ClearButton;
