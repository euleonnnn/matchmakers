import React from 'react';
import AccountSettings from './AccountSettings';
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow } from "enzyme";
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Sinon from 'sinon';

const mockStore = configureMockStore([thunk]);
Enzyme.configure({ adapter: new Adapter() });

describe('Account Settings', () => {
    let store;
    beforeEach(() => {
        store = mockStore({});
    });
    var spyObj = {
        sport: Sinon.spy(),
      };
      it("shallow render", () => {
        const wrapper = shallow(
            <Provider store={store}>
                <AccountSettings getCurrentProfile={Sinon.spy()} logout={Sinon.spy()}/>
            </Provider>
        );
        expect(wrapper).toMatchSnapshot();
    });

})