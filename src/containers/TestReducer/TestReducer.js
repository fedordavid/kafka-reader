import React, { useReducer } from 'react';
import classes from './TestReducer.module.css';
import DateTimeRangeSelector from '../../containers/FilterPanel/DateTimeRangeSelector/DateTimeRangeSelector';
import TopicDropDown from '../../components/UI/DropDown/DropDown';
import SearchBar from '../../components/UI/InputTextField/InputTextField';
import SearchButton from '../../components/UI/ButtonElement/ButtonElement';


const topicDropDownItems = [
    { id: 'option-0', text: 'dpcm-consents' },
    { id: 'option-1', text: 'dpcm-purpose' }
]

const dateRangeDropDownItems = [
    { id: 'option-0', text: 'Start Date' },
    { id: 'option-1', text: 'End Date' },
    { id: 'option-2', text: 'Modify Date' },
    { id: 'option-3', text: 'Create Date' }
]

function useDateTimeRange(initial) {
    const [state, dispatch] = useReducer(reduce, initial)
    function reduce(state, action) {
        switch (action?.type) {
            case "from":
                return { ...state, ...{ from: action.value } };
            case "to":
                return { ...state, ...{ to: action.value } };
            case "changeDateRangeDropDown":
                return { ...state, ...{ selectedItem: action.selectedItem } };
            default:
                return state;
        }
    }

    return {
        from: state?.from || "2020-10-26T00:00:00.000Z",
        to: state?.to || "2020-10-26T00:00:00.000Z",
        fromIsInvalid: true,
        toIsInvalid: false,
        changeFrom: (value) => dispatch({ type: "from", value }),
        changeTo: (value) => dispatch({ type: "to", value })
    }
}

function useDateRangeDropDown(initial) {
    const [state, dispatch] = useReducer(reduce, initial)
    function reduce(state, action) {
        switch (action?.type) {
            case "change":
                return { ...state, ...{ selectedItem: action.selectedItem } };
            default:
                return state;
        }
    }

    return {
        id: state?.id || "topic_drop_down_id_1",
        items: state?.items || dateRangeDropDownItems,
        label: state?.label || "Date Range",
        selectedItem: state?.selectedItem,
        titleText: state?.titleText || "Date Range",
        change: (value) => dispatch({ type: "change", selectedItem: value.selectedItem }),

    }
}

function useTopicDropDown(initial) {
    const [state, dispatch] = useReducer(reduce, initial)
    function reduce(state, action) {
        switch (action?.type) {
            case "change":
                return { ...state, ...{ selectedItem: action.selectedItem } };
            default:
                return state;
        }
    }

    return {
        id: state?.text || "search-text-via-reducer",
        items: state?.items || topicDropDownItems,
        label: state?.label || "Topic",
        titleText: state?.titleText || "Topic",
        selectedItem: state?.selectedItem,
        change: (value) => dispatch({ type: "change", selectedItem: value.selectedItem }),
    }
}

function useSearchBar(initial) {
    const [state, dispatch] = useReducer(reduce, initial)
    function reduce(state, action) {
        switch (action?.type) {
            case "change":
                return { ...state, ...{ text: action.text } };
            default:
                return state;
        }
    }

    return {
        text: state?.text || "search-text-via-reducer",
        placeholder: state?.placeholder || "Search",
        labelText: state?.labelText || "Search",
        change: (value) => dispatch({ type: "change", text: value.target.value }),
    }
}
function TestReducer() {

    const dateTimeRange = useDateTimeRange();
    const searchBar = useSearchBar();
    const topicDropDown = useTopicDropDown();
    const dateRangeDropDown = useDateRangeDropDown();

    return (
        <div className={classes.TestReducer}>
            <div style={{ border: "2px solid red", width: "450px", margin: "5px", padding: "10px" }}>
                <p>TopicDropDown Component</p>
                <TopicDropDown
                    dropDownValues={topicDropDown}/>
            </div>

            <div style={{ border: "2px solid blue", width: "450px", margin: "5px", padding: "10px" }}>
                <p>DateTimeRangeSelector Component</p>
                <div style={{ border: "2px solid green", width: "400px", margin: "5px", padding: "10px" }}>
                    <p>DateRangePicker Component</p>
                    <DateTimeRangeSelector dateTimeRange={dateTimeRange} dateRangeDropDown={dateRangeDropDown} />
                </div>
            </div>

            <div style={{ border: "2px solid orange", width: "450px", margin: "5px", padding: "10px" }}>
                <p>SearchBar Component</p>
                <SearchBar 
                    values={searchBar}
                />
            </div>

            <div style={{ border: "2px solid lime", width: "450px", margin: "5px", padding: "10px" }}>
                <p>Button Component</p>
                <SearchButton>Search</SearchButton>
            </div>
        </div>
    )

}

export default TestReducer;