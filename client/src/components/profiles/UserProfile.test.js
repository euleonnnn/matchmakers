import React from 'react';
import UserProfile from './UserProfile';
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow} from "enzyme";
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Sinon from 'sinon';

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
    var spyObj = {
        sport: Sinon.spy(),
      };
    it("shallow render", () => {
        const wrapper = shallow(
            <Provider store={store}>
                <UserProfile getProfilesById={Sinon.spy()} 
                    authUser={Sinon.spy()} 
                    createChat={Sinon.spy()}
                    auth={spyObj}
                    chat={spyObj}
                    profile={spyObj}
                />
            </Provider>
        );
        expect(wrapper).toMatchSnapshot();
    });
    
})