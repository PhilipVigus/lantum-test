# Lantum tech test

![App screenshot](./main-screenshot.png)

This is my attempt at the Lantum tech test

## Getting started

```bash
# clone the repository to your local machine with either
# if you're using ssh
git clone git@github.com:PhilipVigus/lantum-test.git

# if you're using https
git clone git@github.com:PhilipVigus/lantum-test.git

# install project dependencies in the repository's root folder
yarn install

# start the project locally
yarn start
```

## Testing

```bash
# to run tests interactively
yarn test
```

## Improvements

### Formatting the end time

I had an issue with the endTimeDates of some of the data passed back by the API. One or two of them had a month of 13, which meant that creating a Date object from the string threw an error. I didn't have time to investigate this further, so left the End time unformatted in the Session component.

### Tests

I realised right at the end that there is currently no test for the 'loading state' of the SessionList component. I added the loading state as part of fixing a bug when implementing the async loading of the session data from the API, and missed the fact I needed to add a test for it.

Also, although the redux store is implicitly being tested as part of the component tests (the staff id filter wouldn't work if the store wasn't working), I am aware it's possible to explicitly test the initial state of the store and this is not currently being done.

### Adding global state

Depending on any future additions to the project, it may be necessary to move the sessions data currently stored locally in the SessionsList component into global state. This would be needed if a lot of other components required access to the same data, as the alternative would be to elevate it to a common parent component and use prop drilling, which can get messy very quickly.

### Responsive design

I would like to add some basic responsive design to the project. The most obvious addition would be to use media queries to reduce the size of the text a little at lower screen widths.

Depending on the future direction of the project, it might be necessary to do more complex changes. For example, if a nav bar is ever added with multiple elements, smaller screens might need this to collapse down to an expandable menu icon.

### Accessibility

The project currently only uses a couple of semantic html tags. This is unhelpful from an accessibility perspective, and I would like to do a pass over the code and add them where appropriate. An example addition would be using the time tag in the Session component. Another addition might be to use section or article tags for each session.

### Error handling

Apart from a few logs to console if the SessionsList fails to retrieve the data from the API, there is no error handling at the moment. I would like to add some kind of check to the SessionsList component and render an appropriate message if the GET request fails.

### Styling

The styling is obvious bare bones at the moment. I'd like to a little work to improve this, adding some colour, making the hierarchy of information clearer and generally smartening it up.

## A note on timings

Depending on whether you count writing the Improvements part of the readme or not, I am either just over 2 hours or at around 2.5 hours as I had to take an unexpected break near the start of the project. In the event that you want to include the readme as part of the overall time, I've kept any coding done after the 2 hours in a separate branch called redux. The only thing this added to the project was global state to store the user details in.
