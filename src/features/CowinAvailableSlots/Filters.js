import {Alignment, Checkbox} from "@blueprintjs/core";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectFeeFilters, setFeeFilter} from "../Cowin/cowinSlice";

/*
* Free/Paid fee type filtering checkbox component.
* It dispatches the setFeeFilter action whenever checkbox state changes.
* See cowinSlice as to how the filtering works
* */
function FeeTypeFilters() {
    const dispatch = useDispatch();
    const feeFilter = useSelector(selectFeeFilters);

    // @param {String} feeTypeVal Free or Paid
    // Update feeFilter[feeTypeVal] state in store by NOT(current value)
    // See cowinSlice for "filter" object structure
    const feeTypeChange = (event, feeTypeVal) => {
        dispatch(setFeeFilter({feeType: feeTypeVal, typeSelected: !feeFilter[feeTypeVal]}));
    }

    return (
        <div className="fee-types">
            <Checkbox
                className="fee-type-checkbox"
                label={"Free"}
                checked={feeFilter["Free"]}
                onChange={(event) => feeTypeChange(event, "Free")}
                alignIndicator={Alignment.RIGHT}
            />
            <Checkbox
                className="fee-type-checkbox"
                label={"Paid"}
                checked={feeFilter["Paid"]}
                onChange={(event) => feeTypeChange(event, "Paid")}
                alignIndicator={Alignment.RIGHT}
            />
        </div>
    )
}

export { FeeTypeFilters };
