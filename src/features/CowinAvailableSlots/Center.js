import { Intent, Tag } from "@blueprintjs/core";
import React from "react";
import { SessionTable, SessionTags } from "./Session";
import { useSelector } from "react-redux";

/*
* Defines the Blueprintjs Intent color to use with a particular fee type
*
* */
const feeType = {
    "Paid": Intent.WARNING,
    "Free": Intent.SUCCESS
}

/*
* CenterCard component renders a center and its Cowin using the Session component. Currently, every session
* is rendered a Tag, but it's not very good looking.
*
* */
function CenterCard(props) {
    const { center } = props;
    const viewType = useSelector((state => state.settings.calendarByDistrictView));
    // const viewTypeTable = viewType === "table";
    // const viewTypeTags = viewType === "tags"

    let content;
    if (viewType === "table") {
        content = <SessionTable sessions={center.sessions} />
    }
    else if (viewType === "tags") {
        content = <SessionTags sessions={center.sessions} />
    }

    return (
        <div key={center.center_id} className="center bp4-elevation-1">
            <div className="center-info-container">
                <span className="center-info center-name">{center.name}</span>
                <Tag className="center-info fee-type" intent={feeType[center.fee_type]}>
                    {center.fee_type}
                </Tag>
                {
                    center.fee_type==="Paid" &&
                        center.vaccine_fees.map((vaccine_fee, id) => (
                            <Tag key={id} className="center-info fee-type">
                                {vaccine_fee.vaccine}: {vaccine_fee.fee}
                            </Tag>
                        ))
                }
            </div>
            <div className="center-info-container">
                <span className="center-info">{center.address}</span>
                <span className="center-info">{center.block_name}</span>
            </div>
            <div className="sessions">
                {content}
            </div>
        </div>
    )
}

export { CenterCard };