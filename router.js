'use strict';

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const {ConnectTheDots} = require('./models');

router.get('/', (req, res) => {
	ConnectTheDots
		.find()
		.then(drawings => {
			res.json(drawings.map(drawing => drawing.serialize()));
		})
		.catch(err => {
			console.error(err);
			res.status(500).json({error: 'something went terribly wrong'});
		});
});

router.get('/:accessCode', (req, res) => {
	ConnectTheDots
		.findOne({accessCode: req.params.accessCode})
		.then(drawing => res.json(drawing.serialize()))
		.catch(err => {
			console.error(err);
			res.status(500).json({error: 'something  went terribly wrong'});
		});
});

router.post('/', jsonParser, (req, res) => {
	const requiredFields = ['accessCode', 'vocab', 'pixels'];

	for (let i=0; i<requiredFields; i++) {
		const field = requiredFields[i];

		if (!(field in req.body)) {
			const message = `Missing \'${field}\' in request body!`;
			console.error(message);
			return res.status(400).send(message);
		}
	}

	ConnectTheDots
		.create({
			accessCode: req.body.accessCode,
			vocab: req.body.vocab,
			pixels: req.body.pixels
		})
		.then(drawing => res.status(201).json(drawing.serialize()))
		.catch(err => {
			console.error(err);
			res.status(500).json({error: 'something went terribly wrong'});
		});
});

router.delete('/:accessCode', (req, res) => {
	ConnectTheDots
		.deleteOne({accessCode: req.params.accessCode})
		.then(() => {
			res.status(204).json({message: 'success'});
		})
		.catch(err => {
			console.error(err);
			res.status(500).json({error: 'something went terribly wrong'});
		});
});

router.put('/:accessCode', jsonParser, (req, res) => {
	if (!(req.params.accessCode && req.body.accessCode && req.params.accessCode === req.body.accessCode)) {
		res.status(400).json({
			error: 'Request path access code and request body access code must match'
		});		
	}	

	const updated = {};
	const updateableFields = ['vocab', 'pixels'];

	updateableFields.forEach(field => {
		if (field in req.body) {
			updated[field] = req.body[field];
		}
	});

	ConnectTheDots
		.update(
			{accessCode: req.params.accessCode},
			{
				$set: updated
			}
		)	
		.then(() => res.status(204).end())
		.catch(err => {
			console.error(err);
			res.status(500).json({
				error: 'Something went wrong'
			});
		});
});

/*
loadBoard() {
        this.setState({
            error: null,
            loading: true
        });
        fetch(`${API_BASE_URL}/board`)
            .then(res => {
                if (!res.ok) {
                    return Promise.reject(res.statusText);
                }
                return res.json();
            })
            .then(board =>
                this.setState({
                    lists: board.lists,
                    loading: false
                })
            )
            .catch(err =>
                this.setState({
                    error: 'Could not load board',
                    loading: false
                })
            );
    }
 */


module.exports = router;
