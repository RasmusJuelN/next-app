'use client';
import React, { useState, useEffect } from "react";
import { InfluxDB } from "@influxdata/influxdb-client";
import { ResponsiveBar, ResponsiveLine } from "@nivo/line";

const token = "3FqVspu7wNkjz-Q4R41OO1vIZUzhNKzI9OrfgY0VlwEp-J5llmr3nOLUW4po2kguFW-RuEEn9sjuya08NHAsGQ==";
const org = 'TecEnergy';
const bucket = 'Energy_Collection';
const url = 'http://localhost:8086';

let query = `from(bucket: "${bucket}")
|> range(start: -1m)
|> filter(fn: (r) => r["_measurement"] == "mem")
|> filter(fn: (r) => r["_field"] == "used_percent")
|> filter(fn: (r) => r["host"] == "host1")
`;

export const InfluxChart = () => {
    const [data, setData] = useState([]);
  
    useEffect(() => {
      let res = [];
      const influxQuery = async () => {
        //create InfluxDB client
        const queryApi = await new InfluxDB({ url, token }).getQueryApi(org);
        //make query
        await queryApi.queryRows(query, {
          next(row, tableMeta) {
  
            const o = tableMeta.toObject(row);
           //push rows from query into an array object
            res.push(o);
          },
          complete() {
  
            let finalData = []
  
            //variable is used to track if the current ID already has a key
            var exists = false
  
            //nested for loops aren't ideal, this could be optimized but gets the job done
            for(let i = 0; i < res.length; i++) {
              for(let j =0; j < finalData.length; j++) {
                //check if the sensor ID is already in the array, if true we want to add the current data point to the array
                if(res[i]['sensor_id'] === finalData[j]['id']) {
                  exists = true
  
                  let point = {}
                  point["x"] = res[i]["_time"];
                  point["y"] = res[i]["_value"];
                  finalData[j]["data"].push(point)
                }
  
              }
               //if the ID does not exist, create the key and append first data point to array
                if(!exists) {
                  let d = {}
                d["id"] = res[i]["sensor_id"];
                d['data'] = []
                let point = {}
                point["x"] = res[i]["_time"];
                point["y"] = res[i]["_value"];
                d['data'].push(point)
                finalData.push(d)
                }
                //need to set this back to false
                exists = false
  
            }
  
            setData(finalData);
            console.log("final data- ", finalData);
          },
          error(error) {
            console.log("query failed- ", error);
          }
        });
  
      };
  
      influxQuery();
    }, []);

    return (
        <div style={{height: "300px", padding: "10px"}}>
        <ResponsiveLine data={data}/>
         </div>
        )
      };