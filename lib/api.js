import moment from 'moment';

const GITHUB_API = 'https://api.github.com';

function getDateFromPeriod(period) {
  const date = moment();
  switch (period) {
    case 'this week':
      return date.startOf('week').format('YYYY-MM-DD');
    case 'this month':
      return date.startOf('month').format('YYYY-MM-DD');
    default:
      return date.format('YYYY-MM-DD');
  }
}

exports.search = (lang, period, page, per_page) => {
  const created = getDateFromPeriod(period);
  const query = {
    q: (lang === 'All' ? '' : `language:${lang}+`) + `created:>=${created}`,
    sort: 'stars',
    order: 'desc',
    page: page || 0,
    per_page: per_page || 10,
  };
  const queryString = Object.keys(query).map(key => `${key}=${query[key]}`).join('&');
  console.log(`${GITHUB_API}/search/repositories?${queryString}`);
  return fetch(`${GITHUB_API}/search/repositories?${queryString}`)
    .then(response => response.text())
    .then(responseText => {
      return JSON.parse(responseText);
    });
};
