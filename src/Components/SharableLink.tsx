import React from 'react';
import '../CSS/SharableLink.css'

const SharableLink = () => {
    return (
        <section className="SharableLink">
        <h2>Event Name</h2>
        <div className="EventDeadline">
            <p>Deadline?</p>
        </div>
       <p>Thank you for creating your list!</p>
       <div className="shareLinkBox">
         <label htmlFor="shareLink">Share Link</label>  
        <input type="text" id="shareLink" readOnly></input>
        <button>Copy</button>
       </div>
    </section>
    );
};

export default SharableLink;