import type { PredictionDriver, PredictionSlot } from "@/app/types/predictions";

export const PREDICTION_SLOT_COUNT = 10;

export const emptyPredictionSlots = (): PredictionSlot[] =>
    Array.from({ length: PREDICTION_SLOT_COUNT }, () => null);

export const remainingDrivers = (
    allDrivers: PredictionDriver[],
    slots: PredictionSlot[]
): PredictionDriver[] => {
    const taken = new Set(
        slots.flatMap((slot) => (slot ? [slot.driverNumber] : []))
    );

    return allDrivers.filter((driver) => !taken.has(driver.driverNumber));
};

export const pickedCount = (slots: PredictionSlot[]): number =>
    slots.filter(Boolean).length;
