const playlists_channels = [
  {
    topX: 10,
    key: "TOP_10_CHANNELS_VIEWED",
    orderQuery: "ORDER BY view_count DESC",
    title: "Top 10 Channels Viewed",
    description: "This playlist contains the Top 10 Channels Viewed basis.",
    sort: "view_count",
  },
  {
    topX: 100,
    key: "TOP_100_CHANNELS_VIEWED",
    orderQuery: "ORDER BY view_count DESC",
    title: "Top 100 Channels Viewed",
    description: "This playlist contains the Top 100 Channels Viewed basis.",
    sort: "view_count",
  },
  {
    topX: 1000,
    key: "TOP_1000_CHANNELS_VIEWED",
    orderQuery: "ORDER BY view_count DESC",
    title: "Top 1000 Channels Viewed",
    description: "This playlist contains the Top 1000 Channels Viewed basis.",
    sort: "view_count",
  },
  {
    topX: 10000,
    key: "TOP_10000_CHANNELS_VIEWED",
    orderQuery: "ORDER BY view_count DESC",
    title: "Top 10000 Channels Viewed",
    description: "This playlist contains the Top 10000 Channels Viewed basis.",
    sort: "view_count",
  },
  {
    topX: 10,
    key: "TOP_10_CHANNELS_DAILY",
    orderQuery: "ORDER BY views_per_second DESC",
    title: "Top 10 Channels Daily",
    description: "This playlist contains the Top 10 Channels Daily basis.",
    sort: "views_per_second",
  },
  {
    topX: 100,
    key: "TOP_100_CHANNELS_DAILY",
    orderQuery: "ORDER BY views_per_second DESC",
    title: "Top 100 Channels Daily",
    description: "This playlist contains the Top 100 Channels Daily basis.",
    sort: "views_per_second",
  },
  {
    topX: 1000,
    key: "TOP_1000_CHANNELS_DAILY",
    orderQuery: "ORDER BY views_per_second DESC",
    title: "Top 1000 Channels Daily",
    description: "This playlist contains the Top 1000 Channels Daily basis.",
    sort: "views_per_second",
  },
  {
    topX: 10000,
    key: "TOP_10000_CHANNELS_DAILY",
    orderQuery: "ORDER BY views_per_second DESC",
    title: "Top 10000 Channels Daily",
    description: "This playlist contains the Top 10000 Channels Daily basis.",
    sort: "views_per_second",
  },
  {
    topX: 10,
    key: "TOP_10_CHANNELS_VIDEOS",
    orderQuery: "ORDER BY video_count DESC",
    title: "Top 10 Channels Videos",
    description: "This playlist contains the Top 10 Channels Videos basis.",
    sort: "video_count",
  },
  {
    topX: 100,
    key: "TOP_100_CHANNELS_VIDEOS",
    orderQuery: "ORDER BY video_count DESC",
    title: "Top 100 Channels Videos",
    description: "This playlist contains the Top 100 Channels Videos basis.",
    sort: "video_count",
  },
  {
    topX: 1000,
    key: "TOP_1000_CHANNELS_VIDEOS",
    orderQuery: "ORDER BY video_count DESC",
    title: "Top 1000 Channels Videos",
    description: "This playlist contains the Top 1000 Channels Videos basis.",
    sort: "video_count",
  },
  {
    topX: 10000,
    key: "TOP_10000_CHANNELS_VIDEOS",
    orderQuery: "ORDER BY video_count DESC",
    title: "Top 10000 Channels Videos",
    description: "This playlist contains the Top 10000 Channels Videos basis.",
    sort: "video_count",
  },
  {
    topX: 10,
    key: "TOP_10_CHANNELS_AVARAGE_VIEWS",
    orderQuery: `
    ORDER BY 
      (view_count / video_count) DESC,
      ABS(view_count - (SELECT AVG(view_count) FROM all_channels WHERE view_count > 100))
    `,
    title: "Top 10 Videos Average Views",
    description:
      "This playlist contains the Top 10 Channels Average Views basis.",
    sort: " (view_count / video_count) DESC, ABS(view_count - (SELECT AVG(view_count) FROM all_channels WHERE view_count > 100))",
  },
  {
    topX: 100,
    key: "TOP_100_CHANNELS_AVARAGE_VIEWS",
    orderQuery: `
    ORDER BY 
      (view_count / video_count) DESC,
      ABS(view_count - (SELECT AVG(view_count) FROM all_channels WHERE view_count > 100))
    `,
    title: "Top 100 Videos Average Views",
    description:
      "This playlist contains the Top 100 Channels Average Views basis.",
    sort: " (view_count / video_count) DESC, ABS(view_count - (SELECT AVG(view_count) FROM all_channels WHERE view_count > 100))",
  },
  {
    topX: 1000,
    key: "TOP_1000_CHANNELS_AVARAGE_VIEWS",
    orderQuery: `
    ORDER BY 
      (view_count / video_count) DESC,
      ABS(view_count - (SELECT AVG(view_count) FROM all_channels WHERE view_count > 100))
    `,

    title: "Top 1000 Videos Average Views",
    description:
      "This playlist contains the Top 1000 Channels Average Views basis.",
    sort: " (view_count / video_count) DESC, ABS(view_count - (SELECT AVG(view_count) FROM all_channels WHERE view_count > 100))",
  },
  {
    topX: 10000,
    key: "TOP_10000_CHANNELS_AVARAGE_VIEWS",
    orderQuery: `
    ORDER BY 
      (view_count / video_count) DESC,
      ABS(view_count - (SELECT AVG(view_count) FROM all_channels WHERE view_count > 100))
    `,
    title: "Top 10000 Videos Average Views",
    description:
      "This playlist contains the Top 10000 Channels Average Views basis.",
    sort: " (view_count / video_count) DESC, ABS(view_count - (SELECT AVG(view_count) FROM all_channels WHERE view_count > 100))",
  },
];

module.exports = playlists_channels;
