import React from 'react';
import BookFacility from './BookFacility';
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow} from "enzyme";
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const mockStore = configureMockStore([thunk]);
Enzyme.configure({ adapter: new Adapter() });

describe('Book Facility', () => {
    let store;
    beforeEach(() => {
        store = mockStore({});
    });
    it("renders component", () => {
        const wrapper = shallow(
            <Provider store={store}>
                <BookFacility/>
            </Provider>
        );
        expect(wrapper).toMatchSnapshot();
    });
    
})