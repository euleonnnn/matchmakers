import React from 'react';
import CreateGame from './CreateGame';
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow} from "enzyme";
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const mockStore = configureMockStore([thunk]);
Enzyme.configure({ adapter: new Adapter() });

describe('Create Game', () => {
    let store;
    beforeEach(() => {
        store = mockStore({});
    });
    it("shallow render", () => {
        const wrapper = shallow(
            <Provider store={store}>
                <CreateGame/>
            </Provider>
        );
        expect(wrapper).toMatchSnapshot();
    });
    
})