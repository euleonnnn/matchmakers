import React from 'react';
import PasswordChange from './PasswordChange';
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow } from "enzyme";
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Sinon from 'sinon';

const mockStore = configureMockStore([thunk]);
Enzyme.configure({ adapter: new Adapter() });

describe('Password Change', () => {
    let store;
    beforeEach(() => {
        store = mockStore({});
    });
    var spyObj = {
        sport: Sinon.stub(),
      };
      it("shallow render", () => {
        const wrapper = shallow(
            <Provider store={store}>
                <PasswordChange isAuthenticated={spyObj} changePassword={Sinon.stub()} setAlert={Sinon.stub()}/>
            </Provider>
        );
        expect(wrapper).toMatchSnapshot();
    });

})