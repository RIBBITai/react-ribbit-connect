import React, { useRef, useEffect } from "react";
import MetaRIBBITConnect from 'ribbit-connect-meta';
import { stylesheet } from "./stylesheet";


const RIBBITConnect = (props) => {
    const {
            token,
            language,
            style,
            inline = false,
            fullscreen = false,
            settings = {},
            className,
            onMessage,
            open = true,
            environment,
            environmentOverrideURL,
            getContext
        } = props,
        containerRef = useRef(null),
        RIBBITConnectContext = useRef(null),
        {curtainColor, curtainAllowClose = true} = settings

    useEffect(() => {
        if(!RIBBITConnectContext.current) RIBBITConnectContext.current = new MetaRIBBITConnect({ token, settings, inline, language, environment, environmentOverrideURL, fullscreen });
        containerRef.current.appendChild(RIBBITConnectContext.current.iFrame)

        RIBBITConnectContext.current.onMessage((functionName, message) => {
            if(onMessage) onMessage(functionName, message)
        })

        RIBBITConnectContext.current.CONNECTEvents.map(eventName => {
            const propName = 'on' + (eventName.charAt(0).toUpperCase() + eventName.slice(1));
            if(props[propName]) RIBBITConnectContext.current.on(eventName, props[propName])
        })
    }, [])

    useEffect(() => {
        if(getContext) getContext({
            RIBBITConnect: RIBBITConnectContext?.current
        })

        
        var existingStyles = document.getElementById('react-ribbit-connect-styles')
        if(!existingStyles){
            var style = document.createElement('style');
            style.id = 'react-ribbit-connect-styles'
            style.innerHTML = stylesheet;
            document.head.appendChild(style);
        }
    }, [getContext])

    useEffect(() => {
        if(open == false) return;
        setTimeout(() => {
            window.scrollTo(0,window.scrollY + 100)
        }, 1000);
    }, [open])

    const closePopup = () => {
        if(curtainAllowClose == false) return;
        RIBBITConnectContext.current.sendMessage('exit', null)
    }

    if(inline) return <div ref={containerRef} className={className} style={style} />

    return (
        <div className={"RIBBIT-popup" + (className ? ' ' + className : '') + (open ? ' RIBBIT-popup-open' : '') + (inline ? ' RIBBIT-popup-inline' : ' RIBBIT-popup-popup')} ref={containerRef} style={style} onClick={closePopup}>
            <style global='true'>{`
                ${inline == false && open == true ? `
                    body {
                        //overflow: hidden;
                        //position: fixed;
                    }
                ` : ``}
            `}</style>
            <div className="RIBBIT-popup-curtain" style={{ backgroundColor: curtainColor ? curtainColor : null}} />
        </div>
    )
}

RIBBITConnect.displayName = 'RIBBITConnect'
export default RIBBITConnect