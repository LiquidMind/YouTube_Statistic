const playlists = [
  {
    topX: 10,
    key: "TOP_10_MOST_VIEWED_DAILY",
    orderQuery: "ORDER BY views_per_second DESC",
    title: "Top 10 Most Viewed Daily Videos",
    description:
      "This playlist contains the top 10 most viewed videos on a daily basis.",
    sort: "views_per_second",
  },
  {
    topX: 100,
    key: "TOP_100_MOST_VIEWED_DAILY",
    orderQuery: "ORDER BY views_per_second DESC",
    title: "Top 100 Most Viewed Daily Videos",
    description:
      "This playlist contains the top 100 most viewed videos on a daily basis.",
    sort: "views_per_second",
  },
  {
    topX: 1000,
    key: "TOP_1000_MOST_VIEWED_DAILY",
    orderQuery: "ORDER BY views_per_second DESC",
    title: "Top 1000 Most Viewed Daily Videos",
    description:
      "This playlist contains the top 1000 most viewed videos on a daily basis.",
    sort: "views_per_second",
  },
  {
    topX: 10000,
    key: "TOP_10000_MOST_VIEWED_DAILY",
    orderQuery: "ORDER BY views_per_second DESC",
    title: "Top 10000 Most Viewed Daily Videos",
    description:
      "This playlist contains the top 10000 most viewed videos on a daily basis.",
    sort: "views_per_second",
  },
  {
    topX: 100000,
    key: "TOP_100000_MOST_VIEWED_DAILY",
    orderQuery: "ORDER BY views_per_second DESC",
    title: "Top 100000 Most Viewed Daily Videos",
    description:
      "This playlist contains the top 100000 most viewed videos on a daily basis.",
    sort: "views_per_second",
  },
  {
    topX: 1000000,
    key: "TOP_all_MOST_VIEWED_DAILY",
    orderQuery: "ORDER BY views_per_second DESC",
    title: "Top all Most Viewed Daily Videos",
    description:
      "This playlist contains all the most viewed videos on a daily basis.",
    sort: "views_per_second",
  },
  {
    topX: 10,
    key: "TOP_10_MOST_VIEWED",
    orderQuery: "ORDER BY viewes DESC",
    title: "Top 10 Most Viewed Videos",
    description: "This playlist contains the top 10 most viewed videos.",
    sort: "viewes",
  },
  {
    topX: 100,
    key: "TOP_100_MOST_VIEWED",
    orderQuery: "ORDER BY viewes DESC",
    title: "Top 100 Most Viewed Videos",
    description: "This playlist contains the top 100 most viewed videos.",
    sort: "viewes",
  },
  {
    topX: 1000,
    key: "TOP_1000_MOST_VIEWED",
    orderQuery: "ORDER BY viewes DESC",
    title: "Top 1000 Most Viewed Videos",
    description: "This playlist contains the top 1000 most viewed videos.",
    sort: "viewes",
  },
  {
    topX: 10000,
    key: "TOP_10000_MOST_VIEWED",
    orderQuery: "ORDER BY viewes DESC",
    title: "Top 10000 Most Viewed Videos",
    description: "This playlist contains the top 10000 most viewed videos.",
    sort: "viewes",
  },
  {
    topX: 100000,
    key: "TOP_100000_MOST_VIEWED",
    orderQuery: "ORDER BY viewes DESC",
    title: "Top 100000 Most Viewed Videos",
    description: "This playlist contains the top 100000 most viewed videos.",
    sort: "viewes",
  },
  {
    topX: 1000000,
    key: "ALL_MOST_VIEWED",
    orderQuery: "ORDER BY viewes DESC",
    title: "Top all Most Viewed Videos",
    description: "This playlist contains all the most viewed videos.",
    sort: "viewes",
  },
];

module.exports = playlists;
