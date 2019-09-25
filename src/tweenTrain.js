class TweenTrain {
	// this is how you should always create a new tween train
	static create(scene) {
		let train = new TweenTrain(scene);
		for (let i=0; i<this.allTrains.length; i++) {
			if (this.allTrains[i].finished) {
				this.allTrains[i] = train;
				return train;
			}
		}
		this.allTrains.push(train);
		return train;
	}
	
	// resizer
	static resize() {
		for (let i=this.allTrains.length-1; i>=0; i--) {
			if (!this.allTrains[i].finished) {
				this.allTrains[i].resize();
			}
		}
	}
	
	// constructor
	constructor(scene) {
		this.scene = scene;
		this.train = [];
		this.currentTween = false;
		this.finished = false;
		this.isLooping = false;
	}
	
	// sets isLooping to true/false, which determines if the train will keep repeating itself
	// a looping train can be broken by setting isLooping to false, or by simply killing it
	setLooping(isLooping) {
		this.isLooping = !!isLooping;
		return this;
	}
	
	// adds a tween to the train
	// cool feature: config can have an onStop function, which will be called if the tween is stopped during resize action
	// cool feature: config can have a resizeAction string, which controls the tween's resize behavior ("restart" (default), "skip", or "nothing")
	add(configGetter) {
		this.train.push(configGetter);
		return this;
	}
	
	// add parallel-running sub-trains to the train
	addParallel(trains) {
		this.train.push({parallelTrains: trains});
		return this;
	}
	
	// adds a delay (waiting time in milliseconds) to the train
	// cool feature: if delay is a function, its return value will be used dynamically at runtime
	addDelay(delay) {
		this.train.push({trainDelay: delay});
		return this;
	}
	
	// adds an instant event (basically a function call) to the train
	addEvent(eventFunction) {
		this.train.push({trainEvent: eventFunction});
		return this;
	}
	
	// starts the train, choo choo!
	// runs the first element of the train (making sure that the next element will be called when it ends)
	run() {
		if (this.train.length > 0) {
			let currentTask = this.train[0];
			if (currentTask.trainDelay != undefined) {
				// this is a delay
				let tweenTrain = this;
				let delay = currentTask.trainDelay;
				this.scene.time.addEvent({
					delay: (typeof(delay) == "function") ? delay() : delay,
					callback: function() {
						tweenTrain.runNext();
					}
				});
			} else if (currentTask.trainEvent != undefined) {
				// this is an instant event
				currentTask.trainEvent();
				this.runNext();
			} else if (currentTask.parallelTrains != undefined) {
				// this is a parallel train-running task
				this.remainingChildren = currentTask.parallelTrains.length;
				for (let i=0; i<currentTask.parallelTrains.length; i++) {
					let childTrain = currentTask.parallelTrains[i];
					childTrain.parentTrain = this;
					childTrain.run();
				}
				// runNext will be called by the child train that finishes last (ensuring that this task is not instant)
			} else {
				// this is a tween
				let config = currentTask();
				let invalidTween = !config.targets || (Array.isArray(config.targets) && config.targets.length == 0);
				if (invalidTween) {
					this.runNext();
				} else {
					let tweenTrain = this;
					if (config.onComplete) {
						let oldFunction = config.onComplete;
						config.onComplete = function() {
							oldFunction();
							tweenTrain.currentTween = false;
							tweenTrain.runNext();
						}
					} else {
						config.onComplete = function() {
							tweenTrain.currentTween = false;
							tweenTrain.runNext();
						}
					}
					this.currentTween = this.scene.tweens.add(config);
					this.currentTween.onStop = config.onStop || function() {};
					this.currentTween.resizeAction = config.resizeAction || "restart";
				}
			}
		} else {
			this.finished = true;
			// alert the parent if this is a child train
			if (this.parentTrain) {
				this.parentTrain.remainingChildren--;
				if (this.parentTrain.remainingChildren == 0) {
					this.parentTrain.runNext();
				}
			}
		}
	}
	
	// removes the first element, then runs the new first element
	runNext() {
		if (this.finished) return;
		let removed = this.train.shift();
		if (this.isLooping) this.train.push(removed);
		this.run();
	}
	
	// handles tweens based on their resizeAction
	resize() {
		if (this.currentTween) {
			if (this.currentTween.resizeAction == "nothing") {
				// do nothing
			} else if (this.currentTween.resizeAction == "skip") {
				// skip
				this.currentTween.onStop();
				this.currentTween.stop();
				this.currentTween = false;
				this.runNext();
			} else {
				// restart (default)
				this.currentTween.onStop();
				this.currentTween.stop();
				this.run();
			}
		} 
	}
	
	// skip to the next task (can be used to break loops)
	skipToNext() {
		if (this.currentTween) {
			this.currentTween.onStop();
			this.currentTween.stop();
			this.currentTween = false;
			this.runNext();
		}
	}
	
	// skip to the last task (can be used to break loops)
	skipToLast() {
		if (this.currentTween) {
			this.currentTween.onStop();
			this.currentTween.stop();
			this.currentTween = false;
			this.train.splice(0, this.train.length - 1);
			this.run();
		}
	}
	
	// kill/stop current train in its tracks
	kill() {
		if (this.currentTween) {
			this.currentTween.onStop();
			this.currentTween.stop();
			this.currentTween = false;
		}
		this.train = [];
		this.run();
	}
}

TweenTrain.allTrains = [];

export default TweenTrain;
