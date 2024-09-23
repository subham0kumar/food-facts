import React from 'react'
import logo from '/home.svg'
const Navbar = () => {
    return (
        <nav className='absolute top-5 left-1/2 -translate-x-1/2 w-[90%] flex justify-between items-center bg-gray-700 p-5 rounded-lg'>
            <a href="/">
                <img src={logo} alt="logo" width={50} />
            </a>
            <h1 className='w-2/3 ml-10 text-center text-gray-200  text-3xl font-bold'>Every Food Facts</h1>

            <button className='hover:bg-gray-800 text-gray-200 bg-gray-900 px-5 py-2 rounded-lg font-bold'>Go to Github</button>

        </nav>
    )
}

export default Navbar