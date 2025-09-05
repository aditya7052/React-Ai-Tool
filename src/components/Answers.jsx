import React, { useEffect, useState } from 'react'
import { checkHeading, replaceHeadingStarts } from '../helper'

const Answers = ({ ans,totalResult, index, type }) => {
    const [heading, setHeading] = useState(false)
    const [answer, setAnswer] = useState(ans)
    useEffect(() => {

        if (checkHeading(ans)) {
            setHeading(true)
            setAnswer(replaceHeadingStarts(ans))
        }
    }, [])


    return (
        <>
        {
            index == 0 && totalResult >1?<span className='text-xl'>{answer}</span>:heading ? <span className={"pt-2 block text-white"}>{answer}</span> :
             <span className={type=='q'? 'pl-1':'pl-5'}>{answer}</span>
        }
            
        </>
    )
}
export default Answers


