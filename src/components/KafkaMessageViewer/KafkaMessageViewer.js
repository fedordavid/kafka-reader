import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import KafkaMessages from '../KafkaMessages/KafkaMessages';
import FilterPanel from '../../containers/FilterPanel/FilterPanel';
import classes from './KafkaMessageViewer.module.css';

function KafkaMessageViewer(props) {

    // example of ULR with search query 
    // http://localhost:3030/api/message?filter={"topic":"dpcm-consents"}&order=ASC&page=1&perPage=10&sort=id

    // contains search: part of the ULR e.g. ?filter
    //console.log("useLocation", props.location)

    useEffect(()=> {
        //console.log("chalo")
    })

    // OR we receive JSON object FROM Handler = we dont have to pass, it is enought to assembly the PATH and the router
    // end up here, will fill the props.filter and we will pass it down to KafkaMessages as the pathe will be set in route
    // e.g. messages?filter

    //extract from route
    const query = new URLSearchParams(props.location.search);
    const filter = {}

    for (let param of query.entries()){
        filter[param[0]] = param[1]

        
     

    // we assembly the JSON object that will be stringified and passes as parameter to filterPanel + KafkaMessages = FROM URL
    // const f = {
    //     filter: {
    //         topic: "dpcm-consents",
    //         //dateRange: "Create Date",
    //         create_time_gte: "2017-01-26T00:00:00.000Z",
    //         create_time_lte: "2020-10-26T23:59:59.000Z",
    //         json: "060000V825"
    //     }
    // }
    }



    return (
        <div className={classes.KafkaMessageViewer}>
            {/* object filter for filterPanel is important to set the values of the filter on the UI components */}
            <FilterPanel
                filter={filter} />
            {/* object filter for KafkaMessages is important to assemby the route e.g. ?filter={topic etc..} */}
            {/* alternativelly we can just pass the path directly so we will not delegate the responsibility down */}
            <KafkaMessages
                filter={filter} />
        </div>
    )
}

export default KafkaMessageViewer;