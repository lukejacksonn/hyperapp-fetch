/*
* Returns a view when some data from a given
* loaction has been fetched and stored in state.
* The view is passed the data cache and url as props.
*
* @param {State} cache
* @param {Action} done
* @param {String} url
* @param {Function} view
*/

export const Fetch = ({ cache, done, url, view }) => {
  if (cache[url] && cache[url] !== 'fetching') {
    return view(cache, url)
  } else if (cache[url] !== 'fetching') {
    fetch(url)
      .then(res => res.json())
      .then(x => done([url, x]))
    done([url, 'fetching'])
  }
}
