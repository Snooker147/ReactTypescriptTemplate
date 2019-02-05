import * as React from "react";

// Props Structure
export interface FuncProps { name: string; }

export default (p: FuncProps) => {
    return (
        <div>
            Hello My Name Is {p.name}
        </div>
    );
};