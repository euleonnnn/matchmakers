import React from 'react';
import Alert from './Alert';
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow } from "enzyme";
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Sinon from 'sinon';

const mockStore = configureMockStore([thunk]);
Enzyme.configure({ adapter: new Adapter() });

describe('Alert', () => {
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
                <Alert alert={spyObj}/>
            </Provider>
        );
        expect(wrapper).toMatchSnapshot();
    });

})