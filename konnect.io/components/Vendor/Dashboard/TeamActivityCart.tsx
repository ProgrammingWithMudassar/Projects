import React from 'react';
import { ResponsivePie } from '@nivo/pie';

type DataItem = {
  id: string;
  value: number;
  label: string;
  color: string;
};

type Props = {
  data: DataItem[];
  innerRadiusData?: number;
  cornerRadiusData?: number;
  arcLabelsRadiusOffsetData?: number;
};

const PieChartHandler = ({ data, innerRadiusData, cornerRadiusData, arcLabelsRadiusOffsetData }: Props) => {
  // Format data to display percentages
  const formattedData = data.map((item) => ({
    ...item,
    label: `${item.label}: ${item.value}%`,
  }));

  return (
    <ResponsivePie
      data={formattedData}
      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      innerRadius={innerRadiusData}
      padAngle={0.7}
      cornerRadius={cornerRadiusData}
      activeOuterRadiusOffset={4}
      colors={(datum) => datum.data.color}
      enableArcLinkLabels={false}
      arcLabelsRadiusOffset={arcLabelsRadiusOffsetData}
      arcLabelsTextColor="#000"
    />
  );
};

export default PieChartHandler;
