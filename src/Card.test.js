import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Card from "./Card";

// Smoke test
it('renders Card without crashing', function(){
    render(<Card/>);
});


// Snapshot test
it('matches Card snapshot', function(){
    const { asFragment } = render(<Card />);
    expect(asFragment()).toMatchSnapshot()
});