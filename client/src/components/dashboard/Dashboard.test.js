import React from 'react';
import Dashboard from './Dashboard';
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow} from "enzyme";
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Sinon from 'sinon';

const mockStore = configureMockStore([thunk]);
Enzyme.configure({ adapter: new Adapter() });

describe('Dashboard', () => {
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
    var stubObj = {
        sport: Sinon.stub(),
      };
    it("shallow render", () => {
        const wrapper = shallow(
            <Provider store={store}>
                <Dashboard getCurrentProfile={Sinon.stub()} 
                    getGames={Sinon.stub()} 
                    logout={Sinon.stub()}
                    auth={stubObj}
                    game={stubObj}
                    profile={stubObj}
                />
            </Provider>
        );
        expect(wrapper).toMatchSnapshot();
    });
    
})