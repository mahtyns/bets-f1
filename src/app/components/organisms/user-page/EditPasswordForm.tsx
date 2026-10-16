import { Subtitle } from '../../atoms/Subtitle';
import LoginField from '../../molecules/login/LoginField';

export type PasswordValues = {
    current: string;
    next: string;
    repeat: string;
};

interface EditPasswordProps {
    mainClass: string;
    values: PasswordValues;
    onChange: (field: keyof PasswordValues, value: string) => void;
}

export const EditPassword = (props: EditPasswordProps) => {
    return (
        <div>
            <Subtitle isH3={true} title="Update your password" />
            <LoginField
                mainClass={props.mainClass}
                id="password_current"
                label="Current password"
                type="password"
                value={props.values.current}
                onChange={(value) => props.onChange("current", value)}
                autoComplete="current-password" />
            <LoginField
                mainClass={props.mainClass}
                id="password_new"
                label="New password"
                type="password"
                value={props.values.next}
                onChange={(value) => props.onChange("next", value)}
                autoComplete="new-password" />
            <LoginField
                mainClass={props.mainClass}
                id="password_repeat"
                label="Repeat new password"
                type="password"
                value={props.values.repeat}
                onChange={(value) => props.onChange("repeat", value)}
                autoComplete="new-password" />
        </div>
    )
}