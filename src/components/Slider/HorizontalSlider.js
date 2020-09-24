import {Slider, Rail, Handles, Tracks} from 'react-compound-slider';
import {SliderRail, Handle, Track} from './HorizontalSliderCompontents';

const sliderStyle = {
    position: 'relative',
    width: '100%',
    height: "42px",
    touchAction: 'none',
};

const defaultDomain = [40, 240];

export function HorizontalSlider({useValue, domain = defaultDomain}) {
    const [value, setValue] = useValue;

    const handleUpdate = ([value]) => {
        setValue(value)
    }

    const handleChange = ([value]) => {
        setValue(value)
    }

    return (
        <Slider
            mode={1}
            step={1}
            domain={domain}
            rootStyle={sliderStyle}
            onUpdate={handleUpdate}
            onChange={handleChange}
            values={[value]}
        >
            <Rail>
                {({getRailProps}) => <SliderRail getRailProps={getRailProps}/>}
            </Rail>
            <Handles>
                {({handles, getHandleProps}) => (
                    <div className="slider-handles">
                        {handles.map(handle => (
                            <Handle
                                key={handle.id}
                                handle={handle}
                                domain={domain}
                                getHandleProps={getHandleProps}
                            />
                        ))}
                    </div>
                )}
            </Handles>
            <Tracks right={false}>
                {({tracks, getTrackProps}) => (
                    <div className="slider-tracks">
                        {tracks.map(({id, source, target}) => (
                            <Track
                                key={id}
                                source={source}
                                target={target}
                                getTrackProps={getTrackProps}
                            />
                        ))}
                    </div>
                )}
            </Tracks>
        </Slider>
    );

}
