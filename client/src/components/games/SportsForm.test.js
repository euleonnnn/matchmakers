import React from 'react';
import SportsForm from './SportsForm';
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow} from "enzyme";
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Sinon from 'sinon';

const mockStore = configureMockStore([thunk]);
Enzyme.configure({ adapter: new Adapter() });

describe('Sports Form', () => {
    let store;
    beforeEach(() => {
        store = mockStore({});
    });
    var stubObj = {
        sport: Sinon.stub(),
    };
    it("shallow render", () => {
        const wrapper = shallow(
            <Provider store={store}>
                <SportsForm createGame={Sinon.stub()} history={stubObj}/>
            </Provider>
        );
        expect(wrapper).toMatchSnapshot();
    });
    it("integration testing", () => {
        const wrapper = shallow(
            <Provider store={store}>
                <SportsForm createGame={Sinon.stub()} history={""}/>
            </Provider>
        );
        expect(wrapper).toMatchSnapshot();
    });
    
})