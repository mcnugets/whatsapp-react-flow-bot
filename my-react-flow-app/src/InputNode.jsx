import { useCallback, useState } from "react";
import { Handle, Position } from "reactflow";


function InputNode({ data, isConnectable }) {
    const onChange = useCallback((evt) => {
        console.log(evt.target.value);
    }, []);


    return (
        <div className="text-updater-node">
            <Handle
                type="target"
                position={Position.Top}
                isConnectable={isConnectable}
            />
            <div>
                <label htmlFor="text">Text:</label>
                <input id="phonenumber" name="phonenumber " className="nodrag" onChange={onChange} />
            </div>
            <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} />
        </div>
    );
}

export default InputNode;
