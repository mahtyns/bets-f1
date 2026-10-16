"use client";

import { useAuth } from "@/app/context/AuthContext";
import PlayerCell from "./PlayerCell";

interface PlayerCellUserProps {
    mainClass: string;
}

const PlayerCellLogged = (props: PlayerCellUserProps) => {
    const { user } = useAuth();

    if (!user) return null;

    return (
        <PlayerCell
            mainClass={props.mainClass}
            name={user.display_name}
            team={user.team}
            avatarId={user.avatar_id}
            isMe={true}
        />
    )
}

export default PlayerCellLogged