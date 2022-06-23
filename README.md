# RectToRectTransition

This is a component for animating some content between two different containers with absolute positioning and sizing,
with two different modes for scaling the content inside of it: `contain` or `cover`. All scaling does not affect the
aspect ration of the original content (as given by `naturalSize` prop).

To run the demo, clone the repo, run `npm install` and `npm start`. The small container has a `fitMode` of `cover`,
while the large one has a `fitMode` of `contain`. As you can confirm, the white dot keeps the original size besides
the scaling being applied, this is done through the `scalingFactorCompensation` parameter passed to the `renderContent`
render callback prop.
