import React, { useState, useEffect } from 'react';
import classes from './KafkaMessageDetail.module.css'
import Spinner from '../../components/UI/Spinner/Spinner';
import { useParams } from "react-router";
import * as axios from 'axios';

function KafkaMessageDetail() {
    const [messageDetail, setMessageDetail] = useState([]);
    const [messageDetailLoading, setMessageDetailLoading] = useState(true);

    let { id } = useParams();

    useEffect(() => {
        axios.get('http://localhost:3030/api/message/' + id)
            .then(response => {
                setMessageDetail(response.data)
                messageDetailLoading(false);
            })
            .catch(() => {
                setMessageDetailLoading(false);
            })
    }, [id])

    let detail = <Spinner />
    let changes


    if (!messageDetailLoading) {

        function diff(label, before, after) {
            if (typeof before !== "object" && typeof after !== "object")
              return [
                {
                  label,
                  before: JSON.stringify(before),
                  after: JSON.stringify(after)
                }
              ];

            before = before || {};
            after = after || {};

            const keys = [...new Set([...Object.keys(before), ...Object.keys(after)])];
            return keys
              .map((key) => {
                const nestedLabel = label ? `${label} / ${key}` : key;
                return diff(nestedLabel, before[key], after[key]);
              })
              .flat();
          }

        function Item({ label, before, after }) {
            const background = before === after ? "" : classes.differences;

            return (
                <tr className={background}>
                    <td> {label} </td>
                    <td> {before} </td>
                    <td> {after} </td>
                </tr>
            );
        }

        const before = messageDetail[0].json.before
        const after = messageDetail[0].json.after

        changes = diff(undefined, before, after);

        let header = (
            <table>
            <thead>
                <tr>
                    <td colspan="7">Message detail</td>
                </tr>
                <tr>
                        <td>Id</td>
                        <td>Source</td>
                        <td>Operation</td>
                        <td>Time_stamp</td>
                        <td>Tenant_name</td>
                        <td>Create_time</td>
                        <td>Topic</td>
                </tr>
            </thead>
            <tbody>
                    <tr>
                        <td>{messageDetail[0].id}</td>
                        <td>{messageDetail[0].source}</td>
                        <td>{messageDetail[0].operation}</td>
                        <td>{messageDetail[0].time_stamp}</td>
                        <td>{messageDetail[0].tenant_name}</td>
                        <td>{messageDetail[0].create_time}</td>
                        <td>{messageDetail[0].topic}</td>
                    </tr>

            </tbody>
        </table>
        )

        detail = (
            <div className={classes.KafkaMessageDetail}>
                {header}
                <table>
                    <thead>
                        <tr>
                            <td>Property</td>
                            <td>Before</td>
                            <td>After</td>
                        </tr>
                    </thead>
                    <tbody>
                        {changes.map(({ label, before, after }) => (
                            <Item key={label} label={label} before={before} after={after} />
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
    return (
        <>
            {detail}
        </>
    )

}

export default KafkaMessageDetail;