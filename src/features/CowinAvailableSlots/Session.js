import {Icon, Intent, Tag} from "@blueprintjs/core";
import React from "react";

/*
* Session uses the Blueprintjs {@link https://blueprintjs.com/docs/#core/components/tag Tag} component to render a
* session's details
*
* */

function SessionTags(props) {
    const { sessions } = props;

    return (
        <>
            {sessions && sessions.map((session, id) => (
                <Tag key={id} className="session" intent={Intent.PRIMARY} >
                    <Icon icon={"calendar"} />
                    <span className="session-info">{session.date}</span>
                    <span className="session-info">{session.vaccine}</span>
                    <span className="session-info">Dose 1: {session.available_capacity_dose1}</span>
                    <span className="session-info">Dose 2: {session.available_capacity_dose2}</span>
                </Tag>
            ))}
        </>
    )
}

function SessionTable(props) {
    const { sessions } = props;

    return (
        <table className="bp4-html-table bp4-html-table-bordered bp4-html-table-condensed bp4-interactive">
            <thead>
            <tr>
                <th>Date</th>
                <th>Vaccine</th>
                <th>Dose 1</th>
                <th>Dose 2</th>
                <th>Min. Age</th>
                <th>Max. Age</th>
            </tr>
            </thead>
            <tbody>
            {sessions && sessions.map((session, id) => (
                <tr key={id}>
                    <td>
                        {session.date}
                    </td>
                    <td>
                        {session.vaccine}
                    </td>
                    <td>
                        {session.available_capacity_dose1}
                    </td>
                    <td>
                        {session.available_capacity_dose2}
                    </td>
                    <td>
                        {session.min_age_limit || "-"}
                    </td>
                    <td>
                        {session.max_age_limit || "-"}
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}

export { SessionTable, SessionTags };