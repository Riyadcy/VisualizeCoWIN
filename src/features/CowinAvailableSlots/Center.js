import { Intent, Tag} from "@blueprintjs/core";
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
                <table className="bp4-html-table bp4-html-table-bordered bp4-html-table-condensed bp4-interactive">
                    <thead>
                    <th>Date</th>
                    <th>Vaccine</th>
                    <th>Dose 1</th>
                    <th>Dose 2</th>
                    <th>Min. Age</th>
                    <th>Max. Age</th>
                    </thead>
                    <tbody>
                    {center.sessions && center.sessions.map((session, id) => (
                        <Session key={id} session={session} />
                    ))}
                    </tbody>
                </table>
                {/*{center.sessions && center.sessions.map((session, id) => (*/}
                {/*    <Session key={id} session={session} />*/}
                {/*))}*/}
            </div>
        </div>
    )
}

export { CenterCard };