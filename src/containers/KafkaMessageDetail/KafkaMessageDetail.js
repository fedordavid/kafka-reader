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
        axios.get('http://localhost:3030/api/message/' + id, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
                "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
            },
            mode: 'no-cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'omit', // include, *same-origin, omit
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *client
        })
            .then(response => {
                setMessageDetail(response.data)
                messageDetailLoading(false);
            })
            .catch(() => {
                setMessageDetailLoading(false);
            })
    }, [id])

    function Item({ label, before, after }) {
        const background = before === after ? "none" : "lime";

        return (
            <tr>
                <td> {label} </td>
                <td> {before} </td>
                <td> {after} </td>
            </tr>
        );
    }

    let detail = <Spinner />
    let changes


    if (!messageDetailLoading) {

        const message = {
            id: "1",
            source: "david.fedor1@ibm.com",
            operation: "update",
            json: {
                before: {
                    id: 8546,
                    consent_version: 5,
                    consenter_id: "0000000017",
                    purpose_id: 104,
                    purpose_version: 1,
                    data_id: 309,
                    data_value: null,
                    data_obfuscation_method: null,
                    geography: null,
                    access_type_id: 1,
                    state: 1,
                    create_date: "2018-02-13T20:33:55.000Z",
                    modify_date: "2020-10-26T08:33:43.000Z",
                    start_date: "2020-10-25T00:00:00.000Z",
                    end_date: "2291-11-28T00:00:00.000Z",
                    consent_by: null,
                    written_authorization: false,
                    "attributes": [],
                    status: "updated",
                    user: "david.fedor1@ibm.com",
                    userId: 329,
                    "additional_info": [
                        // {
                        //     "obfuscation_methods": [
                        //         {
                        //             method: 1
                        //         },
                        //         {
                        //             method: 2
                        //         }
                        //     ]
                        // },
                        {
                            "name": "URX-00018",
                            "value": "URX-000018-0000000018"
                        },
                        {
                            "name": "URX-00017",
                            "value": "URX-000017-0000000017"
                        }
                    ],
                    validity_status: 8
                },
                after: {
                    id: 8546,
                    consent_version: 6,
                    consenter_id: "0000000017",
                    purpose_id: 104,
                    purpose_version: 1,
                    data_id: 309,
                    data_value: null,
                    data_obfuscation_method: null,
                    geography: null,
                    access_type_id: 1,
                    state: 2,
                    create_date: "2018-02-13T20:33:55.000Z",
                    modify_date: "2020-10-26T08:36:41.000Z",
                    start_date: "2020-10-24T00:00:00.000Z",
                    end_date: "2291-11-28T00:00:00.000Z",
                    consent_by: null,
                    written_authorization: false,
                    "attributes": [],
                    status: "updated",
                    user: "david.fedor1@ibm.com",
                    userId: 329,
                    "additional_info": [{ "name": "URX-s00018", "value": "URX-00s0018-0000000018" }, { "name": "URX-00017", "value": "URX-000017s-0000000017" }],
                    validity_status: 8
                }
            },
            time_stamp: "2020-10-26T08:36:41+00:00",
            tenant_name: "gcdo",
            create_time: "2020-10-27T09:53:18.818Z",
            topic: null
        }

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