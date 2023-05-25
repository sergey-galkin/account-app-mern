const User = require("../db/user").User;

const todoValidationFunctions = {
  name: (name) => name.trim().length > 0,
  task: (task) => task.trim().length > 0,
  email: (email) => {
    const validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
    return validRegex.test(email);
  },
};

const validateTodo = (todo) => {
  const result = {};
  for (const key in todoValidationFunctions) {
    if (Object.hasOwnProperty.call(todoValidationFunctions, key)) {
      const value = todo[key];
      result[key] = typeof value === 'string' && todoValidationFunctions[key](value);
    }
  }
  return result;
}

exports.get = async (req, res) => {
  const todo = req.body;
  const checks = validateTodo(todo);
  const status = Object.values(checks).reduce((res, v) => res ? v : res, true);
  
  if (status) {
    let savedTodo;
    try {
      savedTodo = await Todo.create({
        data: {
          ...todo,
          completed: false,
          edited: false
        }
      });
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  }
  
  res.send({status, checks});
}

exports.post = async (req, res) => {
  const todo = req.body;
  const checks = validateTodo(todo);
  const status = Object.values(checks).reduce((res, v) => res ? v : res, true);
  
  // if (status) {
  //   let savedTodo;
  //   try {
  //     savedTodo = await Todo.create({
  //       data: {
  //         ...todo,
  //         completed: false,
  //         edited: false
  //       }
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     return res.sendStatus(500);
  //   }
  // }
  
  res.send({status, checks});
}