import React from 'react';
import Navbar from './Navbar';
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow} from "enzyme";
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Sinon from 'sinon';

const mockStore = configureMockStore([thunk]);
Enzyme.configure({ adapter: new Adapter() });

describe('Navbar', () => {
    let store;
    beforeEach(() => {
        store = mockStore({
            auth: {
                sport: 'BASKETBALL',
            },
            profile: {
                sport: 'BASKETBALL',
            }
        });
    });
    var stubObj = {
        sport: Sinon.stub(),
      };
    it("shallow render", () => {
        const wrapper = shallow(
            <Provider store={store}>
                <Navbar logout={Sinon.stub()} 
                    auth={stubObj}
                    profile={stubObj}
                />
            </Provider>
        );
        expect(wrapper).toMatchSnapshot();
    });
    
})