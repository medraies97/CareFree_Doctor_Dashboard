import React from 'react';


class VideoConference extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <div>
                <h1>Please Send the room Name to the doctor Phone numbre : Doctor Phone numbre {this.props.location.state ? this.props.location.state.phone : ''}</h1>
                <iframe id="inlineFrameExample"
                    title="Inline Frame Example"
                    width="100%"
                    height="500px"
                    allow="camera;microphone"
                    src="https://webrtc-video-room.herokuapp.com/">
                </iframe>
            </div>
        );
    }
}
export default VideoConference;