import React from 'react';
import GameChat from './GameChat';
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow } from "enzyme";
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Sinon from 'sinon';

const mockStore = configureMockStore([thunk]);
Enzyme.configure({ adapter: new Adapter() });

describe('Game Chat', () => {
    let store;
    beforeEach(() => {
        store = mockStore({
            gamechat: {
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
                <GameChat gamechat={stubObj}/>
            </Provider>
        );
        expect(wrapper).toMatchSnapshot();
    });
    
})