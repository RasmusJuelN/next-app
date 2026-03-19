# next-app

A [Next.js](https://nextjs.org/) web application that displays real-time data visualizations of power usage from Shelly devices connected to power board. Data is sent to an influxDB and displayed using charts in next.js webapplication.

## Features

- **Home page** – landing page with navigation links
- **Users page** (`/users`) – fetches and displays a list of users from the [JSONPlaceholder](https://jsonplaceholder.typicode.com/) API in a styled table
- **Data page** (`/data`) – real-time memory-usage dashboard powered by [InfluxDB](https://www.influxdata.com/), visualised with interactive gauge charts

## Tech Stack

| Category | Libraries / Tools |
|---|---|
| Framework | [Next.js 14](https://nextjs.org/) (App Router) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) + [DaisyUI](https://daisyui.com/) |
| Charts | [Recharts](https://recharts.org/), [react-gauge-chart](https://github.com/Martin36/react-gauge-chart), [Nivo](https://nivo.rocks/), [Chart.js](https://www.chartjs.org/) |
| Data source | [InfluxDB](https://www.influxdata.com/) via `@influxdata/influxdb-client` |


## Project Structure

```
app/
├── page.tsx          # Home page
├── layout.tsx        # Root layout
├── users/
│   └── page.tsx      # Users list page
├── data/
│   └── page.tsx      # Real-time data dashboard
├── api/
│   └── influxdata/   # API route for InfluxDB queries
└── components/       # Shared React components
```
