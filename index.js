const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const db = knex({
	client: 'sqlite',
	useNullAsDefault: true,
	connection: {
		filename: './data/lambda.sqlite3'
	}
});

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here
server.post('/api/zoos', async (req, res) => {
	try {
		const zoo = await db('zoos').insert(req.body);
		if (zoo) {
			res.status(201).json(zoo);
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Error at adding the data' });
	}
});

server.get('/api/zoos', async (req, res) => {
	try {
		const zoos = await db.raw('select * from zoos');
		if (zoos) {
			res.status(200).json(zoos);
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Error at getting the data' });
	}
});

server.get('/api/zoos/:id', async (req, res) => {
	try {
		const zoo = await db('zoos').where({ id: req.params.id });
		if (zoo) {
			res.status(200).json(zoo);
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Error at getting the data' });
	}
});

server.put('/api/zoos/:id', async (req, res) => {
	try {
		const zoo = await db('zoos').where({ id: req.params.id }).update(req.body);
		if (zoo) {
			res.status(200).json({ message: 'Zoo got updated' });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Error at updating the zoo' });
	}
});

server.delete('/api/zoos/:id', async (req, res) => {
	try {
		deleted = await db('zoos').where({ id: req.params.id }).del();
		if (deleted) {
			res.status(200).json({ message: 'Zoo was deleted' });
		} else {
			res.status(404).json({ message: "The ID doesn't exist" });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Error at deleting the zoo' });
	}
});

server.post('/api/bears', async (req, res) => {
	try {
		const bear = await db('bears').insert(req.body);
		if (bear) {
			res.status(201).json(bear);
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Error at adding the data' });
	}
});

server.get('/api/bears', async (req, res) => {
	try {
		const bears = await db.raw('select * from bears');
		if (bears) {
			res.status(200).json(bears);
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Error at getting the data' });
	}
});

server.get('/api/bears/:id', async (req, res) => {
	try {
		const bear = await db('bears').where({ id: req.params.id });
		if (bear) {
			res.status(200).json(bear);
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Error at getting the data' });
	}
});

server.put('/api/bears/:id', async (req, res) => {
	try {
		const bear = await db('bears').where({ id: req.params.id }).update(req.body);
		if (bear) {
			res.status(200).json({ message: 'Bear got updated' });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Error at updating the bear' });
	}
});

server.delete('/api/bears/:id', async (req, res) => {
	try {
		deleted = await db('bears').where({ id: req.params.id }).del();
		if (deleted) {
			res.status(200).json({ message: 'Bear was deleted' });
		} else {
			res.status(404).json({ message: "The ID doesn't exist" });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Error at deleting the bear' });
	}
});

const port = 3300;
server.listen(port, function() {
	console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
