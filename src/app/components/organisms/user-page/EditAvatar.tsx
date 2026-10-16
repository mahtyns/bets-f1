import { avatarOptions } from '@/app/content/helperValues';
import { Subtitle } from '../../atoms/Subtitle';
import AvatarList from '../../molecules/user-page/AvatarList';

interface EditAvatarProps {
    mainClass: string;
    selectedId: number | null;
    onSelect: (id: number) => void;
}

export const EditAvatar = (props: EditAvatarProps) => {
    return (
        <div>
            <Subtitle isH3={true} title="Choose your avatar" />
            <AvatarList
                avatars={avatarOptions.filter((avatar) => avatar.id !== 1)}
                mainClass={props.mainClass}
                selectedId={props.selectedId}
                onSelect={props.onSelect}
            />
        </div>
    )
}