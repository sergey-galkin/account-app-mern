const User = require("../db/user").User;

const users = async (req, res) => {
  const { limit, skip, orderColumn, orderDirection } = req.query;
  let users, amount;
  try {
    amount = await User.count();
    users = await User.findMany({
      take: Number(limit),
      orderBy: {
        [orderColumn]: orderDirection,
      },
      skip: Number(skip),
    })
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
  res.send({amount, users});
}

module.exports = users;