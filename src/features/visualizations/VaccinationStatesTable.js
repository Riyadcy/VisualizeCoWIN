import React from "react";
import {useSelector} from "react-redux";
import {selectPublicReportsBeneficiaries} from "../Cowin/cowinSlice";
import { Cell, Column, Table2 } from "@blueprintjs/table";

export function VaccinationStatesTable() {
    const publicReportsFetchStatus = useSelector(state => state.cowin.status.publicReports)
    const beneficiaries = useSelector(selectPublicReportsBeneficiaries);

    const stateNameRenderer = (index) => {
        return <Cell>{beneficiaries[index].state_name}</Cell>
    }

    const todayRenderer = (index) => {
        return <Cell>{beneficiaries[index].today}</Cell>
    }

    const partialRenderer = (index) => {
        return <Cell>{beneficiaries[index].partial_vaccinated}</Cell>
    }

    const totallyRenderer = (index) => {
        return <Cell>{beneficiaries[index].totally_vaccinated}</Cell>
    }

    const totalRenderer = (index) => {
        return <Cell>{beneficiaries[index].total}</Cell>
    }

    if (publicReportsFetchStatus === "succeeded") {
        return (
            <>
                <h1>State-wise Vaccination</h1>
                <Table2 numRows={beneficiaries.length}>
                    <Column name="State" cellRenderer={stateNameRenderer} />
                    <Column name="Vaccinated Today" cellRenderer={todayRenderer} />
                    <Column name="Partially Vaccinated" cellRenderer={partialRenderer} />
                    <Column name="Fully Vaccinated" cellRenderer={totallyRenderer} />
                    <Column name="Total Vaccinated" cellRenderer={totalRenderer} />
                </Table2>
            </>
        )
    }
    else {
        return (
            <div>Loading...</div>
        )
    }
}