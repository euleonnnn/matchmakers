import React, { Fragment, useState } from 'react';
import SportsForm from './SportsForm';
import StudyForm from './StudyForm';
import OnlineGamesForm from './OnlineGamesForm';

const CreateGame = () => {

    const [formType, setFormType] = useState("");

    return (
        <Fragment>
            <div className ="container">
            <h1 className="large my-btm"> <i class="fas fa-football-ball"/> {" "}
                Host Your Room 
            </h1>
            <h5>Select Category:</h5>
                {formType === "sport" ? <button type="button" className="btn btn-primary my-right">Sports</button> :
                <button type="button" className="btn btn-secondary my-right" onClick={() => setFormType("sport")}>Sports</button> }

                {formType === "onlineGame" ? <button type="button" className="btn btn-primary my-right">Online Games</button> :
                <button type="button" className="btn btn-secondary my-right" onClick={() => setFormType("onlineGame")}>Online Games</button> }

                {formType === "study" ? <button type="button" className="btn btn-primary my-right">Study Session</button> :
                <button type="button" className="btn btn-secondary my-right" onClick={() => setFormType("study")}>Study Session</button> }                 

            {formType === "sport"
                ? <SportsForm/>
                : formType ==="onlineGame"
                    ? <OnlineGamesForm/>
                    : formType === "study" ? <StudyForm/> : <SportsForm/>
            }
            
            </div>
        </Fragment>
    )
}

export default CreateGame;