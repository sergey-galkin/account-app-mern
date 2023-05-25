const User = require("../db/user").User;

const updateUser = async (req, res) => {
  const user = req.session?.user;
  if (!user) return res.send({status: false});

  // const todo = req.body;
  
  // let savedTodo;
  // try {
  //   savedTodo = await Todo.update({
  //     where: {id: todo.id},
  //     data: {
  //       task: todo.task,
  //       completed: todo.completed,
  //       edited: todo.edited,
  //     }
  //   });
  // } catch (error) {
  //   console.log(error);
  //   return res.sendStatus(500);
  // }
  
  res.send({status: true});
}

module.exports = updateUser;