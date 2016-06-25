export function banRank(champData) {
  const updatedChamps = champData.map((champ) => {
    champ.banPriority = champ.winRate * (champ.pickRate + champ.banRate);
    return champ;
  });

  return updatedChamps;
};
