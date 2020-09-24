import {
    GetRailProps,
    GetHandleProps,
    GetTrackProps,
    SliderItem,
} from 'react-compound-slider';

// *******************************************************
// RAIL
// *******************************************************
const railOuterStyle = {
    position: 'absolute',
    width: '100%',
    height: 42,
    // transform: 'translate(0%, -50%)',
    borderRadius: 7,
    cursor: 'pointer',
};

const railInnerStyle = {
    position: 'absolute',
    top: "50%",
    width: '100%',
    height: 14,
    transform: 'translate(0%, -50%)',
    borderRadius: 7,
    pointerEvents: 'none',
    backgroundColor: 'rgb(155,155,155)',
};


export const SliderRail = ({getRailProps}) => {
    return (
        <>
            <div style={railOuterStyle} {...getRailProps()} />
            <div style={railInnerStyle}/>
        </>
    );
};

// *******************************************************
// HANDLE COMPONENT
// *******************************************************


export const Handle = ({
                           domain: [min, max],
                           handle: {id, value, percent},
                           disabled = false,
                           getHandleProps,
                       }) => {
    return (
        <>
            <div
                style={{
                    left: `${percent}%`,
                    position: 'absolute',
                    transform: 'translate(-50%, -50%)',
                    top: "50%",

                    WebkitTapHighlightColor: 'rgba(0,0,0,0)',
                    zIndex: 5,
                    width: 28,
                    height: 42,
                    cursor: 'pointer',
                    backgroundColor: 'none',
                }}
                {...getHandleProps(id)}
            />
            <div
                role="slider"
                aria-valuemin={min}
                aria-valuemax={max}
                aria-valuenow={value}
                style={{
                    left: `${percent}%`,
                    position: 'absolute',
                    transform: 'translate(-50%, -50%)',
                    top: "50%",

                    zIndex: 2,
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.3)',
                    backgroundColor: disabled ? '#666' : '#9BBFD4',
                }}
            />
        </>
    );
};

// *******************************************************
// KEYBOARD HANDLE COMPONENT
// Uses a button to allow keyboard events
// *******************************************************
export const KeyboardHandle = ({
                                   domain: [min, max],
                                   handle: {id, value, percent},
                                   disabled = false,
                                   getHandleProps,
                               }) => {
    return (
        <button
            role="slider"
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={value}
            style={{
                left: `${percent}%`,
                position: 'absolute',
                transform: 'translate(-50%, -50%)',
                zIndex: 2,
                width: 24,
                height: 24,
                borderRadius: '50%',
                boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.3)',
                backgroundColor: disabled ? '#666' : '#9BBFD4',
            }}
            {...getHandleProps(id)}
        />
    );
};

// *******************************************************
// TRACK COMPONENT
// *******************************************************


export const Track = ({
                          source,
                          target,
                          getTrackProps,
                          disabled = false,
                      }) => {
    return (
        <div
            style={{
                position: 'absolute',
                transform: 'translate(0%, -50%)',
                top: "50%",
                height: 14,
                zIndex: 1,
                backgroundColor: disabled ? '#999' : '#607E9E',
                borderRadius: 7,
                cursor: 'pointer',
                left: `${source.percent}%`,
                width: `${target.percent - source.percent}%`,
            }}
            {...getTrackProps()}
        />
    );
};

// *******************************************************
// TICK COMPONENT
// *******************************************************


export const Tick = ({tick, count, format = d => d}) => {
    return (
        <div>
            <div
                style={{
                    position: 'absolute',
                    marginTop: 14,
                    width: 1,
                    height: 5,
                    backgroundColor: 'rgb(200,200,200)',
                    left: `${tick.percent}%`,
                }}
            />
            <div
                style={{
                    position: 'absolute',
                    marginTop: 22,
                    fontSize: 10,
                    textAlign: 'center',
                    marginLeft: `${-(100 / count) / 2}%`,
                    width: `${100 / count}%`,
                    left: `${tick.percent}%`,
                }}
            >
                {format(tick.value)}
            </div>
        </div>
    );
};
