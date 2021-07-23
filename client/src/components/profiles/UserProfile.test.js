import React from 'react';
import UserProfile from './UserProfile';
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow} from "enzyme";
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Sinon from 'sinon';
import { getProfilesById } from '../../actions/profile';
import { authUser } from '../../actions/auth';
import { createChat } from '../../actions/chat';
import PropTypes from 'prop-types';

const mockStore = configureMockStore([thunk]);
Enzyme.configure({ adapter: new Adapter() });

describe('UserProfiles', () => {
    let store;
    beforeEach(() => {
        store = mockStore({
            auth: {
                sport: 'BASKETBALL',
            },
            chat: {
                sport: 'BASKETBALL',
            },
            profile: {
                sport: 'BASKETBALL',
            }
        });
    });
    var stubObj = {
        sport: Sinon.stub(),
      };
    it("shallow render", () => {
        const wrapper = shallow(
            <Provider store={store}>
                <UserProfile getProfilesById={Sinon.stub()} 
                    authUser={Sinon.stub()} 
                    createChat={Sinon.stub()}
                    auth={stubObj}
                    chat={stubObj}
                    profile={stubObj}
                />
            </Provider>
        );
        expect(wrapper).toMatchSnapshot();
    });
    it("integration testing", () => {
        const wrapper = shallow(
            <Provider store={store}>
                <UserProfile getProfilesById={getProfilesById} 
                    authUser={authUser} 
                    createChat={createChat}
                    auth={PropTypes.auth}
                    chat={PropTypes.chat}
                    profile={PropTypes.profile}
                />
            </Provider>
        );
        expect(wrapper).toMatchSnapshot();
    });
    
})