import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Circle, G, Rect, Text } from 'react-native-svg';
import { Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const Tooltip = ({ x, y, textX, textY, stroke, pointStroke, position }) => {
    let tipW = 40, //136
        tipH = 26,
        tipX = 5,
        tipY = -9,
        tipTxtX = 12,
        tipTxtY = 9;
    const posY = y;
    const posX = x;

    // if (posX > screenWidth - tipW) {
    //     tipX = -(tipX + tipW);
    //     tipTxtX = tipTxtX - tipW - 6;
    // }

    const boxPosX = posX;

    return (
        <G>
            <Circle
                cx={posX}
                cy={posY}
                r={4}
                stroke={pointStroke}
                strokeWidth={2}
                fill={'blue'}
            />
            <G x={boxPosX < 40 ? 40-23 : boxPosX-23} y={posY-23}>
                <Rect
                    x={tipX + 1}
                    y={tipY - 1}
                    width={tipW - 2}
                    height={tipH - 2}
                    fill={'#343D6C'}
                    rx={5}
                    ry={5}
                />
                <Rect
                    x={tipX}
                    y={tipY}
                    width={tipW}
                    height={tipH}
                    rx={2}
                    ry={2}
                    fill={'transparent'}
                    stroke={stroke}
                />
                <Text
                    x={tipTxtX + 13}
                    y={tipTxtY}
                    height={12}
                    dy={12 * -0.25}
                    fontSize="12"
                    textAnchor="middle"
                    fill="#fff">
                    {textY}
                </Text>
            </G>
        </G>
    );
};

Tooltip.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    height: PropTypes.number,
    stroke: PropTypes.string,
    pointStroke: PropTypes.string,
    textX: PropTypes.string,
    textY: PropTypes.string,
    position: PropTypes.string,
};

Tooltip.defaultProps = {
    position: 'right',
};

const tooltipDecorators = (state, data, valueFormatter) => () => {
    if (state === null) {
        return null;
    }

    const { index, value, x, y } = state;
    const textX = data.labels[index];
    const position = data.labels.length === index + 1 ? 'left' : 'right';

    return (
        <Tooltip
            textX={String(textX)}
            textY={valueFormatter(value)}
            x={x}
            y={y}
            //stroke={'#00ccff'}
            pointStroke={'#00ccff'}
            position={position}
        />
    );
};

const LineChartWithTooltips = ({ valueFormatter, ...props }) => {
    const [state, setState] = useState(null);
    return (
        <LineChart
            {...props}
            decorator={tooltipDecorators(state, props.data, valueFormatter)}
            onDataPointClick={setState}
        />
    );
};

LineChartWithTooltips.propTypes = {
    valueFormatter: PropTypes.func,
};

LineChartWithTooltips.defaultProps = {
    valueFormatter: value => String(value),
};

export default LineChartWithTooltips;