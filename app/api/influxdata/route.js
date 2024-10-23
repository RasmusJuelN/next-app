import { InfluxDB } from '@influxdata/influxdb-client';
import { NextResponse } from 'next/server';

const token = "3FqVspu7wNkjz-Q4R41OO1vIZUzhNKzI9OrfgY0VlwEp-J5llmr3nOLUW4po2kguFW-RuEEn9sjuya08NHAsGQ==";
const org = 'TecEnergy';
const bucket = 'Energy_Collection';
const url = 'http://localhost:8086';

const influxDB = new InfluxDB({ url: 'http://localhost:8086', token: token });

export async function GET() {
  const fluxQuery = `
    from(bucket: "${bucket}")
      |> range(start: -1m)
      |> filter(fn: (r) => r["_measurement"] == "mem")
      |> filter(fn: (r) => r["_field"] == "used_percent")
      |> filter(fn: (r) => r["host"] == "host1")

      |> yield(name: "last")
  `;

  try {
    const queryApi = influxDB.getQueryApi(org);
    const data = [];

    await new Promise((resolve, reject) => {
        queryApi.queryRows(fluxQuery, {
          next(row, tableMeta) {
            const o = tableMeta.toObject(row);
            data.push(o);
          },
          error(error) {
            console.error('Query failed', error);
            reject(error); // Reject the promise on error
          },
          complete() {
            // console.log('Query completed:', data);

            resolve(); // Resolve the promise when complete
          },
        });
      });

    // console.log('Data length before response:', data.length);
    // Check if data is fetched correctly
    if (data.length === 0) {
      console.log('No data returned from InfluxDB.');
    }
    
    return NextResponse.json(data, { status: 200 });
    
  } catch (error) {
    console.error('Error fetching data from InfluxDB:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}