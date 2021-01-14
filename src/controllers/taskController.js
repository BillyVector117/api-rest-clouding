import Task from "../models/Task"; // Data model from Tasks
// import { getPagination } from "../libs/getPagination";
export const getAllTask = async (req, res) => {
  try {
    /*  const { size, page, title } = req.query; // los toma de la URL (querys)
    // Busca por expresión regular, el titulo que se pase en el query lo buscara en la base de datos
    const condition = title ? { title: { $regex: new RegExp(title), $options: 'i'},} : {};
    const { limit, offset } = getPagination(page, size); // usa el métoo de pagination
    const tasks = await Task.paginate(condition, { offset, limit }); // condition devuelve un objecto asi que aqui no se agregan '{}'
     */
    const tasks = await Task.find();

    console.log(tasks, `Tasks length: ${tasks.length}`); // get all tasks with its properties,
    res.render("index", { tasks }); // Envia las tareas filtradas
  } catch (error) {
    res.status(500).json({ msg: error });
    console.log(error);
  }
};

export const getAllTaskChecked = async (req, res) => {
  const tasks = await Task.find();
  const doneTasks = tasks.filter((element) =>
    element.done ? element.done : null
  ); // Tareas completadas

  try {
    res.render("notes/checkedTasks", { doneTasks });
  } catch (error) {
    res.status(500).json({ msg: error });
    console.log(error);
  }
};
export const getAllTaskUnChecked = async (req, res) => {
  const tasks = await Task.find();
  const missTasks = tasks.filter((element) =>
    !element.done ? !element.done : null
  ); // Tareas aun no hechas
  try {
    res.render("notes/unCheckedTasks", { missTasks });
  } catch (error) {
    res.status(500).json({ msg: error });
    console.log(error);
  }
};
// Function when visualize a single task
export const getOneTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id).sort({ datefield: 1 });
    res.render("notes/getOneTask", { task });
    console.log("Getting One document: ", task);
  } catch (error) {
    res.status(500).json({ msg: `The task ${id} does not found` });
    console.log(error);
  }
};
export const findAllDoneTask = async (req, res) => {
  try {
    const tasks = await Task.find({ done: true });
    // console.log(tasks);
    res.render("index", { tasks });
    console.log(`Getting done Tasks....Task done length: ${tasks.length}`);
  } catch (error) {
    console.log(error);
  }
};
export const addNewTask = async (req, res) => {
  try {
    const { title, description, done } = req.body;
    const errors = [];
    if (!title) {
      errors.push({ text: "Missing title" });
    }
    if (!description) {
      errors.push({ text: "Missing description" });
    }
    if (errors.length > 0) {
      res.render("index", {
        errors,
        title,
        description,
      });
    } else {
      const newTask = new Task({
        title,
        description,
        done: req.body.done ? req.body.done : false,
      }); // Generates a new Document with an 'ID'
      const taskSaved = await newTask.save();
      console.log("Task created successfully", taskSaved);
      res.redirect("/api/tasks");
    }
  } catch (error) {
    res.status(500).json({ msg: error });
    console.log(error);
  }
};
export const deleteOneTask = async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    console.log("task deleted", id);
    res.redirect("/api/tasks/");
  } catch (error) {
    res.status(500).json({ msg: `The task ${id} can not delete` });
    console.log(error);
  }
};
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const done = !req.body.done ? false : true;
    await Task.findByIdAndUpdate(id, { done, title, description });
    //await Task.findByIdAndUpdate(id, {done} );
    console.log("TASK UPDATED SUCCESSFULLY");
    console.log("req.body: .....", req.body);
    res.redirect(`/api/tasks/${req.params.id}`);
  } catch (error) {
    console.log(error);
  }
};
