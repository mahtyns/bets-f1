import Text from "../../atoms/Text";
import Title from "../../atoms/Title";

export const UserPageHeading = () => {
    const mainClass = "user-page-heading"

    return (
        <section id="heading" className={mainClass}>
            <Text variant="primary" text="Hi, username" />
            <Title isH1={true} title="Welcome to the paddock" />
        </section>
    )
}
