"use client"
import { ResponsiveLine } from '@nivo/line'

const customColors = ['#07689F', '#003451'];

const LinesChart = ({ data }: any) => (
  <ResponsiveLine
    data={data}
    margin={{ top: 0, right: 0, bottom: 26, left: 36 }}
    colors={customColors}
    xScale={{ type: 'point' }}
    yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
    yFormat=" >-.2f"
    curve="basis"
    axisTop={null}
    axisRight={null}
    axisBottom={{
      tickSize: 6,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'transportation',
      legendOffset: 60,
      legendPosition: 'middle'
    }}
    enableGridX={false}
    lineWidth={1}
    enablePoints={false}
    pointSize={9}
    pointColor={{ theme: 'background' }}
    pointBorderWidth={2}
    pointBorderColor={{ from: 'serieColor' }}
    pointLabelYOffset={-15}
    enableArea={true}
    areaOpacity={0.4}
    debugSlices={true}
    useMesh={true}
    legends={[
      {
        anchor: "bottom-left",
        direction: "column",
        justify: true,
        translateX: 20,
        translateY: -50,
        itemsSpacing: 0,
        itemWidth: 94,
        itemHeight: 18,
        itemDirection: "left-to-right",
        itemTextColor: "#444444",
        itemOpacity: 0.85,
        symbolSize: 18,
        effects: [
          {
            on: "hover",
            style: {
              itemTextColor: "#000000",
              itemOpacity: 1,
            },
          },
        ],
      },
    ]}
  />
);

export default LinesChart

