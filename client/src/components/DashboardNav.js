import React from 'react'
import { Link } from 'react-router-dom'

export default function DashboardNav() {
        const pathName = window.location.pathname;
  return (
        <ul className="nav nav-tabs">
                <li className='nav-item'>
                        <Link  to="/dashboard" className={`nav-link ${pathName === '/dashboard' && 'active'}`}>Your bookings</Link>
                </li>
                <li className='nav-item'>
                        <Link to="/dashboard/seller" className={`nav-link ${pathName === "/dashboard/seller" && 'active'}`}>Your hotels</Link>
                </li>
                
        </ul>
  )
}
