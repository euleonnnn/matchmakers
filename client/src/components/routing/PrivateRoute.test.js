import React from 'react';
import PrivateRoute from './PrivateRoute';
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow} from "enzyme";
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Sinon from 'sinon';
import PropTypes from 'prop-types';

const mockStore = configureMockStore([thunk]);
Enzyme.configure({ adapter: new Adapter() });

describe('Private Route', () => {
    let store;
    beforeEach(() => {
        store = mockStore({
            auth: {
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
                <PrivateRoute component={stubObj} auth={stubObj} path={stubObj}/>
            </Provider>
        );
        expect(wrapper).toMatchSnapshot();
    });
    it("integration testing", () => {
        const wrapper = shallow(
            <Provider store={store}>
                <PrivateRoute component={""} auth={PropTypes.auth} path={""}/>
            </Provider>
        );
        expect(wrapper).toMatchSnapshot();
    });
    
})