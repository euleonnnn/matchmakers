import React from 'react';
import MessageBox from './MessageBox';
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow } from "enzyme";
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Sinon from 'sinon';

const mockStore = configureMockStore([thunk]);
Enzyme.configure({ adapter: new Adapter() });

describe('MessageBox', () => {
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
    var spyObj = {
        sport: Sinon.spy(),
      };
      it("shallow render", () => {
        const wrapper = shallow(
            <Provider store={store}>
                <MessageBox auth={spyObj} chat={spyObj} getChats={Sinon.spy()}/>
            </Provider>
        );
        expect(wrapper).toMatchSnapshot();
    });

})