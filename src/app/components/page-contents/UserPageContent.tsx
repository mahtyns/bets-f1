import AuthGate from "../layouts/AuthGate";
import Login from "../layouts/Login";
import { UserPageHeading } from "../layouts/user-page/UserPageHeading";
import { UserPageStats } from "../layouts/user-page/UserPageStats";
import { UserPageUpdating } from "../layouts/user-page/UserPageUpdating";

export const UserPageContent = () => {
    return (
        <>
            <AuthGate
                loggedIn={<>
                    <UserPageHeading />
                    <UserPageStats />
                    <UserPageUpdating />
                </>}
                loggedOut={<Login />}
            />
        </>
    )
}
