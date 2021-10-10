import React, { useState } from 'react'


function index() {
    const [gridView, setGridView] = useState(true);

    return (
        <div>
            {gridView && <GRID></GRID>}
            {!gridView && <TABLE></TABLE>}
        </div>
    )
}

export default index
