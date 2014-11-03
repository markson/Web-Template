import Resolver from 'ember/resolver';
Ember.MODEL_FACTORY_INJECTIONS = true;

Ember.View.reopen({
	didInsertElement: function() {
		this._super();
		Ember.run.scheduleOnce('afterRender', this, this.afterRenderEvent);
	},
	afterRenderEvent: function() {

	}
});

var App = Ember.Application.extend({
  LOG_TRANSITIONS: true,
  modulePrefix:'appkit',
  Resolver: Resolver['default']
});





export default App;
