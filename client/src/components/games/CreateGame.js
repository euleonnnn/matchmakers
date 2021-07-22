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
                Host Your Activity
            </h1>
            <h5>Select Category:</h5>
                <div>
                {formType === "sport" ? <button type="button" className="btn btn-primary my-right-small">Sports</button> :
                <button type="button" className="btn btn-secondary my-right-small" onClick={() => setFormType("sport")}>Sports</button> }

                {formType === "onlineGame" ? <button type="button" className="btn btn-primary my-right-small">Online Games</button> :
                <button type="button" className="btn btn-secondary my-right-small" onClick={() => setFormType("onlineGame")}>Online Games</button> }

                {formType === "study" ? <button type="button" className="btn btn-primary">Studying</button> :
                <button type="button" className="btn btn-secondary" onClick={() => setFormType("study")}>Studying</button> }                 
                </div>
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