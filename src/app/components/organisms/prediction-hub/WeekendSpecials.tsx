import type { DNFChoice, PredictionDriver, RedFlagChoice, SafetyCarChoice } from "@/app/types/predictions";
import { predictionHubContent } from "@/app/content/prediction-hub";
import Text from "../../atoms/Text";
import Title from "../../atoms/Title";
import DriverSelectOption from "../../molecules/prediction-hub/DriverSelectOption";
import SafetyCarOptions from "../../molecules/prediction-hub/SafetyCarOptions";
import WeekendSpecialCard from "../../molecules/prediction-hub/WeekendSpecialCard";
import DNFOptions from "../../molecules/prediction-hub/DNFOptions";
import RedFlagOptions from "../../molecules/prediction-hub/RedFlagOptions";

interface WeekendSpecialsProps {
    mainClass: string;
    drivers: PredictionDriver[];
    fastestLap: number | null;
    driverOfTheRace: number | null;
    safetyCar: SafetyCarChoice | null;
    dnf: DNFChoice | null;
    redFlag: RedFlagChoice | null
    onFastestLap: (driverNumber: number) => void;
    onDriverOfTheRace: (driverNumber: number) => void;
    onSafetyCar: (value: SafetyCarChoice) => void;
    onDNF: (value: DNFChoice) => void;
    onRedFlag: (value: RedFlagChoice) => void;
}

const selectedDriverName = (
    drivers: PredictionDriver[],
    selected: number | null
): string | null => drivers.find((driver) => driver.driverNumber === selected)?.name ?? null;

const WeekendSpecials = (props: WeekendSpecialsProps) => {
    const { specials } = predictionHubContent;
    const fastestLapName = selectedDriverName(props.drivers, props.fastestLap);
    const driverOfTheRaceName = selectedDriverName(props.drivers, props.driverOfTheRace);

    return (
        <article className={`${props.mainClass}__module`}>
            <header className={`${props.mainClass}__module-header`}>
                <div className={`${props.mainClass}__module-heading`}>
                    <Title isH1={false} title={specials.title} />
                    <Text
                        text={specials.subtitle}
                        variant="primary"
                        mainClass={`${props.mainClass}__module-subtitle`}
                    />
                </div>
            </header>
            <div className={`${props.mainClass}__specials`}>
                <WeekendSpecialCard
                    mainClass={props.mainClass}
                    title={specials.fastestLap.title}
                    description={specials.fastestLap.description}
                >
                    {fastestLapName && (
                        <p className={`${props.mainClass}__special-selected`}>
                            {specials.selected}: {fastestLapName}
                        </p>
                    )}
                    <div className={`${props.mainClass}__driver-options`}>
                        {props.drivers.map((driver) => (
                            <DriverSelectOption
                                key={driver.driverNumber}
                                mainClass={props.mainClass}
                                driver={driver}
                                selected={props.fastestLap === driver.driverNumber}
                                onSelect={props.onFastestLap}
                            />
                        ))}
                    </div>
                </WeekendSpecialCard>
                <WeekendSpecialCard
                    mainClass={props.mainClass}
                    title={specials.driverOfTheRace.title}
                    description={specials.driverOfTheRace.description}
                >
                    {driverOfTheRaceName && (
                        <p className={`${props.mainClass}__special-selected`}>
                            {specials.selected}: {driverOfTheRaceName}
                        </p>
                    )}
                    <div className={`${props.mainClass}__driver-options`}>
                        {props.drivers.map((driver) => (
                            <DriverSelectOption
                                key={driver.driverNumber}
                                mainClass={props.mainClass}
                                driver={driver}
                                selected={props.driverOfTheRace === driver.driverNumber}
                                onSelect={props.onDriverOfTheRace}
                            />
                        ))}
                    </div>
                </WeekendSpecialCard>
                <WeekendSpecialCard
                    mainClass={props.mainClass}
                    title={specials.safetyCar.title}
                    description={specials.safetyCar.description}
                >
                    <SafetyCarOptions
                        mainClass={props.mainClass}
                        value={props.safetyCar}
                        onSelect={props.onSafetyCar}
                    />
                </WeekendSpecialCard>
                <WeekendSpecialCard mainClass={props.mainClass} title={specials.dnf.title}
                    description={specials.dnf.description}>
                    <DNFOptions
                        mainClass={props.mainClass}
                        value={props.dnf}
                        onSelect={props.onDNF}
                    />
                </WeekendSpecialCard>
                <WeekendSpecialCard mainClass={props.mainClass} title={specials.redFlag.title}
                    description={specials.redFlag.description}>
                    <RedFlagOptions
                        mainClass={props.mainClass}
                        value={props.redFlag}
                        onSelect={props.onRedFlag}
                    />
                </WeekendSpecialCard>
            </div>
        </article>
    );
};

export default WeekendSpecials;
