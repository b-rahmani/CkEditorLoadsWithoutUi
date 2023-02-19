import {
    CartesianGrid,
    Legend,
    Line,
    LineChart as Chart,
    ResponsiveContainer,
    Text,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts'

const LineChart = ({
    data,
    height,
    hover,
    legend,
    span,
    transformX,
    transformY,
    value,
    x,
    xAngle,
    y,
}) => {

    const tooltipProps = {}
    const xProps = {}
    const yProps = {}
    if (hover instanceof Function) {
        tooltipProps['content'] = ({ payload }) => {
            return <div
                className="p-2 bg-white border-slate-400 border rounded-md"
            >
                {
                    payload?.length > 0
                        ?
                        hover(payload[0].payload)
                        :
                        hover({})
                }
            </div>
        }
    }
    if (transformX instanceof Function) {
        xProps['tick'] = ({
            payload,
            x,
            y,
        }) => <Text
            x={x}
            y={y}
            dy={15}
            textAnchor='middle'
            angle={xAngle ?? 0}
        >
                {transformX(payload.value)}
            </Text>
    }

    return <ResponsiveContainer
        width="100%"
        height={height || 300}
    >
        <Chart
            data={data}
            margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 20,
            }}
        >
            {
                legend &&
                <Legend />
            }
            <Line
                type="monotone"
                dataKey={value}
                stroke="#8884d8"
            />
            <CartesianGrid
                stroke="#ccc"
                strokeDasharray="5 5"
            />
            {
                x &&
                <XAxis
                    dataKey={x}
                    interval={0}
                    {...xProps}
                />
            }
            {
                y &&
                <YAxis
                    dataKey={y}
                    {...yProps}
                />
            }
            {
                hover &&
                <Tooltip
                    {...tooltipProps}
                />
            }
        </Chart>
    </ResponsiveContainer>
}

export default LineChart
