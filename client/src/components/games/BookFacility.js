import React, { Fragment, useState } from 'react';

const BookFacility = () => {

    const [formType, setFormType] = useState("");

    return (
        <Fragment>
            <div className ="container">
            <h1 className="large my-btm"> <i class="fas fa-football-ball"/> {" "}
                Book A Facility
            </h1>
            <div className="col-sm-12 col-md-12">
                <div className="card mb-3">
                    <div className="card-body">
                    <h5 className="card-title my-3 host-title"> Guide To Booking Facilities </h5>
                    <ul>
                        <li><strong>REBOKS:</strong> NUS sports facility booking platform for Badminton, Squash, Table Tennis and Tennis </li>
                        <li><strong>Hall Facilities:</strong> For facilities within NUS Halls & Residences. <strong> Applicable for Hall Residents only. </strong> </li>
                        <li><strong>NUS Classrooms & Discussion Rooms:</strong> Booking platform for NUS classrooms and discussion rooms. If away from campus, connect to NUS VPN before booking.</li>
                    </ul>
                    </div>
                </div>
            </div>
            <h5>Select Category:</h5>
                {formType === "sport" ? <button type="button" className="btn btn-primary my-right">Sports</button> :
                <button type="button" className="btn btn-secondary my-right" onClick={() => setFormType("sport")}>Sports</button> }

                {formType === "onlineGame" ? <button type="button" className="btn btn-primary my-right">Online Games</button> :
                <button type="button" className="btn btn-secondary my-right" onClick={() => setFormType("onlineGame")}>Online Games</button> }

                {formType === "study" ? <button type="button" className="btn btn-primary my-right">Study Session</button> :
                <button type="button" className="btn btn-secondary my-right" onClick={() => setFormType("study")}>Study Session</button> }                 
                
                {formType === "sport"
                ? <div className="my-top">
                    <button type="button" className="btn btn-dark my-right btn-full" 
                    onClick={() => window.open("https://reboks.nus.edu.sg/nus_public_web/public/facilities?list_by=recommended")}>
                        REBOKS
                    </button> 
                    <button type="button" className="btn btn-primary my-right btn-full"onClick={() => window.open("https://uci.nus.edu.sg/ohs/future-residents/undergraduates/prince-georges-park-residences/facilities-amenities/")}> Hall Facilities </button> 
                    </div>
                : formType ==="onlineGame"
                    ? <div className="my-top">
                        <button type="button" className="btn btn-dark my-right btn-full" onClick={() => window.open("https://libportal.nus.edu.sg/frontend/web/bookdiscussionroom")}> NUS Classrooms & Discussion Rooms </button> 
                        <button type="button" className="btn btn-primary my-right btn-full" onClick={() => window.open("https://uci.nus.edu.sg/ohs/future-residents/undergraduates/prince-georges-park-residences/facilities-amenities/")}> Hall Facilities </button> 
                        </div>
                    : formType === "study" 
                        ? <div className="my-top"> 
                            <button type="button" className="btn btn-primary my-right btn-full" onClick={() => window.open("https://libportal.nus.edu.sg/frontend/web/bookdiscussionroom")}> NUS Classrooms & Discussion Rooms </button> 
                            </div>
                        : <></>
            }
            </div>
        </Fragment>
    )
}

export default BookFacility;