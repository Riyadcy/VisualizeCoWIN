import {Intent, Tag} from "@blueprintjs/core";
import React from "react";
import Session from "./Session";

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

    return (
        <div key={center.center_id} className="center">
            <div className="center-info-container">
                <span className="center-info center-name">{center.name}</span>
                <Tag className="center-info fee-type" intent={feeType[center.fee_type]}>
                    {center.fee_type}
                </Tag>
            </div>
            <div className="center-info-container">
                <span className="center-info">{center.address}</span>
                <span className="center-info">{center.block_name}</span>
            </div>
            <div className="sessions">
                {center.sessions && center.sessions.map((session, id) => (
                    <Session key={id} session={session} />
                ))}
            </div>
        </div>
    )
}

export { CenterCard };