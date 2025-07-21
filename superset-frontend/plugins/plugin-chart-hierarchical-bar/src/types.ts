/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership. The ASF licenses this file
 * under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import {
  AdhocMetric,
  ChartProps,
  DataRecord,
  QueryFormData,
} from '@superset-ui/core';

import type { RefObject } from 'react';
import type { ECharts } from 'echarts';

/** Legend orientation options for ECharts */
export enum LegendOrientation {
  Top = 'top',
  Bottom = 'bottom',
  Left = 'left',
  Right = 'right',
}

/** Label display types for bar charts */
export enum EchartsBarLabelType {
  None = 'none',
  Category = 'category',
  Value = 'value',
  CategoryValue = 'category_value',
}

/** Plugin control form data structure */
export interface DrilldownBarFormData extends QueryFormData {
  groupby: string[];
  metric?: AdhocMetric | string;
  colorScheme: string;
  labelRotation?: number;
  showLabels?: boolean;
  labelType?: EchartsBarLabelType;
  stackBars?: boolean;
  legendType?: string;
  legendOrientation?: string;
  numberFormat?: string;
}

/** A single data item to render in the chart */
export interface BarChartDataItem {
  name: string;
  value: number;
  itemStyle?: {
    color?: string;
    opacity?: number;
  };
  isOther?: boolean;
}

/** Metadata passed to handle drilldown */
export interface DrilldownData {
  sourceData: DataRecord[];
  hierarchy: string[];
  metric: string;
}

/** Chart props passed to the React component */
export interface EchartsBarChartProps extends ChartProps {
  formData: DrilldownBarFormData;
  echartOptions: any;
}

/** Final transformed props received by the chart component */
export type BarChartTransformedProps = ChartProps<DrilldownBarFormData> & {
  echartOptions: any;
  drilldownData: DrilldownData;
  refs?: RefObject<ECharts>;
};

/** Default form values for the bar chart */
export const DEFAULT_FORM_DATA: DrilldownBarFormData = {
  groupby: [],
  metric: undefined,
  colorScheme: 'supersetColors',
  datasource: '',
  viz_type: 'hierarchical_bar',
  showLegend: true,
  showLabels: true,
  labelType: EchartsBarLabelType.CategoryValue,
  labelRotation: 0,
  stackBars: false,
};
