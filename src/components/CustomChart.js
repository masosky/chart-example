import "./styles.css";
import React, {useEffect, useState} from "react";

import Select, {components} from "react-select";
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";

const data = [
    {
        name: "Page A",
        uv: 4000,
        pv: 2400,
        amt: 2400
    },
    {
        name: "Page B",
        uv: 3000,
        pv: 1398,
        amt: 2210
    },
    {
        name: "Page C",
        uv: 2000,
        pv: 9800,
        amt: 2290
    },
    {
        name: "Page D",
        uv: 2780,
        pv: 3908,
        amt: 2000
    },
    {
        name: "Page E",
        uv: 1890,
        pv: 4800,
        amt: 2181
    },
    {
        name: "Page F",
        uv: 2390,
        pv: 3800,
        amt: 2500
    },
    {
        name: "Page G",
        uv: 3490,
        pv: 4300,
        amt: 2100
    }
];

const Option = (props) => {
    return (
        <div>
            <components.Option {...props}>
                <input
                    type="checkbox"
                    checked={props.isSelected}
                    onChange={() => null}
                />{" "}
                <label>{props.label}</label>
            </components.Option>
        </div>
    );
};

export const colourOptions = [
    {value: "uv", label: "Var1", color: "#54F42B"},
    {value: "pv", label: "Var2", color: "#2C7918"}
];

export default function CustomChart() {
    const [selectedVars, setSelectedVars] = useState([])
    const [lines, setLines] = useState(undefined)
    const handleChangeSelect = (obj) => {
        const result = []
        for (var [key, value] of Object.entries(obj)) {
            result.push(value)
        }
        setSelectedVars(result)
    }

    useEffect(() => {
        console.log("CustomChart")
        return () => console.log("CustomChart destroy!")
    }, [])

    useEffect(() => {
        console.log("Selected vars: ", selectedVars)
        const listLines = selectedVars.map((val) =>
            <Line
                type="monotone"
                dataKey={val.value}
                stroke={val.color}
                activeDot={{r: 8}}
            />)
        setLines(listLines)
    }, [selectedVars])

    useEffect(() => {
        console.log("lines", lines)
    }, [lines])
    return (
        <div id={"LineChart"}>
            <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                }}
            >
                <CartesianGrid strokeDasharray="2 2"/>
                <XAxis dataKey="name"/>
                <YAxis/>
                <Tooltip/>
                <Legend/>

                 {lines}
            </LineChart>
            <Select
                options={colourOptions}
                isMulti
                onChange={handleChangeSelect}
            />
        </div>
    );
}
