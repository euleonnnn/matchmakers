import React from 'react';
import Register from './Register';
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow} from "enzyme";
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Sinon from 'sinon';

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
    
})