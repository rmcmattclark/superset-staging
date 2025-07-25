const controlPanel = {
  controlPanelSections: [],
};

export default controlPanel;

// /**
//  * Licensed to the Apache Software Foundation (ASF) under one
//  * or more contributor license agreements.  See the NOTICE file
//  * distributed with this work for additional information
//  * regarding copyright ownership.  The ASF licenses this file
//  * to you under the Apache License, Version 2.0 (the
//  * "License"); you may not use this file except in compliance
//  * with the License.  You may obtain a copy of the License at
//  *
//  *   http://www.apache.org/licenses/LICENSE-2.0
//  *
//  * Unless required by applicable law or agreed to in writing,
//  * software distributed under the License is distributed on an
//  * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
//  * KIND, either express or implied.  See the License for the
//  * specific language governing permissions and limitations
//  * under the License.
//  */
// import { ensureIsInt, t, validateNonEmpty } from '@superset-ui/core';
// import {
//   ControlPanelConfig,
//   ControlPanelsContainerProps,
//   ControlSubSectionHeader,
//   D3_FORMAT_DOCS,
//   D3_NUMBER_FORMAT_DESCRIPTION_VALUES_TEXT,
//   D3_FORMAT_OPTIONS,
//   D3_TIME_FORMAT_OPTIONS,
//   getStandardizedControls,
//   sharedControls,
// } from '@superset-ui/chart-controls';
// import { DEFAULT_FORM_DATA } from './types';
// import { legendSection } from './controls';

// const {
//   donut,
//   innerRadius,
//   labelsOutside,
//   labelType,
//   labelLine,
//   outerRadius,
//   numberFormat,
//   showLabels,
//   roseType,
// } = DEFAULT_FORM_DATA;

// const config: ControlPanelConfig = {
//   controlPanelSections: [
//     {
//       label: t('Query'),
//       expanded: true,
//       controlSetRows: [
//         [
//           // =================================================================
//           // THIS IS THE CONTROL WE HAVE CHANGED
//           // =================================================================
//           {
//             name: 'groupby', // We keep the name 'groupby' for now to simplify later steps.
//             config: {
//               ...sharedControls.groupby,
//               // 1. We change the label to be more descriptive.
//               label: t('Hierarchy Path'),
//               // 2. We enable multi-select to allow choosing multiple columns.
//               multi: true,
//               // 3. We ensure at least one column is selected.
//               validators: [validateNonEmpty],
//               // 4. We update the description to guide the user.
//               description: t(
//                 'Select the columns that define the drilldown hierarchy, in order from broadest to most specific.',
//               ),
//             },
//           },
//           // =================================================================
//         ],
//         ['metric'],
//         ['adhoc_filters'],
//         ['row_limit'],
//         [
//           {
//             name: 'sort_by_metric',
//             config: {
//               ...sharedControls.sort_by_metric,
//               default: true,
//             },
//           },
//         ],
//       ],
//     },
//     {
//       label: t('Chart Options'),
//       expanded: true,
//       controlSetRows: [
//         ['color_scheme'],
//         [
//           {
//             name: 'show_labels_threshold',
//             config: {
//               type: 'TextControl',
//               label: t('Percentage threshold'),
//               renderTrigger: true,
//               isFloat: true,
//               default: 5,
//               description: t(
//                 'Minimum threshold in percentage points for showing labels.',
//               ),
//             },
//           },
//         ],

//         // In src/controlPanel.tsx, inside the 'Chart Options' controlSetRows array
//         [
//           {
//             name: 'label_type',
//             config: {
//               type: 'SelectControl',
//               label: t('Label Type'),
//               default: 'key',
//               renderTrigger: true,
//               choices: [
//                 ['key', t('Category Name')],
//                 ['value', t('Value')],
//                 ['percent', t('Percentage')],
//                 ['key_value', t('Category and Value')],
//                 ['template', t('Template')],
//               ],
//               description: t('What should be shown on the label?'),
//             },
//           },
//         ],
//         [
//           {
//             name: 'label_template',
//             config: {
//               type: 'TextControl',
//               label: t('Label Template'),
//               renderTrigger: true,
//               description: t(
//                 'Format for the label. Use variables: {name}, {value}, {percent}.',
//               ),
//               // This line makes the control appear only when 'Template' is selected
//               visibility: ({ controls }: ControlPanelsContainerProps) =>
//                 controls?.label_type?.value === 'template',
//             },
//           },
//         ],

