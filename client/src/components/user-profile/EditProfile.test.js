import React from 'react';
import EditProfile from './EditProfile';
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow} from "enzyme";
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Sinon from 'sinon';
import { createProfile, getCurrentProfile } from '../../actions/profile';
import PropTypes from 'prop-types';

const mockStore = configureMockStore([thunk]);
Enzyme.configure({ adapter: new Adapter() });

describe('Edit Profile', () => {
    let store;
    beforeEach(() => {
        store = mockStore({
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
                <EditProfile createProfile={Sinon.stub()} getCurrentProfile={Sinon.stub()} profile={stubObj} history={stubObj}/>
            </Provider>
        );
        expect(wrapper).toMatchSnapshot();
    });
    it("integration testing", () => {
        const wrapper = shallow(
            <Provider store={store}>
                <EditProfile createProfile={createProfile} getCurrentProfile={getCurrentProfile} profile={PropTypes.profile} history={""}/>
            </Provider>
        );
        expect(wrapper).toMatchSnapshot();
    });
    
})