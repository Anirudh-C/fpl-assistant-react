import React from 'react';
import { shallow } from 'enzyme';
import PlayerTable from './PlayerTable';

describe('PlayerTable', () => {
    it('should render correctly', () => {
        const component = shallow(<PlayerTable />);
    });
});
