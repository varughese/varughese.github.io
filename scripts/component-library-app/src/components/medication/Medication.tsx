import React, { FC } from "react";
import "./Medication.css";

const DATA: { [key: string]: Object } = {
    abilify: {
        generic: "Aripiprazole",
        brand: "Abilify",
        mg: "10",
        link: "https://www.nami.org/About-Mental-Illness/Treatments/Mental-Health-Medications/Types-of-Medication/Aripiprazole-(Abilify)",
    },
};

type MedicationProps = { name: string };

// TODO: Make a tooltip component that shows these medications as
// pills that when you click/hover over them it shows

export const Medication: FC<MedicationProps> = ({ name }) => {
    if (name in DATA) {
        const a = DATA[name.toLowerCase()];
    }
    return <b>{name}</b>;
};
