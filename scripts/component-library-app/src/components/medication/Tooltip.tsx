import React from "react";
import { FC } from "react";

const TooltipContent: FC<{
    children: React.ReactNode;
    top: number;
    left: number;
    showTooltip: boolean;
}> = ({ children, top, left, showTooltip }) => {
    const BASE_STYLE = {
        position: "absolute" as any,
        transform: "translateX(-50%)",
        // padding: "9px",
        marginTop: "10px",
        border: "1px solid gray",
        backgroundColor: "gray",
        color: "white",
        borderRadius: "4px",
    };

    return (
        <>
            <span
                style={{
                    display: showTooltip ? "block" : "none",
                    top: top,
                    left: left,
                    ...BASE_STYLE,
                }}
            >
                {/* Arrow */}
                <span
                    style={{
                        width: 0,
                        height: 0,
                        borderBottom: "10px solid gray",
                        borderTop: "10px solid transparent",
                        borderRight: "10px solid transparent",
                        borderLeft: "10px solid transparent",
                        top: "-20px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        position: "absolute",
                    }}
                ></span>
                {children}
            </span>
        </>
    );
};

export const Tooltip: FC<{
    children: React.ReactNode;
    contents: React.ReactNode;
}> = ({ children: tooltipTarget, contents }) => {
    const [showTooltip, setShowTooltip] = React.useState(false);

    const targetRef = React.useRef<HTMLSpanElement>(null);

    const [toolTipProperties, setToolTipProperties] = React.useState({
        tooltipTop: 0,
        tooltipLeft: 0,
    });

    const handleShowToolTip = () => {
        if (targetRef.current) {
            const toolTipHalfWidth =
                targetRef.current.getBoundingClientRect().width / 2;
            const toolTipHeight =
                targetRef.current.getBoundingClientRect().height;

            setToolTipProperties({
                tooltipTop: toolTipHeight,
                tooltipLeft: toolTipHalfWidth,
            });

            setShowTooltip(true);
        }
    };

    return (
        <span>
            <span
                ref={targetRef}
                onMouseEnter={handleShowToolTip}
                onMouseLeave={() => setShowTooltip(false)}
                style={{
                    paddingBottom: showTooltip ? "6px" : "0px",
                    display: "inline",
                    position: "relative",
                }}
            >
                {/* Putting content inside this span allows it to stay open when hovering over content */}
                <TooltipContent
                    showTooltip={showTooltip}
                    top={toolTipProperties.tooltipTop}
                    left={toolTipProperties.tooltipLeft}
                >
                    {contents}
                </TooltipContent>
                {tooltipTarget}
            </span>
        </span>
    );
};
