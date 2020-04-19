[![CircleCI](https://circleci.com/gh/shafali03/click-counter-react.svg?style=shield)](https://circleci.com/gh/shafali03/click-counter-react)

# Click counter with React

### Practice with react, enzyme and jest

## Setup and install projects

```npx create-react-app click-counter-react ```

## using yarn

```yarn add enzyme enzyme-adapter-react-16 react-test-renderer enzyme-to-json --dev```


## configure Jest & Enzyme

In the src directory created a new file called setupTests.js

```
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
```

In the package.json added Jest configuration

```
"jest": {
  "snapshotSerializers": ["enzyme-to-json/serializer"],
  "collectCoverageFrom": ["src/**/*.js", "!src/index.js"],
  "coverageReporters": ["text"]
}
```
