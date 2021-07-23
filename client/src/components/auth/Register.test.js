import React from 'react';
import Register from './Register';
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow} from "enzyme";
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Sinon from 'sinon';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';

const mockStore = configureMockStore([thunk]);
Enzyme.configure({ adapter: new Adapter() });

describe('Register', () => {
    let store;
    beforeEach(() => {
        store = mockStore({
            auth: {
                sport: 'BASKETBALL',
            },
            game: {
                sport: 'BASKETBALL',
            },
            profile: {
                sport: 'BASKETBALL',
            }
        });
    });
    it("shallow render", () => {
        const wrapper = shallow(
            <Provider store={store}>
                <Register setAlert={Sinon.stub()} 
                    register={Sinon.stub()} 
                    isAuthenticated={Sinon.stub()}
                />
            </Provider>
        );
        expect(wrapper).toMatchSnapshot();
    });
    it("integration testing", () => {
        const wrapper = shallow(
            <Provider store={store}>
                <Register setAlert={setAlert} 
                    register={register} 
                    isAuthenticated={false}
                />
            </Provider>
        );
        expect(wrapper).toMatchSnapshot();
    });
    
})