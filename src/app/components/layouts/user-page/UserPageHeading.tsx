import Text from "../../atoms/Text";
import Title from "../../atoms/Title";
import { getCurrentUser } from "@/app/lib/getCurrentUser";

export const UserPageHeading = async () => {
    const mainClass = "user-page-heading"
    const user = await getCurrentUser();

    return (
        <section id="heading" className={mainClass}>
            <Text variant="primary" text={`Hi, ${user?.display_name ?? "player"}`} />
            <Title isH1={true} title="Welcome to the paddock" />
        </section>
    )
}