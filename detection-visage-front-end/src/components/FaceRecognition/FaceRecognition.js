import React from 'react';
import '../FaceRecognition/FaceRecognition.css'


const FaceRecognition = ({imageUrl, box}) =>{

    return (
        <div className="center ma">
            <div className="absolute mt2">
                <img id="inputimage" src={imageUrl} alt="" width="500" height="auto"/>
                <div className ="bounding-box" 
                style={{top: box.top , left: box.left , width: box.width, height: box.height}}></div>
            </div>
        </div>
    );
}

export default FaceRecognition;