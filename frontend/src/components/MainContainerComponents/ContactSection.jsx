import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import contactListImage from '../../assets/BillGates.png'

const ContactSection = () => {
  return (
    <div className='contact-section'>
      <div className="search-bar">
        <SearchIcon />
        <input type="text" name="search" id="search" placeholder="Search" className='search-input-box' />
      </div>
      <div className="contact-list">
        <h2 style={{ margin: '10px' }} >People</h2>
        <div className="wrapper-parent">
          <div className="wrapper">
            <div className="contact-list-information">
              <div className="contact-list-image">
                <img src={contactListImage} alt="Contact list image" height={40} width={40} />
              </div>
              <div className="contact-information">
                <div className="contact-name"><h3>Bill gates</h3></div>
                <div className="contact-last-message"><span>Hi How are you Gates ?</span></div>
              </div>
            </div>
            <div className="contact-timestamp-read">
              <div className="timestamp"><p>Today, 3:00 am</p></div>
              <div className="read"><p>✓✓</p></div>
            </div>
          </div>
          <hr />
        </div>
        <div className="wrapper-parent">
          <div className="wrapper">
            <div className="contact-list-information">
              <div className="contact-list-image">
                <img src={contactListImage} alt="Contact list image" height={40} width={40} />
              </div>
              <div className="contact-information">
                <div className="contact-name"><h3>Bill gates</h3></div>
                <div className="contact-last-message"><span>Hi How are you Gates ?</span></div>
              </div>
            </div>
            <div className="contact-timestamp-read">
              <div className="timestamp"><p>Today, 3:00 am</p></div>
              <div className="read"><p>✓✓</p></div>
            </div>
          </div>
          <hr />
        </div>
        
      </div>
    </div>
  )
}

export default ContactSection