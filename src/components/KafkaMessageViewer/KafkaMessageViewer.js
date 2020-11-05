import React from 'react';
import KafkaMessages from '../KafkaMessages/KafkaMessages';
import FilterPanel from '../../containers/FilterPanel/FilterPanel';
import classes from './KafkaMessageViewer.module.css';

function KafkaMessageViewer(props) {

    const query = new URLSearchParams(props.location.search);
    let filter = undefined

    for (let param of query.entries()){
        if (filter === undefined) {
            filter = {}
        }
        filter[param[0]] = param[1]
    }

    return (
        <div className={classes.KafkaMessageViewer}>
            <FilterPanel filter={filter} />
            <KafkaMessages filter={filter} />
        </div>
    )
}

export default KafkaMessageViewer;