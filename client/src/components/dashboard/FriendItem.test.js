import React from 'react';
import FriendItem from './FriendItem';
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow} from "enzyme";
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Sinon from 'sinon';
import { createChat, getChats } from '../../actions/chat';
import PropTypes from 'prop-types';

const mockStore = configureMockStore([thunk]);
Enzyme.configure({ adapter: new Adapter() });

describe('Profiles', () => {
    let store;
    beforeEach(() => {
        store = mockStore({
            auth: {
                sport: 'BASKETBALL',
            },
            chat: {
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
                <FriendItem createChat={Sinon.stub()} 
                    getChats={Sinon.stub()} 
                    auth={stubObj}
                    chat={stubObj}
                />
            </Provider>
        );
        expect(wrapper).toMatchSnapshot();
    });
    it("integration testing", () => {
        const wrapper = shallow(
            <Provider store={store}>
                <FriendItem createChat={createChat} 
                    getChats={getChats} 
                    auth={PropTypes.auth}
                    chat={PropTypes.chat}
                />
            </Provider>
        );
        expect(wrapper).toMatchSnapshot();
    });
})