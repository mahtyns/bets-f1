"use client";

import { useState } from "react";
import type { PredictionDriver, SafetyCarChoice, DNFChoice, RedFlagChoice, PredictionSlot } from "@/app/types/predictions";
import { predictionHubContent } from "@/app/content/prediction-hub";
import { emptyPredictionSlots } from "@/app/utils/helpers/predictionSlots";
import QualifyingQ3Prediction from "../../organisms/prediction-hub/QualifyingQ3Prediction";
import RaceFinishersPrediction from "../../organisms/prediction-hub/RaceFinishersPrediction";
import WeekendSpecials from "../../organisms/prediction-hub/WeekendSpecials";
import PredictionSlip from "../../organisms/prediction-hub/PredictionSlip";
import { saveBetAction } from "@/app/actions/bets";
import type { UserBet } from "@/app/data/user-bet";


interface PredictionHubProps {
    drivers: PredictionDriver[];
    hasSprint: boolean;
    raceId: number | null;
    initialBet: UserBet | null;
}

const toNumbers = (slots: PredictionSlot[]): (number | null)[] =>
    slots.map((slot) => slot?.driverNumber ?? null);

const toSlots = (
    numbers: (number | null)[] | undefined,
    drivers: PredictionDriver[]
): PredictionSlot[] =>
    emptyPredictionSlots().map((_, index) => {
        const driverNumber = numbers?.[index];
        return drivers.find((driver) => driver.driverNumber === driverNumber) ?? null;
    });

const PredictionHub = (props: PredictionHubProps) => {
    const mainClass = predictionHubContent.mainClass;
    const [qualifying, setQualifying] = useState(() => toSlots(props.initialBet?.qualifying, props.drivers));
    const [race, setRace] = useState(() => toSlots(props.initialBet?.race, props.drivers));
    const [sprint, setSprint] = useState(() => toSlots(props.initialBet?.sprint, props.drivers));
    const [fastestLap, setFastestLap] = useState<number | null>(props.initialBet?.fastestLap ?? null);
    const [driverOfTheRace, setDriverOfTheRace] = useState<number | null>(props.initialBet?.driverOfTheRace ?? null);
    const [safetyCar, setSafetyCar] = useState<SafetyCarChoice | null>(props.initialBet?.safetyCar ?? null);
    const [dnf, setDNF] = useState<DNFChoice | null>(props.initialBet?.dnf ?? null);
    const [redFlag, setRedFlag] = useState<RedFlagChoice | null>(props.initialBet?.redFlag ?? null);
    const [isSaving, setIsSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState<string | null>(null);

    if (!props.drivers.length) {
        return (
            <section id="prediction-hub" className={mainClass}>
                <p>{predictionHubContent.empty}</p>
            </section>
        );
    }

    const handleConfirm = async () => {
        if (props.raceId === null) return;

        setIsSaving(true);
        setSaveMessage(null);

        try {
            const result = await saveBetAction({
                raceId: props.raceId,
                qualifying: toNumbers(qualifying),
                race: toNumbers(race),
                sprint: toNumbers(sprint),
                fastestLap,
                driverOfTheRace,
                safetyCar,
                dnf,
                redFlag
            });
            setSaveMessage(result.error ?? predictionHubContent.saved);
        } catch (error) {
            console.error(error);
            setSaveMessage("Could not reach the server, please try again");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <section id="prediction-hub" className={mainClass}>
            <div className={`${mainClass}__modules`}>
                <QualifyingQ3Prediction
                    mainClass={mainClass}
                    allDrivers={props.drivers}
                    slots={qualifying}
                    onSlotsChange={setQualifying}
                />
                <RaceFinishersPrediction
                    mainClass={mainClass}
                    variant="race"
                    allDrivers={props.drivers}
                    slots={race}
                    onSlotsChange={setRace}
                />
                {props.hasSprint && (
                    <RaceFinishersPrediction
                        mainClass={mainClass}
                        variant="sprint"
                        allDrivers={props.drivers}
                        slots={sprint}
                        onSlotsChange={setSprint}
                    />
                )}
                <WeekendSpecials
                    mainClass={mainClass}
                    drivers={props.drivers}
                    fastestLap={fastestLap}
                    driverOfTheRace={driverOfTheRace}
                    safetyCar={safetyCar}
                    dnf={dnf}
                    redFlag={redFlag}
                    onFastestLap={setFastestLap}
                    onDriverOfTheRace={setDriverOfTheRace}
                    onSafetyCar={setSafetyCar}
                    onDNF={setDNF}
                    onRedFlag={setRedFlag}
                />
            </div>
            <PredictionSlip
                mainClass={mainClass}
                drivers={props.drivers}
                qualifying={qualifying}
                race={race}
                sprint={sprint}
                fastestLap={fastestLap}
                driverOfTheRace={driverOfTheRace}
                safetyCar={safetyCar}
                dnf={dnf}
                redFlag={redFlag}
                hasSprint={props.hasSprint}
                onConfirm={handleConfirm}
                isSaving={isSaving}
                saveMessage={saveMessage}
            />
        </section>
    );
};

export default PredictionHub;