//         [
//           {
//             name: 'threshold_for_other',
//             config: {
//               type: 'NumberControl',
//               label: t('Threshold for Other'),
//               min: 0,
//               step: 0.5,
//               max: 100,
//               default: 0,
//               renderTrigger: true,
//               description: t(
//                 'Values less than this percentage will be grouped into the Other category.',
//               ),
//             },
//           },
//         ],
//         [
//           {
//             name: 'roseType',
//             config: {
//               type: 'SelectControl',
//               label: t('Rose Type'),
//               default: roseType,
//               renderTrigger: true,
//               choices: [
//                 ['area', t('Area')],
//                 ['radius', t('Radius')],
//                 [null, t('None')],
//               ],
//               description: t('Whether to show as Nightingale chart.'),
//             },
//           },
//         ],
//         ...legendSection,
//         // eslint-disable-next-line react/jsx-key
//         [<ControlSubSectionHeader>{t('Labels')}</ControlSubSectionHeader>],
//         [
//           {
//             name: 'label_type',
//             config: {
//               type: 'SelectControl',
//               label: t('Label Type'),
//               default: labelType,
//               renderTrigger: true,
//               choices: [
//                 ['key', t('Category Name')],
//                 ['value', t('Value')],
//                 ['percent', t('Percentage')],
//                 ['key_value', t('Category and Value')],
//                 ['key_percent', t('Category and Percentage')],
//                 ['key_value_percent', t('Category, Value and Percentage')],
//                 ['value_percent', t('Value and Percentage')],
//                 ['template', t('Template')],
//               ],
//               description: t('What should be shown on the label?'),
//             },
//           },
//         ],
//         [
//           {
//             name: 'label_template',
//             config: {
//               type: 'TextControl',
//               label: t('Label Template'),
//               renderTrigger: true,
//               description: t(
//                 'Format data labels. ' +
//                   'Use variables: {name}, {value}, {percent}. ' +
//                   '\\n represents a new line. ' +
//                   'ECharts compatibility:\n' +
//                   '{a} (series), {b} (name), {c} (value), {d} (percentage)',
//               ),
//               visibility: ({ controls }: ControlPanelsContainerProps) =>
//                 controls?.label_type?.value === 'template',
//             },
//           },
//         ],
//         [
//           {
//             name: 'number_format',
//             config: {
//               type: 'SelectControl',
//               freeForm: true,
//               label: t('Number format'),
//               renderTrigger: true,
//               default: numberFormat,
//               choices: D3_FORMAT_OPTIONS,
//               description: `${D3_FORMAT_DOCS} ${D3_NUMBER_FORMAT_DESCRIPTION_VALUES_TEXT}`,
//               tokenSeparators: ['\n', '\t', ';'],
//             },
//           },
//         ],
//         ['currency_format'],
//         [
//           {
//             name: 'date_format',
//             config: {
//               type: 'SelectControl',
//               freeForm: true,
//               label: t('Date format'),
//               renderTrigger: true,
//               choices: D3_TIME_FORMAT_OPTIONS,
//               default: 'smart_date',
//               description: D3_FORMAT_DOCS,
//             },
//           },
//         ],
//         [
//           {
//             name: 'show_labels',
//             config: {
//               type: 'CheckboxControl',
//               label: t('Show Labels'),
//               renderTrigger: true,
//               default: showLabels,
//               description: t('Whether to display the labels.'),
//             },
//           },
//         ],
//         [
//           {
//             name: 'labels_outside',
//             config: {
//               type: 'CheckboxControl',
//               label: t('Put labels outside'),
//               default: labelsOutside,
//               renderTrigger: true,
//               description: t('Put the labels outside of the pie?'),
//               visibility: ({ controls }: ControlPanelsContainerProps) =>
//                 Boolean(controls?.show_labels?.value),
//             },
//           },
//         ],
//         [
//           {
//             name: 'label_line',
//             config: {
//               type: 'CheckboxControl',
//               label: t('Label Line'),
//               default: labelLine,
//               renderTrigger: true,
//               description: t(
//                 'Draw line from Pie to label when labels outside?',
//               ),
//               visibility: ({ controls }: ControlPanelsContainerProps) =>
//                 Boolean(controls?.show_labels?.value),
//             },
//           },
//         ],
//         [
//           {
//             name: 'show_total',
//             config: {
//               type: 'CheckboxControl',
//               label: t('Show Total'),
//               default: false,
//               renderTrigger: true,
//               description: t('Whether to display the aggregate count'),
//             },
//           },
//         ],
//         // eslint-disable-next-line react/jsx-key
//         [<ControlSubSectionHeader>{t('Pie shape')}</ControlSubSectionHeader>],
//         [
//           {
//             name: 'outerRadius',
//             config: {
//               type: 'SliderControl',
//               label: t('Outer Radius'),
//               renderTrigger: true,
//               min: 10,
//               max: 100,
//               step: 1,
//               default: outerRadius,
//               description: t('Outer edge of Pie chart'),
//             },
//           },
//         ],
//         [
//           {
//             name: 'donut',
//             config: {
//               type: 'CheckboxControl',
//               label: t('Donut'),
//               default: donut,
//               renderTrigger: true,
//               description: t('Do you want a donut or a pie?'),
//             },
//           },
//         ],
//         [
//           {
//             name: 'innerRadius',
//             config: {
//               type: 'SliderControl',
//               label: t('Inner Radius'),
//               renderTrigger: true,
//               min: 0,
//               max: 100,
//               step: 1,
//               default: innerRadius,
//               description: t('Inner radius of donut hole'),
//               visibility: ({ controls }: ControlPanelsContainerProps) =>
//                 Boolean(controls?.donut?.value),
//             },
//           },
//         ],
//       ],
//     },
//   ],
//   controlOverrides: {
//     series: {
//       validators: [validateNonEmpty],
//       clearable: false,
//     },
//     row_limit: {
//       default: 100,
//     },
//   },
//   formDataOverrides: formData => ({
//     ...formData,
//     metric: getStandardizedControls().shiftMetric(),
//     groupby: getStandardizedControls().popAllColumns(),
//     row_limit:
//       ensureIsInt(formData.row_limit, 100) >= 100 ? 100 : formData.row_limit,
//   }),
// };

// export default config;
