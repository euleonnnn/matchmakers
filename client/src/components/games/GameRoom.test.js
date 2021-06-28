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
    var stubObj = {
        sport: Sinon.stub(),
      };
    it("shallow render", () => {
        const wrapper = shallow(
            <Provider store={store}>
                <GameRoom getGameById={Sinon.stub()} 
                    authUser={Sinon.stub()} 
                    clearProfile={Sinon.stub()}
                    createGameChat={Sinon.stub()}
                    getGameChat={Sinon.stub()}
                    game={stubObj}
                    gamechat={stubObj}
                    auth={stubObj}
                />
            </Provider>
        );
        expect(wrapper).toMatchSnapshot();
    });
    
})