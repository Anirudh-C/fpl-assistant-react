import React from 'react';
import { shallow } from 'enzyme';
import Fixture from './Fixture';

describe('Fixture', () => {
    it('should render correctly', () => {
        const component = shallow(<Fixture visible={true}/>);
    });
});
