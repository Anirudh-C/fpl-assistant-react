import React from 'react';
import { shallow } from 'enzyme';
import ErrorDialog from './ErrorDialog';

describe('ErrorDialog', () => {
    it('should render correctly', () => {
        const component = shallow(<ErrorDialog visible={true}/>);
    });
});
