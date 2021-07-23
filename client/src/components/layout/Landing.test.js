import React from 'react';
import Landing from './Landing';
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow} from "enzyme";
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Sinon from 'sinon';

const mockStore = configureMockStore([thunk]);
Enzyme.configure({ adapter: new Adapter() });

describe('Landing', () => {
    let store;
    beforeEach(() => {
        store = mockStore({});
    });
    it("shallow render", () => {
        const wrapper = shallow(
            <Provider store={store}>
                <Landing isAuthenticated={Sinon.stub()}/>
            </Provider>
        );
        expect(wrapper).toMatchSnapshot();
    });
    it("integration testing", () => {
        const wrapper = shallow(
            <Provider store={store}>
                <Landing isAuthenticated={false}/>
            </Provider>
        );
        expect(wrapper).toMatchSnapshot();
    });
    
})