import { useState } from 'react';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenOutlinedIcon from '@mui/icons-material/FullscreenOutlined';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
// import app from 'App'
import HeaderAction from '../HeaderAction';

const FullScreen = () => {

    const [isFullScreen, setIsFullScreen] = useState(document.webkitIsFullScreen);

    return <HeaderAction
        title="Full screen"
        icon={
            isFullScreen
                ?
                FullscreenExitIcon
                :
                FullscreenOutlinedIcon
        }
        action={() => {
            if (document.fullscreenEnabled) {
                if (document.webkitIsFullScreen) {
                    document.exitFullscreen();
                    setIsFullScreen(false);
                } else {
                    document.documentElement.requestFullscreen();
                    setIsFullScreen(true);
                }
            } else {
                // app.warning("Your browser does not support fullscreen.");
            }
        }}
    />
}

export default FullScreen;
