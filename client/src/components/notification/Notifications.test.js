import React from 'react';
import Notifications from './Notifications';
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow} from "enzyme";
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Sinon from 'sinon';
import PropTypes from 'prop-types';
import { getGames } from '../../actions/game';
import { getCurrentProfile } from '../../actions/profile';

const mockStore = configureMockStore([thunk]);
Enzyme.configure({ adapter: new Adapter() });

describe('Follower Item', () => {
    let store;
    beforeEach(() => {
        store = mockStore({
            auth: {
                sport: 'BASKETBALL',
            },
            chat: {
                sport: 'BASKETBALL',
            },
            game: {
                sport: 'BASKETBALL',
            },
            profile: {
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
                <Notifications getGames={Sinon.spy()}
                    getCurrentProfile={Sinon.spy()} 
                    auth={stubObj} 
                    chat={stubObj} 
                    game={stubObj}
                    profile={stubObj}
                />
            </Provider>
        );
        expect(wrapper).toMatchSnapshot();
    });
    it("integration testing", () => {
        const wrapper = shallow(
            <Provider store={store}>
                <Notifications getGames={getGames}
                    getCurrentProfile={getCurrentProfile} 
                    auth={PropTypes.auth} 
                    chat={PropTypes.chat} 
                    game={PropTypes.game}
                    profile={PropTypes.profile}
                />
            </Provider>
        );
        expect(wrapper).toMatchSnapshot();
    });
})