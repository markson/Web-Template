var Product =  DS.Model.extend({
	name: DS.attr('string'),
	description: DS.attr('string'),
	amount: DS.attr('number'),
	category: DS.hasMany('category', {async: true})
});

Product.reopenClass({
	FIXTURES: [
		{id: 1, name:'Short - 8 oz', description:"This is the smallest size that Starbucks offers. It’s not very commonly ordered, and you can only get hot drinks in a Short size.", amount:0, category:[1, 3]},
		{id: 2, name:'Tall - 12 oz', description:"Tall is considered to be a “small” sized drink. A medium size at Tim Hortons in Canada is 10 oz, or 14 oz in the U.S.", amount:0, category:[1, 3]},
		{id: 3, name:'Grande - 16 oz', description:"Pronounced “GRAWN-day”. A Large Tim Hortons coffee is between 14 and 20 oz. and it's really good to have thie size", amount:0, category: [1, 3]},
		{id: 4, name:'Single Layer(Logo)', description:"This is the smallest size that Starbucks offers. It’s not very commonly ordered, and you can only get hot drinks in a Short size.", amount:0, category: 2}
	]
});
export default Product;
