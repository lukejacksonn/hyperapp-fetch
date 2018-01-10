# hyperapp-fetch
> A component for fetching and caching data before rendering a view

Often views depend on some dynamic data that needs to be fetched from a remote location before it can render. This is a common enough pattern to warrant a generic solution. The component requires the following properties to function correctly:

- `cache`: a place in state in which to store the fetched data
- `url`: a URL that is used as the url for fetched data stored in the cache
- `done`: an action that extends the cache once data has been fetched
- `view`: a function that gets passed the fetched data and returns a vdom node

## Install

```
npm i hyperapp-fetch
```

## Usage

```js
import { app } from 'hyperapp'
import { Fetch } from 'hyperapp-fetch'

const state = {
  users: {},
}

const actions = {
  addUser: ([key, user]) => ({ users }) => ({
    users: Object.assign({}, users, { [key]: user }),
  }),
}

const view = (state, actions) =>
  Fetch({
    cache: state.users,
    url: 'https://api.github.com/users/lukejacksonn',
    done: actions.addUser,
    view: (cache, key) => Object.keys(cache),
  })

app(state, actions, view, document.body)
```

## Routing

One of the most common use cases for a `Fetch` component is fetching data upon entering a route. This component will work with [@hyperapp/router](https://github.com/hyperapp/router) seamlessly. The below example will fetch a GitHub users profile data and render an image using the `avatar_url` from the cached response.

#### Example View
```js
const UserProfile = ({ match }) =>
  Fetch({
    cache: state.users,
    url: `https://api.github.com/users/${match.params.id}`,
    done: actions.addUser,
    view: (cache, key) => img({ src: cache[key].avatar_url }),
  })
```

#### Example Route
```js
Route({ path: '/:id', render: UserProfile }),
```
