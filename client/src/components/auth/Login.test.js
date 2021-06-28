import React from 'react';
import Login from './Login';
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow, render } from "enzyme";
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Sinon from 'sinon';

const mockStore = configureMockStore([thunk]);
Enzyme.configure({ adapter: new Adapter() });

describe('Login', () => {
    let store;
    beforeEach(() => {
        store = mockStore({
            auth: {
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
                <Login isAuthenticated={true} profile={stubObj} login={Sinon.stub()}/>
            </Provider>
        );
        expect(wrapper).toMatchSnapshot();
    });
    it("renders component", () => {
        const wrapper = render(
            <Provider store={store}>
                <Login isAuthenticated={true} profile={stubObj} login={Sinon.stub()}/>
            </Provider>
        );
        expect(wrapper).toMatchSnapshot();
    });
    
})