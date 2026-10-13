"use client";

import { useState, type DragEvent, type KeyboardEvent } from "react";
import type { PredictionDriver, PredictionSlot } from "@/app/types/predictions";
import { remainingDrivers } from "@/app/utils/helpers/predictionSlots";
import { reorderList } from "@/app/utils/helpers/reorderList";
import DriverPredictionCard from "../../molecules/prediction-hub/DriverPredictionCard";

interface DraggableDriverListProps {
    mainClass: string;
    allDrivers: PredictionDriver[];
    slots: PredictionSlot[];
    layout: "grid" | "race";
    onSlotsChange: (slots: PredictionSlot[]) => void;
}

const DraggableDriverList = (props: DraggableDriverListProps) => {
    const { mainClass, allDrivers, slots, layout, onSlotsChange } = props;
    const [dragIndex, setDragIndex] = useState<number | null>(null);
    const [overIndex, setOverIndex] = useState<number | null>(null);
    const remaining = remainingDrivers(allDrivers, slots);

    const updateSlot = (index: number, driver: PredictionSlot) => {
        const next = [...slots];
        next[index] = driver;
        onSlotsChange(next);
    };

    const handleDragStart = (index: number) => (event: DragEvent<HTMLLIElement>) => {
        if (!slots[index]) return;
        setDragIndex(index);
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("text/plain", String(index));
    };

    const handleDragOver = (index: number) => (event: DragEvent<HTMLLIElement>) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
        if (overIndex !== index) setOverIndex(index);
    };

    const handleDrop = (index: number) => (event: DragEvent<HTMLLIElement>) => {
        event.preventDefault();
        if (dragIndex !== null) onSlotsChange(reorderList(slots, dragIndex, index));
        setDragIndex(null);
        setOverIndex(null);
    };

    const handleDragEnd = () => {
        setDragIndex(null);
        setOverIndex(null);
    };

    const handleKeyDown = (index: number) => (event: KeyboardEvent<HTMLLIElement>) => {
        if (event.key === "ArrowUp" && index > 0) {
            event.preventDefault();
            onSlotsChange(reorderList(slots, index, index - 1));
        }

        if (event.key === "ArrowDown" && index < slots.length - 1) {
            event.preventDefault();
            onSlotsChange(reorderList(slots, index, index + 1));
        }
    };

    return (
        <ol className={`${mainClass}__driver-list ${mainClass}__driver-list--${layout}`}>
            {slots.map((driver, index) => (
                <DriverPredictionCard
                    key={`slot-${index}`}
                    mainClass={mainClass}
                    driver={driver}
                    remaining={remaining}
                    position={index + 1}
                    isDragging={dragIndex === index}
                    isOver={overIndex === index && dragIndex !== index}
                    onSelect={(selected) => updateSlot(index, selected)}
                    onClear={() => updateSlot(index, null)}
                    onDragStart={handleDragStart(index)}
                    onDragOver={handleDragOver(index)}
                    onDrop={handleDrop(index)}
                    onDragEnd={handleDragEnd}
                    onKeyDown={handleKeyDown(index)}
                />
            ))}
        </ol>
    );
};

export default DraggableDriverList;
