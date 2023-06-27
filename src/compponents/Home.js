import React from 'react'
// import Notes from '../../backend/models/Notes';
import { Notes } from './Notes';

export default function Home(props) {
  const {showAlert} = props
  return (
    <div>
      <Notes  showAlert={showAlert} />
    </div>
  )
}
