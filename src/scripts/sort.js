export function sortMoviesBy(array, field) {
  if (field === "release_date") {
    return sortMoviesByDate(array);
  }
  return sort(array, field);
}

function sortMoviesByDate(array) {
  return array.sort(
    (a, b) => Date.parse(b.release_date) - Date.parse(a.release_date)
  );
}

export function sort(array, field, order = "desc") {
  return array.sort(compareValues(field, order));
}

function compareValues(key, order = "desc") {
  return function innerSort(a, b) {
    if (
      !Object.prototype.hasOwnProperty.call(a, key) ||
      !Object.prototype.hasOwnProperty.call(b, key)
    ) {
      // property doesn't exist on either object
      return 0;
    }

    const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
    const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return order === "desc" ? comparison * -1 : comparison;
  };
}
