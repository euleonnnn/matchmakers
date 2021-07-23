import React from 'react';
import MyProfile from './MyProfile';
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow} from "enzyme";
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Sinon from 'sinon';
import { getCurrentProfile } from '../../actions/profile';
import PropTypes from 'prop-types';

const mockStore = configureMockStore([thunk]);
Enzyme.configure({ adapter: new Adapter() });

describe('My Profile', () => {
    let store;
    beforeEach(() => {
        store = mockStore({
            auth: {
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
                <MyProfile getCurrentProfile={Sinon.spy()} auth={stubObj} profile={stubObj}/>
            </Provider>
        );
        expect(wrapper).toMatchSnapshot();
    });
    it("integration testing", () => {
        const wrapper = shallow(
            <Provider store={store}>
                <MyProfile getCurrentProfile={getCurrentProfile} auth={PropTypes.auth} profile={PropTypes.profile}/>
            </Provider>
        );
        expect(wrapper).toMatchSnapshot();
    });
    
})