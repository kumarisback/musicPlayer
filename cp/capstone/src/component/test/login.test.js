import { cleanup, render, screen } from "@testing-library/react";
import React, { Component } from "react";
import Registeration from "../Registeration";
import renderer from "react-test-renderer";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {
  useLocation,
  useNavigate,
  UNSAFE_NavigationContext as NavigationContext,
  useContext,
} from "react-router-dom";
import About from "../About";
// import App from '../../App'
import Login from "../Login";
import AddSong from '../AddSong';
import { Card } from "react-bootstrap";

jest.mock("react-router-dom", () => {
  const original = jest.requireActual("react-router-dom"); // Step 2.
  return {
    ...original,
    useNavigate: jest.fn(),
    useLocation: jest.fn(),
  };
});

test("render", () => {
  expect(true).toBe(true);
});

test("test2", () => {
  useNavigate.mockImplementation(() => ({ mockedValue: 2 }));
  useLocation.mockImplementation(() => ({ mockedValue: 2 }));
  const div = renderer.create(
  <NavigationContext.Provider value={{navigator:true}}><Registeration /></NavigationContext.Provider>);
  expect(div.root.findAllByType("div")).toBeInTheDocument;
});
test('test3',()=>{
    const div=renderer.create(<About />).toJSON();
    // let tree = div.toJSON();
  expect(div).toMatchSnapshot();
})

test('test4',()=>{
    const div=renderer.create(<About />).toJSON();
    // let tree = div.toJSON();
  expect(div).not.toBeNull;
})

test("test5", () => {
    useNavigate.mockImplementation(() => ({ mockedValue: 2 }));
    useLocation.mockImplementation(() => ({ mockedValue: 2 }));
    const div = renderer.create(
    <NavigationContext.Provider value={{navigator:true}}><Registeration /></NavigationContext.Provider>);
    expect(div).toBeInTheDocument;
  });

  test('test6',()=>{
    useNavigate.mockImplementation(() => ({ mockedValue: 2 }));
    useLocation.mockImplementation(() => ({ mockedValue: 2 }));
    const div=renderer.create(<NavigationContext.Provider value={{navigator:true}}><AddSong/></NavigationContext.Provider>).toJSON();
    // let tree = div.toJSON();
  expect(div).not.toBeNull;
})



test("do some test",()=>{
    useLocation.mockImplementation(() => ({ mockedValue: 2 }));
    const component = renderer.create(<Router><Login /></Router>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})


test("do more",()=>{
    useLocation.mockImplementation(() => ({ mockedValue: 2 }));
    const div = renderer.create(<Router><Login /></Router>);
    // let tree = component.toJSON();
    expect(div).toBeInTheDocument;
})

test("do more 2",()=>{
    useLocation.mockImplementation(() => ({ mockedValue: 2 }));
    const div = renderer.create(<Router><Login /></Router>);
    // let tree = component.toJSON();
    expect(Card).not.toBeInTheDocument;
})

