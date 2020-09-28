/**
 * Returns a key for a trade lane
 * @param origin string
 * @param destination string
 */
const tradeLaneKeyProvider = (origin, destination) =>
  `${origin}:${destination}`;

module.exports = { tradeLaneKeyProvider };
