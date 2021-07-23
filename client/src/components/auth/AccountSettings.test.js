import React from 'react';
import AccountSettings from './AccountSettings';
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow } from "enzyme";
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Sinon from 'sinon';
import { logout } from '../../actions/auth';
import { getCurrentProfile } from '../../actions/profile';


const mockStore = configureMockStore([thunk]);
Enzyme.configure({ adapter: new Adapter() });

describe('Account Settings', () => {
    let store;
    beforeEach(() => {
        store = mockStore({});
    });
    it("shallow render", () => {
        const wrapper = shallow(
            <Provider store={store}>
                <AccountSettings getCurrentProfile={Sinon.stub()} logout={Sinon.stub()}/>
            </Provider>
        );
        expect(wrapper).toMatchSnapshot();
    });
    it("integrtion test", () => {
        const wrapper = shallow(
            <Provider store={store}>
                <AccountSettings getCurrentProfile={getCurrentProfile} logout={logout}/>
            </Provider>
        );
        expect(wrapper).toMatchSnapshot();
    });

})