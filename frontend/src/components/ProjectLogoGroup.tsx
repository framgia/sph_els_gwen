import React from 'react'
import Logo from '../icons/Logo';
import './index.css'

export default function ProjectLogoGroup() {
    return (
      <div className='logo-name-group'>
        <Logo className='logo' />
        <div className='flex flex-col project-name-group'>
          <h1 className='project-name'>ELS</h1>
          <h6 className='project-sub-heading'>e-learning system</h6>
        </div>
      </div>
    );
}
