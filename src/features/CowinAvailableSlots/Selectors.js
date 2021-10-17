import {Button, MenuItem} from "@blueprintjs/core";
import {Select} from "@blueprintjs/select";
import React from "react";

/*
* Simple filtering function, extracted here so that it doesn't have to repeated in both
* State and District Selectors
*
* */
const filterList = (query, title, _index, exactMatch) => {
    const normalizedTitle = title.toLowerCase();
    const normalizedQuery = query.toLowerCase();

    if (exactMatch) {
        return normalizedTitle === normalizedQuery;
    } else {
        return normalizedTitle.indexOf(normalizedQuery) >= 0;
    }
}

/*
* StateSelector uses the {@link https://blueprintjs.com/docs/#select Blueprintjs Select} component,
* provides a list of states to filter and choose from.
* TODO Consider merging both State and District selectors and managing
*  differences through props.
*
* */
const StateSelector = (props) => {
    const { setState, selectedState, states } = props;
    // const states = useSelector(selectAllStates);

    // // Fetch states for StateSelector when it mounts
    // useEffect(() => {
    //     if (statesFetchStatus === "idle") {
    //         dispatch(fetchStates());
    //     }
    // }, [statesFetchStatus, dispatch]);

    const renderInputValue = (state) => state.state_name;

    // Handle State selector value change
    const handleValueChange = (state, _event) => {
        setState(state);
    }

    // Render a Blueprintjs Menu Item for every state
    const renderItem = (state, { handleClick, _modifiers, _query}) => {
        return (
            <MenuItem key={state.state_id} text={state.state_name} onClick={handleClick}/>
        );
    }

    // Called by the {@link https://blueprintjs.com/docs/#select Blueprintjs Select} component whenever
    // the query has a new input keyword. Select will provide query,
    // the State item {state_name: string, state_id: string} the index and exactMatch.
    const filterStates = (query, state, index, exactMatch) => {
        return filterList(query, state.state_name, index, exactMatch)
    }

    return (
        <div className="selector slot-toolbar-item">
            <Select
                items={states}
                popoverProps={{popoverClassName: "selector-popover", minimal: true}}
                inputValueRenderer={renderInputValue}
                itemRenderer={renderItem}
                onItemSelect={handleValueChange}
                itemPredicate={filterStates}
                noResults={<MenuItem disabled={true} text="No results." />}
            >
                <Button text={selectedState.stateName} rightIcon="caret-down" />
            </Select>
        </div>
    )
}

/*
* DistrictSelector uses the {@link https://blueprintjs.com/docs/#select Blueprintjs Select} component,
* provides a list of districts to filter and choose from.
*
* */
const DistrictSelector = (props) => {
    const { setDistrict, selectedDistrict, districts } = props;
    // const districts = useSelector(selectAllDistricts);

    const renderDistrictInputValue = (district) => district.district_name;

    const renderDistrictItem = (district, { handleClick, _modifiers, _query }) => {
        return (
            <MenuItem key={district.district_id} text={district.district_name} onClick={handleClick}/>
        )
    }

    const districtSelected = (district, _event) => {
        setDistrict(district);
    }

    // Called by the Blueprintjs Select component whenever the query has a new input keyword.
    // Select will provide query, the State item {district_name: string, district_id: string},
    // the index and exactMatch.
    const filterDistricts = (query, district, index, exactMatch) => {
        return filterList(query, district.district_name, index, exactMatch);
    }

    return (
        <div className="selector slot-toolbar-item">
            <Select
                items={districts}
                popoverProps={{popoverClassName: "selector-popover", minimal: true}}
                inputValueRenderer={renderDistrictInputValue}
                itemRenderer={renderDistrictItem}
                onItemSelect={districtSelected}
                itemPredicate={filterDistricts}
                noResults={<MenuItem disabled={true} text="No results." />}
            >
                <Button text={selectedDistrict.districtName} rightIcon="caret-down" />
            </Select>
        </div>
    )
}

const StateSelector2 = React.memo(StateSelector);
const DistrictSelector2 = React.memo(DistrictSelector);

export { StateSelector, StateSelector2, DistrictSelector, DistrictSelector2};
