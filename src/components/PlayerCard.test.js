import React from 'react';
import { shallow } from 'enzyme';
import PlayerCard from './PlayerCard';

describe('PlayerCard', () => {
    it('should render correctly', () => {
        const component = shallow(<DashCard visible={true}/>);
    });
});
