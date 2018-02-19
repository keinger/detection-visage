import React from 'react';
import '../FaceRecognition/FaceRecognition.css'


const FaceRecognition = ({ imageUrl, box, visages}) => {
   


    return (
        <div className="center ma">
            <div className="absolute mt2">
                <img id="inputimage" src={imageUrl} alt="" width="500" height="auto" />
                    {visages.map((faces, index)=>(
                        <div key={index.toString()} className="bounding-box" style ={{top: (faces.faceRectangle.top / box.scale)+"px",
                         left: (faces.faceRectangle.left/ box.scale)+"px", width: (faces.faceRectangle.width / box.scale)+"px",
                          height:(faces.faceRectangle.width / box.scale)+"px"}}></div>
                    ))}
            </div>
        </div>
    );
}

export default FaceRecognition;