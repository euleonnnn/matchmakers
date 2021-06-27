import React from 'react';
import GameRoom from './GameRoom';
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow} from "enzyme";
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Sinon from 'sinon';

const mockStore = configureMockStore([thunk]);
Enzyme.configure({ adapter: new Adapter() });

describe('Game Room', () => {
    let store;
    beforeEach(() => {
        store = mockStore({
            auth: {
                sport: 'BASKETBALL',
            },
            game: {
                sport: 'BASKETBALL',
            },
            gamechat: {
                sport: 'BASKETBALL',
            }
        });
    });
    var spyObj = {
        sport: Sinon.spy(),
      };
    it("shallow render", () => {
        const wrapper = shallow(
            <Provider store={store}>
                <GameRoom getGameById={Sinon.spy()} 
                    authUser={Sinon.spy()} 
                    clearProfile={Sinon.spy()}
                    createGameChat={Sinon.spy()}
                    getGameChat={Sinon.spy()}
                    game={spyObj}
                    gamechat={spyObj}
                    auth={spyObj}
                />
            </Provider>
        );
        expect(wrapper).toMatchSnapshot();
    });
    
})