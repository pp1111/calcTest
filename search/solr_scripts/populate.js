const solr = require('../solr_scripts/solr-client');
const MongoClient = require('mongodb').MongoClient,
    http = require('http')

solrClient = new solr();


MongoClient.connect('mongodb://localhost:27017/products').then( db => {
	let collection = db.collection("productsList");

	collection.find({}).toArray( (err,items) => {
		items.forEach(item => {	
			delete item.meta;
			solrClient.update([item]);
		})

		db.close( () => console.log('Solr updated at: ', new Date()));	
	});
})
