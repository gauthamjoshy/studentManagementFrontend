import React, { useEffect, useState } from 'react'

function Counter() {

    const [studentCount, setstudentCount] = useState()
    const [clientCount, setClientCount] = useState()
    const [experienceCount, setExperienceCount] = useState()

    useEffect(() => {
        let startValue = 0
        let endValue = 1000
        let studentDelay = 1

        const studentCounter = setInterval(() => {
            startValue += 5
            if (startValue >= endValue) {
                startValue = endValue
                clearInterval(studentCounter)

            }
            setstudentCount(startValue)
        }, studentDelay)

        return () => clearInterval(studentCounter)

    }, [])


    useEffect(() => {
        let startClient = 0
        let endClient = 150
        let clientDelay = 1

        const clientCounter = setInterval(() => {
            startClient += 1
            if (startClient >= endClient) {
                clearInterval(clientCounter)
            }
            setClientCount(startClient)

        }, clientDelay)

        return () => clearInterval(clientCounter)
    }, [])


    useEffect(() => {
        let startExp = 0
        let endExp = 35
        let delayExp = 100

        const expCounter = setInterval(() => {
            startExp += 5
            if (startExp >= endExp) {
                clearInterval(expCounter)
                startExp = endExp
            }
            setExperienceCount(startExp)
                
        }, delayExp)
        return () => clearInterval(expCounter)
    }, [])

    return (
        <>
            <h1 id='cHeading' className='text-center font-bold text-2xl pt-10 '>What We’ve Achieved So Far</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 sm:px-10 md:px-20 py-20">


                <div className='text-center text-white rounded-xl p-5 bg-blue-500 hover:scale-110 hover:shadow-2xl hover:shadow-gray-600 transition'>
                    <h1 className='font-bold text-3xl'>{studentCount}<span className='font-bold text-3xl'>+</span></h1>
                    <h3 className='mt-1 font-medium'>Students Managed Successfully</h3>
                </div>
                <div className='text-center text-white rounded-xl p-5 bg-blue-500 hover:scale-110 hover:shadow-2xl hover:shadow-gray-600 transition'>
                    <h1 className='font-bold text-3xl'>{clientCount}<span className='font-bold text-3xl'>+</span></h1>
                    <h3 className='mt-1 font-medium'>Satisfied Clients</h3>
                </div>
                <div className='text-center text-white rounded-xl p-5 bg-blue-500 hover:scale-110 hover:shadow-2xl hover:shadow-gray-600 transition'>
                    <h1 className='font-bold text-3xl'>{experienceCount}<span className='font-bold text-3xl'>+</span></h1>
                    <h3 className='mt-1 font-medium'>Year's of Experience</h3>
                </div>
            </div>
        </>
    )
}

export default Counter