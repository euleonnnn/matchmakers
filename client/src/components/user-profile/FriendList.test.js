import React from 'react';
import FriendList from './FriendList';
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { render, shallow } from "enzyme";
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Sinon from 'sinon';
import PropTypes from 'prop-types';

const mockStore = configureMockStore([thunk]);
Enzyme.configure({ adapter: new Adapter() });

describe('Friend List', () => {
    let store;
    beforeEach(() => {
        store = mockStore({
            auth: {
                sport: 'BASKETBALL',
            },
            chat: {
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
                <FriendList auth={stubObj} chat={stubObj}/>
            </Provider>
        );
        expect(wrapper).toMatchSnapshot();
    });
    it("renders component", () => {
        const wrapper = render(
            <Provider store={store}>
                <FriendList auth={stubObj} chat={stubObj}/>
            </Provider>
        );
        expect(wrapper).toMatchSnapshot();
    });
    it("integration testing", () => {
        const wrapper = shallow(
            <Provider store={store}>
                <FriendList auth={PropTypes.auth} chat={PropTypes.chat}/>
            </Provider>
        );
        expect(wrapper).toMatchSnapshot();
    });
    
})