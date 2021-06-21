import React from 'react';
import Chat from './Chat';
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { render } from "enzyme";
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Sinon from 'sinon';

const mockStore = configureMockStore([thunk]);
Enzyme.configure({ adapter: new Adapter() });

describe('Chat', () => {
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
    it("renders component", () => {
        const wrapper = render(
            <Provider store={store}>
                <Chat auth={spyObj} chat={spyObj}/>
            </Provider>
        );
        expect(wrapper).toMatchSnapshot();
    });
    
})