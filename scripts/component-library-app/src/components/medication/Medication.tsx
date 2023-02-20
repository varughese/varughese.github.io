import React, { FC } from "react";
import { Tooltip } from "./Tooltip";

type MedicationData = {
    generic: string;
    brand: string;
    mg: number;
    link: string;
};

const DATA: { [key: string]: MedicationData } = {
    abilify: {
        generic: "Aripiprazole",
        brand: "Abilify",
        mg: 10,
        link: "https://www.nami.org/About-Mental-Illness/Treatments/Mental-Health-Medications/Types-of-Medication/Aripiprazole-(Abilify)",
    },
    lithium: {
        generic: "Lithium",
        brand: "Lithobid",
        mg: 750,
        link: "https://www.nami.org/About-Mental-Illness/Treatments/Mental-Health-Medications/Types-of-Medication/Lithium",
    },
    zyprexa: {
        generic: "Olanzapine",
        brand: "Zyprexa",
        mg: 15,
        link: "https://www.nami.org/About-Mental-Illness/Treatments/Mental-Health-Medications/Types-of-Medication/Olanzapine-(Zyprexa)",
    },
};

const MedicationTooltipContents: FC<{ medicationData: MedicationData }> = ({
    medicationData,
}) => {
    return (
        <span
            style={{
                padding: "9px",
                display: "block",
                width: "200px",
                textAlign: "left",
            }}
        >
            <span style={{ display: "block" }}>
                <span>Generic Name: </span>
                <span>{medicationData.generic}</span>
            </span>
            <span style={{ display: "block" }}>
                <span>Brand Name: </span>
                <span>{medicationData.brand}</span>
            </span>
            <span style={{ display: "block" }}>
                <span>
                    <a style={{ color: "white" }} href={medicationData.link}>
                        Learn more
                    </a>
                </span>
            </span>
        </span>
    );
};

type MedicationProps = { name: string };

// TODO: Make a tooltip component that shows these medications as
// pills that when you click/hover over them it shows

export const Medication: FC<MedicationProps> = ({ name }) => {
    let medicationData = null;
    if (name.toLowerCase() in DATA) {
        medicationData = DATA[name.toLowerCase()];
    }

    const pill = (
        <span
            style={{
                background: "#ffd54f",
                padding: "0 10px",
                marginRight: "5px",
                borderRadius: "8px",
            }}
        >
            {name}
        </span>
    );

    if (!medicationData) {
        return pill;
    }

    return (
        <Tooltip
            contents={
                <MedicationTooltipContents medicationData={medicationData} />
            }
        >
            {pill}
        </Tooltip>
    );
};
