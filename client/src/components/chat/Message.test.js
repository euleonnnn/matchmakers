import React from 'react';
import Message from './Message';
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow } from "enzyme";
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Sinon from 'sinon';

const mockStore = configureMockStore([thunk]);
Enzyme.configure({ adapter: new Adapter() });

describe('Message', () => {
    let store;
    beforeEach(() => {
        store = mockStore({
            auth: {
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
                <Message auth={spyObj}/>
            </Provider>
        );
        expect(wrapper).toMatchSnapshot();
    });

})