import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";


it('renders Carousel without crashing', function(){
  render(<Carousel />);
});

it('matches Carousel snapshot', function(){
  const { asFragment } = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot()
});

it("works when you click on the right arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);
  
  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  
  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);
  
  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});

it("works when you click on the left arrow", function(){
  const { queryByTestId, queryByAltText } = render(<Carousel />);
  
  //Move to the second image
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, not the third one or the first one
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Josh Post on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  
  // move backwards in the carousel
  const leftArrow = queryByTestId("left-arrow");
  fireEvent.click(leftArrow);
  
  // expect only the first image to show
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Josh Post on Unsplash")).not.toBeInTheDocument();

});

it("deletes the left arrow on the first slide", function(){
  const { queryByTestId } = render(<Carousel />);

  //gsao to the second 
  const leftArrow = queryByTestId("left-arrow");
  expect(leftArrow).toBeNull();

});

it("deletes the right arrow on the last slide", function(){
  const { queryByTestId } = render(<Carousel />);

  const rightArrow1 = queryByTestId("right-arrow");
  fireEvent.click(rightArrow1);  
  
  const rightArrow2 = queryByTestId("right-arrow");
  fireEvent.click(rightArrow2);
  
  const rightArrow3 = queryByTestId("right-arrow");
  expect(rightArrow3).toBeNull();

});