/*
 * LightningChart® example code: Demo shows how to draw multiple layered area series.
 * If you need any assistance, or notice error in this example code, please contact support@lightningchart.com.
 *
 * http://www.lightningchart.com | support@lightningchart.com | sales@lightningchart.com
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
    // theme: Themes.darkGold
})
xyChart.getDefaultAxisX().setTickStrategy(AxisTickStrategies.DateTime, (tickStrategy) => tickStrategy.setDateOrigin(dateOrigin))
xyChart.setTitle('Company growth in comparison to static baseline')
xyChart.setAutoCursorMode(AutoCursorModes.onHover)

// set y-axis title
const axisY = xyChart
    .getDefaultAxisY()
    .setTitle('Growth %')
    .setScrollStrategy(AxisScrollStrategies.progressive)
    .setInterval({ start: 0, end: 80, stopAxisAfter: false })

let areaBipolarData = [
    { x: 0, y: 12 },
    { x: 1, y: 71 },
    { x: 2, y: 24 },
    { x: 3, y: 39 },
    { x: 4, y: 24 },
    { x: 5, y: 10 },
    { x: 6, y: 58 },
    { x: 7, y: 10 },
    { x: 8, y: 74 },
    { x: 9, y: 23 },
    { x: 10, y: 19 },
    { x: 11, y: 25 },
    { x: 12, y: 51 },
    { x: 13, y: 20 },
    { x: 14, y: 40 },
    { x: 15, y: 50 },
    { x: 16, y: 26 },
    { x: 17, y: 72 },
    { x: 18, y: 39 },
    { x: 19, y: 49 },
    { x: 20, y: 22 },
    { x: 21, y: 21 },
    { x: 22, y: 36 },
    { x: 23, y: 73 },
    { x: 24, y: 67 },
    { x: 25, y: 53 },
    { x: 26, y: 8 },
    { x: 27, y: 7 },
    { x: 28, y: 71 },
    { x: 29, y: 29 },
    { x: 30, y: 56 },
    { x: 31, y: 18 },
    { x: 32, y: 15 },
    { x: 33, y: 9 },
    { x: 34, y: 29 },
    { x: 35, y: 64 },
    { x: 36, y: 44 },
    { x: 37, y: 62 },
    { x: 38, y: 70 },
    { x: 39, y: 19 },
    { x: 40, y: 55 },
    { x: 41, y: 15 },
    { x: 42, y: 48 },
    { x: 43, y: 23 },
    { x: 44, y: 51 },
    { x: 45, y: 51 },
    { x: 46, y: 64 },
    { x: 47, y: 15 },
    { x: 48, y: 31 },
    { x: 49, y: 40 },
    { x: 50, y: 11 },
    { x: 51, y: 30 },
]
const dataFrequency = 1000 * 60 * 60 * 24 * 7
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

areaBipolar.add(areaBipolarData.map((point) => ({ x: point.x * dataFrequency, y: point.y })))
