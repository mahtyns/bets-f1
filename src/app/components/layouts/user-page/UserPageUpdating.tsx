import Title from "../../atoms/Title";
import { EditAvatar } from "../../organisms/user-page/EditAvatar";
import { EditPassword } from "../../organisms/user-page/EditPasswordForm";

export const UserPageUpdating = () => {
    const mainClass = 'user-page-profile'
    return (
        <section id="edit-profile" className={mainClass}>
            <Title isH1={false} title="Update your profile" />
            <EditAvatar mainClass={mainClass} />
            <EditPassword mainClass={mainClass} />
        </section>
    )
}