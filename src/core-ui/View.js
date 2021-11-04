import React from 'react';

export default function View({children, ...props}){
    return(
        <div {...props}>
            {children}
        </div>
    )
}