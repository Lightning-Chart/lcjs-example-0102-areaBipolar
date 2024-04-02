/*
 * LightningChart® example code: Demo shows how to draw multiple layered area series.
 * If you need any assistance, or notice error in this example code, please contact sales@lightningchart.com.
 *
 * http://www.lightningchart.com | sales@lightningchart.com
 * © LightningChart Ltd 2009-2019. All rights reserved.
 */
// Import LightningChartJS
const lcjs = require('@arction/lcjs')

// Extract required parts from LightningChartJS.
const { lightningChart, AreaSeriesTypes, AxisScrollStrategies, AxisTickStrategies, AutoCursorModes, Themes } = lcjs

// Decide on an origin for DateTime axis.
const dateOrigin = new Date(2017, 0, 1)

// Create a XY Chart.
const xyChart = lightningChart().ChartXY({
    theme: Themes[new URLSearchParams(window.location.search).get('theme') || 'darkGold'] || undefined,
})
// Use DateTime TickStrategy and set the interval
xyChart
    .getDefaultAxisX()
    .setTickStrategy(AxisTickStrategies.DateTime)
    .setInterval({
        start: new Date(2017, 0, 1).getTime(),
        end: new Date(2017, 11, 26).getTime(),
    })

xyChart.setTitle('Company growth in comparison to static baseline')
xyChart.setAutoCursorMode(AutoCursorModes.onHover)

// set y-axis title
const axisY = xyChart
    .getDefaultAxisY()
    .setTitle('Growth %')
    .setScrollStrategy(AxisScrollStrategies.progressive)
    .setDefaultInterval((state) => ({ end: state.dataMax, start: (state.dataMax ?? 0) - 80, stopAxisAfter: false }))

let areaBipolarData = [
    { x: new Date(2017, 0, 2).getTime(), y: 12 },
    { x: new Date(2017, 0, 9).getTime(), y: 71 },
    { x: new Date(2017, 0, 16).getTime(), y: 24 },
    { x: new Date(2017, 0, 23).getTime(), y: 39 },
    { x: new Date(2017, 0, 30).getTime(), y: 24 },
    { x: new Date(2017, 1, 6).getTime(), y: 10 },
    { x: new Date(2017, 1, 13).getTime(), y: 58 },
    { x: new Date(2017, 1, 20).getTime(), y: 10 },
    { x: new Date(2017, 1, 27).getTime(), y: 74 },
    { x: new Date(2017, 2, 6).getTime(), y: 23 },
    { x: new Date(2017, 2, 13).getTime(), y: 19 },
    { x: new Date(2017, 2, 20).getTime(), y: 25 },
    { x: new Date(2017, 2, 27).getTime(), y: 51 },
    { x: new Date(2017, 3, 3).getTime(), y: 20 },
    { x: new Date(2017, 3, 10).getTime(), y: 40 },
    { x: new Date(2017, 3, 17).getTime(), y: 50 },
    { x: new Date(2017, 3, 24).getTime(), y: 26 },
    { x: new Date(2017, 4, 1).getTime(), y: 72 },
    { x: new Date(2017, 4, 8).getTime(), y: 39 },
    { x: new Date(2017, 4, 15).getTime(), y: 49 },
    { x: new Date(2017, 4, 22).getTime(), y: 22 },
    { x: new Date(2017, 4, 29).getTime(), y: 21 },
    { x: new Date(2017, 5, 5).getTime(), y: 36 },
    { x: new Date(2017, 5, 12).getTime(), y: 73 },
    { x: new Date(2017, 5, 19).getTime(), y: 67 },
    { x: new Date(2017, 5, 26).getTime(), y: 53 },
    { x: new Date(2017, 6, 3).getTime(), y: 8 },
    { x: new Date(2017, 6, 10).getTime(), y: 7 },
    { x: new Date(2017, 6, 17).getTime(), y: 71 },
    { x: new Date(2017, 6, 24).getTime(), y: 29 },
    { x: new Date(2017, 6, 31).getTime(), y: 56 },
    { x: new Date(2017, 7, 7).getTime(), y: 18 },
    { x: new Date(2017, 7, 14).getTime(), y: 15 },
    { x: new Date(2017, 7, 21).getTime(), y: 9 },
    { x: new Date(2017, 7, 28).getTime(), y: 29 },
    { x: new Date(2017, 8, 4).getTime(), y: 64 },
    { x: new Date(2017, 8, 11).getTime(), y: 44 },
    { x: new Date(2017, 8, 18).getTime(), y: 62 },
    { x: new Date(2017, 8, 25).getTime(), y: 70 },
    { x: new Date(2017, 9, 2).getTime(), y: 19 },
    { x: new Date(2017, 9, 9).getTime(), y: 55 },
    { x: new Date(2017, 9, 16).getTime(), y: 15 },
    { x: new Date(2017, 9, 23).getTime(), y: 48 },
    { x: new Date(2017, 9, 30).getTime(), y: 23 },
    { x: new Date(2017, 10, 6).getTime(), y: 51 },
    { x: new Date(2017, 10, 13).getTime(), y: 51 },
    { x: new Date(2017, 10, 20).getTime(), y: 64 },
    { x: new Date(2017, 10, 27).getTime(), y: 15 },
    { x: new Date(2017, 11, 4).getTime(), y: 31 },
    { x: new Date(2017, 11, 11).getTime(), y: 40 },
    { x: new Date(2017, 11, 18).getTime(), y: 11 },
    { x: new Date(2017, 11, 25).getTime(), y: 30 },
]

// Add dynamic bipolar Area Series.
const areaBipolar = xyChart
    .addAreaSeries({ baseline: 40, type: AreaSeriesTypes.Bipolar })
    .setCursorInterpolationEnabled(false)
    .setCursorResultTableFormatter((builder, series, position, high, low) =>
        builder
            .addRow(series.getName())
            .addRow('Date:', series.axisX.formatValue(position))
            .addRow('Growth:', series.axisY.formatValue(high), '%'),
    )

areaBipolar.add(areaBipolarData)
