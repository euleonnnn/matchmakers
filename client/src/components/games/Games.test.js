import React from 'react';
import Games from './Games';
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow } from "enzyme";
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Sinon from 'sinon';
import { getCurrentProfile } from '../../actions/profile';
import { getGames, clearGame, deleteGame } from '../../actions/game';
import PropTypes from 'prop-types';


const mockStore = configureMockStore([thunk]);
Enzyme.configure({ adapter: new Adapter() });

describe('Games', () => {
    let store;
    beforeEach(() => {
        store = mockStore({
            auth: {
                sport: 'BASKETBALL',
            },
            game: {
                sport: 'BASKETBALL',
            },
        });
    });
    var stubObj = {
        sport: Sinon.stub(),
      };
    it("shallow render", () => {
        const wrapper = shallow(
            <Provider store={store}>
                <Games getCurrentProfile={Sinon.stub()} 
                    deleteGame={Sinon.stub()}
                    clearGame={Sinon.stub()}
                    getGames={Sinon.stub()} 
                    auth={stubObj} 
                    game={stubObj}
                />
            </Provider>
        );
        expect(wrapper).toMatchSnapshot();
    });
    it("integration testing", () => {
        const wrapper = shallow(
            <Provider store={store}>
                <Games getCurrentProfile={getCurrentProfile} 
                    deleteGame={deleteGame}
                    clearGame={clearGame}
                    getGames={getGames} 
                    auth={PropTypes.auth} 
                    game={PropTypes.game}
                />
            </Provider>
        );
        expect(wrapper).toMatchSnapshot();
    });
    
})