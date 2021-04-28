import Task from "../models/Task";
import { getPagination } from "../libs/getPagination";

//Read GET api/tasks
const findAll = async (req, res) => {
	try {
		const { page, size, title } = req.query;
		const pageFilter = title
			? {
					title: {
						$regex: new RegExp(title),
						$options: "i",
					},
			  }
			: {};
		const { offset, limit } = getPagination(page, size);
		const data = await Task.paginate(pageFilter, { offset, limit });
		res.json({
			tasks: data.docs,
			totalTasks: data.totalDocs,
			offset: data.offset,
			limit: data.limit,
		});
	} catch (error) {
		res.status(500).json({ message: error.message || `Something goes wrong retrieving tasks` });
	}
};
//Read GET api/tasks/done
const findAllDone = async (req, res) => {
	const tasks = await Task.find({
		done: true,
	});
	res.json(tasks);
};
//Read GET api/task/:id
const findOne = async (req, res) => {
	const { id } = req.params;
	try {
		const task = await Task.findById(id);
		if (!task) {
			return res.status(404).json({ message: `Task ${id} not found` });
		}
		res.json(task);
	} catch (error) {
		res.status(500).json({ message: error.message || `Something goes wrong retrieving task ${id}` });
	}
};
//Create POST api/tasks
const create = async (req, res) => {
	if (!req.body.title) {
		return res.status(400).json({ message: "title is required" });
	}
	try {
		const { title, description, done } = req.body;
		const newTask = new Task({
			title,
			description,
			done,
		});
		const taskSaved = await newTask.save();
		res.json(taskSaved);
	} catch (error) {
		res.status(500).json({ message: error.message || `Something goes wrong creating a task` });
	}
};
//Update PUT api/tasks/:id
const update = async (req, res) => {
	const taskOld = await Task.findById(req.params.id);
	const { title, description, done } = req.body;
	const updTask = {
		title: title || taskOld.title,
		description: description || taskOld.description,
		done: done || taskOld.done,
	};
	await Task.updateOne(taskOld, updTask);
	res.json({
		message: `Update task ${taskOld._id}`,
	});
};
//Delete DELETE api/tasks/:id
const remove = async (req, res) => {
	const { id } = req.params;
	try {
		const data = await Task.findByIdAndDelete(id);
		res.json({
			message: `${data._id} has been deleted successfully`,
		});
	} catch (error) {
		res.status(500).json({ message: error.message || `Cannot delete task ${id}` });
	}
};

export default {
	findAll,
	findOne,
	findAllDone,
	create,
	update,
	remove,
};
