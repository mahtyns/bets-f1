
import Button from '../../atoms/Button';
import Text from '../../atoms/Text';

interface ButtonLockedProps {
    mainClass: string
}

export const ButtonLocked = (props: ButtonLockedProps) => {
    return (
        <div className={`${props.mainClass}__bottom ${props.mainClass}__bottom--open`}>
            <Text variant="primary" text="Race weekend!" mainClass={props.mainClass} />
            <Button variant="secondary" text="Pools are locked" disabled={true} />
        </div>
    )
}
