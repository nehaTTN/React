import React from 'react';

import { configure, shallow } from 'enzyme';//We use shalow because shallow wont render everything upto the subtree rather 
//it will render in a shallow way like in navigationItems it will not go deeply into navigationItem 
import Adapter from 'enzyme-adapter-react-16';//To configure enzyme and connect it to react I need adapter

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';
//Jest is an open JavaScript testing library from Facebook.
//Here every test is independent of each other
configure({adapter: new Adapter()});
//Enzyme allows to write unit and isolated test cases
describe('<NavigationItems />', () => {//Describe first contains on which we are performing the action
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<NavigationItems />);
    });

    it('should render two <NavigationItem /> elements if not authenticated', () => {
        //Because here we are not passing isAuthenticated as a prop so isAuthenticated will be by default considered as a false.
        expect(wrapper.find(NavigationItem)).toHaveLength(2);//In expect we define the thing we want to check
    });

    it('should render three <NavigationItem /> elements if authenticated', () => {
        // wrapper = shallow(<NavigationItems isAuthenticated />);
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it('should an exact logout button', () => {
        //We have to pass isAuthenticated again because when beforeEaxh is called and every time wrapper is rendered
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
    });
});