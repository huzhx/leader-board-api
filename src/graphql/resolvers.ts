const players = [
  { id: '1', name: 'Hello', team: 'RED' },
  { id: '2', name: 'Hello', team: 'BLUE' },
];

const resolvers = {
  Query: {
    players: () => {
      return players;
    },
  },
};

export default resolvers;
