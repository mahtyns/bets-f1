"use client";

import { useState } from "react";
import type { PredictionDriver, SafetyCarChoice } from "@/app/types/predictions";
import { predictionHubContent } from "@/app/content/prediction-hub";
import { emptyPredictionSlots } from "@/app/utils/helpers/predictionSlots";
import QualifyingQ3Prediction from "../organisms/prediction-hub/QualifyingQ3Prediction";
import RaceFinishersPrediction from "../organisms/prediction-hub/RaceFinishersPrediction";
import WeekendSpecials from "../organisms/prediction-hub/WeekendSpecials";
import PredictionSlip from "../organisms/prediction-hub/PredictionSlip";

interface PredictionHubProps {
    drivers: PredictionDriver[];
    hasSprint: boolean;
}

const PredictionHub = (props: PredictionHubProps) => {
    const mainClass = predictionHubContent.mainClass;
    const [qualifying, setQualifying] = useState(emptyPredictionSlots);
    const [race, setRace] = useState(emptyPredictionSlots);
    const [sprint, setSprint] = useState(emptyPredictionSlots);
    const [fastestLap, setFastestLap] = useState<number | null>(null);
    const [driverOfTheRace, setDriverOfTheRace] = useState<number | null>(null);
    const [safetyCar, setSafetyCar] = useState<SafetyCarChoice | null>(null);

    if (!props.drivers.length) {
        return (
            <section id="prediction-hub" className={mainClass}>
                <p>{predictionHubContent.empty}</p>
            </section>
        );
    }

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
                    onFastestLap={setFastestLap}
                    onDriverOfTheRace={setDriverOfTheRace}
                    onSafetyCar={setSafetyCar}
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
                hasSprint={props.hasSprint}
            />
        </section>
    );
};

export default PredictionHub;
